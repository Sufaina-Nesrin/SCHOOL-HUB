import React from 'react';
import { Outlet } from 'react-router-dom';
import '../layout.css'
import NavAdmin from '../../components/Navbar/NavAdmin';


function AdminLayout() {
    return (
        <div className='layout-main-container'>
            <NavAdmin className="navbar"/>
            <div className="content">
               <Outlet/>
            </div>
            
        </div>
    );
}

export default AdminLayout;