import express from "express";
import { createAuthor, getAllAuthors } from "./authors.controllers";

const router = express.Router();

router.get("/", getAllAuthors);
router.post("/", createAuthor);

export default router;
