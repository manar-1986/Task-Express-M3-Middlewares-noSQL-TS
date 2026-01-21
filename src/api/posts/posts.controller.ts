import { Request, Response } from "express";
import Post from "../../models/Post";
import Author from "../../models/Author";

// Extend Request type to include file from multer
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
};

export const createPost = async (req: MulterRequest, res: Response) => {
    try {
        const { title, body, authorId } = req.body;

        // Handle image upload if file was provided
        if (req.file) {
            req.body.image = req.file.path;  // Save the file path
        }

        // Check if author exists
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }

        // Create the post with all fields including image
        const post = await Post.create({ 
            title, 
            body, 
            author: authorId,
            image: req.body.image  // Will be undefined if no file uploaded
        });

        // Add post to author's posts array
        await Author.findByIdAndUpdate(
            authorId,
            { $push: { posts: post._id } },
            { new: true }
        );

        res.status(201).json(post);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const foundPost = await Post.findById(id);
        if (!foundPost) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        await foundPost.updateOne(req.body);
        res.json({ message: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find()
            .populate("author")
            .populate("tags");

        res.status(200).json(posts);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};