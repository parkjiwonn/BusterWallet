

<template>
  <header>

    <div class="">
      <h2 class="text-2xl  font-bold flex justify-center mt-6"> {{ $t("message.step1.createWallet") }}</h2>
      <p class="text-center mt-6">
        {{ $t("message.step1.text1") }}<br />
        {{ $t("message.step1.text2") }}
      </p>
    </div>


    <div class=" relative mt-6">
      <label for="password " class="text-gray-700 mb-3 font-bold ">
        {{ $t("message.step1.newPw") }}
      </label>
      <input type="password" id="password"
        class=" mt-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
        name="password" v-model="password" @input="checkPasswordWatch" />

    </div>



    <div class=" relative mt-4">
      <label for="confirm-password" class="text-gray-700 mb-3 font-bold ">
        {{ $t("message.step1.checkPw") }}
      </label>
      <input v-if="passwordMismatch" type="password" id="confirm-password"
        class=" mt-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
        name="password" v-model="confirmPassword" @input="checkPasswordMatch" />
      <input v-else type="password" id="confirm-password"
        class=" mt-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
        name="password" v-model="confirmPassword" @input="checkPasswordMatch" />


    </div>


    <div v-if="!passwordMismatch" class="text-red-500 mt-2">{{ $t("message.step1.invalidPw") }}</div>

    <div class="checkbox-wrapper mt-5">
      <input type="checkbox" id="terms" v-model="isCheckboxChecked" />
      <label for="terms" class="terms-label">{{
        $t("message.step1.checkWarning")
      }}</label>
    </div>

    <!--WARN : 비밀번호 일치 & 체크박스 확인후 버튼 활성화 기능 완전하지 않음.-->
    <button type="button" @click="goToHome" :style="{
          'background-color': (!passwordMismatch || !isCheckboxChecked) ? 'rgb(134, 167, 247)' : 'rgb(45, 76, 135)'
        }"
      class="mt-5 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
      {{ $t("message.entry.newAccount") }}
    </button>



  </header>
</template>

<script>
import CryptoJS from 'crypto-js';
// CryptoJS vs bcrypt.js
// CryptoJS : 브라우저 / Node.js 모두 사용 가능
// bcrypt.js : Node.js에서 주로 사용, 브라우저에서 사용 가능 하지만 일부 기능 제한될 수 있음.

export default {

  data() {
    return {
      password: '',
      confirmPassword: '',
      passwordMismatch: true,
      isCheckboxChecked: false,
      nimonic: ''
    };
  },
  methods: {
    // 비밀번호 일치 검사 
    checkPasswordMatch() {
      if (this.password !== this.confirmPassword) {
        console.log('비번안맞음', this.passwordMismatch);
        this.passwordMismatch = false;
      } else {
        this.passwordMismatch = true;
        console.log('비번 맞음', this.passwordMismatch);
      }
    },
    // 니모닉 문구 생성으로 넘어가기
    goToHome() {
      console.log('goToStep2', this.passwordMismatch);
      console.log('goToStep2', this.isCheckboxChecked);
      if (this.passwordMismatch && this.isCheckboxChecked) {

        // 비밀번호 해시화
        console.log('해시화 되기 전 비밀번호', this.password);
        const hashedPassword = CryptoJS.SHA256(this.password).toString();
        // 해시화된 비밀번호를 다음 단계로 전달하거나 사용할 수 있습니다
        console.log('해시화된 비밀번호:', hashedPassword);

        this.SetAccountInfo(hashedPassword);


      }

    },
    SetAccountInfo(hashedPassword) {
      // 비밀번호 local storage 저장하기
      const seedPhraseData = { seedPhrase: this.nimonic.join(' ') };
      console.log('seedPhraseData', seedPhraseData);
      const seedPhraseJsonString = JSON.stringify(seedPhraseData);

      fetch('http://221.148.25.26:4000/getAccountFromSeedPhrase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: seedPhraseJsonString,
      })
        .then(response => response.json())
        .then(data => {
          console.log('SetAccountInfo() 통과');
          localStorage.setItem('hasedPW', hashedPassword);
          localStorage.setItem('isLocked', false);
          // 블체 네트워크에 계정이 생성되면 로컬 스토리지에 저장한다.
          // You can store these values in localStorage or anywhere else
          localStorage.setItem('publicKey', data.publicKey);
          localStorage.setItem('secretKey', data.secretKey);
          localStorage.setItem('implicitAccountId', data.implicitAccountId);
          this.$router.push('/Home');
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },

  },
  components: {
    Error
  },
  created() {
    console.log('this.$route.params.nimonic', this.$route.params.nimonic)
    this.nimonic = this.$route.params.nimonic;

    // 현재 설정되어있는 언어가 어떤건지 확인하기
    const lang = localStorage.getItem('language');
    console.log('현재 lang : ', lang);
    if (lang === '한국어') {
      console.log('한국어');
      this.changeLanguage('ko');
    } else {
      this.changeLanguage('en');
    }
  },
}
</script>

<style>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 18px;
  /* 체크박스의 너비 조정 */
  height: 18px;
  /* 체크박스의 높이 조정 */
}


.terms-label {
  margin-left: 5px;
  font-size: 15px;
  /* 텍스트의 글꼴 크기 조정 */
}
</style>