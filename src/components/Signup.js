import { addUser } from '../services/UserService'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AppConfig from '../commons/AppConfig.json'

export default function Signup(props) {
  const navigate = useNavigate();

  const [userDtls, setUserDtls] = useState(() => {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const handleOnChange = (event) => {
    setUserDtls(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (userDtls.password === userDtls.confirmPassword) {
      addUser(userDtls.name, userDtls.email, userDtls.password).then(response => {
        response.json().then(data => {
          if (data.messageType === "S") {
            localStorage.setItem("authToken", data.message);
            navigate(AppConfig.homeRoute);
          }
          else {
            console.log(data.message);
            setUserDtls(prev => {
              return {
                ...prev,
                password: "",
                confirmPassword: ""
              }
            });
            props.alert(data.messageType, AppConfig.errorMessage);
          }
        }).catch(reason => {
          console.log(reason);
          setUserDtls(prev => {
            return {
              ...prev,
              password: "",
              confirmPassword: ""
            }
          });
          props.alert(reason.messageType, AppConfig.errorMessage);
        })
      }).catch(reason => {
        console.log(reason);
        setUserDtls(prev => {
          return {
            ...prev,
            password: "",
            confirmPassword: ""
          }
        });
        props.alert(reason.messageType, AppConfig.errorMessage);
      });
    }
  }

  return (
    <div style={{ marginBottom: "3rem" }}>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name"
            value={userDtls.name} onChange={handleOnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"
            value={userDtls.email} onChange={handleOnChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password"
            value={userDtls.password} onChange={handleOnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword"
            value={userDtls.confirmPassword} onChange={handleOnChange} />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div >
  )
}
