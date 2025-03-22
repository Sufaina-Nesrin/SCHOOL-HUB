import { checkNetworkStatus } from "../../utils/checkConnectivity";
import { alertActions } from "../../utils/reusables/alertAction";
import { viewExamsByClass,markAttendence, markScore, viewStudent, addNewExam, viewAllClasses, viewClass, viewOwnStudent, viewAllStudents, editProfile, getMarksOfSingSub, updateMarks} from '../controllers/teacherController';



  export const MarkAttendance = async (data) => {
    try {
      const attendanceResponse = await markAttendence(data);
      if (attendanceResponse.success) {
        alertActions.success("Attendance marked successfully");
        return attendanceResponse.data; // Return attendance confirmation or data
      } else {
        alertActions.error(attendanceResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  export const ViewExamByClass = async (id) => {
    try {
      const viewExamsResponse = await viewExamsByClass(id);
      if (viewExamsResponse.success) {
        alertActions.success("viewExams marked successfully");
        return viewExamsResponse.data; // Return viewExams confirmation or data
      } else {
        alertActions.error(viewExamsResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  export const AddNewExam = async (data) => {
    try {
      const examResponse = await addNewExam(data);
      if (examResponse.success) {
        alertActions.success("exam created successfully");
        return examResponse.data; // Return exam confirmation or data
      } else {
        alertActions.error(examResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
   export const EditProfile = async(data) => {
    try{
      
      const profileResponse = await editProfile(data);
      if(profileResponse.success){
        alertActions.success(profileResponse.message);
        return profileResponse.data;
      }else{
        alertActions.error(profileResponse.message);
      }
    }catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
   }
  
  export const GetMarksOfSingSub = async (data) => {
    try {
      const scoreResponse = await getMarksOfSingSub(data);
      if (scoreResponse.success) {
        alertActions.success("Score marked successfully");
        return scoreResponse.data; // Return score confirmation or data
      } else {
        alertActions.error(scoreResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };

  export const UpdateMarks = async (data) => {
    try {
      const scoreResponse = await updateMarks(data);
      if (scoreResponse.success) {
        alertActions.success("Score marked successfully");
        return scoreResponse.data; // Return score confirmation or data
      } else {
        alertActions.error(scoreResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const MarkScore = async (data) => {
    try {
      const scoreResponse = await markScore(data);
      if (scoreResponse.success) {
        alertActions.success("Score marked successfully");
        return scoreResponse.data; // Return score confirmation or data
      } else {
        alertActions.error(scoreResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewStudent = async (studentId) => {
    try {
      const studentResponse = await viewStudent(studentId);
      if (studentResponse.success) {
        // alertActions.success("Student data retrieved successfully");
        return studentResponse.data; // Return student details
      } else {
        alertActions.error(studentResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewAllClasses = async (id) => {
    try {
      const classesResponse = await viewAllClasses(id);
      if (classesResponse.success) {
        // alertActions.success("All classes retrieved successfully");
        return classesResponse.data; // Return list of classes
      } else {
        alertActions.error(classesResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewClass = async (classId) => {
    try {
      const classResponse = await viewClass(classId);
      if (classResponse.success) {
        // alertActions.success("Class data retrieved successfully");
        return classResponse.data; // Return class details
      } else {
        alertActions.error(classResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewOwnStudents = async (id) => {
    try {
      const ownStudentsResponse = await viewOwnStudent(id);
      if (ownStudentsResponse.success) {
        // alertActions.success("Own students retrieved successfully");
        return ownStudentsResponse.data; // Return list of own students
      } else {
        alertActions.error(ownStudentsResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewAllStudents = async () => {
    try {
      const allStudentsResponse = await viewAllStudents();
      if (allStudentsResponse.success) {
        // alertActions.success("All students retrieved successfully");
        return allStudentsResponse.data; // Return list of all students
      } else {
        alertActions.error(allStudentsResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  