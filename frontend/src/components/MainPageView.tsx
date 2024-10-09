import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from '../models/note';
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditNoteDialog from "./AddEditNoteDialog";
import Note from './Note';
import NotesPageLoggedInView from "./NotesPageLoggedInView";
import MainPageNote from "./MainPageNotes";
import {useNavigate} from "react-router-dom";

const MainPageView = () => {

    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

    const navigate = useNavigate();
    const handleOnClick = (noteId: string, title: string, text: string) => navigate(`/note`, {
        state: { title:title, text:text },
    });
    useEffect(() => {
        async function loadNotes() {
            try {
                setShowNotesLoadingError(false);
                setNotesLoading(true);
                const notes = await NotesApi.fetchAllNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                setShowNotesLoadingError(true);
            } finally {
                setNotesLoading(false);
            }
        }
        loadNotes();
    }, []);


    const notesGrid =
        <Row xs={1} className={`g-4 ${styles.notesGrid}`}>
            {notes.map(note => (
                <Col key={note._id}>
                    <MainPageNote
                        note={note}
                        onNoteClicked={() => {handleOnClick(note._id, note.title, note.text ? note.text : "")}}
                        className={styles.note}
                    />
                </Col>
            )).reverse()}
        </Row>


    return (
        <>
            {notesLoading && <Spinner animation='border' variant='primary' />}
            {showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!notesLoading && !showNotesLoadingError &&
                <>
                    {notes.length > 0
                        ? notesGrid
                        : <p>You don't have any articles yet</p>
                    }
                </>
            }
        </>
    );
}

export default MainPageView;
