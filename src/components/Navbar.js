import React from 'react';
import './Navbar.css';

export default function Navbar(){
    return (
        <div className="navbar">
            <div className="navbar-left">
                <p>Lego World</p>
            </div>
            <div className="navbar-right">
                <a className={window.location.pathname === "/" ? "nav-link active" : "nav-link"} href="/">Home</a>
                <a className={window.location.pathname === "/add-lego" ? "nav-link active" : "nav-link"} href="/add-lego">Add Lego</a>
                <a className={window.location.pathname === "/profile" ? "nav-link active" : "nav-link"} href="/profile">Profile</a>
            </div>
        </div>
    );
}