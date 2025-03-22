import React, { useEffect, useState } from "react";
import "./AddExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AddNewExam,
  ViewExamByClass,
} from "../../../Actions/handlers/teacherHandler";
import { useLoader } from "../../../utils/context/LoaderContext";
import { ViewSubject } from "../../../Actions/handlers/adminHandler";

// first of all we fetch the classes teacher have

//1 : add a exam route then directly add the exam and class there
//The condition is only class teacher can add exam
// is there any need to display the whole exams, idk
//There will be a table of content at last ther will be a input box to add exam
function AddExam(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const classData = location.state?.classData;
  const subjectData = location.state?.subjectData;
  const teacherId = localStorage.getItem("id");
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({});
  const {showLoader, hideLoader} = useLoader();
  const [sub, setSub] = useState('')


  useEffect(() => {
    const fetchExams = async () => {
      showLoader();
      const res = await ViewExamByClass(classData._id);
      if (res) {
        setExams(res);
      }
      hideLoader();
    };
    const fetchSubName = async() => {
      console.log("subjectData.subject:",subjectData.subject)
     const subj = await ViewSubject(subjectData.subject)
     if(subj){
      setSub(subj.name)
     }
    }
    fetchExams();
    fetchSubName();
  }, []);

  const handleAddNewExam = (e) => {
    e.preventDefault();
    showLoader();
    const newExam = AddNewExam({
      classId: classData._id,
      teacherId,
      ...formData,
    });
    if (newExam) {
      window.location.reload();
    }
    hideLoader();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
const handleClick = (exam) => {
    console.log("ExamData:", exam)
navigate('/teacher/add-mark', {state: {classData, subjectData, examData: exam, subject:sub}})
}
  return (
    <div className="add-exam-main-container" style={{backgroundColor:'#cadcec'}}>
      <h2>
        Exam (class : {classData.std}-{classData.section})
      </h2>
      <div className="add-exam-inner-container">
        <ol>
          {exams.map((exam) => (
            <div>
            <li>{exam.name}</li> <button onClick={()=>{handleClick(exam)}}>Add mark</button></div>
          ))}
        </ol>
        {classData.classTeacher === teacherId && (
          <div className="add-exam-flex-box">
            <label htmlFor="">Name:</label>
            <input type="text" name="name" required onChange={handleChange} />
            <label htmlFor="">mark:</label>
            <input
              name="mark"
              type="number"
              required
              onChange={handleChange}
              min={10}
              max={100}
            />
            <button onClick={handleAddNewExam}>ADD</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddExam;
