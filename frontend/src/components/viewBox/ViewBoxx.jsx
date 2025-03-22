import React from 'react';
import './ViewBox.css'
import { useNavigate } from 'react-router-dom';
import { MarkAttendance } from '../../Actions/handlers/teacherHandler';
import { useLoader } from '../../utils/context/LoaderContext';

function ViewBox({user}) {
    const role = localStorage.getItem("role");
    const {showLoader, hideLoader} = useLoader();
    let url = ""
    if(role == 'admin'){
      url += "/admin"
    }else if(role == 'teacher'){
        url += "/teacher"
    }

    const navigate = useNavigate();
    
    const handleClick = (id) => {
        
            if(user?.role == 'teacher'){
                navigate(`${url}/teacher/profile/${id}`)
            }else if(user?.role == 'student'){
                navigate(`${url}/student/profile/${id}`);
            }
            
        

    }
    const handleAttndce = async(present) => {
        
        const studentId = user?._id;
        console.log(studentId);
        showLoader();

     try{
        const res = await MarkAttendance({studentId, present});
     }catch(err){
        console.log(err.message)
     }
     hideLoader();
    }
    
    return (
        <div className='viewBox-container'>
            {console.log(user.name)}
            <div className='viewBox-profile'><img src={user?.gender === 'male'? "/maleStud.png": "/femaleStud.png"} alt="" /></div>
            <div className='viewBox-name text-transform'>{user?.name}</div>
            <div className='viewBox-button-container'>
                <button className='view-button' onClick={()=> handleClick(user?._id)}>View</button>
                {user.role === 'student' && (
                <div>
  <button className='present-button' onClick={()=>{handleAttndce(true)}} style={{marginRight:'5px'}}>Present</button>
  <button className='absent-button' onClick={()=>{handleAttndce(false)}}>Absent</button>
  </div>
)}

            </div>
            
        </div>
    );
}

export default ViewBox;