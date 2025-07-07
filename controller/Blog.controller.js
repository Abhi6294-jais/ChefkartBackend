const { cloudinary } = require("../config/cloudinary");
const Blog = require("../model/Blog.Model");

// create blogs

const createBlog = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;

    if (!title || !content || !category || !image) {
      return res.status(400).jason({ message: "Please fill in all fields" });
    }

    const newBlog =new Blog( { title, content, category, image });
    await newBlog.save();


    res.status(200).json({ message: "Blog is created successfully",data:newBlog });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

//  get all blogs

const getallblog = async (req, res) => {
  try {
    const Blogs = await Blog.find();

    if (!Blogs.length) {
      return res.status(400).json({ message: "No blog posts Found" });
    }

    res.status(200).json({ message: "Blogs fetched succefully", data: Blogs });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

// get single blogs using id

const getsingleblog = async (req, res) => {
  try {
    const { id } = req.params;
    const getblog = await Blog.findById(id);
    if (!getblog) {
      return res.status(400).json({ message: "Blog don't exist" });
    }

    res
      .status(200)
      .json({ message: "Blog fetched successfully", data: getblog });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

// update a blog

const updateablog=async (req,res)=>{
    try{

        const {id}=req.params;
        const { title, content, category, image }=req.body;

        let imageUrl='';
        // image uploading process
        if (image){
            const result=await cloudinary.uploader.upload(image,{
                folder:'blogs',
            })
            imageUrl=result.secure_url;
        }

        const updatedblogs=await Blog.findByIdAndUpdate(id,{
            title,
            content,
            category,
            image:imageUrl,
        },
        {new:true}

    );

    if (!updatedblogs){
        return res.status(400).json({message:'Blog not found'});

    }
       
    res.status(200).json({
        message:'Blog updated Successfully',
        data:updatedblogs,
    })

    }
    catch(error){
         console.error("Error:",error)
        res.status(500).json({
            message:"Internal Server error",
        })
    };
}


// delete a blog by id

const deleteblog=async (req,res)=>{
    try{
        const {id}=req.params;
        const deletblog=await Blog.findByIdAndDelete(id);
        
        if (!deletblog){
            return res.status(400).json({message:'Blog not found'})
        }

        res.status(200).json({
            message:'Blogs deleted successfully',
            data:deletblog
        })
    }
    catch(error){
         console.error("Error:",error)
        res.status(500).json({
            message:"Internal Server error",
        })
    }
}

// delete all blog by id

const deleteallblog=async (req,res)=>{
    try{
        
        const deletealblog=await Blog.deleteMany();
        
        if (!deletealblog){
            return res.status(400).json({message:'Blog not found'})
        }

        res.status(200).json({
            message:'Blog deleted successfully',
            data:deletealblog
        })
    }
    catch(error){
         console.error("Error:",error)
        res.status(500).json({
            message:"Internal Server error",
        })
    }
}


module.exports={createBlog,getallblog,getsingleblog,updateablog,deleteallblog,deleteblog}
