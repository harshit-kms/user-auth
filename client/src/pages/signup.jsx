import React, { useState } from "react";
import { Avatar, TextField, Button, Typography, Paper } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 

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

const Signup = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const postSignup = async(event) => {
    event.preventDefault();
    try{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/user/signup`, {
            name:name,
            email:email,
            password:password,
        });
        setName("");
        setEmail("");
        setPassword("");
        alert("Sign-up successful");
        navigate("/user");
        
    }
    catch(err){
        console.error("Error signing up: ", err);
        alert("Error signing up. Please try again.");
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={postSignup}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoFocus
            value={name}
            onChange={(event) => {
                setName(event.target.value);
              }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
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
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
