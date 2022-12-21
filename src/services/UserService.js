export const login = function (email, password) {
    return fetch(`${process.env.REACT_APP_SERVICE_HOST}/api/v1/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
};
export const addUser = function (name, email, password) {
    return fetch(`${process.env.REACT_APP_SERVICE_HOST}/api/v1/auth/createuser`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
};