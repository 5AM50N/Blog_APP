
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Blog from './Blog';

const UserBlog = () =>{
    const id = localStorage.getItem("userId");
    const [user, setUser] = useState();
    const sendRequest = async ()=>{
        const res = await axios.get(`${process.env.REACT_APP_HOST}/blog/user/${id}`).catch(err=>console.log(err));
        const data = res.data;
        return data;
    }
    useEffect(()=>{
        sendRequest().then((data)=>setUser(data.user));
    },[]);
    // console.log(user);
    return(
        <div>
            {user && user.blogs && user.blogs.map((blog, index) => <Blog key={index} isUser={true} id={blog._id}
                title={blog.title} description={blog.content} imageUrl={blog.image} userName={user.name}/>)}
        </div>
    );   
}

export default UserBlog;