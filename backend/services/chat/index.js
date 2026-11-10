import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
dotenv.config();

const app = express();

// .env 
const PORT = process.env.PORT || 8002

app.use(express.json());

app.get("/", (req,res) => {
    return res.status(200).json({
        message: "Chat server is running",
    })
})

app.use("/", chatRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Chat server running on port ${PORT}`)
})