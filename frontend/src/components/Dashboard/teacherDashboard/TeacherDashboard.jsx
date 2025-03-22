import React from 'react';
import './TeacherDashboard.css';
import { NavLink } from 'react-router-dom';

function TeacherDashboard(props) {
    let id = localStorage.getItem('id')
    return (
        <div className='teacher-dashboard-main-container'>
           <div className='flex-col'>
           <span>~WELCOME TEACHER~</span>
           <span><NavLink to={`/teacher/class/view-all/${id}`}>Click here to view classes</NavLink></span>

           </div>
            
            
          
        </div>
    );
}

export default TeacherDashboard;