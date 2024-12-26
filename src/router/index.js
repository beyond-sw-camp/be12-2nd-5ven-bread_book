import { createWebHistory, createRouter } from 'vue-router';
import { useMemberStore } from '../stores/useMemberStore';

import LoginView from "../pages/member/Login.vue"
import Signup from '../pages/member/Signup.vue';
import SignupSuccess from '../pages/member/SignupSuccess.vue';
import findIdPw from '../pages/member/findIdPw.vue';
import Review from '../pages/member/Review.vue';
import Chat from '../pages/chat/Chat.vue';
import ChatRoomList from '../pages/chat/ChatRoomList.vue';
import MyProduct from '../pages/mypage/MyProduct.vue';


const checkLogin = async (from, to, next) => {
  const memberStore = useMemberStore();
  await memberStore.loginCheck();
  if(memberStore.isLogin) {
    return next();
  }

  next("/user/login");
}

const routes = [
  { path: '/login', component: LoginView },
  { path: '/signup', component: Signup},
  { path: '/signupSuccess', component: SignupSuccess},
  { path: '/findIdPw', component: findIdPw},
  { path: '/review', component: Review},
  { path: '/chat', component: Chat},
  { path: '/chat/:id', component: ChatRoomList, props: true },
  { path: '/myhome', component: MyProduct},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;