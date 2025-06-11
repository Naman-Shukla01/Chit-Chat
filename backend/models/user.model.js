import mongoose, { Schema } from "mongoose";
import Group from "./group.model.js";

const userSchema = new Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        reuired: true,
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: "Group"
    }]
});

const User = mongoose.model("User", userSchema);

export default User;