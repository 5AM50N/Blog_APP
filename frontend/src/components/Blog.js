import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({title, description, imageUrl, userName, isUser, id}) =>{
    //console.log(title,isUser);
    const navigate = useNavigate();
    const handleEdit = (e) =>{
        navigate(`/myBlogs/${id}`)
    };
    const deleteRequest = async ()=>{
        const res = await axios.delete(`${process.env.REACT_APP_HOST}/blog/${id}`).catch(err=>console.log(err));
        const data = res.data;
        return data;
    }
    const handleDelet = ()=>{
        deleteRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"));
    };
    return(
        <div>
            <Card sx={{ maxWidth:"55%", margin:"auto", mt:4, padding:2, ":hover":{boxShadow: "5px 5px 10px #ccc"} }}>
                <CardMedia
                    sx={{ height: 400 }}
                    image={imageUrl}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>{userName}</b>{" : "}{description}
                    </Typography>
                </CardContent>
                <CardActions display="flex" sx={{justifyContent: "space-between"}}>
                <div>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
                </div>
                { isUser && (
                    <Box display="flex" >
                        <IconButton onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleDelet}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
                </CardActions>
            </Card>
        </div>
    )
};

export default Blog;