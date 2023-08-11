<script>
// Router 사용을 위한 Import
import { RouterLink, RouterView, useRouter } from 'vue-router'
// 


export default {
  components: {
    RouterLink,
    RouterView
  },
  // 인스턴스 초기화 과정에서 가장 먼저 실행됨
  computed: {
    isLocked() {
      console.log('isLocked', localStorage.getItem('isLocked')); // 제일 먼저 실행됨

      const isLocked = localStorage.getItem('isLocked');
      if (isLocked === null) {
        localStorage.setItem('language', 'ko');
        console.log('아모고토 없음');
        this.setHello();
      } else {
        return isLocked === 'true'; // 문자열 'true'를 불리언 true로 변환
      }

    }
  },
  methods: {
    setHello() {
      console.log('setHello');
      this.$router.push('/Entry');
    },
    setLogin() {
      console.log('setLogin');
      this.$router.push('/Login');
    },
    setHome() {
      console.log('setHome');
      this.$router.push('/Home');
    }
  },
  mounted() { // 컴포넌트의 템플릿이 DOM에 마운트된 후에 실행됨.
    if (this.isLocked) { // 두번째 실행됨
      console.log('isLocked', localStorage.getItem('isLocked'));
      this.setLogin();
    } else {
      // 잠금이 false인데 키쌍이 있으면 지갑 메인으로 없으면 setHello로
      if (localStorage.getItem('hasedPW')) {
        console.log('mounted', this.isLocked);
        console.log('비밀번호 존재함.')
        this.setHome();

      } else {
        console.log('비밀번호 존재X')
        console.log('mounted', this.isLocked);
        this.setHello(); // 로컬 스토리지가 비어있는 경우 setHello 메소드 호출
      }

    }

  }
};

</script>

<template>
  <div class="app">
    <header>
      <div class="wrapper">
        <RouterView />
      </div>
    </header>

    <!-- 사이드바 -->
    <div class="relative bg-white dark:bg-gray-800">

    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;

  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
