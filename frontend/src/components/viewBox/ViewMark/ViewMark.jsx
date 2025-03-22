import React, { useEffect, useState } from 'react';
import { ViewStudentPro } from '../../../Actions/handlers/adminHandler';

function ViewMark({studentId, onMarksUpdate, onSubCount}) {
    console.log("VIEW MARK",studentId)
    const [exam, setExam] = useState('');
    const [mark, setMark] = useState([])

    useEffect(() => {
   const fetchExamDetails = async() => {
    const res = await ViewStudentPro(studentId);
    console.log("count", res)
    if(res){
        setExam(res.latestExams[0].exam);
        
        setMark(res.latestExams[0].marks)
        onMarksUpdate(res.latestExams);
        onSubCount(res.student?.class?.subjectDistribution?.length)
    }else{
        console.log("error")
    }
   }
   fetchExamDetails();
    },[studentId])

    return (
        <div className='student-profile-academics'>
        <h3>Academic Marks</h3>
        <h4>{exam.name}</h4>
            <ul>
            {mark.map((mark, index) => (
                    <li key={index} className="subject-mark">
                        <span className="subject">{mark.subject.name}</span>
                        <div>
                        <span className="score" style={{marginRight:'10px'}}>{mark.score}</span>
                        <span className="grade">{mark.grade}</span>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewMark;