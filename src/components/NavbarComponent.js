import { Link, useNavigate } from 'react-router-dom';
import AppConfig from "../commons/AppConfig.json";

export default function NavbarComponent() {
    let navigate = useNavigate();
    const handleOnLogout = () => {
        localStorage.clear();
        navigate(AppConfig.login)
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{AppConfig.appTitle}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    {!localStorage.getItem("authToken")
                        ?
                        <form className="d-flex" role="search">
                            <Link to={AppConfig.login} className="btn btn-outline-primary mx-1" role="button">Login</Link>
                            <Link to={AppConfig.signUp} className="btn btn-outline-success mx-1" role="button">Signup</Link>
                        </form>
                        :
                        <button type='button' className='btn btn-outline-primary' onClick={handleOnLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}
