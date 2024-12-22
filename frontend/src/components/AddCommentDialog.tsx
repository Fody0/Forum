import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import { Note } from "../models/note";
// import { NoteInput } from "../network/notes_api";
// import * as NotesApi from "../network/notes_api";
import { Comment } from "../models/comment";
import { CommentInput } from "../network/comments_api";
import * as CommentsApi from "../network/comments_api";
import TextInputField from "./form/TextInputField";
import {Note} from "../models/note";

interface AddCommentDialogProps {
    noteToCommentId?: string,
    onDismiss: () => void,
    onCommentSaved: (comment: Comment) => void,
}

const AddCommentDialog = ({ noteToCommentId, onDismiss, onCommentSaved }: AddCommentDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CommentInput>({
        defaultValues: {
            username: "",
            text: "",
        }
    });

    async function onSubmit(input: CommentInput) {
        try {
            let commentResponse: Comment;
            try{
                if(noteToCommentId === undefined){
                    throw new Error("Note have no ID");
                }
                input.noteId = noteToCommentId;
            }catch(error){
                console.log(error);
            }
            commentResponse = await CommentsApi.createComment(input);
            // if (noteToEdit) {
            //     noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            // } else {
            //     noteResponse = await NotesApi.createNote(input);
            // }
            onCommentSaved(commentResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {"Add comment"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditNoteForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddCommentDialog;