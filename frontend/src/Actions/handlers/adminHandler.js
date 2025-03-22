import { checkNetworkStatus } from "../../utils/checkConnectivity";
import { alertActions } from "../../utils/reusables/alertAction";

import {
  createStudent,
  viewStudent,
  viewAllStudents,
  createTeacher,
  getAteacher,
  viewAllTeachers,
  createClass,
  viewClass,
  viewAllClasses,
  createSubject,
  createStandardSubj,
  subDistribute,
  viewSubClass,
  viewAllSubjects,
  viewAllStudentsByClass,
  viewTeachersBySub,
  createClassSchedule,
  viewSubject,
  viewStudentPro,
  getUsersCount,
  getRecentUpdate,
  getAttendence,
} from "../controllers/adminController";


export const GetUsersCount = async () => {
  console.log("function called")
  try {
    const getUsersCountResponse = await getUsersCount();
    if (getUsersCountResponse.success) {
      alertActions.success(getUsersCountResponse.message);
      return getUsersCountResponse.data; // Return created student data
    } else {
      alertActions.error(getUsersCountResponse.message);
    }
  } catch (error) {
    alertActions.error(error.response?.data?.message || "An error occurred");
  }
};

export const GetRecentUpdate = async () => {
  console.log("function called")
  try {
    const getRecentUpdateResponse = await getRecentUpdate();
    if (getRecentUpdateResponse.success) {
      alertActions.success(getRecentUpdateResponse.message);
      return getRecentUpdateResponse.data; // Return created student data
    } else {
      alertActions.error(getRecentUpdateResponse.message);
    }
  } catch (error) {
    alertActions.error(error.response?.data?.message || "An error occurred");
  }
};

  export const CreateStudent = async (data) => {
    try {
      const createStudentResponse = await createStudent(data);
      if (createStudentResponse.success) {
        alertActions.success(createStudentResponse.message);
        return createStudentResponse.data; // Return created student data
      } else {
        alertActions.error(createStudentResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewStudent = async (studentId) => {
    try {
      const viewStudentResponse = await viewStudent(studentId);
      if (viewStudentResponse.success) {
        // alertActions.success("Student data retrieved successfully");
        return viewStudentResponse.data; // Return student details
      } else {
        alertActions.error(viewStudentResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };

  export const ViewStudentPro = async (studentId) => {
    try {
      console.log("ADMIN HANDLER",studentId)
      const viewStudentResponse = await viewStudentPro(studentId);
      if (viewStudentResponse.success) {
        // alertActions.success("Student data retrieved successfully");
        return viewStudentResponse.data; // Return student details
      } else {
        alertActions.error(viewStudentResponse.message);
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
        return allStudentsResponse.data; // Return list of students
      } else {
        alertActions.error(allStudentsResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  export const ViewAllStudentsByClass = async (id) => {
    try {
      const allStudentsResponse = await viewAllStudentsByClass(id);
      if (allStudentsResponse.success) {
        // alertActions.success("All students retrieved successfully");
        return allStudentsResponse.data; // Return list of students
      } else {
        alertActions.error(allStudentsResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  
  
  export const CreateTeacher = async (data) => {
    try {
      const createTeacherResponse = await createTeacher(data);
      if (createTeacherResponse.success) {
        alertActions.success(createTeacherResponse.message);
        return createTeacherResponse.data; // Return created teacher data
      } else {
        alertActions.error(createTeacherResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const GetATeacher = async (teacherId) => {
    try {
      const teacherResponse = await getAteacher(teacherId);
      if (teacherResponse.success) {
        // alertActions.success("Teacher data retrieved successfully");
        return teacherResponse.data; // Return teacher details
      } else {
        alertActions.error(teacherResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewAllTeachers = async () => {
    try {
      const allTeachersResponse = await viewAllTeachers();
      if (allTeachersResponse.success) {
        // alertActions.success("All teachers retrieved successfully");
        return allTeachersResponse.data; // Return list of teachers
      } else {
        alertActions.error(allTeachersResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewTeachersBySub = async (data) => {
    try {
      const allTeachersResponse = await viewTeachersBySub(data);
      if (allTeachersResponse.success) {
        // alertActions.success("All teachers retrieved successfully");
        return allTeachersResponse.data; // Return list of teachers
      } else {
        alertActions.error(allTeachersResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };

  export const CreateClass = async (data) => {
    try {
      const createClassResponse = await createClass(data);
      if (createClassResponse.success) {
        alertActions.success(createClassResponse.message);
        return createClassResponse.data; // Return created class data
      } else {
        alertActions.error(createClassResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewClass = async (classId) => {
    try {
      const viewClassResponse = await viewClass(classId);
      if (viewClassResponse.success) {
        // alertActions.success("Class data retrieved successfully");
        return viewClassResponse.data; // Return class details
      } else {
        alertActions.error(viewClassResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewAllClasses = async () => {
    try {
      const allClassesResponse = await viewAllClasses();
      if (allClassesResponse.success) {
        // alertActions.success("All classes retrieved successfully");
        return allClassesResponse.data; // Return list of classes
      } else {
        alertActions.error(allClassesResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const CreateSubject = async (data) => {
    try {
      const createSubjectResponse = await createSubject(data);
      if (createSubjectResponse.success) {
        alertActions.success(createSubjectResponse.message);
        return createSubjectResponse.data; // Return created subject data
      } else {
        alertActions.error(createSubjectResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };

  export const CreateClassSchedule = async (data) => {
    try {
      const createClassScheduleResponse = await createClassSchedule(data);
      if (createClassScheduleResponse.success) {
        alertActions.success(createClassScheduleResponse.message);
        return createClassScheduleResponse.data; // Return created subject data
      } else {
        alertActions.error(createClassScheduleResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  export const ViewAllSubjects = async (data) => {
    try {
      const viewAllSubjectResponse = await viewAllSubjects();
      if (viewAllSubjectResponse.success) {
        // alertActions.success(viewAllSubjectResponse.message);
        return viewAllSubjectResponse.data; // Return the data
      } else {
        alertActions.error(viewAllSubjectResponse.message);
        return null; // Explicitly return null when success is false
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
      return null; // Explicitly return null in case of an error
    }
  };

  export const ViewSubject = async (data) => {
    try {
      const viewAllSubjectResponse = await viewSubject(data);
      console.log("adminHandler", data);
      if (viewAllSubjectResponse.success) {
        // alertActions.success(viewAllSubjectResponse.message);
        return viewAllSubjectResponse.data; // Return the data
      } else {
        alertActions.error(viewAllSubjectResponse.message);
        return null; // Explicitly return null when success is false
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
      return null; // Explicitly return null in case of an error
    }
  };
  
  
  export const CreateStandardSubject = async (data) => {
    try {
      const createStandardSubjResponse = await createStandardSubj(data);
      if (createStandardSubjResponse.success) {
        alertActions.success(createStandardSubjResponse.message);
        return createStandardSubjResponse.data; // Return standard subject details
      } else {
        alertActions.error(createStandardSubjResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const SubjectDistribute = async (data) => {
    try {
      const subDistributeResponse = await subDistribute(data);
      if (subDistributeResponse.success) {
        alertActions.success(subDistributeResponse.message);
        return subDistributeResponse.data; // Return subject distribution details
      } else {
        alertActions.error(subDistributeResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  export const ViewSubjectClass = async (classId) => {
    try {
      const viewSubClassResponse = await viewSubClass(classId);
      if (viewSubClassResponse.success) {
        // alertActions.success("Subjects for the class retrieved successfully");
        return viewSubClassResponse.data; // Return subject-class mapping
      } else {
        alertActions.error(viewSubClassResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };

  export const GetAttendence = async (classId) => {
    try {
      const getAttenceResponse = await getAttendence(classId);
      if (getAttenceResponse.success) {
        // alertActions.success("Subjects for the class retrieved successfully");
        return getAttenceResponse.data; // Return subject-class mapping
      } else {
        alertActions.error(getAttenceResponse.message);
      }
    } catch (error) {
      alertActions.error(error.response?.data?.message || "An error occurred");
    }
  };
  