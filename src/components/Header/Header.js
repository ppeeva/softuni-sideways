import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (

        <header>
            <h1><Link to="/">Sideways</Link></h1>
            <nav>
                <Link to="/catalog">Sideways</Link>
                {isAuthenticated && (
                    <>
                        <span>{userEmail}</span>
                        {/* <Link to="/profile/favs">My Favourites</Link>
                        <Link to="/profile/visited">My Visited</Link>
                        <Link to="/profile/planned">My Planned</Link> 
                        <Link to="/profile">Profile</Link>*/}
                        <Link to="/catalog/create">Create</Link>
                        <Link to="/logout">Logout</Link>
                    </>
                )}

                {!isAuthenticated && (
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};