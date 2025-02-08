import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})

const useAxiosSecure = () => {
    const { userLogOut} = useAuth();
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
        )
    }, [navigate, userLogOut])

    return axiosInstance
};

export default useAxiosSecure;