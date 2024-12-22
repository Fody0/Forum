import {Comment as CommentModel} from "../models/comment";
import {Card} from "react-bootstrap";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";

interface CommentProps {
    comment: CommentModel,
    className?: string,
}

const Comment = ({ comment, className }: CommentProps) => {
    const {
        text,
        username,
    } = comment;

    return (
        <Card
            className={`${styles.commentCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {username}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Comment;