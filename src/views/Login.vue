<template>
  <div class="flex flex-col items-center mt-12">
    <img alt="Vue logo" class="logo" src="@/assets/fulllogo_nobuffer.jpg" width="225" height="225" />
    <div class="">
      <h2 class="text-2xl  font-bold flex justify-center mt-6"> {{ $t("message.login.title") }}</h2>
    </div>
    <div class="relative mt-10">
      <label for="password" class="text-gray-700 mb-3 font-bold">
        {{ $t("message.login.pw") }}
      </label>
      <input type="password" id="password" ref="cursor"
        class="mt-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
        name="password" v-model="password" />
    </div>
    <div v-if="(!isPasswordValid)" class="text-red-500 mt-2"> {{ $t("message.login.invalidPw") }}</div>

    <button type="button" @click="goToHome" style="background-color: rgb(45, 76, 135);"
      class="mt-5 py-2 px-4  bg-indigo-800 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
      {{ $t("message.login.unlocked") }}
    </button>
  </div>
</template>
  
<script>
import CryptoJS from 'crypto-js';
export default {
  data() {
    return {
      isPasswordValid: true,
      password: ''
    }
  },
  methods: {
    goToHome() {
      // 비밀번호 유효성 검사 로직을 구현하고, 유효한 경우 isPasswordValid를 true로 설정
      // 예: 비밀번호가 일치하면 isPasswordValid를 true로 설정
      console.log('userpass:', this.password);
      const hashedPassword = CryptoJS.SHA256(this.password).toString();
      const localPassword = localStorage.getItem('hasedPW');
      console.log('hashedPassword', hashedPassword);
      console.log('localPassword', localPassword);

      if (hashedPassword === localPassword) { // 비밀번호가 맞다면 지갑메인으로 이동
        localStorage.setItem('isLocked', false);
        this.$router.push('/Home');
        this.isPasswordValid = true;
      } else { // 비밀번호가 틀리다면 처리할 내용 추가
        // 예: alert 창 띄우기
        this.isPasswordValid = false;
      }
    },
    changeLanguage(lang) {
      console.log('login changeLanguage():', lang);
      this.$i18n.locale = lang;
      console.log('login this.$i18n.locale:', this.$i18n.locale);

    },
    startCursor() {
      this.$refs.cursor.focus();
    },
  },
  mounted() {
    this.startCursor();
  },

}
</script>