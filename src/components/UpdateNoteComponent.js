import { useContext, useState, useEffect } from 'react';
import NoteContext from '../contexts/notes/NoteContext';
import { useNavigate, useParams } from 'react-router-dom'
import AppConfig from '../commons/AppConfig.json'

export default function UpdateNoteComponent(props) {
    const navigate = useNavigate();
    const { noteID } = useParams();
    const { notes, editNote } = useContext(NoteContext);
    const [note, setNote] = useState(() => {
        return {
            _id: "",
            title: "",
            description: "",
            tag: ""
        }
    });

    useEffect(() => {
        let noteToBeUpdated = notes.filter(note => {
            return note._id === noteID
        });

        if (noteToBeUpdated.length > 0)
            noteToBeUpdated = noteToBeUpdated[0];
        else
            noteToBeUpdated = note;

        setNote({
            _id: noteToBeUpdated._id,
            title: noteToBeUpdated.title,
            description: noteToBeUpdated.description,
            tag: noteToBeUpdated.tag
        });
        // eslint-disable-next-line
    }, []);

    const handleOnChange = (event) => {
        setNote(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleOnUpdateNote = () => {
        editNote(note).then(() => {
            navigate(AppConfig.homeRoute);
        }).catch(reason => {
            props.alert(reason.messageType, AppConfig.errorMessage);
        });
    }

    return (
        <div className="container" style={{ marginBottom: "3rem" }}>
            <h2 style={{ marginBottom: "2rem" }}>Update note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"
                        value={note.title} onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="5" cols="100"
                        value={note.description} onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag"
                        value={note.tag} onChange={handleOnChange} />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="button"
                    className="btn btn-success" onClick={handleOnUpdateNote}>Update</button>
            </form>
        </div>
    )
}
