import React, { useEffect, useState } from 'react';
import { ViewTeachersBySub } from '../../Actions/handlers/adminHandler';

function Subject({sub, onTeacherChange}) {
    
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                console.log(sub)
                console.log(sub._id)
                const resTeachers = await ViewTeachersBySub({subjectId: sub._id});
                console.log(resTeachers)
                if (resTeachers) {
                    setTeachers(resTeachers);
                }
            } catch (error) {
                console.error("Error fetching teachers:", error);
                setTeachers([]); // Handle errors gracefully
            }
        };
        fetchTeachers();
    }, [sub._id]); // Use `sub.id` to avoid infinite loops

    const handleChange = (e) => {
        const teacherId = e.target.value;
        onTeacherChange(sub._id, teacherId);
    }
    return (
        <div>
            <li>
                <span>{sub.name}</span>
                <select name="" id="" defaultValue="" onChange={handleChange} >
                    <option value="" disabled>Please select teacher</option>
                    {teachers?.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                    ))}
                </select>
            </li>
        </div>
    );
}

export default Subject;
