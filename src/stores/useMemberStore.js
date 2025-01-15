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
            if(response.data.result) {
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