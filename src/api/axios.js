import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});
export const authHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export default API;

