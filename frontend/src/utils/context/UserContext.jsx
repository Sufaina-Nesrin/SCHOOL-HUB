import { useState } from "react";
import { createContext, useContext } from "react";

const UserContext = createContext(null);

export const useUserContext = () => {
    return useContext(UserContext);
  };

export const UserProvider = ({children})=> {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("userData");
        return storedUser ? JSON.parse(storedUser) : null;
      });

const login = (userData) =>  {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
}
const logout = () => {
    setUser(null);
    localStorage.removeItem("userData"); // Clear the stored user
  };

return (<UserContext.Provider value={{user, login, logout}}>

    {children}
</UserContext.Provider>)
}