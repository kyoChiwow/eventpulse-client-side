import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://eventpulse-server-side.onrender.com",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
