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
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async addOpenAIApiKey(data: any, url = "/add-openai-apikey", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getOpenAIAPIKey(url = "/get-openai-apikey", source = undefined) {
        return await axios.get(`${API_ROOT}${url}`, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAIArticleHistory(data: any, url = "/get-ai-history", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAIArticleSingle(data: any, url = "/get-single-ai-history", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async reloadToken(url = "/reload-token", source = undefined) {
        return await axios.get(`${API_ROOT}${url}`, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateAIArticle(data: any, url = "/update-ai-article", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getSaasArticle(data: any, url = "/get-saas-ai-article", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async generateSaasArticle(data: any, url = "/generate-saas-ai-article", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async setStatusToError(data: any, url = "/set-saas-ai-article-status", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateSaasAIArticle(data: any, url = "/update-saas-ai-article", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async regenerateArticle(data: any, url = "/regerate-saas-article", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    }


};