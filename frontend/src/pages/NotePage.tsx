import {Col, Container, Row} from "react-bootstrap";
import styles from "../styles/NotesPage.module.css";
import MainPageView from "../components/MainPageView";
import NotePageView from "../components/NotePageView";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import { Note as NoteModel } from "../models/note";
import {User} from "../models/user";
import Comments from "../components/Comments";
import CommentsView from "../components/CommentsView";


// ({ loggedInUser }: NotesPageProps) => {
//     return (
//         <Container className={styles.notesPage}>
//             <>
//                 {loggedInUser
//                     ? <NotesPageLoggedInView />
//                     : <NotesPageLoggedOutView />
//                 }
//             </>
//         </Container>
//     );
// }

// interface NotePageProps {
//     title: string | null,
//     text: string | null,
// }


const NotePage = () => {
    return (
        <><NotePageView/></>
    );
}

export default NotePage;