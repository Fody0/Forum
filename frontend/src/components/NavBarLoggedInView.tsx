import { Button, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import {Link} from "react-router-dom";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}


const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await NotesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    // async function profilePage(){
    //     try{
    //
    //     }catch (e){
    //         console.error(e);
    //         alert(e);
    //     }
    // }

    return (
        <>

            <Nav.Link as={Link} to="/profile" className="me-2" >
                Signed in as: {user.username}
            </Nav.Link>
            <Button onClick={logout}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;