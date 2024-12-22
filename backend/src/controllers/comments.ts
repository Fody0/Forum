import {RequestHandler} from "express";
import CommentModel from "../models/comments";
import {assertIsDefined} from "../util/assertIsDefined";
import createHttpError from "http-errors";
import UserModel from "../models/user";

export const getAllComments: RequestHandler = async (req, res, next) => {
    try {
        const noteId = req.params.noteId;
        const comments = await CommentModel.find({noteId: noteId}).exec();
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody {
    noteId: string;
    username?: string,
    text?: string,
}

export const createComment: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    // const username = req.body.username;
    const noteId = req.body.noteId;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        // if (!username) {
        //     throw createHttpError(400, "Note must have a title");
        // }
        const user = await UserModel.findById(authenticatedUserId).exec();

        if(!user){
            throw createHttpError(400, "User not found");
        }

        const newComment = await CommentModel.create({
            noteId: noteId,
            text: text,
            username: user.username
        });

        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};