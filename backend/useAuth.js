import { configDotenv } from "dotenv";
import User from "./models/user.model";

configDotenv()

export default useAuth = (req, res ,next) => {
    let token = localStorage.getItem("token");
    if(!token) return {isAuthenticated : false}
    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        let user = User.findById(decoded.id);
        res.json({userId: user._id, username: user.username, groups: user.groups})
    } catch (err) {
        res.status(403);
    } 
}