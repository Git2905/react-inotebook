import { useContext, useEffect } from 'react';
import NoteContext from '../contexts/notes/NoteContext';
import NoteItemComponent from './NoteItemComponent';
import AppConfig from "../commons/AppConfig.json";
import { useNavigate } from "react-router-dom";

export default function NotesComponents(props) {
    const { notes, getAllNotes, setNotes } = useContext(NoteContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            navigate(AppConfig.login);
        }
        else {
            getAllNotes().then(result => {
                setNotes(result.message);
            }).catch(reason => {
                props.alert(reason.messageType, AppConfig.errorMessage);
            });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className='row my-5'>
            <h2 style={{ marginBottom: "2rem" }}>Your notes</h2>
            {
                notes.length === 0
                    ?
                    <div className='container'>
                        No notes are available for display.
                    </div>
                    :
                    notes.map(note => {
                        return <NoteItemComponent key={note._id} note={note} alert={props.alert} />
                    })
            }
        </div>
    )
}
