import Conversation from "../models/convertation.js";
import Message from "../models/message";

export const createChatController = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const convertation = await Conversation.create({userId});

        return res.status(201).json({
            message : "Conversation created successfully",
            data : convertation
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
// update convertaion title.
export const updateConversationTitle = async (req, res) => {
    try {
        const {conversationId, title} = req.body;

        const conversation = await Conversation.findByIdAndUpdate(conversationId, {title}, {new: true});

        return res.status(200).json({
            message : "Conversation title updated successfully",
            data : conversation
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : error.message
        })
    }
}

export const getConversations = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        const convertation = await Conversation.find({userId})
        .sort({createdAt : -1})
        
        return res.status(200).json({
            message : "Conversation fetched successfully",
            data : convertation
        })
        

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

// Message Controllers...
export const createMessage = async () => {
    try {
        const {conversationId, role, content} = req.body;
        // const userId = req.headers["x-user-id"];

        const message = await Message.create({
            conversationId,
            role,
            content
        })

        return res.status(201).json({
            message: "Message created successfully",
            data: message
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}


export const getMessages = async (req, res) => {
    try {
        const {conversationId} = req.params.conversationId;

        const messages = await Message.find({
            conversationId
        }).sort({createdAt: 1});

        return res.status(200).json({
            message : "Messages fetched successfully",
            data : messages
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : error.message
        })
    }
}