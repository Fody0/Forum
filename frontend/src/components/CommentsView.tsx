import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Comment as CommentModel } from '../models/comment';
// import * as NotesApi from "../network/notes_api";
import * as CommentsApi from "../network/comments_api";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";
// import AddEditNoteDialog from "./AddEditNoteDialog";
import Comment from './Comments';
import AddCommentDialog from "./AddCommentDialog";
import note from "./Note";
import { Note as NoteModel } from '../models/note';


const CommentsView = ({ noteId }: { noteId: string }) => {

    const [comments, setComments] = useState<CommentModel[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [showCommentsLoadingError, setShowCommentsLoadingError] = useState(false);

    const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
    // const [noteToEdit, setNoteToEdit] = useState<CommentModel | null>(null);

    useEffect(() => {
        async function loadComments() {
            try {
                setShowCommentsLoadingError(false);
                setCommentsLoading(true);
                const comments = await CommentsApi.fetchAllComments(noteId);
                setComments(comments);
            } catch (error) {
                console.error(error);
                setShowCommentsLoadingError(true);
            } finally {
                setCommentsLoading(false);
            }
        }
        loadComments();
    }, []);

    const commentsGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.commentsGrid}`}>
            {comments.map(comment => (
                <Col key={comment._id}>
                    <Comment
                        comment={comment}
                        className={styles.comment}
                        // onNoteClicked={setNoteToEdit}
                        // onDeleteNoteClicked={deleteNote}
                    />
                </Col>
            )).reverse()}
        </Row>


    const button =
        <Button onClick={() => {setShowAddCommentDialog(true)}}>
            Добавить комментарий
        </Button>
    return (
        <>
            {/*<Button*/}
            {/*    className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}*/}
            {/*    onClick={() => setShowAddNoteDialog(true)}>*/}
            {/*    <FaPlus />*/}
            {/*    Add new article*/}
            {/*</Button>*/}
            {commentsLoading && <Spinner animation='border' variant='primary' />}
            {showCommentsLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!commentsLoading && !showCommentsLoadingError &&
                <>
                    {comments.length > 0
                        ? commentsGrid
                        : <p>There is no comments yet</p>
                    }
                </>
            }
            {button}
            {showAddCommentDialog &&
                <AddCommentDialog
                    noteToCommentId={noteId}
                    onDismiss={() => setShowAddCommentDialog(false)}
                    onCommentSaved={(newComment) => {
                        setComments([...comments, newComment]);
                        setShowAddCommentDialog(false);
                    }}
                />
            }
            {/*{noteToEdit &&*/}
            {/*    <AddCommentDialog*/}
            {/*        noteToEdit={noteToEdit}*/}
            {/*        onDismiss={() => setNoteToEdit(null)}*/}
            {/*        onNoteSaved={(updatedNote) => {*/}
            {/*            setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));*/}
            {/*            setNoteToEdit(null);*/}
            {/*        }}*/}
            {/*    />*/}
            {/*}*/}
        </>
    );
}

export default CommentsView;