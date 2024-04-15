import React, { useContext } from 'react';

import './NavLinks.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../context/auth-context';
import Button from '../FormElements/Button';

const NavLinks = props =>{
    const auth = useContext(AuthContext);
    return <ul className='nav-links'>
        <li>
            <NavLink to='/' exact>ALL USER</NavLink>
        </li>
        {auth.isLoggedIn && <li>
            <NavLink to='/u1/places' exact>MY PLACES</NavLink>
        </li>}
        {auth.isLoggedIn && <li>
            <NavLink to='/places/new' exact>ADD PLACES</NavLink>
        </li>}
        {!auth.isLoggedIn && <li>
            <NavLink to='/auth' exact>AUTHENTICATE</NavLink>
        </li>}
        {
            auth.isLoggedIn && <li>
            <Button onClick={auth.logOut}>LOGOUT</Button>
        </li>
        }
    </ul>
}
export default NavLinks