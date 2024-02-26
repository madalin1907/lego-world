import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import './Home.css';
export default function Home(){
    return (
       <div className="full-width-container">
            <Navbar />
            <Dashboard />
        </div>
    );
}