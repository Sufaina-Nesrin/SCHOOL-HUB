import axios from "axios";
const APP_URL = "http://localhost:3000";
import {AuthHeader} from'../../utils/auth/authHeader';

const handleResponse = (res) => {
  // Response handler.
  const { data } = res;
  if (res.status < 200 || res.status >= 300) {
    const error = (data && data.message) || res.statusText;
    return Promise.reject(error);
  }
  return data;
};



export const viewAttendence = async (id) => {
  const url = `${APP_URL}/student/view-attendence/${id}`;
  let authorization = await AuthHeader();
  let headers = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...authorization };
  const response = await axios.get(url, { headers });
  return handleResponse(response);
};
export const viewProfile = async () => {
    const url = `${APP_URL}/student/view-profile`;
    let authorization = await AuthHeader();
    let headers = {
      "Content-Type": "application/json",
    };
    headers = { ...headers, ...authorization };
    const response = await axios.get(url, { headers });
    return handleResponse(response);
  };
  export const editProfile = async (data) => {
    console.log(data);
    const url = `${APP_URL}/student/edit-profile`;
    let authorization = await AuthHeader();
    let headers = {
      "Content-Type": "application/json",
    };
    headers = { ...headers, ...authorization };
    const response = await axios.put(url, data, { headers });
    return handleResponse(response);
  };