

export const logout = () =>{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refresh_token")
    window.location.href = "/dashboard"
}