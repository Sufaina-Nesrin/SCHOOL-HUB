import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import { handleLogout } from "../../utils/logout/logout";

function NavAdmin(props) {
  const [open, setOpen] = useState(null);
  const [close, setClose] = useState(true);
  const location = useLocation();

  const toggleOpen = (id) => {
    setOpen((prevState) => (prevState == id ? null : id));
    if (close) {
      setClose((prevState) => !prevState);
    }
  };
  function hanldeClose() {
    setClose((prevState) => !prevState);
    if (open == "dropdown1" || open == "dropdown2") {
      setOpen(null);
    }
  }
  return (
    <div className={`sidebar ${close ? "close" : ""}`}>
      <ul>
        <li>
          <span className="logo">SchoolHub</span>
          <button
            className={`toggle-btn ${close ? "rotate" : ""}`}
            onClick={hanldeClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
            </svg>
          </button>
        </li>

        <li className="">
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
            <span>Home</span>
          </NavLink>
        </li>

       

        <li>
          <button
          //use location == /teacher/add to activate active class
            className={`dropdown-btn ${open == "dropdown1" ? "rotate rotate" : ""}`}
            onClick={() => toggleOpen("dropdown1")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
            </svg>
            <span>Create</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M480-360 280-560h400L480-360Z" />
            </svg>
          </button>
          <ul
            className={`sub-menu dropdown1 ${
              open == "dropdown1" ? "show" : ""
            }`}>
            <div>
              <li>
                <NavLink
                  to="/admin/teacher/add"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  Teacher
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/student/add"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  Student
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/class/add"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  Class
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/subject/add"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  Subject
                </NavLink>
              </li>
            </div>
          </ul>
        </li>

        <li>
          <button
            className={`dropdown-btn ${open == "dropdown2" ? "rotate active" : ""}`}
            onClick={() => toggleOpen("dropdown2")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm120-160v-80h320v80H320Zm0-120v-80h320v80H320Zm0-120v-80h320v80H320Zm360-80v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
            </svg>
            <span>View</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M480-360 280-560h400L480-360Z" />
            </svg>
          </button>
          <ul
            className={`sub-menu dropdown2 ${
              open == "dropdown2" ? "show " : ""
            }`}>
            <div>
              <li>
                <NavLink
                  to="/admin/teacher/view-all"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  Teachers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/class/view-all"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  Classes
                </NavLink>
              </li>
            </div>
          </ul>
        </li>

        
        <li onClick={handleLogout} className="">
         <a>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
            <span>Logout</span>
            </a>
            
        </li>
      </ul>
    </div>
  );
}

export default NavAdmin;
