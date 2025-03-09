import { createWebHistory, createRouter } from 'vue-router';
import { useMemberStore } from '../stores/useMemberStore';

import Home from "/src/pages/home/Home.vue";
import LoginView from "/src/pages/member/Login.vue"
import Signup from '/src/pages/member/Signup.vue';
import SignupOauth from '../pages/member/SignupOauth.vue';
import SignupSuccess from '/src/pages/member/SignupSuccess.vue';
import EmailVerify from '../pages/member/EmailVerify.vue';
import EmailVerifySuccess from '../pages/member/EmailVerifySuccess.vue';
import VerifyFail from '../pages/member/VerifyFail.vue';
import findIdPw from '/src/pages/member/findIdPw.vue';
import FindIdSuccess from '../pages/member/FindIdSuccess.vue';
import ProductDetail from "/src/pages/productDetail/ProductDetail.vue";
import Review from '/src/pages/review/Review.vue';
import Chat from '/src/pages/chat/Chat.vue';
import ChatRoom from '/src/pages/chat/ChatRoom.vue';
import Myproduct_home from '/src/pages/mypage/Myproduct_home.vue';
import MystoreReviews from '/src/pages/mypage/MystoreReviews.vue';
import Myproductstores from '/src/pages/mypage/Myproductstores.vue';
import SearchResult from "../pages/home/SearchResult.vue";
import paymentList from "../pages/payment/paymentList.vue";
import paymentDetails from "../pages/payment/paymentDetails.vue";
import ProductRegister from '../pages/productRegister/ProductRegister.vue';
import ChangePw from '../pages/member/ChangePw.vue';
import Terms from '../pages/member/Terms.vue';
import MyInfochange from '../pages/mypage/MyInfochange.vue';
import Report from '../pages/report/Report.vue';
import WishList from '../pages/common/WishList.vue';


const checkLogin = async (from, to, next) => {
  const memberStore = useMemberStore();
  // await memberStore.loginCheck();
  if(memberStore.isLogin) {
    return next();
  }

  next("/login");
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
    meta: { showHeader: true, showFooter: false},
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
    path: '/signup_oauth',
    name: 'SignupOauth',
    component: SignupOauth,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/signup_success',
    name: 'SignupSuccess',
    component: SignupSuccess,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/email_verify/:uuid',
    name: 'EmailVerify',
    component: EmailVerify,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/verify_success',
    name: 'EmailVerifySuccess',
    component: EmailVerifySuccess,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/verify_fail',
    name: 'VerifyFail',
    component: VerifyFail,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/find_id_pw',
    name: 'findIdPw',
    component: findIdPw,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/find_id_success',
    name: 'FindIdSuccess',
    component: FindIdSuccess,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/change_pw',
    name: 'changePw_signin',
    component: ChangePw,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/change_pw/:uuid',
    name: 'changePw',
    component: ChangePw,
    meta: { showHeader: false, showFooter: false }
  },
  {
    path: '/terms',
    name: 'terms',
    component: Terms,
    meta: { showHeader: true, showFooter: true }
  },
  {
    // * 수정 필요 - product_detail / :id에 맞게 이동시키기
    path: '/product_detail/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { showHeader: true, showFooter: true},
  },
  {
    path: '/review/:idx',
    name: 'Review',
    component: Review,
    meta: { showHeader: true, showFooter: true },
    beforeEnter: checkLogin,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { showHeader: true, showFooter: false },
    beforeEnter: checkLogin,
  },
  {
    path: '/chat/:id',
    name: 'ChatRoom',
    component: ChatRoom,
    props: true,
    meta: { showHeader: true, showFooter: false },
    beforeEnter: checkLogin,
  },
  { path: '/paymentList/:idx', 
    name: 'paymentList',
    component: paymentList,
    meta: { showHeader: true, showFooter: true },
    beforeEnter: checkLogin,
  },
  { path: '/order/orderDetails/:idx',
    name: 'paymentDetails',
    component: paymentDetails,
    meta: { showHeader: true, showFooter: true },  
    beforeEnter: checkLogin,
  },
  {
    path: '/productregister',
    name: 'ProductRegister',
    component: ProductRegister,
    meta: { showHeader: true, showFooter: true },
    beforeEnter: checkLogin,
  },


  //Myproduct_home 내 스토어들, 내 스토어의 리뷰들을 볼 수 있는 라우터 경로
  { 
    path: "/myproduct_home", 
    name: "Myproduct_home", 
    component: Myproduct_home, 
    children: [
      { 
        path: "myproductstores/:idx",
        name: 'Myproductstores', 
        component: Myproductstores,
       },
      { path: "mystoreReviews/:idx", 
        name: 'MystoreReviews', 
        component: MystoreReviews,
       }
    ],
    meta: { showHeader: true, showFooter: true },
    beforeEnter: checkLogin,
  },
  {
    path: "/myinfochange", 
    name: "MyInfochange", 
    component: MyInfochange,
   },
   {
    path: "/report", 
    name: "Report", 
    component: Report,
   },
   {
    path: "/wishlist",
    name: "wishlist",
    component: WishList,
    meta: { showHeader: true, showFooter: true },
   }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router;