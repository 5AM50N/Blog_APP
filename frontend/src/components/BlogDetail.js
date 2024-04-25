import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, InputLabel, TextField, Button } from '@mui/material';

const lablestyles = {mb:1, mt:2, fontSize:"24px", fontWeight:"bold"};
const BlogDetail = () =>{
    const id = useParams().id;
    const navigate = useNavigate();
    const [blog, setBlogs] = useState();
    const [inputs, setInputs] = useState({});
    const handelChange = (e) => {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    console.log(id);
    const fetchDetails =  async ()=>{
        const res = await axios.get(`${process.env.REACT_APP_HOST}/blog/${id}`).catch(err=>console.log(err));
        const data = res.data;
        return data;
    };
    const sendRequest = async ()=>{
        const res = await axios.put(`${process.env.REACT_APP_HOST}/blog/update/${id}`,{
            title:inputs.title,
            content:inputs.description
        }).catch(err=>console.log(err));
        const data = res.data;
        return data;
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"));
    };
    useEffect(()=>{
        fetchDetails().then((data)=>{
            setBlogs(data.blog);
            setInputs({ title:data.blog.title,
                        description:data.blog.content,});
        });
    },[id]);
    console.log(blog);
    return(
        <div>
            {inputs &&
            <form onSubmit={handleSubmit}>
                <Box border={3} borderColor="gray" borderRadius={2} boxShadow="10px 10px 20px #ccc" padding={3}
                     margin={"auto"} marginTop={3} display="flex" flexDirection={'column'} width="80%">
                    <Typography fontWeight="bold" padding={3} color="gray"
                                varient="h3" textAlign="center">Post Your Blog</Typography>
                    <InputLabel sx={lablestyles}>Title</InputLabel>
                    <TextField name="title" onChange={handelChange} value={inputs.title} margin="auto" varient="outlined" />
                    <InputLabel sx={lablestyles}>Description</InputLabel>
                    <TextField name="description" onChange={handelChange} value={inputs.description} margin="auto" varient="outlined" />
                    <Button type="submit" sx={{mt:2}} variant="contained" color="inherit">Submit</Button>
                </Box>
            </form>}
        </div>
    );   
}

export default BlogDetail;