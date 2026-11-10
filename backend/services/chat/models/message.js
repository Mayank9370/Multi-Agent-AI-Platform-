import mongoose from "mongoose";

const messageScham = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    },
    role : {
        type: String,
        enum: ["user", "agent"]
    },
    content: {
        type: String,
    }
},{timestamps: true})

const Message = mongoose.model("Message", messageScham);
export default Message;