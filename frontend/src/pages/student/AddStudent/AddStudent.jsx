import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateStudent } from "../../../Actions/handlers/adminHandler";
import { useLoader } from "../../../utils/context/LoaderContext";

function AddStudent(props) {
  const [toggle, setToggle] = useState(false);
  const {showLoader, hideLoader} = useLoader();

  const toggleFun = () => {
    setToggle(!toggle);
  };
// Csn7qXSARb
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    gender: "",
    phone: "",
    class: "",
    division: ""

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      console.log(formData)
      const studentData = await CreateStudent(formData);
  
    } catch (error) {
      console.error("Error creating student:", error);
    }
    hideLoader();
 
  };

  return (
    <div className="the-container">
    <div className="form-with-img-container">
      <div className="form-img-container"><img src="/calm.png" alt="" /></div>
      <div className="form-container">
        <h2 className="form-heading">CREATE.</h2>
        <small className="form-description">Enter student details</small>
        <form className="add-teacher-container" onSubmit={handleSubmit}>
          {/* Name Input */}
          <label className="form-label" htmlFor="name">Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Enter your name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            minLength={2}
            maxLength={50}
            pattern="^[A-Za-z\s]+$"
            title="Name should only contain letters and spaces"
          />
  
          {/* Email Input */}
          <label className="form-label" htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Please enter a valid email address"
          />
  
          {/* Phone Input */}
          <label className="form-label" htmlFor="phone">Phone</label>
          <input
            className="form-input"
            type="tel"
            name="phone"
            placeholder="Enter your phone"
            id="phone"
            onChange={handleInputChange}
            required
            pattern="^\d{10}$"
            title="Phone number must be exactly 10 digits"
          />
  
          {/* Gender Selection */}
          <div className="form-flex">
            <label className="form-radio-label" htmlFor="gender">Gender</label>
            <div>
              <input type="radio" name="gender" value="male" id="male" onChange={handleInputChange} required />
              <label className="form-radio-label" htmlFor="male" style={{ marginRight: "16px" }}>Male</label>
  
              <input type="radio" name="gender" value="female" id="female" onChange={handleInputChange} required />
              <label className="form-radio-label" htmlFor="female" style={{ marginRight: "16px" }}>Female</label>
  
              <input type="radio" name="gender" value="others" id="others" onChange={handleInputChange} required />
              <label className="form-radio-label" htmlFor="others" style={{ marginRight: "16px" }}>Others</label>
            </div>
          </div>
  
          {/* Standard Selection */}
          <label className="form-label" htmlFor="class">Standard</label>
          <select className="form-select" name="standard" id="class" onChange={handleInputChange} required>
            <option value="" disabled selected>Select your class</option>
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
          </select>
  
          {/* Division Selection */}
          <label className="form-label" htmlFor="division">Division</label>
          <select className="form-select" name="division" id="division" onChange={handleInputChange} required>
            <option value="" disabled selected>Select your division</option>
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"].map((division) => (
              <option key={division} value={division}>{division}</option>
            ))}
          </select>
  
          {/* Submit Button */}
          <button className="form-button" type="submit">Create</button>
        </form>
      </div>
    </div>
        
    </div>
  );
  
}

export default AddStudent;
