import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TokenContext from '../Context/TokenContext';

function Header({ isLoggedIn,setLoggedIn }) {
 const {token,setToken} = useContext(TokenContext)

    const handleLogout = () => {
        axios.get('https://blocking.somee.com/api/Auth/logout',{params:{token:token}})
          .then((response) => {
              setToken("")
          })
          .catch((error) => console.log(error));
          setLoggedIn(false);
      };
      
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" >
          User Management
        </Link>
        <ul className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" onClick={handleLogout} to="/login">
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
