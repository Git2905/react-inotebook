import { login } from '../services/UserService'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AppConfig from '../commons/AppConfig.json'

export default function Login(props) {
    const navigate = useNavigate();

    const [creds, setCreds] = useState(() => {
        return {
            email: "",
            password: ""
        }
    });

    const handleOnChange = (event) => {
        setCreds(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();

        login(creds.email, creds.password).then(response => {
            response.json().then(data => {
                if (data.messageType === "S") {
                    localStorage.setItem("authToken", data.message);
                    navigate(AppConfig.homeRoute);
                }
                else {
                    console.log(data.message);
                    setCreds(prev => {
                        return {
                            ...prev,
                            password: ""
                        }
                    });
                    props.alert(data.messageType, AppConfig.errorMessage);
                }
            }).catch(reason => {
                console.log(reason);
                setCreds(prev => {
                    return {
                        ...prev,
                        password: ""
                    }
                });
                props.alert(reason.messageType, AppConfig.errorMessage);
            })
        }).catch(reason => {
            console.log(reason);
            setCreds(prev => {
                return {
                    ...prev,
                    password: ""
                }
            });
            props.alert(reason.messageType, AppConfig.errorMessage);
        });
    }

    return (
        <div style={{ marginBottom: "3rem" }}>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"
                        value={creds.email} onChange={handleOnChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"
                        value={creds.password} onChange={handleOnChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div >
    )
}
