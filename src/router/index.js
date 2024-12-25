import { createWebHistory, createRouter } from 'vue-router';
import LoginView from "../pages/member/Login.vue"
import Signup from '../pages/member/Signup.vue';
import SignupSuccess from '../pages/member/SignupSuccess.vue';
import findIdPw from '../pages/member/findIdPw.vue';
import Review from '../pages/member/Review.vue';
import Chat from '../pages/chat/Chat.vue';
import ChatRoomList from '../pages/chat/ChatRoomList.vue';

const routes = [
  { path: '/login', component: LoginView },
  { path: '/signup', component: Signup},
  { path: '/signupSuccess', component: SignupSuccess},
  { path: '/findIdPw', component: findIdPw},
  { path: '/review', component: Review},
  { path: '/chat', component: Chat},
  { path: '/chat/:id', component: ChatRoomList, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;