<template>
  <div class="greetings">
    <h1 class="theme mt-6">Welcome!!</h1>
    <img alt="Vue logo" class="logo" src="@/assets/fulllogo_nobuffer.jpg" width="225" height="225" />
    <div class="checkbox-wrapper mb-5">
      <input type="checkbox" id="terms" v-model="isCheckboxChecked" />
      <label for="terms" class="terms-label">
        {{ $t("message.entry.termsConditions") }}
      </label>
    </div>

    <nav>
      <div class="button-container mt-7">
        <button type="button" @click="makeNewAccount(this.$i18n.locale)" style="background-color: rgb(45, 76, 135)"
          class="mb-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
          {{ $t("message.entry.newAccount") }}
        </button>

        <button type="button" @click="importWallet" style="background-color: rgb(45, 76, 135)"
          class="mt-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
          {{ $t("message.entry.import") }}
        </button>
      </div>

    </nav>
  </div>
</template>

<script>
import { RouterLink, RouterView, useRouter } from 'vue-router'



export default {
  components: {
    RouterLink,
    RouterView
  },
  data() {
    return {
      isCheckboxChecked: false,
    }
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  }
  ,
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
    makeNewAccount() {
      if (this.isCheckboxChecked) {
        //console.log('makeNewAccount', this.isCheckboxChecked);
        //console.log('makeNewAccount', this.alertVisible);
        this.$router.push('/');
      } else {
        //console.log('makeNewAccount', this.isCheckboxChecked);
        //console.log('makeNewAccount', this.alertVisible);
        const notify = this.$t("message.alert.agree");
        alert(notify);
      }


    },
    importWallet() {
      this.$router.push('/ImportWallet');
    }
  },
  mounted() {

    const lang = localStorage.getItem('language');
    //console.log('현재 lang : ', lang);
    if (lang === '한국어') {
      //console.log('한국어');
      this.changeLanguage('ko');
    } else {
      this.changeLanguage('en');
    }

  }
}

</script>


<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

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
  font-size: 18px;
  /* 텍스트의 글꼴 크기 조정 */
}


.logo {
  display: block;
  margin: 0 auto 2rem;
}


h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
