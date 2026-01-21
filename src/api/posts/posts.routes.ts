import express from "express";
import { createPost, deletePost, getPosts, updatePost, getAllPosts } from "./posts.controller";
import { upload } from "../../middlewares/multer.middleware";
import { validatePost, handleValidationErrors } from "../../middlewares/postValidation.middleware";

const router = express.Router();

router.get("/", getAllPosts);
// Create a new post with optional image upload
// Multer processes multipart/form-data first, then validation, then controller
router.post("/", upload.single("image"), validatePost, handleValidationErrors, createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;