import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate, useParams } from 'react-router-dom';
import { GetATeacher } from '../../../Actions/handlers/adminHandler';
import { useLoader } from '../../../utils/context/LoaderContext';

function Profile() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [subject, setSubject] = useState(null);
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();
    const userId = localStorage.getItem('id');

    useEffect(() => {
        const role = localStorage.getItem('role');

        const fetchTeacher = async () => {
            showLoader();
            try {
                if (role === 'admin' || userId === id) {
                    const teacherData = await GetATeacher(id);

                    if (teacherData) {
                        setTeacher(teacherData);
                        setSubject(teacherData.subject?.name || "N/A");
                    }
                }
            } catch (err) {
                console.error("Error fetching teacher:", err);
            }
            hideLoader();
        };

        fetchTeacher();
    }, [id]);

    const handleEdit = () => {
        navigate('/teacher/edit-profile');
    };

    let url = "";
    const role = localStorage.getItem("role");
    if (role === 'admin') {
        url = "/admin";
    } else if (role === "teacher") {
        url = "/teacher";
    }

    const handleView = (theClass) => {
        navigate(`${url}/class/view/${theClass._id}`, { state: { classData: theClass } });
    };

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <div className='teacher-profile-main-container'>
            <div className='teacher-profile-outer-container'>
                <div className='teacher-profile-container'>
                    <div className='teacher-profile-img-section-card'>
                        <img src={teacher.gender === 'male' ? '/maleTeacher.png' : '/femaleTeacher.png'} alt="" />
                        <div>
                            <span style={{ color: 'black' }} className='text-transform'>{teacher.name}</span>
                            {id === userId && <button onClick={handleEdit}>Edit</button>}
                        </div>
                    </div>
                    <div className='teacher-profile-personal-info'>
                        <h3 style={{ marginBottom: '10px' }}>Personal Info</h3>
                        <span className='text-transform'>Name: {teacher.name}</span>
                        <span>Qualification: {teacher.qualification}</span>
                        <span>Class: {teacher.class ? `${teacher.class.std}-${teacher.class.section}` : "N/A"}</span>
                        <span>Email: {teacher.email}</span>
                        <span>Phone: {teacher.phone}</span>
                        <span>Password: ******</span>
                        <span>Gender: {teacher.gender}</span>
                        <span>Subject: {subject}</span>
                    </div>
                    <div className='teacher-profile-classes'>
                        <h3>Classes Taken</h3>
                        <ul>
                            {teacher.classes?.map((classs, index) => (
                                <li key={index} className="teacher-profile-class-details">
                                    <span className="subject">{classs.std} - {classs.section}</span>
                                    <button className="view" onClick={() => handleView(classs)}>View</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
