import NoteContext from './NoteContext';
import { useState } from 'react';
import { getNotes, removeNote, saveNote, updateNote } from '../../services/NoteService';

const NoteState = (props) => {
    let notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    const getAllNotes = () => {
        let promise = new Promise((resolve, reject) => {
            getNotes().then(response => {
                response.json().then(data => {
                    if (data.messageType === "S") {
                        resolve({
                            messageType: "S",
                            message: data.message
                        });
                    }
                    else {
                        console.log(data.message);
                        reject({
                            messageType: "E",
                            message: data.message
                        });
                    }
                }).catch(reason => {
                    console.log(reason);
                    reject({
                        messageType: "E",
                        message: reason
                    });
                })
            }).catch(reason => {
                console.log(reason);
                reject({
                    messageType: "E",
                    message: reason
                });
            });
        });

        return promise;
    }

    const addNote = ({ title, description, tag }) => {
        let promise = new Promise((resolve, reject) => {
            saveNote(title, description, tag).then(response => {
                response.json().then(data => {
                    if (data.messageType === "S") {
                        resolve({
                            messageType: "S",
                            message: data.message
                        });
                    }
                    else {
                        console.log(data.message);
                        reject({
                            messageType: "E",
                            message: data.message
                        });
                    }
                }).catch(reason => {
                    console.log(reason);
                    reject({
                        messageType: "E",
                        message: reason
                    });
                })
            }).catch(reason => {
                console.log(reason);
                reject({
                    messageType: "E",
                    message: reason
                });
            })
        });

        return promise;
    }

    const editNote = ({ _id, title, description, tag }) => {
        let promise = new Promise((resolve, reject) => {
            updateNote(_id, title, description, tag).then(response => {
                response.json().then(data => {
                    if (data.messageType === "S") {
                        resolve({
                            messageType: "S",
                            message: data.message
                        });
                    }
                    else {
                        console.log(data.message);
                        reject({
                            messageType: "E",
                            message: data.message
                        });
                    }
                }).catch(reason => {
                    console.log(reason);
                    reject({
                        messageType: "E",
                        message: reason
                    });
                })
            }).catch(reason => {
                console.log(reason);
                reject({
                    messageType: "E",
                    message: reason
                });
            })
        });

        return promise;
    }

    const deleteNote = (noteID) => {
        let promise = new Promise((resolve, reject) => {
            removeNote(noteID).then(response => {
                response.json().then(data => {
                    if (data.messageType === "S") {
                        let currentNotes = notes.filter(note => {
                            return note._id !== noteID
                        });

                        resolve({
                            messageType: "S",
                            message: currentNotes
                        });
                    }
                    else {
                        console.log(data.message);
                        reject({
                            messageType: "E",
                            message: data.message
                        });
                    }
                }).catch(reason => {
                    console.log(reason);
                    reject({
                        messageType: "E",
                        message: reason
                    });
                })
            }).catch(reason => {
                console.log(reason);
                reject({
                    messageType: "E",
                    message: reason
                });
            })
        });

        return promise;
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, getAllNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState