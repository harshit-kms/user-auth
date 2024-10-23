import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.SECRET;

//assigning token to user
export function setUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
    };
    return jwt.sign(payload, secret)  
}

//getting user through token
export function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secret);
    } catch(err){
        return null;
    }
}

