import express from "express";
import morgan from "morgan";
import path from "path";
import connectDB from "./database";
import postsRoutes from "./api/posts/posts.routes";
import authorsRoutes from "./api/author/authors.routes";
import tagRoutes from "./api/tags/tags.routes";
import { notFound } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
const PORT = 8000;

// Body parser middleware
app.use(express.json());

// Morgan logging middleware
app.use(morgan("dev"));

// Serve static files from media folder
app.use("/media", express.static(path.join(__dirname, "../media")));

app.use("/posts", postsRoutes);
app.use("/authors", authorsRoutes);
app.use("/tags", tagRoutes);

// 404 handler - must be after all routes
app.use(notFound);

// Error handler - must be last middleware (has 4 parameters)
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});