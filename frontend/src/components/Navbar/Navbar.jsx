import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
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
            to="/"
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
            to="/teacher/profile"
            className={({ isActive }) => (isActive ? "active" : "")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
            </svg>
            <span>Dashboard</span>
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
                  to="/teacher/add"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  Teacher
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/student/add"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  Student
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
            className={`sub-menu dropdown2 ${
              open == "dropdown2" ? "show " : ""
            }`}>
            <div>
              <li>
                <NavLink
                  to="/class/add"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  Class
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/subject/add"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  Subject
                </NavLink>
              </li>
            </div>
          </ul>
        </li>

        <li className="">
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
            <span>Profile</span>
          </a>
        </li>
        <li className="">
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
            </svg>
            <span>Calendar</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
