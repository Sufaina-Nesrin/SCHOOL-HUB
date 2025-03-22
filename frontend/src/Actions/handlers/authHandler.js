import { checkNetworkStatus } from "../../utils/checkConnectivity";
import { alertActions } from "../../utils/reusables/alertAction";
import {login, predict}  from'../controllers/authController';
export const LoginUser = async (data) => {
    try {
        console.log("authHandleer",data)
      const loginUser = await login(data);
      if (loginUser.success) {
        alertActions.success(loginUser.message);
        const token = loginUser.token;
        const user = loginUser.user;
        const role = loginUser.role;
        const id = loginUser.userId
        if (token !== null) {
          localStorage.setItem("userToken", token);
          localStorage.setItem("user", user );
          localStorage.setItem("role",role );
          localStorage.setItem("id", id);
        }
        return true;
      } else {
        alertActions.error(loginUser.message);
      }
    } catch (error) {
      alertActions.error(error.response.data.message);
    }
  };

  export const Predict = async (data) => {
      try{
        const predictedData = await predict(data)
        console.log(predictedData);
        if(predictedData){
          return predictedData.data;
        }
      }catch(err){
        
      }
  }