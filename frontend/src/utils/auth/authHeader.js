export const AuthHeader = async() =>{
    const token = localStorage.getItem("userToken");
    const AuthToken = `Brearer ${token}`
    if (AuthToken) return { Authorization: AuthToken };
}