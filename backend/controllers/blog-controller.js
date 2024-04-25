import Blog from "../model/Blog.js";
import User from "../model/User.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req,res,next)=>{
    let blogs
    try{
        blogs = await Blog.find().populate('user');
    }
    catch(err) {
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:"no blogs found"});
    }
    return res.status(200).json({blogs});
};

export const addBlog = async (req,res,next) => {
    const {title, content, image, user} = req.body;
    let exixtingUser
    try{
        exixtingUser = await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!exixtingUser){
        return res.status(400).json({message:"unable to find the user by id"});
    }
    const blog = new Blog({
        title,content,image,user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        exixtingUser.blogs.push(blog);
        await exixtingUser.save({session});
        await session.commitTransaction();
        // session.endSession();
    } catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
    return res.status(200).json({blog});
};

export const updateBlog = async (req,res,next)=>{
    const blogId = req.params.id;
    const {title, content} = req.body;
    let blog;
try {
    blog = await Blog.findByIdAndUpdate(blogId,{
        title, content,
    });
    
} catch(err){
return console.log(err);
}
if(!blog){
    return res.status(500).json({message:"Unable to update blog"});
}
return res.status(200).json({blog});
};

export const getById = async (req,res,next) =>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id);
    } catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"blog not found"});
    }
    return res.status(200).json({blog});
};

export const deleteBlog = async (req,res,next)=>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(id);
        await blog.user.save();
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"unable to delete the blog"})
    }
    return res.status(200).json({message:"blog deleted successfuly"});
};

export const getByUid = async (req,res,next)=>{
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    } catch(err){
        return console.log(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:"no blogs found"});
    }
    return res.status(200).json({user:userBlogs});
}