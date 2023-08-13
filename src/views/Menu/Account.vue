<template>
    <Header />
    <div class="">


        <div class="">
            <!-- Buster Mainnet -->
            <div class="flex flex-col border border-gray-200 p-3 h-36">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex items-center">
                        <img alt="Vue logo" src="@/assets/icononly_nobuffer.png" width="30" class="p-1" />
                        <h1 class="text-xl font-bold ml-2 py-1">Buster Mainnet</h1>
                    </div>
                    <img v-if="keys.includes('Buster')" alt="account menu" src="@/assets/free-icon-menu-4947596.png"
                        width="30" class="p-2" @click="toggleDropdown('buster')" />
                </div>

                <!-- 토글 관련 div를 img 아래에 배치 -->
                <div v-if="dropdownVisible"
                    class="absolute left-40 ml-10 mt-7 w-40  bg-white rounded-lg shadow-xl hover:bg-indigo-300">
                    <!-- 내용 추가 -->
                    <div class="flex flex-col items-center px-2 py-2 ">
                        <button class="text-gray-800 hover:text-white" @click="FindPrivateKey('buster')"> {{
                            $t("message.account.accountDetail") }}</button>
                        <button class="text-gray-800 hover:text-white" @click="DeleteKey('buster')"> {{
                            $t("message.account.accountDelete") }}</button>
                    </div>
                </div>


                <div v-if="keys.includes('Buster')">
                    <!-- Buster 계정 정보 필요한 것: 암시적 계정, 잔액 -->
                    <div class="flex flex-row mt-5">
                        <p class="font-bold"> AccountID: </p>
                        <p class="truncate">{{ BusterID }}</p>
                    </div>

                    <div class="flex flex-row">
                        <p class="font-bold"> Amount: </p>
                        <p>{{ BusterAmount }} Boom</p>
                    </div>


                </div>

            </div>


            <!-- Near Protocol -->
            <div class="flex flex-col border border-gray-200 p-2 h-36">
                <div class="flex flex-row items-center justify-between">
                    <div class="flex items-center">
                        <img alt="Vue logo" src="@/assets/nearlogo.png" width="40" class="p-1" />
                        <h1 class="text-xl font-bold py-2">NearProtocol</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 ml-2" @mouseover="showTip = true"
                            @mouseleave="showTip = false">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>

                        <!-- 말풍선을 나타낼 div 요소 -->
                        <div v-if="showTip" class="tooltip">
                            {{ $t("message.account.warn") }}
                        </div>
                    </div>



                    <img v-if="keys.includes('near')" alt="account menu" src="@/assets/free-icon-menu-4947596.png"
                        width="30" class="p-2" @click="toggleDropdown('near')" />
                </div>

                <!-- 토글 관련 div를 img 아래에 배치 -->
                <div v-if="NeardropdownVisible"
                    class="absolute left-40 ml-10 mt-7 w-40  bg-white rounded-lg shadow-xl hover:bg-indigo-300">
                    <!-- 내용 추가 -->
                    <div class="flex flex-col items-center px-2 py-2 ">
                        <button class="text-gray-800 hover:text-white " @click="FindPrivateKey('near')"> {{
                            $t("message.account.accountDetail") }}</button>
                        <button class="text-gray-800 hover:text-white " @click="DeleteKey('near')"> {{
                            $t("message.account.accountDelete") }}</button>
                    </div>
                </div>



                <!--만약 near 계정이 있다면-->
                <div v-if="keys.includes('near')">

                    <div class="flex flex-row mt-5">
                        <p class="font-bold"> AccountID: </p>
                        <p class="truncate">{{ NearID }}</p>
                    </div>

                    <div class="flex flex-row ">
                        <p class="font-bold"> Amount: </p>
                        <p>{{ NearAmount }}</p>
                    </div>

                </div>
                <!--만약 near 계정이 없다면-->
                <div v-else class="flex flex-row mt-5">
                    <CreateButton message="near" @message-from-child="handleMessageFromChild" />
                    <ImportButton message="near" @message-from-child="ImportMessageFromChild" />
                </div>
            </div>

            <!-- Ethereum -->
            <div class="flex flex-col border border-gray-200 p-2 h-36">
                <div class="flex flex-row items-center justify-between">
                    <div class="flex items-center">
                        <img alt="Vue logo" src="@/assets/free-icon-etherum-5968321.png" width="40" class="p-2" />
                        <h1 class="text-xl font-bold py-2 mr-5">Ethereum</h1>
                    </div>

                    <img v-if="keys.includes('ethereum')" alt="account menu" src="@/assets/free-icon-menu-4947596.png"
                        width="30" class="p-2" @click="toggleDropdown('ethereum')" />
                </div>

                <!-- 토글 관련 div를 img 아래에 배치 -->
                <div v-if="EthdropdownVisible"
                    class="absolute left-40 ml-10 mt-7 w-40  bg-white rounded-lg shadow-xl hover:bg-indigo-300">
                    <!-- 내용 추가 -->
                    <div class="flex flex-col items-center px-2 py-2 ">
                        <button class="text-gray-800 hover:text-white " @click="FindPrivateKey('ethereum')"> {{
                            $t("message.account.accountDetail") }}</button>
                        <button class="text-gray-800 hover:text-white " @click="DeleteKey('ethereum')"> {{
                            $t("message.account.accountDelete") }}</button>
                    </div>
                </div>

                <div v-if="keys.includes('ethereum')" id="example-5" class="demo mb-2">

                    <select v-model="selected">
                        <option v-for="(item, index) in EthNetworkList" :key="index" :value="item.value">{{ item.name }}
                        </option>
                    </select>
                </div>
                <!--만약 ethereum 계정이 있다면-->
                <div v-if="keys.includes('ethereum')">

                    <div class="flex flex-row">
                        <p class="font-bold"> AccountID: </p>
                        <p class="truncate">{{ EthID }}</p>
                    </div>

                    <div class="flex flex-row">
                        <p class="font-bold"> Amount: </p>
                        <p>{{ EthAmount }} Boom</p>
                    </div>


                </div>
                <!--만약 ethereum 계정이 없다면-->
                <div v-else class="flex flex-row mt-5">
                    <CreateButton message="ethereum" @message-from-child="handleMessageFromChild" />
                    <ImportButton message="ethereum" @message-from-child="ImportMessageFromChild" />
                </div>
            </div>


            <!-- Bitcoin -->
            <div class="flex flex-col border border-gray-200 p-2 h-36">
                <div class="flex flex-row items-center justify-between">
                    <div class="flex items-center">
                        <img alt="Vue logo" src="@/assets/free-icon-bitcoin-5968260.png" width="40" height="10"
                            class="p-2" />
                        <h1 class="text-xl font-bold py-2">Bitcoin Testnet</h1>
                    </div>

                    <img v-if="keys.includes('bitTest')" alt="account menu" src="@/assets/free-icon-menu-4947596.png"
                        width="30" class="p-2" @click="toggleDropdown('bitcoin')" />
                </div>


                <!-- 토글 관련 div를 img 아래에 배치 -->
                <div v-if="BitdropdownVisible"
                    class="absolute left-40 ml-10 mt-7 w-40  bg-white rounded-lg shadow-xl hover:bg-indigo-300">
                    <!-- 내용 추가 -->
                    <div class="flex flex-col items-center px-2 py-2 ">
                        <button class="text-gray-800 hover:text-white " @click="FindPrivateKey('bitcoin')"> {{
                            $t("message.account.accountDetail") }}</button>
                        <button class="text-gray-800 hover:text-white " @click="DeleteKey('bitcoin')"> {{
                            $t("message.account.accountDelete") }}</button>
                    </div>
                </div>

                <div v-if="keys.includes('bitTest')">

                    <div class="flex flex-row mt-5">
                        <p class="font-bold"> AccountID: </p>
                        <p class="truncate">{{ BitTestID }}</p>
                    </div>

                    <div class="flex flex-row">
                        <p class="font-bold"> Amount: </p>
                        <p>{{ BitTestAmount }} Boom</p>
                    </div>

                </div>
                <!--만약 bitcoin 계정이 없다면-->
                <div v-else class="flex flex-row mt-5">
                    <CreateButton message="bitcoinTestnet" @message-from-child="handleMessageFromChild" />
                    <ImportButton message="bitcoinTestnet" @message-from-child="ImportMessageFromChild" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import CreateButton from '../../components/Button/NetworkAccount.vue';
