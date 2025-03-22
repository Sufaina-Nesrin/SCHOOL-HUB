import axios from "axios";
const APP_URL = "http://localhost:3000";
import { AuthHeader } from "../../utils/auth/authHeader";

const handleResponse = (res) => {
  // Response handler.
  const { data } = res;
  if (res.status < 200 || res.status >= 300) {
    const error = (data && data.message) || res.statusText;
    return Promise.reject(error);
  }
  return data;
};
export const addNewExam = async (data) => {
  const url = `${APP_URL}/teacher/add-new-exam`; 

  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.post(url, data, { headers });
  return handleResponse(response);
}

export const getMarksOfSingSub = async(data)=> {
  const url = `${APP_URL}/teacher/view-marks`;

  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers,
    params: data
   });
  return handleResponse(response);
}

export const updateMarks = async(data)=> {
  const url = `${APP_URL}/teacher/update-marks`;

  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  
  headers = { ...headers, ...authorization };
  const response = await axios.put(url, data, { headers});
  return handleResponse(response);
}

export const markAttendence = async (data) => {
    
  const url = `${APP_URL}/teacher/mark-attendence`; // Dynamic URL

  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.put(url, data, { headers });
  return handleResponse(response);
};
export const markScore = async (data) => {
  const url = `${APP_URL}/teacher/mark-score`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.post(url, data, { headers });
  return handleResponse(response);
};

export const viewStudent = async () => {
  const url = `${APP_URL}/teacher/view-student`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};
export const editProfile = async (data) => {
   const url = `${APP_URL}/teacher/edit-profile`;
  let authorization = await AuthHeader();
  console.log(authorization)
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  console.log(url, headers, data)
  const response = await axios.put(url, data, { headers });
  return handleResponse(response);
};


export const viewAllClasses = async (id) => {
  const url = `${APP_URL}/teacher/view-all-classes/${id}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const viewClass = async () => {
  const url = `${APP_URL}/teacher/view-class`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};
export const viewExamsByClass = async (id) => {
  const url = `${APP_URL}/teacher/view-exam-by-class/${id}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const viewOwnStudent = async (id) => {
  const url = `${APP_URL}/teacher/view-own-student/${id}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};
export const viewAllStudents = async () => {
  const url = `${APP_URL}/teacher/view-all-students`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};
