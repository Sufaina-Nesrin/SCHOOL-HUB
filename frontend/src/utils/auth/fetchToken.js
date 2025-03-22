export const getToken = () => {
    const token = localStorage.getItem("userToken")
    return token
}
