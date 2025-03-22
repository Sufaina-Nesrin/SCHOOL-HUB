import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTeacher, ViewAllSubjects } from "../../../Actions/handlers/adminHandler";
import { useLoader } from "../../../utils/context/LoaderContext";
// import './AddTeacher.css'

function AddTeacher(props) {
  const [subjects, setSubjects] = useState([]);
  const {showLoader, hideLoader} = useLoader();
  useEffect(() => {
    const fetchSubj = async () => {
      showLoader();
      try {
        
        const results = await ViewAllSubjects();
        if (results) { // Ensure results are valid
          setSubjects(results);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
      hideLoader();
    };

    fetchSubj(); // Call the function only once
    console.log(subjects);
  }, []); // Empty array ensures the effect runs only once on mount


  const [toggle, setToggle] = useState(false)
  const toggleFun = ()=>{
    setToggle(!toggle)
  }


const [formData, setFormData] = useState({
  name: "",
  email: "",
  gender: "",
  subject: "",

}) 
const handleInputChange = (e) => {
  const {name, value} = e.target;
  setFormData({
    ...formData,
    [name]: value,
  })
}

const handleSubmit = async (e) =>{
  e.preventDefault();
  // console.log(formData)
  showLoader();
  try{
const teacherData = await CreateTeacher(formData);
if(teacherData){
  console.log(teacherData);
}
  }catch(err){

  }
  hideLoader();
}

return (
  <div className="form-with-img-container">
    <div className="form-img-container"><img src="/umbrella.png" alt=""/></div>
    <div className="form-container">
      <h2 className="form-heading">CREATE.</h2>
      <small className="form-description">Enter teacher details</small>
      <form className="add-teacher-container" onSubmit={handleSubmit}>
        {/* Name Input */}
        <label className="form-label" htmlFor="name">Name</label>
        <input
          className="form-input"
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
          required
          pattern="^[A-Za-z\s]+$"
          minLength={2}
          maxLength={50}
          title="Name should only contain letters and spaces."
        />

        {/* Email Input */}
        <label className="form-label" htmlFor="email">Email</label>
        <input
          className="form-input"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          title="Please enter a valid email address."
        />

        {/* Phone Input */}
        <label className="form-label" htmlFor="phone">Phone</label>
        <input
          className="form-input"
          type="tel"
          name="phone"
          id="phone"
          placeholder="Enter your phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          pattern="^\d{10}$"
          title="Phone number must be exactly 10 digits."
        />

        {/* Gender Selection */}
        <div className="form-flex">
          <label className="form-radio-label" htmlFor="gender">Gender</label>
          <div>
            <input type="radio" name="gender" value="male" id="male" checked={formData.gender === "male"} onChange={handleInputChange} required />
            <label className="form-radio-label" htmlFor="male">Male</label>
            
            <input type="radio" name="gender" value="female" id="female" checked={formData.gender === "female"} onChange={handleInputChange} required />
            <label className="form-radio-label" htmlFor="female">Female</label>
            
            <input type="radio" name="gender" value="others" id="others" checked={formData.gender === "others"} onChange={handleInputChange} required />
            <label className="form-radio-label" htmlFor="others">Others</label>
          </div>
        </div>

        {/* Qualification Selection */}
        <label className="form-label" htmlFor="qualification">Qualification</label>
        <select className="form-select" name="qualification" id="qualification" value={formData.qualification} onChange={handleInputChange} required>
          <option value="" disabled>Select a qualification</option>
          <option value='B.Ed'>B.Ed</option>
          <option value='D.Ed'>D.Ed</option>
          <option value='M.Ed'>M.Ed</option>
        </select>

        {/* Subject Selection */}
        <label className="form-label" htmlFor="subject">Subject</label>
        <select className="form-select" name="subject" id="subject" value={formData.subject} onChange={handleInputChange} required>
          <option value="" disabled>Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject._id}>{subject.name}</option>
          ))}
        </select>

        {/* Submit Button */}
        <button className="form-button" type="submit">Create</button>
      </form>
    </div>
  </div>
);

}

export default AddTeacher;
