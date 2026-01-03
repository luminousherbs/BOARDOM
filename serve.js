import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 26273; // B O A R D

const http = {
    success: 200,
    created: 201,
};

async function saveBase64Image(base64Image, filePath) {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    return await fs.writeFile(filePath, buffer);
}

app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use(express.urlencoded({ extended: true })); // parse html forms
app.use(express.static(path.join(__dirname, "/app/"))); // serve from app
app.use("/api/images", express.static("data/images"));

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
    const postBody = req.body.body;
    postBody.forEach((field) => {
        switch (field.type) {
            case "text":
                break;

            case "image":
                const fileName = `data/images/${randomUUID()}`;
                saveBase64Image(field.content, fileName);
                field.content = fileName.replace("data", "/api");
                break;

            default:
                console.log(`Unrecognized field type "${field.type}"`);
                break;
        }
    });
    posts.unshift({ title: req.body.title, body: req.body.body });
    fs.writeFile("data/posts.json", JSON.stringify(posts));
    res.send({ ok: true });
});

app.post("/api/cease", async (req, res) => {
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
