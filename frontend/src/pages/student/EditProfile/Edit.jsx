import React, { useState } from 'react';
import './Edit.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { EditProfile } from '../../../Actions/handlers/studentHandler';
import { useLoader } from '../../../utils/context/LoaderContext';

function Edit(props) {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('id');
const [formData, setFormData] = useState({
    name: '',
    currPassword: '',
    newPassword: ''
});
const {showLoader, hideLoader} = useLoader();

const handleInput = (e) => {
    const {name, value} = e.target
    setFormData({
        ...formData,
        [name]: value
    })
}
    const handleSubmit = async (e)=> {
        e.preventDefault();
        
        console.log({studentId, ...formData})
        showLoader();
//The issue i have been facing that is forget to add the spread operator 
        const res = await EditProfile({studentId, ...formData});
        if(res) {
            console.log("Updated");
        }else{
            console.log("Something went wrong!")
        }
        hideLoader();
    }
    return (
        <div className='edit-profile-main-container'>
<div><img src="/womanSun.png" style={{height:'300px'}} alt="" /></div>
    <div className='edit-profile-inner-container'>
        <form action="">
            
        <h2 className='form-heading'>EDIT.</h2>
                      
                       
            <div style={{display:'flex',flexDirection:'column'}}>
            <label htmlFor="">Username</label>
            <input type="text" name='name' onChange={handleInput} value={formData.name} placeholder='Enter your username' />
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
            <label htmlFor="">Current Password</label>
            <input type="password" name='currPassword' onChange={handleInput} value={formData.currPassword}  placeholder='Enter your current password' />
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
            <label htmlFor="">New Password</label>
            <input type="password" name="newPassword" onChange={handleInput} value={formData.newPassword} placeholder='Enter your new password' />
            </div>
            
            <div className='edit-profile-button-div'>
                <button type='button' className='edit-btn' onClick={handleSubmit}>Edit</button>
                <button type='button' onClick={() => navigate(`/student/profile/${studentId}`)} className='cancel-btn'>Cancel</button>
            </div>
        </form>
    </div>

            
        </div>
    );
}

export default Edit;