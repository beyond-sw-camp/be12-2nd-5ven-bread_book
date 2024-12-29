import { createWebHistory, createRouter } from 'vue-router';
import { useMemberStore } from '../stores/useMemberStore';

import LoginView from "../pages/member/Login.vue"
import Signup from '../pages/member/Signup.vue';
import SignupSuccess from '../pages/member/SignupSuccess.vue';
import findIdPw from '../pages/member/findIdPw.vue';
import Review from '../pages/member/Review.vue';
import Chat from '../pages/chat/Chat.vue';
import ChatRoomList from '../pages/chat/ChatRoomList.vue';
import ProductRegister from '../pages/productRegister/ProductRegister.vue';
import Myproduct_home from '../pages/mypage/Myproduct_home.vue';
import MystoreReviews from '../pages/mypage/MystoreReviews.vue';
import Myproductstores from '../pages/mypage/Myproductstores.vue';


const checkLogin = async (from, to, next) => {
  const memberStore = useMemberStore();
  // await memberStore.loginCheck();
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
  { path: '/productregister', component: ProductRegister},

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