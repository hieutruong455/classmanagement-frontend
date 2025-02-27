import React, { useContext, useState } from "react";

import AuthContext from '../../context/AuthContext'

import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Link, Grid, Box, Container, Typography } from "@mui/material";

import { LockOutlined } from '@mui/icons-material'



const RegisterForm = () => {
  const { setIsRegistered, setIsEmailNotRegistered } = useContext(AuthContext)

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordNoti, setPasswordNoti] = useState('Please enter password again');
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    //call fetch to get register checking from server
    fetch(process.env.REACT_APP_API_URL+'/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        name: fullname,
        email: email,
        password: password
      })
    })
    .then((res) => {
      if (res.status === 401) {
        window.alert('Register failed !!!');
      } else {
        res.json().then((result) => {
          if (result.username) {
            setIsEmailNotRegistered(false)
            setIsRegistered(true)
            window.alert('Your account was registered successfully !!!')
          } else {
            window.alert(`Register failed: ${result.errors[0]}`);
          }
        })
      }
    })
    .catch((error) => {
      console.log('Register failed error: ', error)
    })
  }

  const handleConfirmPassword = (event) => {
    const confirmPassword = event.target.value;
    if (password !== confirmPassword) {
      setPasswordNoti('Password not match !')
      setIsValid(false);
    }else{
      setPasswordNoti('Password is valid !')
      setIsValid(true);
    }
  }
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={(e)=>handleSubmit(e)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="full-name"
                name="fullname"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                onChange={(e)=>{setFullname(e.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                onChange={(e)=>{setUsername(e.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e)=>{setEmail(e.target.value)}}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                onChange={(e)=>{handleConfirmPassword(e)}}
                autoComplete="new-password"
                helperText={passwordNoti}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container> 
  );
}

export default RegisterForm;
