import React,{useState, useEffect} from 'react';
import '../ViewStudent/ViewStudent.css';
import ViewBoxx from '../../../components/viewBox/ViewBoxx';
import { useParams } from 'react-router-dom';
import { ViewOwnStudents } from '../../../Actions/handlers/teacherHandler';
import { useLoader } from '../../../utils/context/LoaderContext';


function View() {
    const { id } = useParams();
    console.log(id);
    const [students, setStudents] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    useEffect(() => {
        
        const fetchStudents = async ()=>{
            
            const result = await ViewOwnStudents(id);
            if(result){
                console.log("students", result);
                setStudents([...result]);
            }
           
        }
        
        fetchStudents();
        
    },[id])
    const today = new Date();
const day = today.getDate();
const month = today.toLocaleString('en-US', { month: 'long' }); // Get full month name
const year = today.getFullYear();

const formattedDate = `${day} ${month} ${year}`;
   return (
    students.length > 0 ? (
        <div className="-view-students-container">
            <h2 align="center" style={{ color: 'black', padding: '10px' }}>
                {formattedDate}
            </h2>

            {students.map((student, index) => (
                <ViewBoxx key={index} user={student} />
            ))}
        </div>
    ) : (
        <div className="no-students-container">
            <h3 style={{ textAlign: 'center', color: 'gray' }}>
                No students found
            </h3>
        </div>
    )
);

}

export default View;