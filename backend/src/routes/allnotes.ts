import * as NotesController from "../controllers/notes";
import express from "express";


const router = express.Router();


router.get("/", NotesController.getAllNotes);

export default router;