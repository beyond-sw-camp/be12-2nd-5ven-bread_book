import { createWebHistory, createRouter } from 'vue-router';
import { useMemberStore } from '../stores/useMemberStore';

import Home from "../pages/home/Home.vue";
import LoginView from "../pages/member/Login.vue"
import Signup from '../pages/member/Signup.vue';
import SignupSuccess from '../pages/member/SignupSuccess.vue';
import findIdPw from '../pages/member/findIdPw.vue';
import Review from '../pages/review/Review.vue';
import Chat from '../pages/chat/Chat.vue';
import ChatRoomList from '../pages/chat/ChatRoomList.vue';
import Myproduct_home from '../pages/mypage/Myproduct_home.vue';
import MystoreReviews from '../pages/mypage/MystoreReviews.vue';
import Myproductstores from '../pages/mypage/Myproductstores.vue';
import paymentList from '../pages/payment/paymentList.vue'
import paymentDetails from '../pages/payment/paymentDetails.vue'


const checkLogin = async (from, to, next) => {
  const memberStore = useMemberStore();
  // await memberStore.loginCheck();
  if(memberStore.isLogin) {
    return next();
  }

  next("/user/login");
}

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/signupSuccess',
    name: 'SignupSuccess',
    component: SignupSuccess,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/findIdPw',
    name: 'findIdPw',
    component: findIdPw,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/review',
    name: 'Review',
    component: Review,
    meta: { showHeader: false, showFooter: false },
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/chat/:id',
    name: 'ChatRoomList',
    component: ChatRoomList,
    props: true,
    meta: { showHeader: true, showFooter: true },
  },
  { path: '/paymentList', component: paymentList },
  { path: '/paymentDetails/:num', component: paymentDetails },

  //Myproduct_home 내 스토어들, 내 스토어의 리뷰들을 볼 수 있는 라우터 경로
  { path: "/myproduct_home", name: "Myproduct_home", component: Myproduct_home, 
    children: [
      { path: "myproductstores", name: 'Myproductstores', component: Myproductstores,
       },
      { path: "mystoreReviews", name: 'MystoreReviews', component: MystoreReviews,
       },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;