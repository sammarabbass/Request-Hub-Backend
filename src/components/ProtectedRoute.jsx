import React from 'react'
import {Navigate} from 'react-router-dom'
const ProtectedRoute = ({children}) => {
    const accesstoken = localStorage.getItem("accessToken")
    const refreshToken=localStorage.getItem("refresh_token")
    if(!accesstoken||!refreshToken){
        return <Navigate to="/" replace/>
    }
  return children
}

export default ProtectedRoute
