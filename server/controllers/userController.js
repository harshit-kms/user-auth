import User from "../models/userModel.js";
import { setUser } from "../util/auth.js";
import bcrypt from 'bcrypt';


export async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            name,
            email,
            password,
        });

        await newUser.save(); 
        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

export async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    try { 
        const user = await User.findOne( { email });
        if(!user)
        {
            return res.status(401).json({ message: "Invalid email" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = setUser(user);
        res.cookie('uid', token); 
        return res.status(200).json({ message: "User found: ", user: user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

