import React, { useEffect, useState } from 'react';
import './AdminDashbord.css'
import { GetRecentUpdate, GetUsersCount } from '../../../Actions/handlers/adminHandler';

function AdminDashboard(props) {
    const [count, setCount] = useState({})
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchCount = async () => {
            const res = await GetUsersCount();
            console.log(res)
            setCount(res);
        };
        fetchCount();
    }, []); // Dependency array
    
    useEffect(() => {
        const fetchRecentUpdate = async () => {
            const res = await GetRecentUpdate();
            console.log(res);
            setUsers(res)
            
        };
        fetchRecentUpdate();
    }, []); // Dependency array
    
    return (
        <div className='admin-dashboard-main-container'>
            <div className="admin-dashboard-container">
                <div className="admin-dashboard-welcome"><span>WELCOME ADMIN!</span></div>
                <div className="admin-dashboard-card-and-recent-details-container">

                
                <div className='admin-dashboard-card-container'>
                    <div className="admin-dashboard-card">
                        <div className="outer-cover-div"><svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#4873e8"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg></div>
                        <div className='admin-dashboard-card-details'>
                            <span>Total Students</span>
                            <span>{count.totalStudents}</span>
                        </div>
                    </div>
                    <div className="admin-dashboard-card">
                    <div className="outer-cover-div"><svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#4873e8"><path d="M240-280h240v-80H240v80Zm120-160h240v-80H360v80Zm120-160h240v-80H480v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg></div>
                    <div className='admin-dashboard-card-details'>
                            <span>Total Classes</span>
                            <span>{count.totalClasses}</span>
                        </div>
                    </div>
                    <div className="admin-dashboard-card">
                    <div className="outer-cover-div"><svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#4873e8"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg></div>
                        <div className='admin-dashboard-card-details'>
                            <span>Total Teachers</span>
                            <span>{count.totalTeachers}</span>
                        </div>
                    </div>
                </div>

                {/* <div className="recently-added">
                     <h3 style={{color: 'green', padding:'5px 0', borderBottom: '1px solid grey'}}>Recently-Added</h3>
                     <ol>
                     {users?.map((user) => (
                        <li className='recently-added-flex-li'><span>{user.name}</span><span>{user.role}</span></li>
                     ))}
                     </ol>
                </div> */}

                </div>
            </div>
           
        </div>
        // <div>HEllo</div>
    );
}

export default AdminDashboard;