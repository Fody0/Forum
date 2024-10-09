import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import {Card, Col, Container, Row} from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    className?: string,
}

const MainPageNote = ({ note, onNoteClicked, className }: NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt,
        username
    } = note;

    let createdUpdatedText: string;
    let cur_username:string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    if(username) cur_username ="Created by " + username;
    else cur_username = "";

    return (
        <Card
            className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)} >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Container>
                    <Row>
                        <Col className="text-muted">
                            {createdUpdatedText}
                        </Col>
                        <Col className={styles.cardFooter}>
                            {cur_username}
                        </Col>
                    </Row>
                </Container>
            </Card.Footer>
        </Card>
    )
}

export default MainPageNote;