import { Container } from "react-bootstrap";
import MainPageView from "../components/MainPageView";
import styles from "../styles/NotesPage.module.css";

const MainPage = () => {
    return (
        <Container className={styles.notesPage}>
            <>
                <MainPageView />
            </>
        </Container>
    );
}

export default MainPage;