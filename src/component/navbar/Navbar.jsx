import React, {useState,useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import './navbar.css'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Tooltip from "@mui/material/Tooltip";


const Navbar = () => {
  const navigate= useNavigate();

    const [theme, SetTheme] = useState('dark-theme');

    const changeTheme = () => {
        if(theme === 'dark-theme'){
          SetTheme('light-theme')
        }
        else{
          SetTheme('dark-theme');
        }
      }

      useEffect(() => {
        document.body.className = theme;
      },[theme])

      const isLogin = localStorage.getItem('user');
      let title;
      let name;

      if(isLogin !== null){
        const data = JSON.parse(isLogin);
        title = data.title;
        name = data.name;
      }

      const logout = () => {
        localStorage.clear();
        navigate('/signin')
      }

  return (
    <main className="nav_main_container">
      <nav className="container nav-container">
        <div className="nav-logo">
          <NavLink to="/">
            <h2>BMS</h2>
          </NavLink>
        </div>
        <div className="nav-menu">
          
            {(theme == "dark-theme") ? 
            <Tooltip title="Light Theme">
                <DarkModeIcon
                onClick={changeTheme}
                className="Nav_icon"
                fontSize="small"
                />
             </Tooltip>
             : 
             <Tooltip title="Dark Theme">
                <Brightness7Icon 
                onClick={changeTheme}
                className="Nav_icon"
                fontSize="small"/>
                </Tooltip>}
                {isLogin ? (
                    <>
                    <NavLink onClick={logout} to='/signin'>Logout</NavLink>
                    <span className="userName">Welcome, {`${title}. ${name}`}</span>
                    </>
                  ) : (
                    <>
                    <NavLink to="/signup">SignUp</NavLink>
                    <NavLink to="/signin">Login</NavLink>
                    </>
                  )}
        </div>
      </nav>
    </main>
  );
}

export default Navbar;