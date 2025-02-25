import { defineStore } from 'pinia';
import axios from 'axios';

export const useMemberStore = defineStore('member', {
    state: () => ({member: {}, isLogin: false}),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        async fetchMemberWithId(user) {
            const response = await axios.post("/api/user/login", {userId:user.id, password:user.pw});
            if(response.status == 200) {
                this.isLogin = true;
            }
            return response;
        },
        async signup(user) {
            const response = await axios.post("/api/user/signup", 
                {userId:user.userid, userName:user.name, email:user.email, 
                    password:user.password, nickName: user.nickname, birthDate:user.birthDate, gender:user.gender}
            );
            return response;
        },
        async signupOauth(user) {
            const response = await axios.post("/api/user/signup-oauth", 
                {userName:user.name, email:user.email, 
                    nickName: user.nickname, birthDate:user.birthDate, gender:user.gender}, {withCredentials: true}
            );
            return response;
        },
        async loginCheck() {
            const response = await axios.get("/api/user/auth/check", { withCredentials: true });
            if (response.data.isSuccess) {
                this.isLogin = true;
                this.member = response.data.data;
            } else {
                this.isLogin = false;
            }
            return this.isLogin;
        }, 
        async logout() {
            this.isLogin = false;
            await axios.post("/api/logout");
        }
    }
})