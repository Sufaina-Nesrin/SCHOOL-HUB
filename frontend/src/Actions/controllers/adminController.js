import axios from "axios";
import { AuthHeader } from "../../utils/auth/authHeader";
const APP_URL = "http://localhost:3000";

const handleResponse = (res) => {
  // Response handler.
  const { data } = res;
  if (res.status < 200 || res.status >= 300) {
    const error = (data && data.message) || res.statusText;
    return Promise.reject(error);
  }
  return data;
};

export const getUsersCount = async () => {
  console.log("function controller");

  const url = `${APP_URL}/admin/get-users-count`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const getRecentUpdate = async () => {
  console.log("function controller");

  const url = `${APP_URL}/admin/get-recent-updates`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const createStudent = async (data) => {
  const url = `${APP_URL}/admin/student/create`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.post(url, data, { headers });
  return handleResponse(response);
};

export const viewStudent = async (id) => {
  const url = `${APP_URL}/admin/student/view/${id}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};
export const viewStudentPro = async (id) => {
  const url = `${APP_URL}/admin/student/view-full-profile/${id}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const viewAllStudents = async () => {
  const url = `${APP_URL}/admin/student/view-all`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const viewAllStudentsByClass = async (id) => {
  const url = `${APP_URL}/admin/student/view-all-by-class/${id}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const createTeacher = async (data) => {
  const url = `${APP_URL}/admin/teacher/create`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.post(url, data, { headers });
  return handleResponse(response);
};

export const getAteacher = async (id) => {
  const url = `${APP_URL}/admin/teacher/view/${id}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const viewAllTeachers = async () => {
  const url = `${APP_URL}/admin/teacher/view-all`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const viewTeachersBySub = async (data) => {
  const { subjectId } = data;
  const url = `${APP_URL}/admin/teacher/view-on-sub/${subjectId}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const createClass = async (data) => {
  const url = `${APP_URL}/admin/class/create`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.post(url, data, { headers });
  return handleResponse(response);
};

export const viewClass = async (id) => {
  const url = `${APP_URL}/admin/class/view/${id}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const viewAllClasses = async () => {
  const url = `${APP_URL}/admin/class/view-all`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const createSubject = async (data) => {
  const url = `${APP_URL}/admin/subject/create`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.post(url, data, { headers });
  return handleResponse(response);
};
export const createClassSchedule = async (data) => {
  const url = `${APP_URL}/admin/subject/create-class-schedule`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.post(url, data, { headers });
  return handleResponse(response);
};

export const createStandardSubj = async (data) => {
  const url = `${APP_URL}/admin/subject/create-standard`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.post(url, data, { headers });
  return handleResponse(response);
};

export const viewAllSubjects = async () => {
  const url = `${APP_URL}/admin/subject/view-all`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};
export const viewSubject = async (data) => {
  
  const url = `${APP_URL}/admin/view-subject/${data}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const subDistribute = async (data) => {
  const url = `${APP_URL}/admin/subject/distribute`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.put(url, data, { headers });
  return handleResponse(response);
};

export const viewSubClass = async (id) => {
  const url = `${APP_URL}/admin/subject/view-class/${id}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};

export const getAttendence = async (id) => {
  const url = `${APP_URL}/admin/class/getAttendence/${id}`;

  let headers = {
    "Content-Type": "application/json",
  };

  const response = await axios.get(url, { headers });
  return handleResponse(response);
};
