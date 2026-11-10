import express from "express";
import { createChatController, getConversations, createMessage, getMessages } from "../controllers/chat.controller.js";
const router = express.Router();

router.post("/create", createChatController);
router.post("/update-title", updateConversationTitle);
router.post("/get-conversations", getConversations);
router.post("/create-message", createMessage);
router.get("/get-messages/:conversationId", getMessages);

export default router;