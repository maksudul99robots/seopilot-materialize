import axios from 'axios';

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

export const LoginRegistrationAPI = {
    async register(data: any, url = "/create-user", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, source);
    },
    async login(data: any, url = "/login", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, source);
    },
    async sendForgotPasswordEmail(data: any, url = "/forgot-password", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, source);
    },
    async resetPassword(data: any, url = "/reset-password", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, source);
    },
    async checkVerification(data: any, url = "/check-verification", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, source);
    },
    async resendVerificationEmail(data: any, url = "/resend-verification", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, source);
    },
    async redeemCouponCode(data: any, url = "/redeem-coupon", source = undefined) {
        console.log(data);
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateUser(data: any, url = "/update-user", source = undefined) {
        console.log(data);
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },


};
export const PublicationsApi = {
    async getPublications(url = "/publications") {
        return axios.get(`${API_ROOT}${url}`, header).then((response) => response?.data).catch(error => {
            if (error.response) {
                // console.log(error.response)
                if (error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.reload();

                } else {
                    return error.response;
                }
            }
        })

    },


};
