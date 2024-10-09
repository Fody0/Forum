import {useState} from "react";
import {useLocation} from "react-router-dom";
import {Card} from "react-bootstrap";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";

const NotePageView = () => {


    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
    //
    // useEffect(() => {
    //     async function loadNote(note_id: string) {
    //         try {
    //             setShowNotesLoadingError(false);
    //             setNotesLoading(true);
    //             const note = await NotesApi.getNote(note_id);
    //             setNote(note);
    //         } catch (error) {
    //             console.error(error);
    //             setShowNotesLoadingError(true);
    //         } finally {
    //             setNotesLoading(false);
    //         }
    //     }
    //     loadNote();
    // }, []);

    const location = useLocation();

    const noteView =
        <Card
            className={`${styles.noteCard} ${styles.cardDisplay}`}>
            <Card.Body>
                <Card.Title className={styleUtils.flexCenter}>
                    {location.state.title}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {location.state.text}
                </Card.Text>
            </Card.Body>
        </Card>
        {/*<Container>*/}
        {/*    <Row>*/}
        {/*        <Col>*/}
        {/*            {location.state.title}*/}
        {/*        </Col>*/}
        {/*    </Row>*/}
        {/*    <Row>*/}
        {/*        <Col>*/}
        {/*            {location.state.text}*/}
        {/*        </Col>*/}
        {/*    </Row>*/}
        {/*</Container>*/}


        // <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
        //     {notes.map(note => (
        //         <Col key={note._id}>
        //             <Note
        //                 note={note}
        //                 className={styles.note}
        //                 onNoteClicked={setNoteToEdit}
        //                 onDeleteNoteClicked={deleteNote}
        //             />
        //         </Col>
        //     ))}
        // </Row>

    return (
        <>
            {showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}

            {noteView}
        </>
    );
}

export default NotePageView;



//