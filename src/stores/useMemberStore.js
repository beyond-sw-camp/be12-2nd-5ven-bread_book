import { defineStore } from 'pinia';
import axios from 'axios';

export const useMemberStore = defineStore('member', {
    state: () => (
        {member: {
            idx: -1,
            userid: "",
            username: "",
            email: "",
            nickname: "",
            provider: ""
        }, isLogin: false}),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        async login(user) {
            const response = await axios.post("/api/user/login", {userId:user.id, password:user.pw});
            if(response.status == 200) {
                this.isLogin = true;
            }
            return response;
        },
        async fetchMember() {
            const response = await axios.post("/api/user/info")
            return response;
        },
        async findId(user) {
            const response = await axios.post("/api/user/id_info", user);
            return response;
        },
        async findPw(user) {
            const response = await axios.post("/api/user/password/find", user);
            return response;
        },
        async changePw(passwords) {
            const response = await axios.post("/api/user/password/reset", passwords);
            return response;
        },
        async modifyInfo(formData) {
            const response = await axios.post("/api/user/modify", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });
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
            const response = await axios.post("/api/user/signup_oauth", 
                {userName:user.name, email:user.email, 
                    nickName: user.nickname, birthDate:user.birthDate, gender:user.gender}, {withCredentials: true}
            );
            return response;
        },
        async emailVerify(uuid) {
            const response = await axios.get("/api/user/verify?uuid="+uuid);
            return response;
        },
        async loginCheck() {
            const response = await axios.get("/api/user/auth/check", { withCredentials: true });
            if (response.data.isSuccess) {
                console.log(response);
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