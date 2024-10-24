import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosPrivate;