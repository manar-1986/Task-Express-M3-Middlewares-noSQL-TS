import express from "express";
import path from "path";
import connectDB from "./database";
import postsRoutes from "./api/posts/posts.routes";
import authorsRoutes from "./api/posts/authors.routes";


const app = express();
const PORT = 8000;

app.use(express.json());

// Serve static files from media folder
app.use("/media", express.static(path.join(__dirname, "../media")));

app.use("/posts", postsRoutes);
app.use("/authors", authorsRoutes);


connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});