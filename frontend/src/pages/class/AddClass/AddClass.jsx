import React, { useEffect, useState } from 'react';
import { ViewAllTeachers, CreateClass } from '../../../Actions/handlers/adminHandler';
import { useLoader } from '../../../utils/context/LoaderContext';
// import './AddClass.css'


function AddClass(props) {
    const [formData, setFormData] = useState({})
    const [teachers, setTeachers] = useState([]);
    const {showLoader, hideLoader} = useLoader();
    useEffect(()=>{
        const fetchTeachers = async()=>{
            try{
              showLoader();
                const teachers = await ViewAllTeachers();
                if(teachers){
                //   let result = teachers.map(teacher => teacher._id);
                  setTeachers(teachers);
                  hideLoader();
                }
            }catch(err){

            }
        }
        fetchTeachers();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleSubmit = async (e) =>{
        e.preventDefault();
try{
  showLoader();
    const result = await CreateClass(formData);
hideLoader();
}catch(err){
  
}
      }
    return (
        <div className='form-with-img-container'>
          
            <div className='form-container'>
            <h2 className='form-heading'>CREATE.</h2>
            <small className='form-description'>Enter class details</small>
            
            <form  className="form-inner-container" action="">
                
                <label className='form-label' htmlFor="">Standard</label>
                <select className='form-select'  id="class"
        
  
  name="std"
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
<label className='form-label' htmlFor="section">Section</label>
<select className='form-select' name="section" onChange={handleInputChange} id="">
    <option value="" disabled selected>Please select section</option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
    <option value="D">D</option>
    <option value="E">E</option>
    <option value="F">F</option>
    <option value="G">G</option>
    <option value="H">H</option>
    <option value="I">I</option>
    <option value="J">J</option>
    <option value="K">K</option>
</select>

<label className='form-label' htmlFor="teacher">Teacher</label>
<select className='form-select' name="classTeacher" onChange={handleInputChange} id="">
    {teachers.map((teacher)=>(
        <option value={teacher._id}>{teacher.name}</option>
    ))}
    <option value="" disabled selected>Please select teacher </option>
</select>
 <button className='form-button' onClick={handleSubmit}>Create</button>
            </form>
            
        </div>
        <div className="form-img-container"><img src="/woman.png" alt=""/></div>
        </div>
    );
}

export default AddClass;