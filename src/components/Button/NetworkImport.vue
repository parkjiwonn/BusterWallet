<template>
    <button type="button" @click="handleButtonClick"
        class="mr-5  px-4  border-2 border-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        {{ $t("message.networkImport.importAccount") }}
    </button>

    <!-- NEAR 모달 창을 나타내는 부분 -->
    <div v-if="showNearModal" class="modal">
        <!-- NEAR 모달 내용 -->
        <!-- 모달을 닫기 위한 버튼 등을 추가하거나 원하는 내용을 작성합니다. -->
        <div class="modal-content">
            <h3 class="font-bold">{{ $t("message.networkImport.nearText") }}</h3>
            <input ref="cursor" class="mt-5 w-full" v-model="nearInput" type="text" placeholder="" />
            <div class="modal-buttons ">
                <button @click="cancelModal('near')"
                    class="px-8 mr-3 border-2 border-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">

                    {{ $t("message.networkImport.cancel") }}</button>
                <button @click="confirmModal('near')"
                    class="px-8  border-2 border-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">

                    {{ $t("message.networkImport.verify") }}</button>
            </div>
        </div>
    </div>

    <!-- ethereum 모달 창을 나타내는 부분 -->
    <div v-if="showBitcoinModal" class="modal">
        <!-- ethereum 모달 내용 -->
        <!-- 모달을 닫기 위한 버튼 등을 추가하거나 원하는 내용을 작성합니다. -->
        <div class="modal-content">
            <h3 class="font-bold">{{ $t("message.networkImport.bitText") }}</h3>
            <input ref="cursor" class="mt-5 w-full" v-model="BitcoinInput" type="text" placeholder="" />
            <div class="modal-buttons ">
                <button @click="cancelModal('bitcoin')"
                    class="px-8 mr-3 border-2 border-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">

                    {{ $t("message.networkImport.cancel") }}</button>
                <button @click="confirmModal('bitcoin')"
                    class="px-8  border-2 border-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">

                    {{ $t("message.networkImport.verify") }}</button>
            </div>
        </div>
    </div>

    <!-- Bitcoin 모달 창을 나타내는 부분 -->
    <div v-if="showEthereumModal" class="modal">
        <!-- Bitcoin 모달 내용 -->
        <!-- 모달을 닫기 위한 버튼 등을 추가하거나 원하는 내용을 작성합니다. -->
        <div class="modal-content">
            <h3 class="font-bold">{{ $t("message.networkImport.etherText") }}</h3>
            <input ref="cursor" class="mt-5 w-full" v-model="ethereumInput" type="text" placeholder="" />
            <div class="modal-buttons ">
                <button @click="cancelModal('ethereum')"
                    class="px-8 mr-3 border-2 border-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">

                    {{ $t("message.networkImport.cancel") }}</button>
                <button @click="confirmModal('ethereum')"
                    class="px-8  border-2 border-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">

                    {{ $t("message.networkImport.verify") }}</button>
            </div>
        </div>
    </div>
</template>

<script>

import { ImportNearAccount, ImportEthAccount, ImportBitAccount } from '../../NetworkAPI/ImportAccount.js';

export default {
    props: {
        message: String
    },
    data() {
        return {
            showNearModal: false,
            showEthereumModal: false,
            showBitcoinModal: false,
            nearInput: '',
            ethereumInput: '',
            BitcoinInput: ''
        }
    },
    watch: {
        showNearModal() {
            //console.log('showNearModal open');
            this.startCursor();
        },
        showEthereumModal() {
            //console.log('showEthereumModal open');
            this.startCursor();
        },
        showBitcoinModal() {
            //console.log('showBitcoinModal open');
            this.startCursor();
        }
    },
    methods: {
        startCursor() {
            this.$nextTick(() => {
                this.$refs.cursor.focus();
                // $refs 사용할 때 참조하려는 element가 Dom에 실제로 존재하지 않으면 undefined 반환함.
                // watch는 shownearmodal 값 변화 감지하고 watch 내부동작하는 건 빠르게 처리
                // But 실제 DOM 업데이트는 비동기적으로 이뤄짐
                // shownearmodal실행할때는 DOM 업뎃이 완료되지 않아 focus할 수 없었던 것. 
                // DOM 업데이트가 완료된 후에 startCursor를 실행하도록 설정
                // $nextTick은 다음 DOM 업데이트 사이클이 끝난 후에 콜백을 실행하도록 예약하는 메소드
            });
        },
        // 모달창 취소 버튼 클릭 이벤트
        cancelModal(message) {
            if (message === 'near') {
                this.showNearModal = false;
                this.nearInput = '';
            } else if (message === 'ethereum') {
                this.showEthereumModal = false;
                this.ethereumInput = '';
            } else {
                this.showBitcoinModal = false;
                this.BitcoinInput = '';
            }
        },
        // 모달창 확인 버튼 클릭 이벤트
        confirmModal(message) {
            if (message === 'near') {
                // Near 모달 확인 버튼 클릭 시 처리
                //console.log('Near 데이터:', this.nearInput);
                this.showNearModal = false;

                this.importNearAccount();
                this.nearInput = '';
            } else if (message === 'ethereum') {
                // Ethereum 모달 확인 버튼 클릭 시 처리
                //console.log('Ethereum 데이터:', this.ethereumInput);
                this.showEthereumModal = false;

                this.importEthAccount();
                this.ethereumInput = '';
            } else {
                // Bitcoin 모달 확인 버튼 클릭 시 처리
                //console.log('Bitcoin 데이터:', this.BitcoinInput);
                this.showBitcoinModal = false;

                this.importBitTestAccount();
                this.BitcoinInput = '';
            }
        },
        // 부모 컴포넌트에서 보낸 메세지 받는 부분
        handleButtonClick() {
            //console.log('handleButtonClick()', this.message);
            if (this.message === 'near') {
                // near 
                this.showNearModal = true;

            } else if (this.message === 'ethereum') {
                // ethereum
                this.showEthereumModal = true;
            }
            else {
                // bitcoin Testnet
                this.showBitcoinModal = true;
            }
        },
        // 부모 컴포넌트로 메세지 보내는 부분
        sendMessage(network) {
            this.$emit('message-from-child', network);

        },
        // Network Import 관련 호출하는 부분
        async importBitTestAccount() {
            //console.log('ImportBitAccount 전 Bitcoin input : ', this.BitcoinInput);
            const BitData = await ImportBitAccount(this.BitcoinInput);
            //console.log('importBitTestAccount:', BitData);

            // import하고 바로 storage에 넣기

            this.sendMessage('BitTest');
        },
        // API   호출하는 부분 
        async importNearAccount() {
            //const data = await ImportNearAccount(this.BusterID);
            //console.log('importNearAccount() 전 Near input :', this.nearInput);
            const NearData = await ImportNearAccount(this.nearInput);
            //console.log('importNearAccount() 호출 후 :', NearData);
            this.sendMessage('near');
        },
        async importEthAccount() {
            //console.log('importEthAccount() 전 Eth input :', this.ethereumInput);
            const EthData = await ImportEthAccount(this.ethereumInput);
            //console.log('importEthAccount 호출 후 :', EthData);
            this.sendMessage('ethereum');
        },


    },
    created() {

    }
}
</script>

<style>
/* 모달 스타일 */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* 적절한 z-index 값 설정 */
}

/* 모달 내용 스타일 */
.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 4px;
}

/* 모달 버튼 그룹 스타일 */
.modal-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

/* 모달 버튼 스타일 */
.modal-buttons button {

    margin-left: 0px;
    cursor: pointer;
}
</style>