import React,{useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './AddMark.css';
import { ViewAllStudentsByClass, ViewSubject } from '../../../Actions/handlers/adminHandler';
import AddMarkCom from './AddMarkCom';
import { useLoader } from '../../../utils/context/LoaderContext';
import { GetMarksOfSingSub } from '../../../Actions/handlers/teacherHandler';

function AddMark(props) {
    const location = useLocation();
    const classData = location.state?.classData;
    const subjectData = location.state?.subjectData;
    const subject = location.state?.subject;
    const examData = location.state?.examData;
    const {showLoader, hideLoader} = useLoader();


    console.log("classData",classData);
    console.log("subjectData", subjectData);
    console.log("examData", examData)

    const [students, setStudents] = useState([]);;
    const [subjectName, setSubjectName] = useState(null);

    useEffect(() => {
        const fetchStudents = async ()=>{
            showLoader();
            const result = await ViewAllStudentsByClass(classData?._id);
        //     const sub = await ViewSubject(subjectData.subject);
        //    setSubjectName(sub)
            if(result){
                console.log(result);
                setStudents(result);
            }
            hideLoader();
        }

        fetchStudents();
    },[]);

    
    return (
    
<div className='add-exam-main-container' style={{backgroundColor:'#cadcec'}} >
    <div  className='flex-col'>
    <h2 >{examData.name}</h2>
<h3  >Class {classData.std}-{classData.section} ({subject})</h3>
<span>Enter mark out of {examData.mark}</span>
    </div>

            <div className="add-exam-inner-container">
                
                <table >
                    {students.map((student)=> (
                        <tr>
<AddMarkCom student={student} classData={classData} examData={examData} subjectId={subjectData.subject}/>
                        </tr>
                       
                    ))}
                 
                
                </table>
            </div>
            
        </div>
 
        
    );
}

export default AddMark;