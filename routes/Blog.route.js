const {createBlog,getallblog,getsingleblog,updateablog,deleteallblog,deleteblog}=require('../controller/Blog.controller');

const router=require('express').Router();

router.post('/create',createBlog);
router.get('/getall',getallblog);
router.get('/get/:id',getsingleblog);
router.post('/update/:id',updateablog);
router.post('/delete/:id',deleteblog);
router.post('/deleteall',deleteallblog);

module.exports=router;
