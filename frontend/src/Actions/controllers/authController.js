import axios from "axios";
import {AuthHeader} from'../../utils/auth/authHeader';
const APP_URL = "http://localhost:3000";
const ML_URL = "http://127.0.0.1:8000"

const handleResponse = (res) => {
  // Response handler.
  const { data } = res;
  if (res.status < 200 || res.status >= 300) {
    const error = (data && data.message) || res.statusText;
    return Promise.reject(error);
  }
  return data;
};

export const login = async (data) => {
  console.log("authController",data)
  const url = `${APP_URL}/user/login`; 
  let headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.post(url, data, {headers});
  return handleResponse(response);
};

export const predict = async (data) => {
  console.log("authController",data)
  const url = `${ML_URL}/predict`; 
  let headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.post(url, data);
  return handleResponse(response);
};