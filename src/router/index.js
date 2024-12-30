import { createWebHistory, createRouter } from 'vue-router';
import { useMemberStore } from '../stores/useMemberStore';

import Home from "/src/pages/home/Home.vue";
import LoginView from "/src/pages/member/Login.vue"
import Signup from '/src/pages/member/Signup.vue';
import SignupSuccess from '/src/pages/member/SignupSuccess.vue';
import findIdPw from '/src/pages/member/findIdPw.vue';
import Review from '/src/pages/review/Review.vue';
import Chat from '/src/pages/chat/Chat.vue';
import ChatRoomList from '/src/pages/chat/ChatRoomList.vue';
import Myproduct_home from '/src/pages/mypage/Myproduct_home.vue';
import MystoreReviews from '/src/pages/mypage/MystoreReviews.vue';
import Myproductstores from '/src/pages/mypage/Myproductstores.vue';
import SearchResult from "../pages/home/SearchResult.vue";
import paymentList from "../pages/payment/paymentList.vue";
import paymentDetails from "../pages/payment/paymentDetails.vue";
import ProductRegister from '../pages/productRegister/ProductRegister.vue';


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
    path: '/result', // * 향후 수정 필요 - 데이터에 따라 URI가 바뀌어야 한다.
    name: 'SearchResult',
    component: SearchResult,
    meta: { showHeader: true, showFooter: true},
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
    path: '/signup_success',
    name: 'SignupSuccess',
    component: SignupSuccess,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/find_id_pw',
    name: 'findIdPw',
    component: findIdPw,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/review/:id',
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
  {
    path: '/productregister',
    name: 'ProductRegister',
    component: ProductRegister,
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
    meta: { showHeader: true, showFooter: true },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;