import axios from 'axios';
// import { API_ROOT } from './config'; // Adjust the path according to your project structure
// import { useRouter } from 'next/router';
let header: any = null;
let accessToken: any = null;
if (typeof window !== "undefined") {
    // Perform localStorage action
    accessToken = localStorage.getItem("seo-pilot-token");
}
const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;
// console.log("accessToken:", accessToken);
if (accessToken != null) {
    header = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            // Accept: 'application/json',
            // 'Content-type': 'application/json'
        },
    };
}

const axiosInstance = axios.create({
    baseURL: API_ROOT,
});

axiosInstance.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error: any) => {
        // console.log("error:...................:", error)
        if (error?.response && error?.response?.status === 401) {
            // Handle 401 error: log the user out
            // const router = useRouter();
            window.location.href = '/go-to-login-page'
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;