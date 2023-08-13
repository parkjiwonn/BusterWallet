<template>
  <div class="flex flex-row">
    <h2 class="w-full text-2xl  font-bold flex justify-center mt-6">{{ $t("message.sendBoom.target") }}</h2>

  </div>


  <div class=" relative mt-6">
    <label for="password " class="text-gray-700 mb-3 font-bold ">
      {{ $t("message.sendBoom.title") }}
    </label>
    <input type="text" id="password" ref="cursor"
      class=" mt-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
      name="password" v-model="inputText" />

    <!--특수문자 포함 여부 확인-->
    <div v-if="inputText.trim() !== ''">
      <div v-if="hasSpecialCharacters">
        {{ $t("message.sendBoom.specialCharacters") }}
      </div>

    </div>

    <div class="flex flex-row">

      <button type="button" @click="goBack" style="background-color: rgb(249, 251, 253);"
        class="mt-5 py-2 px-4 mr-3 border border-indigo-800  hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        {{ $t("message.default.cancel") }}
      </button>

      <button type="button" @click="CheckImplicitID" style="background-color: rgb(45, 76, 135);"
        class="mt-5 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        {{ $t("message.default.next") }}
      </button>


    </div>


  </div>
</template>

<script>


export default {
  data() {
    return {
      inputText: "",
      hasSpecialCharacters: false,
      receiverID: '',
      status: ''
    };
  },
  watch: {
    inputText(newText) {
      // 공백이 아니라면 특수문자 포함 여부 확인
      if (newText.trim() !== '') {
        // 입력하는 문자열에 특수문자가 포함되어있는지 확인.
        this.checkSpecialCharacters(newText);
      } else { // 공백이라면 
        this.hasSpecialCharacters = false;

      }
    }
  },
  mounted() {
    this.startCursor();
  },

  methods: {
    startCursor() {
      this.$refs.cursor.focus();
    },

    // 특수문자 포함되어있는지 확인
    checkSpecialCharacters(text) {
      const regex = /[!@#$%^&*(),.?":{}|<>]/;
      this.hasSpecialCharacters = regex.test(text);
      //console.log('checkSpecialCharacters()', this.hasSpecialCharacters);
    },
    goBack() {
      this.$router.go(-1); // 이전 페이지로 이동
    },
    // 암시적 계정 확인
    CheckImplicitID() {
      //console.log('CheckImplicitID()', this.hasSpecialCharacters);
      if (this.hasSpecialCharacters) {
        //console.log('보내는 id 특수기호 포함');
      } else {
        //console.log('보내는 Id 특수문자 미포함');
        // 네트워크 별로 유효성 검사를 다르게 해야 한다.
        const Network = localStorage.getItem('network');
        //console.log('CheckImplicitID() Network :', Network);

        if (Network === 'bitTest') {
          // network가 bitTest 라면
          // 계정 유효성 검사하면 됨.
          //console.log('현재 네트워크 bitTest 임');
          // 필요한 것 : 받는 사람의 공개키, 보내는 사람의 개인키, 보내려는 양 
          // 이부분에서 해야할 것 : 받는 사람의 공개키 유효성 검사 
          // bitcoin testnet 공개키 자릿수 : 34자리
          //console.log('계정의 자릿수 :', this.inputText.length);
          if (this.inputText.length === 34) {
            //console.log('bitTest 자릿수 맞음.');
            this.$router.push({ name: 'SendBoom2', params: { address: this.inputText } });
          } else {
            //console.log('bitTest 자릿수 틀림.');
            alert('유효하지 않은 계정입니다.');
          }

        } else if (Network === 'sepolia') {
          // network가 ethereum 이라면
          // ethereum 공개키 자릿수 : 42자리
          //console.log('현재 네트워크 ethereum 임');
          if (this.inputText.length === 42) {
            //console.log('ethereum 자릿수 맞음.');
            this.$router.push({ name: 'SendBoom2', params: { address: this.inputText } });
          } else {
            //console.log('ethereum 자릿수 틀림.');
            alert('유효하지 않은 계정입니다.');
          }

        } else if (Network === 'near') {
          // near 공개키 자릿수 = 64자리
          //console.log('현재 네트워크 near 임');
          if (this.inputText.length === 64) {
            //console.log('ethereum 자릿수 맞음.');
            this.$router.push({ name: 'SendBoom2', params: { address: this.inputText } });
          } else {
            //console.log('ethereum 자릿수 틀림.');
            alert('유효하지 않은 계정입니다.');
          }
        }
        else {
          // network가 Buster 이거나 near 라면 
          //console.log('현재 네트워크 Buster 임');
          this.ValidateId(this.inputText);
        }

      }
    },
    // 유효한 계정인지 확인
    ValidateId(inputText) {
      //console.log('ValidateId', inputText);

      fetch('https://theblockbuster.org/wallet-server/getAccountState', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accountId: inputText })  // 실제 accountId로 교체
      })
        .then(response => {
          //console.log('response.status', response.status);  // 응답의 상태 코드를 출력
          if (response.status == 500) {
            //console.log('status = 500');
            this.status = 500;
            alert('유효하지 않은 계정입니다.');
          } else if (response.status == 404) {
            //console.log('status = 404');
            this.status = 404;
            alert('계정에 대한 정보를 찾을 수 없습니다.');
          } else {
            this.status = '';
          }
          // 이제 JSON으로 변환하거나, 필요에 따라 다른 작업을 수행
          return response.json();

        })
        .then(data => {
          //console.log('ValidateId data : ', data);
          if (this.status == 500) {

            //console.log('this.status:', this.status);
          } else if (this.status == 400) {
            //console.log('this.status:', this.status);
          } else {
            // 계정 정보가 존재한다면
            this.$router.push({ name: 'SendBoom2', params: { address: inputText } });
          }


        })
        .catch((error) => {
          console.error('Error:', error);


        });

    },

  }

};
</script>