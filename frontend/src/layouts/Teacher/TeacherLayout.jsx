import React from 'react';
import { Outlet } from 'react-router-dom';
import '../layout.css'
import Navbar from '../../components/Navbar/Navbar';
import NavTeacher from '../../components/Navbar/NavTeacher';


function TeacherLayout() {
    return (
        <div className='layout-main-container'>
            <NavTeacher className="navbar"/>
            <div className="content">
               <Outlet/>
            </div>
            
        </div>
    );
}

export default TeacherLayout;