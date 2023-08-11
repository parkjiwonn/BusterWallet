<template>
    <header>
        <div class="flex justify-center">
            <span
                class="px-3.5 py-1 text-base rounded-full text-indigo-900 bg-transparent border-2 border-indigo-800 mr-20">
                1
            </span>
            <span class="px-3 py-1 text-base rounded-full text-indigo-900 bg-transparent border-2 border-indigo-800 mr-20">
                2
            </span>
            <span class="px-3 py-1 text-base rounded-full text-indigo-900 bg-transparent border-2 border-indigo-800">
                3
            </span>

        </div>

        <div class="flex justify-center mt-2">

            <p class="mr-5 ml-3">{{ $t("message.header.createPw") }}</p>
            <p class="mr-5">{{ $t("message.header.createMnemonic") }}</p>
            <p class="">{{ $t("message.header.checkMnemonic") }}</p>

        </div>

        <div>
            <h2 class="text-2xl  font-bold flex justify-center mt-6">{{ $t("message.step3.title") }}</h2>

        </div>

        <div class="mt-3 relative">
            <p class="mb-3">{{ $t("message.step3.description") }}</p>

            <h3 class="text-xl fond-bold mb-3">Word #{{ randomIndex + 1 }}</h3>
            <input type="text" id="nimonic" v-model="inputValue"
                class="mb-3 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                placeholder="" />
            <p v-if="showErrorMessage" class="text-red-500"> {{ $t("message.step3.warnText") }}</p>

        </div>

        <!--니모닉 문구가 맞지 않다면 버튼 비활성화-->
        <button type="button" @click="checkNimonic" style="background-color: rgb(45, 76, 135);"
            class="mt-5 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            {{ $t("message.default.next") }}
        </button>




    </header>
</template>

<script>



export default {
    name: 'CheckNimonic',
    props: {
        nimonic: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            randomIndex: null,
            inputValue: '',
            showErrorMessage: false,
            publicKey: '',
            privateKey: '',

        };
    },
    validator: (value) => {
        // "nimonic"이 배열이며 최소한 하나의 요소를 가지고 있는지 유효성을 검사합니다.
        return Array.isArray(value) && value.length > 0;
    },
    methods: {
        changeLanguage(lang) {
            this.$i18n.locale = lang;
        },
        // 다음 페이지로 이동하는 메서드
        goToStep4() {
            this.$router.push('/Success');
        },
        // 랜덤한 index 뽑는 메서드
        generateRandomIndex() {
            return Math.floor(Math.random() * this.$route.params.nimonic.length);
        },
        // 단어 일치 여부 확인
        checkNimonic() {
            if (this.inputValue === this.$route.params.nimonic[this.randomIndex]) {
                // nimonic 맞는지 확인한 다음에 키들 local storage에 저장하기
                this.setAccountInfo();

            } else {
                this.showErrorMessage = true;
            }
        },
        setAccountInfo() {
            // 계정 정보 local storage 에 저장하는 것.
            // const seedPhrase = {
            //         seedPhrase: 'trim core program that minor quit snap know chronic lazy future quantum',
            //     };
            console.log("this.$route.params.nimonic", this.$route.params.nimonic);
            const seedPhrase = this.$route.params.nimonic.join(' ');
            const seedPhraseData = { seedPhrase: seedPhrase };
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
                    // data will contain the publicKey, secretKey, and implicitAccountId
                    console.log('publicKey:', data.publicKey);
                    console.log('secretKey:', data.secretKey);
                    console.log('implicitAccountId:', data.implicitAccountId);

                    this.publicKey = data.publicKey;
                    this.privateKey = data.secretKey;
                    console.log('data.publicKey', this.publicKey);
                    console.log('data.secretKey', this.privateKey);

                    // 블체 네트워크에 계정이 생성되면 로컬 스토리지에 저장한다.
                    // You can store these values in localStorage or anywhere else
                    // localStorage.setItem('publicKey', data.publicKey);
                    // localStorage.setItem('secretKey', data.secretKey);
                    // localStorage.setItem('implicitAccountId', data.implicitAccountId);
                    const hasedPW = localStorage.getItem('hasedPW');

                    // JSON 객체 생성
                    const jsonObject1 = { publicKey: data.publicKey, privateKey: data.secretKey, implicitAccountId: data.implicitAccountId };

                    // 네트워크, USD, 한국어
                    localStorage.setItem('network', 'Buster');
                    localStorage.setItem('currency', 'USD');
                    localStorage.setItem('language', 'ko');
                    const userObject = { Buster: jsonObject1 };
                    localStorage.setItem(hasedPW, JSON.stringify(userObject));

                    console.log('localStorage.getItem(hasedPW)', localStorage.getItem(hasedPW))
                    const parsedObject = JSON.parse(localStorage.getItem(hasedPW));
                    console.log('parsedObject:', parsedObject);
                    this.createAccount();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        createAccount() {
            console.log('createAccount(1)');
            console.log(this.$route.params.nimonic);
            const seedPhrase = this.$route.params.nimonic.join(' ');
            console.log(seedPhrase);
            const seedPhraseData = { seedPhrase: seedPhrase, publicKey: this.publicKey, privateKey: this.privateKey };
            const seedPhraseJsonString = JSON.stringify(seedPhraseData);
            console.log('createAccount(2)');

            fetch('http://221.148.25.26:4000/createAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: seedPhraseJsonString,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('createAccount(3)', data);

                    this.goToStep4();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


        }
    },
    created() {
        this.randomIndex = this.generateRandomIndex();
        console.log(this.$route.params.nimonic);
        console.log(this.randomIndex);
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
