import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 26273; // B O A R D

app.use(express.json()); // parse json
app.use(express.static(path.join(__dirname, "/app/"))); // serve from app

app.get("/api/status", async (req, res) => {
    res.send(200);
});

app.get("/api/get-posts", async (req, res) => {
    const postFile = await fs.readFile("data/posts.json", "utf8");
    const posts = JSON.parse(postFile);
    res.send(posts);
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
