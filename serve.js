import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 26273; // B O A R D

app.use(express.json()); // parse json
app.use(express.static(path.join(__dirname, "/app/"))); // serve from app

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
