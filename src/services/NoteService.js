export const getNotes = function () {
    return fetch(`${process.env.REACT_APP_SERVICE_HOST}/api/v1/notes/fetchallnotes`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("authToken")
            }
        });
};

export const saveNote = function (title, description, tag) {
    return fetch(`${process.env.REACT_APP_SERVICE_HOST}/api/v1/notes/savenote`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("authToken")
            },
            body: JSON.stringify({ title, description, tag })
        });
};

export const updateNote = function (noteID, title, description, tag) {
    return fetch(`${process.env.REACT_APP_SERVICE_HOST}/api/v1/notes/updatenote/${noteID}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("authToken")
            },
            body: JSON.stringify({ title, description, tag })
        });
};

export const removeNote = function (noteID) {
    return fetch(`${process.env.REACT_APP_SERVICE_HOST}/api/v1/notes/deletenote/${noteID}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("authToken")
            }
        });
};