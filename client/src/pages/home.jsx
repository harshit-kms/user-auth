import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 
import { useAuth } from '../contexts/AuthContext'; 
import{ Button } from '@material-ui/core';
import{ makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
const Home = () => {
    const [message, setMessage] = useState(""); 
    const navigate = useNavigate();
    const { logout } = useAuth();
    const classes = useStyles(); 



    useEffect(() => {
        fetchProtectedData();
    }, []);

    const fetchProtectedData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/home`, {
                withCredentials: true, 
            });

            if (response.data) {
                setMessage(`Protected data fetched: ${response.data}`);
            } else {
                setMessage("No protected data found.");
            }
        } catch (error) {
            navigate("/login");
            console.error("Error fetching protected data: ", error);
            setMessage("You are not authorized to access this route.");
        }
    };
    const handleLogout = () => {
        logout(); 
        navigate("/login"); 
    };

    return (
        <div>
            <h1>Home</h1>
            <p>{message}</p> 
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit} // Apply the same style
                onClick={handleLogout}
            >        
            Logout
            </Button>
            </div>
    );
}

export default Home;
