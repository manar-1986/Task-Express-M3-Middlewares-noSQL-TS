import { Request, Response } from "express";
import Tag from "../../models/Tags";

export const getAllTags = async (req: Request, res: Response) => {
    try {
        const tags = Tag.find()
        res.status(200).json(tags)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const createTag = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const tag = Tag.create(name)
        res.status(200).json(tag)
    } catch (error) {
        res.status(500).json(error)

    }
}