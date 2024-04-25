import React, { useState, useEffect } from 'react';
import {AppBar, Typography, Toolbar, Box, Button, Tabs, Tab} from '@mui/material'
import { Link, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authActions } from '../store';
import { useDispatch } from 'react-redux';

const Header = () =>{
    const [value, setValue] = useState();
    const location = useLocation();
    const indextoName = {
        "/blogs": 0,
        "/myBlogs": 1,
        "/blogs/add": 2
    };
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();
    console.log(indextoName[location.pathname]);
    useEffect(()=>{
        if(isLoggedIn){
            console.log(indextoName[location.pathname]);
            setValue(indextoName[location.pathname]);
            }
    },[location.pathname,isLoggedIn]);
    
    return(
        <AppBar position='sticky' sx = {{background:'linear-gradient(90deg, rgba(0,0,0,1) 7%, rgba(223,40,40,1) 53%, rgba(241,170,179,1) 100%)'}}>
            <Toolbar>
                <Typography>Blogs.App</Typography>
                { isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto">
                    <Tabs textColor='inherit' value={value} onChange={(e, val)=>setValue(val)}>
                        <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                        <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                        <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
                    </Tabs>
                </Box>}
                <Box display="flex" marginLeft="auto">
                    { !isLoggedIn && <>
                        <Button LinkComponent={Link} to="/auth" color='inherit' variant='contained' sx = {{margin:1, color:'black'}} >Login</Button>
                        <Button LinkComponent={Link} to="/auth" color='inherit' variant='contained' sx = {{margin:1, color:'black'}} >SignUp</Button>
                    </>}
                    {
                      isLoggedIn &&  <Button onClick={()=>dispatch(authActions.logout())} LinkComponent={Link} to="/auth" color='inherit' variant='contained' sx = {{margin:1, color:'black'}}>Logout</Button>
                    }
                </Box>
            </Toolbar>
         </AppBar>
    );   
}

export default Header;