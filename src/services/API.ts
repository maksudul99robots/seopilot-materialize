import axios from 'axios';
import axiosInstance from './axiosInstance';

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
        return await axiosInstance.post(`${API_ROOT}${url}`, data, source);
    },
    async login(data: any, url = "/login", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, source);
    },
    async sendForgotPasswordEmail(data: any, url = "/forgot-password", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, source);
    },
    async resetPassword(data: any, url = "/reset-password", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, source);
    },
    async checkVerification(data: any, url = "/check-verification", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, source);
    },
    async resendVerificationEmail(data: any, url = "/resend-verification", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, source);
    },
    async redeemCouponCode(data: any, url = "/redeem-coupon", source = undefined) {
        // console.log(data);
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateUser(data: any, url = "/update-user", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async addOpenAIApiKey(data: any, url = "/add-openai-apikey", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getOpenAIAPIKey(url = "/get-openai-apikey", source = undefined) {
        return await axiosInstance.get(`${API_ROOT}${url}`, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAIArticleHistory(data: any, url = "/get-ai-history", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAIArticleSingle(data: any, url = "/get-single-ai-history", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async reloadToken(url = "/reload-token", source = undefined) {
        return await axiosInstance.get(`${API_ROOT}${url}`, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateAIArticle(data: any, url = "/update-ai-article", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getSaasArticle(data: any, url = "/get-saas-ai-article", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getSaasArticleWithoutStatus(data: any, url = "/get-saas-ai-article-without-status", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async generateSaasArticle(data: any, url = "/generate-saas-ai-article", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async generateYTB(data: any, url = "/generate-youtube-to-blog", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async setStatusToError(data: any, url = "/set-saas-ai-article-status", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateSaasAIArticle(data: any, url = "/update-saas-ai-article", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async regenerateArticle(data: any, url = "/regerate-saas-article", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAllUsers(data: any, url = "/get-all-users", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async impersonate(data: any, url = "/impersonate", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getConnections(data: any, url = "/get-connects", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async addConnectWP(data: any, url = "/add-connects", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateConnectWP(data: any, url = "/update-connects", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async deleteConnectWP(data: any, url = "/delete-connects", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAllWorkspaces(data: any, url = "/get-all-workspaces", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getOwnersWorkspaces(data: any, url = "/get-owners-workspaces", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async createWorkspace(data: any, url = "/create-workspace", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getTeam(data: any, url = "/get-team", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async inviteToTeam(data: any, url = "/invite-to-team", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async verifyInvitationCode(data: any, url = "/verify-Invitation-code", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async acceptInvitation(data: any, url = "/accept-invitation", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async checkoutWorkspace(data: any, url = "/checkout-workspace", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async editWorkspace(data: any, url = "/edit-workspace", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async deleteWorkspace(data: any, url = "/delete-workspace", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async editTeamMember(data: any, url = "/edit-team-member", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async deleteTeamMember(data: any, url = "/delete-team-member", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAllAIArticleHistory(data: any, url = "/get-all-ai-article-history", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async fetchOutline(data: any, url = "/fetch-outline-from-url", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getArticleScore(data: any, url = "/get-article-scores", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async saveArticleScore(data: any, url = "/save-article-scores", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getPrompt(data: any, url = "/get-prompt", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async generateListicles(data: any, url = "/generate-saas-ai-listicle-article", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getUserDetails(data: any, url = "/get-users-details", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAIModels(data: any, url = "/get-models", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async verifyOpenAIKey(data: any, url = "/verify-api-key", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async isAllowedToCreateArticle(data: any, url = "/is-user-allowed-to-create-article", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async isAllowedToCreateCluster(data: any, url = "/is-user-allowed-to-create-cluster", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getMyTeamObject(data: any, url = "/get-my-team-0bj", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async reWriteText(data: any, url = "/rewrite-text", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getRewrites(data: any, url = "/get-rewritten-text", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getFolders(data: any, url = "/get-folders", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async createFolder(data: any, url = "/create-folder", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async editFolder(data: any, url = "/edit-folder", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async deleteFolder(data: any, url = "/delete-folder", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateFolderIdForArticle(data: any, url = "/update-folder-id-for-article", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getCurrentOwnerWorkspaces(data: any, url = "/current-owners-workspaces", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },

    async moveToAnotherWorkspace(data: any, url = "/move-to-another-workspace", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async deleteArticle(data: any, url = "/delete-article", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },

    async saveSchedule(data: any, url = "/save-schedule", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getSchadules(data: any, url = "/get-all-schedules", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateSchedule(data: any, url = "/update-schedules", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },

    async deleteSchedule(data: any, url = "/delete-schedules", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },

    async getTimezone(data: any, url = "/get-timezone", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async regenerateFeaturedImg(data: any, url = "/regenerate-featured-img", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getFeaturedImg(data: any, url = "/get-featured-img", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async updateIndexFeaturedImg(data: any, url = "/update-index-featured-img", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
        // return
        // return await axiosInstance.post(`${API_ROOT}${url}`, { text: "sdkfjsjhfjshajfsajfhjshdafjh" }, header);
    },
    async getAllImages(data: any, url = "/get-all-imgs", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async generateAIImage(data: any, url = "/generate-ai-img", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async completeCalculation(data: any, url = "/complete-payment-calculation", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async makePayment(data: any, url = "/paymentMethods/stripe/charge", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getUser(data: any, url = "/get-user", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async downgradeInfo(data: any, url = "/paymentMethods/downgrade-info", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async cancelSubscription(data: any, url = "/paymentMethods-cancel/stripe/charge", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async generateIdeas(data: any, url = "/generate-ideas", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },

    async getIdeaList(data: any, url = "/get-idea-list", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getIdeasWithoutCluster(data: any, url = "/get-ideas-without-cluster", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getClusters(data: any, url = "/get-clusters", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async generateSaasArticleFromIdea(data: any, url = "/generate-article-from-idea", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async generateSaasArticleFromIdeaOnIdeaPage(data: any, url = "/generate-article-from-idea-on-ideapg", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async saveIdeaLibrarySettings(data: any, url = "/save-idea-library-settings", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async createNewIdea(data: any, url = "/create-new-idea", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async updateIdea(data: any, url = "/update-idea", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async checkClusterIdeaStatus(data: any, url = "/check-cluster-idea-status", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async deleteCluster(data: any, url = "/delete-cluster", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async deleteIdea(data: any, url = "/delete-idea", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async researchKeyword(data: any, url = "/research-keyword", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getReserchKeywods(data: any, url = "/get-research-keywords", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getPrimaryResearch(data: any, url = "/get-primary-research", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getTitleForKeyword(data: any, url = "/get-title-for-keyword", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async addToIdeaLibrary(data: any, url = "/add-to-idea-library", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async updateArticleStatus(data: any, url = "/update-article-status", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async assignArticle(data: any, url = "/assign-article", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getMyTasks(data: any, url = "/get-my-tasks", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getKeywordSuggestions(data: any, url = "/get-keyword-suggestions", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getSERP(data: any, url = "/get-serp", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getPAA(data: any, url = "/google-search-paa", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getDallEImg(data: any, url = "/download-dall-e-img", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getAllSites(data: any, url = "/gsc-sites", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async saveGoogleAccessToken(data: any, url = "/google-search-console-verify", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async addSite(data: any, url = "/gsc-add-site", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getSitesFromGSC(data: any, url = "/gsc-all-sites", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async addWebsiteAnalytics(data: any, url = "/gsc-add-website-analytics", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async deleteGSC(data: any, url = "/gsc-delete", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async canCreateWorkspace(data: any, url = "/can-create-workspace", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async canAddTeamMembers(data: any, url = "/can-add-team-member", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async verifyClaudeAPIKey(data: any, url = "/verify-claude-api-key", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async addClaudeAPIKey(data: any, url = "/add-claude-api-key", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getClaudeAPIKey(data: any, url = "/get-claude-api-key", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getGSCDataInRange(data: any, url = "/get-gsc-data-range", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getGSCSummaryInRange(data: any, url = "/get-gsc-summary-range", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getGSCQueryInRange(data: any, url = "/get-gsc-query-range", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getGSCPagesInRange(data: any, url = "/get-gsc-page-range", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getGSCCountryInRange(data: any, url = "/get-gsc-country-range", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getGSCDevicesInRange(data: any, url = "/get-gsc-device-range", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async changeUserPlan(data: any, url = "/change-user-plan", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getTitleForKeywords(data: any, url = "/get-titles-for-keyword", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async createIdeaInsertToCluster(data: any, url = "/create-idea-insert-cluster-gsc-pages", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },
    async getOwnersFullTeam(data: any, url = "/get-owner-full-team", source = undefined) {
        return await axiosInstance.post(`${API_ROOT}${url}`, data, header);
    },




};