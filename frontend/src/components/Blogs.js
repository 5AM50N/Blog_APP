import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
// import dotenv from 'dotenv';

const Blogs = () =>{
    // dotenv.config();
    const [blogs, setBlogs]= useState();
    console.log(process.env.REACT_APP_HOST);
    const sendRequest = async ()=>{
        const res = await axios.get(`${process.env.REACT_APP_HOST}/blog`).catch(err=>console.log.apply(err));
        const data = res.data;
        return data;
    };

    useEffect(()=>{
        // console.log("Effect executed this leads to log data two times");
        sendRequest().then(data=>setBlogs(data.blogs));
    },[]);
    console.log(blogs);
    // console.log(process.env.REACT_APP_HOST);
    return(
        <div>
            {blogs && blogs.map((blog, index) => <Blog key={index} isUser={false}
                    id={blog._id} title={blog.title} description={blog.content} imageUrl={blog.image} userName={blog.user.name}/>)}
        </div>
    );   
}

export default Blogs;