import { useContext, useState } from "react";
import NoteContext from "../contexts/notes/NoteContext";
import AppConfig from "../commons/AppConfig.json";

export default function AddNoteComponent(props) {
    const { addNote, getAllNotes, setNotes } = useContext(NoteContext);
    const [note, setNote] = useState(() => {
        return {
            title: "",
            description: "",
            tag: ""
        }
    });

    const handleOnChange = (event) => {
        setNote(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleOnSaveNote = () => {
        addNote(note).then((result) => {
            setNote({
                title: "",
                description: "",
                tag: ""
            });

            props.alert(result.messageType, AppConfig.successMessage);

            getAllNotes().then(result => {
                setNotes(result.message);
            }).catch(reason => {
                props.alert(reason.messageType, AppConfig.errorMessage);
            });
        }).catch(reason => {
            props.alert(reason.messageType, AppConfig.errorMessage);
        });
    }

    return (
        <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ marginBottom: "2rem" }}>Add a note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"
                        value={note.title} onChange={handleOnChange} minLength="3" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="5" cols="100"
                        value={note.description} onChange={handleOnChange} minLength="5" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag"
                        value={note.tag} onChange={handleOnChange} />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="button"
                    className="btn btn-success" onClick={handleOnSaveNote}>Add Note</button>
            </form>
        </div>
    )
}
