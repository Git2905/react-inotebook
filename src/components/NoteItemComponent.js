import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import NoteContext from "../contexts/notes/NoteContext";
import AppConfig from '../commons/AppConfig.json'

export default function NoteItemComponent(props) {
    const navigate = useNavigate();
    const { _id, title, description, tag, date } = props.note;
    const { deleteNote, setNotes } = useContext(NoteContext);

    const handleOnDeleteNote = () => {
        deleteNote(_id).then(result => {
            setNotes(result.message);
            props.alert(result.messageType, AppConfig.successMessage);
        }).catch(reason => {
            props.alert(reason.messageType, AppConfig.errorMessage);
        });;
    }

    const handleOnUpdateNote = () => {
        navigate(`${AppConfig.updateNoteRoute.replace(":noteID", _id)}`);
    }

    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div className="card-header">
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">{tag}</div>
                        <div>
                            <button type="button" className="btn btn-outline-warning btn-sm" onClick={handleOnUpdateNote} style={{ marginRight: "0.5rem" }}>Edit</button>
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleOnDeleteNote}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>

                </div>
                <div className="card-footer text-muted">
                    {
                        `Added on: ${(new Date(date)).toLocaleString()}`
                    }
                </div>
            </div>
        </div>
    )
}
