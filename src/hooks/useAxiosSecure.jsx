import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://eventpulse-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { userLogOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          userLogOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(err);
      }
    );
  }, [navigate, userLogOut]);

  return axiosInstance;
};

export default useAxiosSecure;
