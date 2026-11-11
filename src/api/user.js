import { authHeader } from "./axios"
import API from './axios'


export const getProfile = ()=>{
    API.get("/profiles", authHeader())
}