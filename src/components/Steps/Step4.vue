<template>
    <div class="flex justify-center mt-10">
        <img alt="Vue logo" src="@/assets/free-icon-confetti-5016898.png" width="50" height="50" />
    </div>

    <div>
        <h2 class="text-2xl font-bold flex justify-center mt-6">
            {{ $t("message.step4.title") }}
        </h2>

        <p class="text-center mt-5">
            {{ $t("message.step4.description1") }}<br />
            {{ $t("message.step4.description2") }}<br />
            {{ $t("message.step4.description3") }}
        </p>

        <div class="mt-5">
            <p class="text-lg">
                {{ $t("message.step4.warnText1") }}<br />
                {{ $t("message.step4.warnText2") }}
            </p>
        </div>

        <button type="button" @click="goToHome" style="background-color: rgb(45, 76, 135)"
            class="mt-8 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
            {{ $t("message.step4.check") }}
        </button>

    </div>
</template>
  

<script>
export default {
    methods: {
        goToHome() {
            this.$router.push('/Home');
        },
        changeLanguage(lang) {
            this.$i18n.locale = lang;
        },
    },
    mounted() {

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