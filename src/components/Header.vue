<template>
  <nav class="mb-4 relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 
    text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
    <div class="flex w-full flex-wrap items-center justify-between px-3">

      <div>
        <img alt="Vue logo" src="@/assets/fulllogo_transparent_nobuffer.png" width="40" height="20" @click="goToHome" />
      </div>

      <button class="mr-2 text-2xl ml-auto" @click="toggleDropdown">
        &#9776; <!-- 햄버거 아이콘 -->

        <!-- 드롭다운 메뉴 -->


      </button>
      <div v-if="dropdownVisible" class="absolute right-0 top-full w-36 py-2 bg-white rounded-lg shadow-xl">
        <div @click="goToHome" class="flex items-center px-4 py-2 hover:bg-indigo-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
          </svg>

          <button class="text-gray-800 hover:text-white ml-5">{{ $t("message.header.wallet") }}</button>

        </div>
        <div @click="goToAccount" class="flex items-center px-4 py-2 hover:bg-indigo-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          <button class="text-gray-800 hover:text-white ml-5"> {{ $t("message.header.account") }}</button>

        </div>
        <div @click="goToSetting" class="flex items-center px-4 py-2 hover:bg-indigo-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          <button class="text-gray-800 hover:text-white ml-5">{{ $t("message.header.setting") }}</button>

        </div>
        <div @click="goToLogin" class="flex items-center px-4 py-2 hover:bg-indigo-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>

          <button class="text-gray-800 hover:text-white ml-5">{{ $t("message.header.locked") }}</button>

        </div>
        <div @click="goToInfo" class="flex items-center px-4 py-2 hover:bg-indigo-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>

          <button class="text-gray-800 hover:text-white ml-5">{{ $t("message.header.info") }}</button>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dropdownVisible: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    goToLogin() {
      console.log('setLogin');
      localStorage.setItem('isLocked', true);
      this.$router.push('/Login');
    },
    goToHome() {
      console.log('setHome');
      this.$router.push('/Home/Token');
    },
    goToAccount() {
      console.log('setAccount');
      this.$router.push('/Account');
    },
    goToSetting() {
      console.log('setSetting');
      this.$router.push('/Setting');
    },
    goToInfo() {
      console.log('setInfo');
      this.$router.push('/Info');
    },

  },
  created() {

  }
};
</script>