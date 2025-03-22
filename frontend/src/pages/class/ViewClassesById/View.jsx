import React, { useEffect, useState } from 'react';
import '../ViewAllClass/View.css'

import { useNavigate, useParams } from 'react-router-dom';
import { ViewAllClasses} from '../../../Actions/handlers/teacherHandler';
import { useLoader } from '../../../utils/context/LoaderContext';

function View(props) {
    const {id} = useParams();
    console.log(id)
    const [allClasses, setAllClasses] = useState([]);
    const navigate = useNavigate();
    const {showLoader, hideLoader} = useLoader();

    useEffect(() => {
   const fetchClasses = async () => {
    showLoader();
    try{

        const classes = await ViewAllClasses(id)
        if(classes){
            console.log(classes);
            setAllClasses(classes);
        }
    }catch(err){
        console.log(err.message)
    }
    hideLoader();

    
   }
   fetchClasses();
    },[id])
    const handleClick = (theClass) => {


navigate(`/teacher/class/view/${theClass._id}`, {state: { classData: theClass}})
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