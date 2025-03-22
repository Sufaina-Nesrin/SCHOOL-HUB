import React, { useEffect, useState } from 'react';
import './View.css'
import { ViewAllClasses } from '../../../Actions/handlers/adminHandler';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../utils/context/LoaderContext';

function View(props) {
    const [allClasses, setAllClasses] = useState([]);
    const navigate = useNavigate();
    const {showLoader, hideLoader} = useLoader();

    useEffect(() => {
       
   const fetchClasses = async () => {
    showLoader();
    const classes = await ViewAllClasses();
    if(classes){
        setAllClasses(classes)
        console.log(classes);
    }
    hideLoader();
   }
   fetchClasses();
    },[]);
    let url = ""
    const role = localStorage.getItem("role");
    if(role === 'admin'){
        url += "/admin"
    }else if(role === "teacher"){
        url += "/teacher";
    }
    const handleClick = (theClass) => {


navigate(`${url}/class/view/${theClass._id}`, {state: { classData: theClass}})
    }
    
    return (
        <div className='view-all-classes-container'>
            <h2 style={{textAlign:'center',padding:'2rem'}}>CLASSES</h2>
            <div className="view-all-classes-inner-container">
                <ul>
                    {allClasses.map((theClass)=>(
                        <div className='view-class-card'>
                           <li>{theClass.std}-{theClass.section}</li>
                           <button onClick={() => handleClick(theClass)}>View</button>
                        </div>
                        
                    ))}
                    
                </ul>
            </div>

            
        </div>
    );
}

export default View;