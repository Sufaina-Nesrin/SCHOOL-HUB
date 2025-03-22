import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../Actions/handlers/authHandler";
import { useLoader } from "../../utils/context/LoaderContext";
import { useUserContext } from "../../utils/context/UserContext";
import { ViewStudentPro } from "../../Actions/handlers/adminHandler";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const {showLoader, hideLoader} = useLoader();
  const  {login} = useUserContext();

  // Function to handle role-based navigation
  const redirectToRolePage = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "teacher":
        navigate("/teacher");
        break;
      case "student":
        navigate("/student");
        break;
      default:
        navigate("/login");
    }
  };

  // Redirect if the user is already logged in
  useEffect(() => {
    showLoader();
    const role = localStorage.getItem("role");
    
    if (role) redirectToRolePage(role);
    hideLoader();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const isLoggedIn = await LoginUser(formData);
    if (isLoggedIn) {
      const role = localStorage.getItem("role");
      if(role === 'student'){
        try{
          const id = localStorage.getItem("id");
          const userData = await ViewStudentPro(id);
          console.log(userData)
          login(userData)
        }catch(e){
  console.log(e);
        }
      }
      
     
      redirectToRolePage(role);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    

    <div className="the-container" style={{display:'flex',height:'100vh', justifyContent:'center', alignItems: 'center'}}>
    
      
      <div className="login-container" style={{flex:'2'}}>
        
        <h2 className="form-heading">LOGIN.</h2>
        <small className="form-description">
          Sign in with your credentials
        </small>

        <form className="form-inner-container" onSubmit={handleLogin} style={{width:'70%', marginInline: 'auto'}}>
          <label className="form-label" htmlFor="input1">
            Email
          </label>
          <input
            className="form-input"
            placeholder="Enter your Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            id="input1"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" 
            required
          />

          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div style={{ position: "relative", display: "flex" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleInputChange}
              className="form-input"
              id="password"
              value={formData.password}
              placeholder="Enter your password"
              required
              style={{ flex: 1, paddingRight: "40px" }}
              minLength={5}
            />
            <i
              className={showPassword ? "far fa-eye-slash" : "far fa-eye"}
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "40%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#f0f0f0",
              }}
            ></i>
          </div>

          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
      <div style={{ flex:'1'}}>
      <p style={{textAlign:'center', padding:'2rem 0', fontSize:'25px'}}>Welcome to <span style={{color:'#4b84b3', fontWeight:'700'}}>SCHOOL HUB</span></p>
      <img src="/balloon.png" alt=""  style={{height:'300px', objectFit:'cover'}}/>
      </div>
    
  </div>
  );
}

export default Login;
