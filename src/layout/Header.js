import { Link, NavLink } from 'react-router-dom'
import './Layout.css'
import { useDispatch, useSelector } from 'react-redux';
import { handleGoogleAuth, handleSignOut } from './../store/authSlice';

const Header = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.authState.isAuth);

    const handleGoogle = async (e) => {

        if (!isAuth) {
            dispatch(handleGoogleAuth());
        } else {
            dispatch(handleSignOut());
        }

    }

    return (
        <header>
            <div className="logo">
                <Link to="/"><img src='/assets/logo.png' alt="Logo" /></Link>
                <span>WriteNode</span>
            </div>
            <nav className="nav">
                <NavLink to="/" className="link">Home</NavLink>
                { isAuth ?
                    <NavLink to="/create" className="link">Create</NavLink>
                    :
                    null
                }
                <button className="auth" onClick={handleGoogle}>
                    <i className={isAuth ? 'bi bi-box-arrow-right' : 'bi bi-google'}></i>{isAuth ? 'Logout' : 'Login'}
                </button>
            </nav>
        </header>
    )
}

export default Header