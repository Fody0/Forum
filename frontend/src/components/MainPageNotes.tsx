import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
    note: NoteModel,
    className?: string,
}

const MainPageNote = ({ note, className }: NoteProps) => {
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
                >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className="text-muted">
                    {createdUpdatedText}
                </div>
                <div className={styles.cardText}>
                    {cur_username}
                </div>
            </Card.Footer>
        </Card>
    )
}

export default MainPageNote;