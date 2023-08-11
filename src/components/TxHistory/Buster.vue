<template>
    <div v-if="isTX" class="flex flex-col w-full px-2 overflow-auto max-h-screen">
        <div class="border border-indigo-800 mt-2 p-2" v-for="(transaction, index) in transactions" :key="index">
            <div class="flex flex-col w-full">
                <p class="font-bold">Transferred {{
                    setBoom(JSON.parse(transaction.actions)[0].Transfer.deposit)
                }} Boom to
                </p>
                <p class="truncate font-bold text-gray-500">{{ transaction.receiver_id }}</p>
                <p class="text-gray-400 truncate">by {{ transaction.signer_id }}</p>
                <a :href="'http://221.148.25.26:3000/search?user_input=' + transaction.hash" target="_blank"
                    class="truncate text-blue-500">Tx Hash : {{ transaction.hash }}</a>

                <!-- <p class="truncate text-blue-500">Tx Hash : {{ transaction.hash }}</p> -->
                <p class="text-gray-400">Created at {{ transaction.created_at }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p class="mt-10"> {{ $t("message.Tx.noTx") }}</p>

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
import { getBusterTxHistory } from '../../NetworkAPI/GetTxHistory.js';
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
        }
    },
    methods: {
        setBoom(yoctoBoom) {

            const NEAR_FACTOR = 24;
            const length = yoctoBoom.length;

            if (length <= NEAR_FACTOR) {
                const Boom = '0.' + yoctoBoom.padStart(NEAR_FACTOR, '0');
                return parseFloat(Boom).toFixed(5)
            } else {
                return BigInt(yoctoBoom) / BigInt('1000000000000000000000000');
            }


        }
    },
    async created() {
        // created 훅에서 props에 접근 가능
        // Vue.js 인스턴스가 생성되고 data, props가 초기화 된 직후에 호출된다.
        console.log("accountID 값:", this.accountID);
        // getBusterTxHistory 등의 함수를 사용하여 필요한 작업 수행 가능
        const data = await getBusterTxHistory(this.accountID);
        console.log('Buster Tx History : ', data);
        // 바인딩해야하는 데이터 : Tx hash, Created at, From, To, deposit
        //const ParseData = Json.parse(data);
        console.log("txHash:", data[0].hash);

        // 서버에서 받은 데이터를 transactions 배열에 할당
        this.transactions = data;
        console.log('this.transactions:', this.transactions);

        if (this.transactions.length === 0) {
            console.log('this.transactions.length === 0');
            this.isTX = false;
        } else {
            console.log('this.transactions.length != 0');
            this.isTX = true;

        }
    }


}
</script>

<style></style>