import React from 'react';
import Navbar from './Navbar';
import ProfileDetails from './ProfileDetails';

export default function Profile(){
    return (
        <div className="full-width-container">
            <Navbar />
            <ProfileDetails />
        </div>
    );
}