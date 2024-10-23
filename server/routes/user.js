import { Router } from "express";
import { handleUserSignup, handleUserLogin } from "../controllers/userController.js"; 

const router = Router();
router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);


export default router;

