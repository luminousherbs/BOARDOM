import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 26273; // B O A R D

const http = {
    success: 200,
    created: 201,
};

app.use(express.json()); // parse json
app.use(express.urlencoded({ extended: true })); // parse html forms
app.use(express.static(path.join(__dirname, "/app/"))); // serve from app

app.get("/api/status", async (req, res) => {
    res.send(http.success);
});

app.get("/api/get-posts", async (req, res) => {
    const postFile = await fs.readFile("data/posts.json", "utf8");
    const posts = JSON.parse(postFile);
    res.send(posts);
});

app.post("/api/create-post", async (req, res) => {
    const postFile = await fs.readFile("data/posts.json", "utf8");
    const posts = JSON.parse(postFile);
    posts.unshift({ title: req.body.title, body: req.body.body });
    fs.writeFile("data/posts.json", JSON.stringify(posts));
    // res.send(http.created);
    res.send({ ok: true });
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
