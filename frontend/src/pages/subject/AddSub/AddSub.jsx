import React, { useEffect, useState } from "react";
import "./AddSub.css";
import { ViewAllSubjects, CreateStandardSubject } from "../../../Actions/handlers/adminHandler";
import { alertActions } from "../../../utils/reusables/alertAction";
import { useLoader } from "../../../utils/context/LoaderContext";
function AddSub(props) {

  const [subs, setSubs] = useState([]);
  const [stdSubj, setStdSubj] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState({});
  const [standard, setStandard] = useState();
  const {showLoader, hideLoader} = useLoader();

  useEffect(() => {
    const fetchSubj = async () => {
      showLoader();
      try {
        const results = await ViewAllSubjects();
        if (results) {
          // Ensure results are valid
          setSubs(results);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
      hideLoader();
    };

    fetchSubj(); // Call the function only once
    // console.log(subjects);
  }, []);

  const handleAdd = (e) => {
  
    if (selectedSubject) {
      const isDuplicate = stdSubj.some(
        (subj) => subj.id === selectedSubject.id
      ); // Check for duplicates
      if (!isDuplicate) {
        setStdSubj([...stdSubj, selectedSubject]);
        console.log("Subject added:", selectedSubject.name);
      } else {
        alertActions.warning(
          "Duplicate subject, not added:",
          selectedSubject.name
        );
      }
    } else {
      alertActions.warning("No subject selected.");
    }
  };
const handleInputChange = (e)=>{
const std = e.target.value;
setStandard(std);
}
  const handleChange = (e) => {
    const selectedId = e.target.value; // Get the selected subject ID
    const selectedSubject = subs.find(
      (subject) => subject._id === selectedId
    ); // Find subject object
    if (selectedSubject) {
      setSelectedSubject({
        id: selectedSubject._id,
        name: selectedSubject.name,
      }); // Save as an object
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const std = standard;
    showLoader();
    const subjects = stdSubj.map((item) => item.id);
  
    try {
      // const payload = { standard: std, subjects };
      const result = await CreateStandardSubject({std: standard, subjects});
      if (result) {
        console.log("Submission successful:", result);
        // Optionally reset the form
        setStdSubj([]);
        setStandard("");
      }
    } catch (error) {
      console.error("Error submitting subjects:", error);
      alertActions.error("Failed to create subjects.");
    }
    hideLoader();
  };
  
  return (
    <div className="addSub-main-container">
      <div className="addSub-container">
        <h2 className="form-heading">CREATE.</h2>
        <small className="form-description">create subjects for a class </small>
        <select
  
  name="standard"
  id="class"
  value={standard}
  onChange={handleInputChange}
  required
>
  <option value="" disabled selected>
    Select your class
  </option>
  {Array.from({ length: 10 }, (_, index) => (
    <option key={index + 1} value={index + 1}>
      {index + 1}
    </option>
  ))}
</select>
        <select id="subjects" name="subject" onChange={handleChange}>
          <option value="" selected disabled>
            Select your subject
          </option>
          {subs.map((subject, index) => (
            <option value={subject._id}>{subject.name}</option>
          ))}
        </select>
        <button className="blue-button" onClick={handleAdd}>Add</button>
        {stdSubj.length > 0 && (
          <div className="addSub-inner-container">
            <ol>
              {stdSubj.map((subj, index) => (
                <li key={index}>{subj.name}</li> // Access the 'name' property of the object
              ))}
            </ol>
            <button className="blue-button" onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddSub;
