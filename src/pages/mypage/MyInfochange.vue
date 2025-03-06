<script setup>
import { onMounted, ref } from 'vue';
import { useMemberStore } from '../../stores/useMemberStore';

const memberStore = useMemberStore();
const previewImage = ref(null);
const user = ref({});
const newUser = ref({});
const file = ref(null);

const handleImageUpload = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file.value);
  }
};

const submit = async () => {
  const formData = new FormData();
  formData.append("dto", new Blob([JSON.stringify(newUser.value)], { type: "application/json" }));
  if (file.value) {
    formData.append("file", file.value);
    console.log("appended");
  }
  console.log(formData);
  const response = await memberStore.modifyInfo(formData);
  console.log(response);
}

onMounted(async () => {
  const response = await memberStore.fetchMember();
  console.log(response)
  user.value = response.data.data;
  newUser.value.profileImgUrl = user.value.profileImgUrl;
  newUser.value.nickname = user.value.nickname;
  newUser.value.gender = user.value.gender;
  newUser.value.birthDate = user.value.birthDate;
  console.log(newUser.value);
  previewImage.value = user.value.profileImgUrl;
})

</script>

<template>
  <div class="bg-gray-300 w-full min-h-screen flex items-center justify-center">
    <!-- <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300"> -->
    <div class="w-full py-8">
      <!-- <div class="w-full">     -->
      <div
        class="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
        <!-- <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"> -->
        <h1 class="text-center text-2xl font-bold tracking-wide text-gray-800">
          정보 수정
        </h1>

        <!-- 사진 업로드 섹션 추가 -->

        <div class="flex flex-col items-center my-8">
          <!-- 프로필 이미지 미리보기 -->
          <div class="w-48 h-48 overflow-hidden border border-gray-300">
            <img
              :src="previewImage || 'https://img-api.cboard.net/img_n.php?image_url=https://kin-phinf.pstatic.net/20241002_15/1727869906021QGGd1_JPEG/1727869906013.jpg'"
              alt="프로필 이미지" class="w-full h-full object-cover" />
          </div>
        </div>

        <form action="/" class="my-8 text-sm">
          <div class="flex flex-col my-4">
            <label for="image_url" class="text-gray-700"> 사진 선택 </label>
            <input @change="handleImageUpload" type="file" id="image_url"
              class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900">
          </div>
        </form>

        <form action="/" @submit.prevent="signup" class="my-8 text-sm">
          <div class="flex flex-col my-4">
            <label for="name" class="text-gray-700">이름 : {{ user.username }}</label>

          </div>

          <div class="flex flex-col my-4">
            <label for="id" class="text-gray-700">ID : {{ user.userid }} </label>

          </div>

          <div class="flex flex-col my-4">
            <label for="email" class="text-gray-700">이메일 : {{ user.email }} </label>
          </div>

          <div class="flex flex-col my-4">
            <label for="nickname" class="text-gray-700">닉네임 : {{ user.nickname }} </label>
            <input type="text" name="nickname" id="nickname" v-model="newUser.nickname"
              class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
              placeholder="수정할 닉네임 입력" />
          </div>

          <!-- 비밀번호 변경 방법 논의 필요요 -->
          <div class="flex flex-col my-4">
            <label for="password" class="text-gray-700">비밀번호</label>
            <div class="my-4 flex items-center space-x-4">
              <router-link to="/change_pw">
                <button
                  class="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">
                  비밀번호 수정
                </button>
              </router-link>
            </div>
          </div>

          <!-- <div class="flex flex-col my-4">
                        <label for="password_confirmation" class="text-gray-700">비밀번호 확인</label>
                        <div x-data="{ show: false }" class="relative flex items-center mt-2">
                            <input :type=" show ? 'text': 'password' " v-model="user.passwordre" name="password_confirmation" id="password_confirmation" class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="비밀번호 재입력" type="password">
                            <button @click="show = !show" type="button" class="absolute right-2 bg-transparent flex items-center justify-center text-gray-700">
                                <svg v-if="!show" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>

                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            </button>
                        </div>
                    </div> -->

          <div class="flex flex-col my-4">
            <label for="gender" class="text-gray-700">성별</label>
            <p><input type="radio" name="gender" value="male" v-model="newUser.gender"> 남성</p>
            <p><input type="radio" name="gender" value="female" v-model="newUser.gender"> 여성 </p>
            <p><input type="radio" name="gender" value="other" v-model="newUser.gender"> 기타 </p>
          </div>

          <div class="flex flex-col my-4">
            <label for="birthdate" class="text-gray-700">생년월일</label>
            <input type="date" name="birthdate" id="birthdate" v-model="newUser.birthDate"
              class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded "
              placeholder="닉네임 입력">
          </div>

          <div @click="submit" class="my-4 flex items-center justify-end space-x-4">
            <button
              class="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>