import React from 'react';
import './ViewBox.css'
import { useNavigate } from 'react-router-dom';
import { MarkAttendance } from '../../Actions/handlers/teacherHandler';
function ViewBox({user}) {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    let url = ""
    if(role == 'admin'){
      url += "/admin"
    }else if(role == 'teacher'){
        url += "/teacher"
    }
    
    const handleClick = (id) => {
        
            if(user?.role == 'teacher'){
                navigate(`${url}/teacher/profile/${id}`)
            }else if(user?.role == 'student'){
                navigate(`${url}/student/profile/${id}`);
            }
            
        

    }
    
    return (
        <div className='viewBox-container'>
            
            <div className='viewBox-profile'> {user.role == 'teacher'?<img src={user?.gender === 'male' ? "/maleTeacher.png" : "/femaleTeacher.png"} alt="Profile" />:<img src={user?.gender === 'male' ? "/maleStud.png" : "/femaleStud.png"} alt="Profile" />}</div>
            <div className='viewBox-name text-transform'>{user?.name}</div>
            <div className='viewBox-button-container'>
            <button className='view-button' onClick={()=> handleClick(user?._id)}>View</button>


            </div>
            
        </div>
    );
}

export default ViewBox;