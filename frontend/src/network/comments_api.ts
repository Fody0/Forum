import { Comment } from "../models/comment";
import {ConflictError, UnauthorizedError} from "../errors/http_errors";
// import {Note} from "../models/note";
// import {NoteInput} from "./notes_api";
// import {Note} from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}

export async function fetchAllComments(noteId: string): Promise<Comment[]>{
    const response = await fetchData("/api/comments/allcomments/" + noteId, { method: "GET" });
    return response.json();
}

export interface CommentInput {
    noteId: string,
    username: string,
    text?: string,
}

export async function createComment(comment: CommentInput): Promise<Comment> {
    const response = await fetchData("/api/comments/addcomment",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });
    return response.json();
}