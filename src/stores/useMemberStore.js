import { defineStore } from 'pinia';
import axios from 'axios';

export const useMemberStore = defineStore('member', {
    state: () => ({member: {}, isLogin: false}),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        async fetchMemberWithId(user) {
            const response = await axios.post("/api/user/login", {email:user.id, password:user.pw});
            this.member = response.data;
            this.isLogin = true;
            return response;
        },
        loginCheck() {
            // const result = await axios.get("/api/user/auth/check", { withCredentials: true });
            // if (result.data.isSuccess) {
            //     this.isLogin = true;
            // }
            return this.isLogin;
        }, 
        async logout() {
            this.isLogin = false;
            await axios.post("/api/logout");
        }
    }
})