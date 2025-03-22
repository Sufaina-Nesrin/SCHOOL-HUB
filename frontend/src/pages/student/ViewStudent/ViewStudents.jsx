import React, { useEffect, useState } from 'react';
import './ViewStudent.css'; // Importing the CSS file for styling
import ViewBox from '../../../components/viewBox/ViewBox';
import { useParams } from 'react-router-dom';
import { ViewAllStudentsByClass } from '../../../Actions/handlers/adminHandler';
import { useLoader } from '../../../utils/context/LoaderContext';

function ViewStudents(props) {
    const {id} = useParams();
    const [students, setStudents] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    useEffect(() => {
        const fetchStudents = async ()=>{
            showLoader();
            const result = await ViewAllStudentsByClass(id);
            if(result){
                console.log(result);
                setStudents(result);
            }
            hideLoader();
        }

        fetchStudents();
    },[])
    return (
       <div className='-view-students-container'>
        {students.length > 0 ?(<div>
            <h2>Students</h2>
        {students.map((student, index) => (
            <ViewBox key={index} user={student}/>
        ))}

</div>):<div>No students here</div>}
       </div>
    );
}

export default ViewStudents;
