<template>
  <div class="about">

    <h2 class="text-2xl  font-bold flex justify-center mt-6">{{ $t("message.importWallet.Title") }}</h2>
    <p class="text-center mt-6">
      {{ $t("message.importWallet.description") }}
    </p>
  </div>
  <div class=" relative mt-6">
    <label for="password " class="text-gray-700 mb-3 font-bold ">
      <p class="text-center mt-6">
        {{ $t("message.importWallet.mnemonic") }}
      </p>
    </label>
    <input type="password" id="password"
      class=" mt-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
      name="password" v-model="password" @input="checkPasswordWatch" placeholder="correct horse battery staple..." />
  </div>

  <button type="button" @click="goToHome" :style="{
    'background-color': !NimonicValidate ? 'rgb(134, 167, 247)' : 'rgb(45, 76, 135)'
  }"
    class="mt-5 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
    {{ $t("message.importWallet.findAccount") }}
  </button>
</template>

<script>
export default {

  data() {
    return {
      password: '',
      NimonicValidate: false, // 니모닉 문구로 계정을 찾을수 있는지 없는지 확인 후 맞다면 true로 바꾸기 

    }
  },
  methods: {
    goToHome() {
      // const seedPhrase = 'trim core program that minor quit snap know chronic lazy future quantum';
      console.log(this.password);
      // const seedPhrase = this.password.join(' ');
      // console.log('seedPhrase', seedPhrase);
      const seedPhraseData = { seedPhrase: this.password };


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
          console.log('import 하기 위해 니모닉 확인 성공')
          // 니모닉 입력하고 유효한 니모닉이면 비번 입력하게 해야함. 
          this.$router.push({ name: 'ResetPass', params: { nimonic: this.password.trim().split(' ') } });

        })
        .catch((error) => {
          console.error('Error:', error);
        });

    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },


  },
  created() {
    // 현재 설정되어있는 언어가 어떤건지 확인하기
    const lang = localStorage.getItem('language');
    console.log('현재 lang : ', lang);
    if (lang === '한국어') {
      console.log('한국어');
      this.changeLanguage('ko');
    } else {
      this.changeLanguage('en');
    }
  }

}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
