import { createWebHistory, createRouter } from 'vue-router';
import LoginView from "../pages/member/Login.vue"
import Signup from '../pages/member/Signup.vue';
import SignupSuccess from '../pages/member/SignupSuccess.vue';
import findIdPw from '../pages/member/findIdPw.vue';
import Review from '../pages/member/Review.vue';

const routes = [
  { path: '/login', component: LoginView },
  { path: '/signup', component: Signup},
  { path: '/signupSuccess', component: SignupSuccess},
  { path: '/findIdPw', component: findIdPw},
  { path: '/review', component: Review},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;