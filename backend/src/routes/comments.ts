import express from "express";
import * as CommentController from "../controllers/comments";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/allcomments/:noteId", CommentController.getAllComments);

router.post("/addcomment", CommentController.createComment);

export default router;