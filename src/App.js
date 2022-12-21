import './App.css';
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent"
import RouteComponent from './components/RouteComponent';
import NoteState from './contexts/notes/NoteState';
import AlertComponent from './components/AlertComponent'

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (messageType, message) => {
    setAlert({
      type: messageType,
      message: message
    });

    setTimeout(() => {
      setAlert(null);
    }, 5000)
  }

  return (
    <NoteState>
      <Router>
        <NavbarComponent />
        <AlertComponent alert={alert} />
        <div className='container'>
          <RouteComponent alert={showAlert} />
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
