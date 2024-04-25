import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState,} from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import {useNavigate} from 'react-router-dom';

const Auth = () =>{
    const [isSignup, setisSignup] = useState(true);
    
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setInputs((previousState) => ({
            ...previousState,
            [e.target.name] : e.target.value
        }));
    };
    const sendRequest = async (type="login")=>{
        const res = await axios.post(`${process.env.REACT_APP_HOST}/users/${type}`,{
            name: inputs.name, email: inputs.email, password: inputs.password
        }).catch(err => console.log(err));
        // console.log(res);
        const data = res.data; //res will store response of axios.post whisch has data as one of its obj. Try console.log(res) to understand.
        console.log(data);
        return data;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if(isSignup){
            sendRequest("signup").then(data=>localStorage.setItem("userId",data.user._id))
            .then(()=>dispatch(authActions.login()))
            .then(()=>navigate("/blogs"));
        }else{
            sendRequest().then(data=>localStorage.setItem("userId",data.user._id))
            .then(()=>dispatch(authActions.login()))
            .then(()=>navigate("/blogs"));
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <Box maxWidth={450} boxShadow="10px 10px 20px #ccc"
                display="flex" flexDirection="column"
                alignItems="center" justifyContent="center"
                padding={3} margin="auto" marginTop={5}>
                    <Typography variant="h3" textAlign="center" padding={3}>{isSignup ? "SignUp":"Login"}</Typography>
    { isSignup &&   <TextField value={inputs.name} name="name" onChange={handleChange} placeholder="Name" margin="normal" /> }
                    <TextField value={inputs.email} type={"email"} name="email" onChange={handleChange} placeholder="Email" margin="normal" />
                    <TextField value={inputs.password} type={"password"} name="password" onChange={handleChange} placeholder="Password" margin="normal" />
                    <Button variant="contained" type="submit"
                        sx={{borderRadius:1,
                            marginTop:3}}>Submit</Button>
                    <Button onClick={()=>setisSignup(!isSignup)}
                        sx={{borderRadius:1,
                            marginTop:3}}>Change to {isSignup ? "Login" : "Signup"}</Button>
            </Box>
        </form>
    );   
}

export default Auth;