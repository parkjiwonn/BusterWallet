<template>
    <div v-if="isTX" class="flex flex-col w-full px-2 overflow-auto max-h-screen">

        <div class="border border-indigo-800 mt-2 p-2" v-for="(transfer, subIndex) in transactions"
            :key="`${index}-${subIndex}`">
            <div class="flex flex-col w-full">
                <p class="font-bold">Transferred {{
                    transfer.value
                }} Eth to
                </p>
                <p class="truncate font-bold text-gray-500">{{ transfer.to }}</p>
                <p class="text-gray-400 truncate">by {{ transfer.from }}</p>

                <a :href="'https://sepolia.etherscan.io/tx/' + transfer.hash" target="_blank"
                    class="truncate text-blue-500">Tx Hash : {{ transfer.hash }}</a>


            </div>
        </div>

    </div>

    <div v-else>

        <div v-if="loading" class="fixed top-1/3 ml-20   transform translate-x-1/2 translate-y-1/2 ">
            <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-20 w-20">
            </div>
        </div>
        <p v-else class="mt-10">{{ $t("message.Tx.noTx") }}</p>

    </div>
</template>

<style scoped>
.flex {
    display: flex;
    flex-direction: column;
}

.overflow-auto {
    overflow: auto;
}

.max-h-screen {
    max-height: 100vh;
}
</style>


<script>
import { getSepoliaTxHistory } from '../../NetworkAPI/GetTxHistory.js';
export default {
    props: {

        accountID: {
            type: String,
            required: true,
        },

    },
    data() {
        return {
            Deposit: '',
            From: '',
            To: '',
            Created: '',
            TxHash: '',
            transactions: [], // 배열로 받은 여러 개의 데이터를 저장할 배열
            isTX: false,
            loading: true
        }
    },
    async created() {
        // created 훅에서 props에 접근 가능
        // Vue.js 인스턴스가 생성되고 data, props가 초기화 된 직후에 호출된다.
        console.log("accountID 값:", this.accountID);
        // getBusterTxHistory 등의 함수를 사용하여 필요한 작업 수행 가능
        const data = await getSepoliaTxHistory(this.accountID, 'sepolia');
        console.log('Sepolia Tx History : ', data);
        // 바인딩해야하는 데이터 : Tx hash, Created at, From, To, deposit
        // 서버에서 받은 데이터를 transactions 배열에 할당
        this.transactions = data.transfers;
        if (this.transactions.length === 0) {
            console.log('transactions length === 0');
            this.isTX = false;

        } else {
            this.isTX = true;
            console.log('transactions length !=0')

            console.log('this.transactions:', this.transactions);
            console.log('this.transactions.length :', this.transactions.length);
        }

        this.loading = false;

    }
}
</script>

<style></style>