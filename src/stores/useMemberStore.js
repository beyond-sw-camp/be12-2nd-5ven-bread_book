import { defineStore } from 'pinia';
import axios from 'axios';

export const useMemberStore = defineStore('member', {
    state: () => ({member: {}, isLogin: false}),
    actions: {
        async fetchMemberWithId(id, pw) {
            const response = await axios.post("/api/login", {id:id, pw:pw});
            this.member = response.data;
            this.isLogin = true;
            this.isLogin = true;
            return response;
        },
        async loginCheck() {
            const result = await axios.get("/api/user/auth/check", { withCredentials: true });
            if (result.data.isSuccess) {
                this.isLogin = true;
            }
            return result.data;
        }
    }
})