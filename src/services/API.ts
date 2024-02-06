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
        // console.log(data);
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
    },
    async getAllUsers(data: any, url = "/get-all-users", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async impersonate(data: any, url = "/impersonate", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getConnections(data: any, url = "/get-connects", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async addConnectWP(data: any, url = "/add-connects", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateConnectWP(data: any, url = "/update-connects", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async deleteConnectWP(data: any, url = "/delete-connects", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAllWorkspaces(data: any, url = "/get-all-workspaces", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async createWorkspace(data: any, url = "/create-workspace", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getTeam(data: any, url = "/get-team", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async inviteToTeam(data: any, url = "/invite-to-team", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async verifyInvitationCode(data: any, url = "/verify-Invitation-code", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async acceptInvitation(data: any, url = "/accept-invitation", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async checkoutWorkspace(data: any, url = "/checkout-workspace", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async editWorkspace(data: any, url = "/edit-workspace", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async deleteWorkspace(data: any, url = "/delete-workspace", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async editTeamMember(data: any, url = "/edit-team-member", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async deleteTeamMember(data: any, url = "/delete-team-member", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAllAIArticleHistory(data: any, url = "/get-all-ai-article-history", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async fetchOutline(data: any, url = "/fetch-outline-from-url", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getArticleScore(data: any, url = "/get-article-scores", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async saveArticleScore(data: any, url = "/save-article-scores", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getPrompt(data: any, url = "/get-prompt", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async generateListicles(data: any, url = "/generate-saas-ai-listicle-article", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getUserDetails(data: any, url = "/get-users-details", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAIModels(data: any, url = "/get-models", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async verifyOpenAIKey(data: any, url = "/verify-api-key", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async isAllowedToCreateArticle(data: any, url = "/is-user-allowed-to-create-article", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getMyTeamObject(data: any, url = "/get-my-team-0bj", source = undefined) {
        return await axios.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axios.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },


};