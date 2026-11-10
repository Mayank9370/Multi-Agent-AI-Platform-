import express from "express";
import dotenv from "dotenv"
dotenv.config();

const app = express();

// .env 
const PORT = process.env.PORT || 8003

app.use(express.json());

app.get("/", (req,res) => {
    return res.status(200).json({
        message: "Agent server is running",
    })
})

app.listen(PORT, () => {
    console.log(`Agent server running on port ${PORT}`)
})