import ImportButton from '../../components/Button/NetworkImport.vue';

import { getBusterAccountState, getBitTestState, getEthState, getNearAccountState } from '../../NetworkAPI/GetAccountStateAPI.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.



export default {
    components: {
        Header,
        CreateButton,
        ImportButton
    },
    data() {
        return {
            BusterID: '',
            BusterAmount: '',
            NearID: '',
            NearAmount: '',
            EthID: '',
            EthAmount: '',
            BitMainID: '',
            BitMainAmount: '',
            BitTestID: '',
            BitTestAmount: '',
            keys: [],
            EthNetworkList: [
                { name: "Ethereum", value: "ethereum" },
                { name: "Sepolia (Ethereum Testnet)", value: "sepolia" },
            ],
            selected: "",
            showTip: false,
            dropdownVisible: false,
            NeardropdownVisible: false,
            EthdropdownVisible: false,
            BitdropdownVisible: false,


        };
    },
    watch: {
        async selected(newValue) {
            //console.log('selected', newValue);
            if (newValue === 'sepolia') {
                const ethState = await getEthState(this.EthID, 'sepolia');
                //console.log('Ethstate sepolia :', ethState);
                this.EthAmount = parseFloat(ethState.balance).toFixed(4);
            } else {
                const ethState = await getEthState(this.EthID, 'mainnet');
                //console.log('Ethstate mainnet :', ethState);
                this.EthAmount = ethState.balance;
            }

        },

    },
    methods: {
        // Network 별 계정 생성 API 요청하는 부분
        async fetchData(network) {
            try {
                switch (network) {

                    case 'Buster':
                        const data = await getBusterAccountState(this.BusterID);
                        //console.log('getAccountState:', data);
                        this.BusterAmount = data;
                        break;

                    case 'near':
                        //console.log('getNearAccountState :');
                        const Neardata = await getNearAccountState(this.NearID);
                        //console.log('getNearAccountState:', Neardata);
                        if (Neardata === 'notExist') {
                            //console.log('해당 near 계정은 존재하지 않는 계정');
                            this.NearAmount = '-NEAR';
                        } else {
                            this.NearAmount = parseFloat(Neardata).toFixed(5) + "NEAR";

                        }
                        break;

                    case 'ethereum':
                        //console.log('getEthAccountState :');
                        const ethState = await getEthState(this.EthID, 'mainnet');
                        //console.log('EthState :', ethState);
                        //console.log('ethstate.balance : ', ethState.balance);

                        if (ethState.balance === '0') {
                            //console.log('ethereum 잔액 0원');
                            this.EthAmount = ethState.balance;
                        } else {
                            //console.log('ethereum 잔액 0원 아님');
                            this.EthAmount = parseFloat(ethState.balance).toFixed(4);
                        }



                        break;

                    case 'BitTest':
                        //console.log('getBitTestAccountState BitTestId:', this.BitTestID);
                        const bitTestState = await getBitTestState(this.BitTestID);
                        //console.log('bitTestState : ', bitTestState);
                        this.BitTestAmount = bitTestState.data.balance;
                        break;
                }



            } catch (error) {
                // Handle error here
            }
        },
        // 계정 상세보기 선택시 라우터 이동하는 메서드 
        FindPrivateKey(network) {

            switch (network) {
                case 'buster':
                    this.$router.push({ name: 'WritePass', params: { network: network } });
                    break;

                case 'near':
                    this.$router.push({ name: 'WritePass', params: { network: network } });
                    break;

                case 'ethereum':
                    this.$router.push({ name: 'WritePass', params: { network: network } });
                    break;

                case 'bitcoin':
                    this.$router.push({ name: 'WritePass', params: { network: network } });
                    break;

            }

        },
        async toggleDropdown(network) {


            switch (network) {
                case 'buster':
                    //console.log('BustertoggleDropdown');
                    if (this.dropdownVisible) {
                        this.dropdownVisible = false;
                    } else {
                        this.closeAllDropdowns();
                        this.dropdownVisible = true;
                    }
                    break;

                case 'near':
                    //console.log('NeartoggleDropdown');
                    if (this.NeardropdownVisible) {
                        this.NeardropdownVisible = false;
                    } else {
                        this.closeAllDropdowns();
                        this.NeardropdownVisible = true;
                    }
                    break;

                case 'ethereum':
                    //console.log('EthtoggleDropdown');
                    if (this.EthdropdownVisible) {
                        this.EthdropdownVisible = false;
                    } else {
                        this.closeAllDropdowns();
                        this.EthdropdownVisible = true;
                    }
                    break;

                case 'bitcoin':
                    //console.log('BittoggleDropdown');
                    if (this.BitdropdownVisible) {
                        this.BitdropdownVisible = false;
                    } else {
                        this.closeAllDropdowns();
                        this.BitdropdownVisible = true;
                    }
                    break;
            }

        },

        closeAllDropdowns() {
            this.dropdownVisible = false;
            this.NeardropdownVisible = false;
            this.EthdropdownVisible = false;
            this.BitdropdownVisible = false;
        },

        // 계정 생성 버튼 부모 컴포넌트에서 오는 메시지 받는 부분
        handleMessageFromChild(message) {
            //console.log('handleMessageFromChild', message);
            //console.log('message.network', message.network);
            //console.log('message.publicKey', message.publicKey);
            switch (message.network) {
                case 'near':
                    //console.log('handleMessageFromChild', message);
                    this.NearID = message.publicKey;
                    this.setNearState();
                    alert('NearProtocol의 계정 생성이 완료됐습니다!');
                    this.$router.push('/Home/Token');
                    break;

                case 'ethereum':
                    //console.log('handleMessageFromChild', message);
                    this.EthID = message.publicKey;
                    this.setEthState();
                    alert('Ethereum의 계정 생성이 완료됐습니다!');
                    this.$router.push('/Home/Token');
                    break;

                case 'BitTest':
                    this.BitTestID = message.publicKey;
                    this.setBitTestState();
                    alert('BitCoin Testnet의 계정 생성이 완료됐습니다!');
                    this.$router.push('/Home/Token');
                    break;
            }
        },
        // import 버튼 부모 컴포넌트에서 오는 메세지 받는 부분
        ImportMessageFromChild(message) {
            //console.log('ImportMessageFromChild', message);
            switch (message) {
                case 'near':
                    //console.log('ImportMessageFromChild', message);
                    alert('NearProtocol의 계정 import가 완료됐습니다!');
                    this.$router.push('/Home/Token');

                    break;

                case 'ethereum':
                    //console.log('ImportMessageFromChild', message);
                    alert('Ethereum의 계정 import가 완료됐습니다!');
                    this.$router.push('/Home/Token');
                    break;

                case 'BitTest':
                    //console.log('ImportMessageFromChild', message);
                    alert('BitCoin Testnet의 계정 import가 완료됐습니다!');
                    this.$router.push('/Home/Token');

                    break;
            }
        },
        setBusterState() {
            this.fetchData('Buster');
        },
        setNearState() {
            this.fetchData('near');
        },
        setEthState() {
            this.fetchData('ethereum');
        },
        setBitTestState() {
            this.fetchData('BitTest');
        },
        DeleteKey(network) {
            const storageKey = localStorage.getItem('hasedPW');
            //console.log('storageKey', storageKey);
            const storageValue = localStorage.getItem(storageKey);
            const parsedValue = JSON.parse(storageValue);
            // nework 별 키쌍을 삭제해야 한다.
            switch (network) {

                case 'buster':
                    //console.log('DeleteKey buster');

                    // 키쌍 삭제
                    delete parsedValue['Buster'];
                    // 다시 localStorage에 저장
                    localStorage.setItem(storageKey, JSON.stringify(parsedValue));
                    //console.log('Buster 계정 삭제후:', parsedValue);
                    alert('Buster의 계정이 삭제되었습니다.');

                    this.$router.push('/Home/Token');
                    break;

                case 'near':
                    //console.log('DeleteKey near');
                    // 키쌍 삭제
                    delete parsedValue['near'];
                    // 다시 localStorage에 저장
                    localStorage.setItem(storageKey, JSON.stringify(parsedValue));
                    //console.log('near 계정 삭제후:', parsedValue);
                    alert('NearProtocol의 계정이 삭제되었습니다.');

                    this.$router.push('/Home/Token');
                    break;

                case 'ethereum':
                    //console.log('DeleteKey ethereum');
                    // 키쌍 삭제
                    delete parsedValue['ethereum'];
                    // 다시 localStorage에 저장
                    localStorage.setItem(storageKey, JSON.stringify(parsedValue));
                    //console.log('ethereum 계정 삭제후:', parsedValue);
                    alert('Ethereum의 계정이 삭제되었습니다.');

                    this.$router.push('/Home/Token');
                    break;

                case 'bitcoin':
                    //console.log('DeleteKey bitcoin');
                    // 키쌍 삭제
                    delete parsedValue['bitTest'];
                    // 다시 localStorage에 저장
                    localStorage.setItem(storageKey, JSON.stringify(parsedValue));
                    //console.log('Bitcoin Testnet 계정 삭제후:', parsedValue);
                    alert('Bitcoin Testnet 계정이 삭제되었습니다.');

                    this.$router.push('/Home/Token');
                    break;

            }
        },
        changeLanguage(lang) {
            this.$i18n.locale = lang;
        },

    },
    mounted() {
        //console.log('mounted()');

        // 현재 설정되어있는 언어가 어떤건지 확인하기
        const lang = localStorage.getItem('language');
        //console.log('현재 lang : ', lang);
        if (lang === '한국어') {
            //console.log('한국어');
            this.changeLanguage('ko');
        } else {
            this.changeLanguage('en');
        }

        // Vue 인스턴스가 DOM에 마운트된 직후에 호출 -> DOM 요소에 접근하거나 조작하기에 적합함.
        // Created는 인스턴스가 생성된 직후에 호출 -> DOM이 아직 마운팅 안됨. 데이터 초기화, 초기 컴포넌트 설정에 적합함.
        // 현재 유저가 어떤 네트워크의 계정들을 갖고있는지 확인.
        const storageKey = localStorage.getItem('hasedPW');
        //console.log('storageKey', storageKey);
        const storageValue = localStorage.getItem(storageKey);

        if (storageValue) {
            const parsedValue = JSON.parse(storageValue);
            this.keys = Object.keys(parsedValue); // keys 배열에 네트워크 키 할당

            // 현재 있는 network를 싹 돈다.
            for (const index in this.keys) {
                const network = this.keys[index];
                //console.log('network 하나씩 :', network);

                if (network === 'Buster' || network === 'near') {

                    if (network === 'Buster') {
                        //console.log('Buster임');
                        this.BusterID = parsedValue.Buster.implicitAccountId;
                        //console.log('this.BusterID :', this.BusterID);
                        this.setBusterState();
                    } else {
                        //console.log('near임');
                        this.NearID = parsedValue.near.implicitAccountId;
                        //console.log('this.NearID :', this.NearID);
                        this.setNearState();
                    }
                } else {

                    if (network === 'ethereum') {
                        //console.log('ethereum임');
                        this.EthID = parsedValue.ethereum.publicKey;
                        //console.log('this.EthID :', this.EthID);
                        this.setEthState();
                        this.selected = 'ethereum';
                    } else {
                        //console.log('bitTest임');
                        this.BitTestID = parsedValue.bitTest.publicKey;
                        //console.log('this.BitTestID:', this.BitTestID);
                        this.setBitTestState();
                    }
                }
            }

            //console.log("현재 보유중인 Networks:", this.keys);
        } else {
            //console.log("No value found for the storage key:", storageKey);
        }
    }
};
</script>
  
<style>
/* .near-logo-container에 대한 스타일 */
.near-logo-container {
    display: flex;
    align-items: center;
    cursor: pointer;
}

/* 말풍선을 나타낼 tooltip에 대한 스타일 */
.tooltip {
    position: absolute;
    top: 290px;
    left: 80px;
    background-color: #c4caf0;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 100;
    /* 필요에 따라 더 많은 스타일을 추가할 수 있습니다. */
}
</style>