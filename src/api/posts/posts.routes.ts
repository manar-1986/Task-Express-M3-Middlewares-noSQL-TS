import express from "express";
import { createPost, deletePost, getPosts, updatePost, getAllPosts } from "./posts.controller";
import { upload } from "../../middlewares/multer.middleware";  // Add this import

const router = express.Router();

router.get("/", getAllPosts);
// Create a new post with optional image upload
router.post("/", upload.single("image"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;