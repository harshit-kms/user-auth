import React, { useState, useEffect } from "react";
import { Avatar, TextField, Button, Typography, Paper } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
//post request to check the user
  const postLogin = async(event) => {
    event.preventDefault();
    try{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/user/login`, {
            email:email,
            password:password,
        },
        {
            withCredentials: true, 
        }
    );
    login(res.data.token);
        setEmail("");
        setPassword("");
        alert("Log-in successful");
        if(res) navigate("/home");
        
    }
    catch(err){
      if(err.response && err.response.status === 401){
        alert("Incorrect credentials")
      }
      else{
        alert("Error loggin-in. Please try again.");
      }
      setEmail("");
      setPassword("");

    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} onSubmit={postLogin}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoFocus
            value={email}
            onChange={(event) => {
                setEmail(event.target.value);
              }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => {
                setPassword(event.target.value);
              }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log in
          </Button>
          <p>Don't have an account? <Link to="/signup" style={{ color: "purple", textDecoration: "none" }}>Sign-in</Link>
          </p>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
