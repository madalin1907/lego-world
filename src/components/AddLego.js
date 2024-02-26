import React from 'react';
import Navbar from './Navbar';
import AddLegoDetails from './AddLegoDetails';

export default function AddLego(){
    return (
        <div className="full-width-container">
            <Navbar />
            <AddLegoDetails />
        </div>
    );
}