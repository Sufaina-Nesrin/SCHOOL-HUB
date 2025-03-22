import { checkNetworkStatus } from "../../utils/checkConnectivity";
import { alertActions } from "../../utils/reusables/alertAction";
import { viewAttendence, viewProfile, editProfile} from '../controllers/studentController';


  export const ViewAttendance = async (id) => {
    console.log("function called studentHandler")
    try {
      console.log("studentHandler id",id)
      const attendanceResponse = await viewAttendence(id);
      if (attendanceResponse.success) {
        // alertActions.success("Attendance data retrieved successfully");
        return attendanceResponse.data; // Return attendance data
      } else {
        alertActions.error(attendanceResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewProfile = async (studentId) => {
    try {
      const profileResponse = await viewProfile(studentId);
      if (profileResponse.success) {
        // alertActions.success("Profile data retrieved successfully");
        return profileResponse.data; // Return profile data
      } else {
        alertActions.error(profileResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const EditProfile = async (data) => {
    try {
      const editProfileResponse = await editProfile(data);
      if (editProfileResponse.success) {
        alertActions.success(editProfileResponse.message);
        return editProfileResponse.data; // Return updated profile data
      } else {
        alertActions.error(editProfileResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || error.message);
    }
  };
  