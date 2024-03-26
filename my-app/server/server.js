import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/recipes/:query', async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        const response = await axios.get(
            `https://api.edamam.com/search?q=${query}&app_id=${process.env.App_ID}&app_key=${process.env.App_KEY}`
        );

        console.log(response.data.hits);
        res.json(response.data.hits);
    } catch (error) {
        console.error("Error fetching recipes:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
