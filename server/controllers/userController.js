import User from "../models/userModel.js";

export async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
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
