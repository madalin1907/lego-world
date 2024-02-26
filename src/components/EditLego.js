import React from 'react';
import Navbar from './Navbar';
import EditLegoDetails from "./EditLegoDetails";

export default function EditLego(){
    return (
        <div className="full-width-container">
            <Navbar />
            <EditLegoDetails />
        </div>
    );
}