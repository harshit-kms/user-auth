import { getUser } from "../util/auth.js";

export async function restrictToLoggedInUserOnly(req, res, next){
    const userUID = req.cookies?.uid;
    if(!userUID) return res.redirect('/login');
    const user = getUser(userUID);

    if(!user) return res.redirect('/login');
    req.user = user;
    next();
}