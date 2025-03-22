import React from 'react';
import { Outlet } from 'react-router-dom';
import '../layout.css'
import NavStudent from '../../components/Navbar/NavStudent';

function StudentLayout() {
    return (
        <div className='layout-main-container'>
            <NavStudent className="navbar"/>
            <div className="content">
               <Outlet/>
            </div>
            
        </div>
    );
}

export default StudentLayout;