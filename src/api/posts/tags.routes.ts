import express from "express";
import { createTag, getAllTags } from "./tags.controller";

const router = express.Router();

router.get("/", getAllTags);
router.post("/", createTag);

export default router;
