import { Typography, Box, InputLabel, TextField, Button } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const lablestyles = {mb:1, mt:2, fontSize:"24px", fontWeight:"bold"};
const AddBlog = () =>{
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title:"",
        description:"",
        imageURL:""
    });
    const handelChange = (e) => {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const sendRequest = async ()=>{
        const res = await axios.post(`${process.env.REACT_APP_HOST}/blog/add`,{
            title: inputs.title,
            content: inputs.description,
            image: inputs.imageURL,
            user: localStorage.getItem("userId")
        }).catch(err=>console.log(err));
        const data = res.data;
        console.log(data);
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"));
    }; 
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <Box border={3} borderColor="gray" borderRadius={2} boxShadow="10px 10px 20px #ccc" padding={3}
                     margin={"auto"} marginTop={3} display="flex" flexDirection={'column'} width="80%">
                    <Typography fontWeight="bold" padding={3} color="gray"
                                varient="h3" textAlign="center">Post Your Blog</Typography>
                    <InputLabel sx={lablestyles}>Title</InputLabel>
                    <TextField name="title" onChange={handelChange} value={inputs.title} margin="auto" varient="outlined" />
                    <InputLabel sx={lablestyles}>Description</InputLabel>
                    <TextField name="description" onChange={handelChange} value={inputs.description} margin="auto" varient="outlined" />
                    <InputLabel sx={lablestyles}>Image URL</InputLabel>
                    <TextField name="imageURL" onChange={handelChange} value={inputs.imageURL} margin="auto" varient="outlined"  />
                    <Button type="submit" sx={{mt:2}} variant="contained" color="inherit">Submit</Button>
                </Box>
            </form>
        </div>
    );   
};

export default AddBlog;