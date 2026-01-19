import Post from "../../models/Post";
import { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, body } = req.body;
        const post = await Post.create({ title, body });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const foundPost = await Post.findById(id);
        if (!foundPost) {
            res.status(404).json({ message: "Post not found" });
        } else {
            await foundPost.updateOne(req.body);
            res.json({ message: "Post updated successfully" });
        }
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