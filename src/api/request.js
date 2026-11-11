import API, { authHeader } from "./axios";

export const createRequest = (data) => {
return  API.post("/api/requests", data, {
    ...authHeader(),
    headers: {
      ...authHeader().headers,
    },
  });

};


export const getMyRequests = ()=>
    API.get("/api/requests/my", authHeader());

export const getRequest = (id)=>
    API.get(`/api/requests/${id}`, authHeader())


export const updateReqest = (id,data)=>
    API.put(`/api/requests/${id}`, data, authHeader());

export const deleteRequest = (id)=>
    API.delete(`/api/requests/${id}`, authHeader());

export const getAllRequests = ()=>
    API.get("/api/requests", authHeader());

export const updateStatus = (id, status)=>
    API.put(`/api/requests/${id}/status`, {status}, authHeader());
