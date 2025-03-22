import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import { handleLogout } from "../../utils/logout/logout";

function NavTeacher(props) {
  const id = localStorage.getItem("id");
  console.log(id);
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
            to={`/teacher`}
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
          <NavLink
            to={`/teacher/ownClass/${id}`}
            className={({ isActive }) => (isActive ? "active" : "")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
            </svg>
            <span>My Class</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/teacher/class/view-all/${id}`}
            className={({ isActive }) => (isActive ? "active" : "")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M240-280h240v-80H240v80Zm120-160h240v-80H360v80Zm120-160h240v-80H480v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
            </svg>
            <span>Classes</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`/teacher/profile/${id}`}
            className={({ isActive }) => (isActive ? "active" : "")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
            <span>Profile</span>
          </NavLink>
        </li>
        
        <li onClick={handleLogout}>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavTeacher;
