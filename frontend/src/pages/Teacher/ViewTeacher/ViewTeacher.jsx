import React, { useEffect, useState } from 'react';
import './ViewTeacher.css'; // Importing the CSS file for styling
import ViewBox from '../../../components/viewBox/ViewBox';
import { ViewAllTeachers } from '../../../Actions/handlers/adminHandler';
import { useLoader } from '../../../utils/context/LoaderContext';

function ViewTeacher(props) {
    // const {id} = useParams();
    const [teacher, setTeacher] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    useEffect(() => {
        const fetchTeacher = async ()=>{
            showLoader();
            const result = await ViewAllTeachers();
            if(result){
                console.log(result);
                setTeacher(result);
            }
            hideLoader();
        }

        fetchTeacher();
    },[])
    return (
       <div className='view-students-container'>
        <h2>Teachers</h2>
        {teacher.map((teacher, index) => (
            <ViewBox key={index} user={teacher}/>
        ))}


       </div>
    );
}

export default ViewTeacher;
