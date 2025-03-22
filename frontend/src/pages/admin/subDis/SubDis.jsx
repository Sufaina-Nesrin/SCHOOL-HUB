import React, { useEffect, useState } from 'react';
import './SubDis.css';
import { useLocation, useParams } from 'react-router-dom';
import Subject from '../../../components/Subject/Subject';
import { SubjectDistribute, ViewSubjectClass } from '../../../Actions/handlers/adminHandler';
import { useLoader } from '../../../utils/context/LoaderContext';

function SubDis(props) {
    const { id } = useParams();
    const [subjects, setSubjects] = useState([]);
    const [teacherAssignments, setTeacherAssignments] = useState([]);
    const location = useLocation();
    const classData = location.state?.classData;
    const {showLoader, hideLoader} = useLoader();

    useEffect(() => {
        const fetchSubjects = async () => {
            showLoader();
            try {
                const stdSub = await ViewSubjectClass(id);
                console.log(subjects)
                console.log(stdSub)
                if (stdSub) {
                    setSubjects(stdSub)
                }
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
            hideLoader();
        };
        fetchSubjects();
    }, [id]);


const handleTeacherChange = (subjectId, teacherId) => {
    setTeacherAssignments((prevAssignments) =>
        [
            ...prevAssignments.filter((assignment) => assignment.subjectId !== subjectId),
            { subjectId, teacherId }
        ]
    );
};

const handleSubmit = async (e)=> {
    e.preventDefault();
    console.log(teacherAssignments);
    showLoader();
    try{
        console.log({id, teacherAssignments})
const res = await SubjectDistribute({classId:id, subjectTeacherPairs:teacherAssignments})
if(res){
    console.log("Yes you did it")
}
    }catch(err){

    }
    hideLoader()
}
    return (
        <div className="sub-dis-main-container">
            <div className="sub-dis-inner-container">
                <h2>{`${classData.std} - ${classData.section}`}</h2>
                <small>Assign subjects to teachers.</small>

                <ol>
                    {subjects.map((sub, index) => (
                      
              
                    <Subject key={index} sub={sub} onTeacherChange={handleTeacherChange}/>
                    
                        
                    ))}
                </ol>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default SubDis;
