<template>
    <!-- 로딩 표시 -->

    <div v-if="loading" class="fixed top-1/3 ml-20   transform translate-x-1/2 translate-y-1/2 ">
        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-20 w-20"></div>
    </div>


    <div v-else class="flex flex-col">
        <canvas id="PieChart" width="400" height="400"></canvas>

        <div class="mt-10 flex ml-5">
            <!--여기!!!!!!!-->
            <table class="table">
                <thead>
                    <tr>
                        <th class="font-bold">Network</th>
                        <th class="font-bold">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value, index) in formattedAmount" :key="index">
                        <td class="font-bold">{{ networks[index] }}</td>
                        <td>{{ value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { getBusterAccountState, getBitTestState, getEthState, getNearAccountState, setAmount } from '../NetworkAPI/GetAccountStateAPI.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.

export default {
    name: "PieChart",
    data() {
        return {
            networks: [],
            amount: [],
            data: [],
            colors: [],
            loading: true,
            formattedAmount: []
        }
    },
    methods: {
        async setAmountList(network, account) {

            // 현재 유저가 설정한 통화
            const currency = localStorage.getItem('currency');
            switch (network) {
                case 'Buster':
                    console.log('setAmountList() Buster & id', account);
                    // Buster계정의 상태 정보 가져오기
                    const Busterdata = await getBusterAccountState(account);
                    console.log('getBusterAccountState:', Busterdata);
                    const BusterAmount = await setAmount(Busterdata, 'buster', currency);
                    console.log('Buster setAmount :', BusterAmount);
                    this.amount.push(BusterAmount.amount);
                    this.formattedAmount.push(BusterAmount.formatPrice);
                    this.networks.push('Buster');
                    console.log('Amount list :', this.amount);
                    break;

                case 'near':
                    console.log('setAmountList() near & id', account);
                    // Near 계정의 상태 정보 가져오기
                    const Neardata = await getNearAccountState(account);
                    console.log('getNearAccountState:', Neardata);
                    const NearAmount = await setAmount(Neardata, 'near', currency);
                    console.log('Near setAmount :', NearAmount);
                    this.amount.push(NearAmount.amount);
                    this.formattedAmount.push(NearAmount.formatPrice);
                    this.networks.push('near');
                    console.log('Amount list :', this.amount);
                    break;

                case 'ethereum':
                    console.log('setAmountList() ethereum & id', account);
                    // ethereum 계정의 상태 정보 가져오기
                    const EthData = await getEthState(account, 'sepolia');
                    console.log('getEthState :', EthData.balance);
                    const EthAmount = await setAmount(EthData.balance, 'ethereum', currency);
                    console.log('Eth setAmount :', EthAmount);
                    this.amount.push(EthAmount.amount);
                    this.formattedAmount.push(EthAmount.formatPrice);
                    this.networks.push('ethereum');
                    console.log('Amount list :', this.amount);
                    break;

                case 'bitTest':
                    console.log('setAmountList() bitcoin& id', account);
                    // bitTest 계정의 상태 정보 가져오기
                    const bitTestdata = await getBitTestState(account);
                    console.log('getBitTestState :', bitTestdata);
                    const BitAmount = await setAmount(bitTestdata.BTC, 'bitcoin', currency);
                    console.log('Bitcoin setAmount :', BitAmount);
                    this.amount.push(BitAmount.amount);
                    this.formattedAmount.push(BitAmount.formatPrice);
                    this.networks.push('bitTest');
                    console.log('Amount list :', this.amount);
                    break;
            }

        }
    },
    async mounted() {

        const storageKey = localStorage.getItem('hasedPW');
        console.log('storageKey', storageKey);
        const storageValue = localStorage.getItem(storageKey);
        const tasks = []; // 이 배열에 모든 비동기 작업을 저장합니다.

        if (storageValue) {
            const parsedValue = JSON.parse(storageValue);
            console.log('현재 보유중인 네트워크 parsedValue :', parsedValue);

            for (const index in Object.keys(parsedValue)) {
                const network = Object.keys(parsedValue)[index];
                console.log('network 하나씩 :', network);

                if (network === 'Buster') {
                    console.log('network is Buster');


                    this.colors.push('rgb(255, 99, 132)');
                    tasks.push(this.setAmountList('Buster', parsedValue.Buster.implicitAccountId));
                    console.log('network list : ', this.networks);

                } else if (network === 'near') {
                    console.log('network is near');
                    tasks.push(this.setAmountList('near', parsedValue.near.implicitAccountId));

                    this.colors.push('rgb(54, 162, 235)');
                    console.log('network list : ', this.networks);

                } else if (network === 'ethereum') {
                    console.log('network is ethereum');
                    tasks.push(this.setAmountList('ethereum', parsedValue.ethereum.publicKey));

                    this.colors.push('rgb(255, 205, 86)');
                    console.log('network list : ', this.networks);

                } else {
                    console.log('network is bitTest');
                    tasks.push(this.setAmountList('bitTest', parsedValue.bitTest.publicKey));

                    this.colors.push('rgb(28, 228, 75)');
                    console.log('network list : ', this.networks);

                }
            }



        } else {
            console.log("No value found for the storage key:", storageKey);
        }


        console.log('chart 전 amount list : ', this.amount);


        await Promise.all(tasks);
        this.loading = false;
        // 전체 합계 계산
        let sum = this.amount.reduce((a, b) => a + b, 0);

        // 각 원소가 전체 합계에 대해 차지하는 비율 계산
        let percentages = this.amount.map(value => value / sum);

        // 비율이 1% 미만인 원소를 1%로 설정
        let minPercentage = 0.01;  // 1%
        percentages = percentages.map(value => value < minPercentage ? minPercentage : value);

        // 다시 전체 합계로 환산
        this.amount = percentages.map(value => value * sum);


        this.$nextTick(() => {
            const ctx = document.getElementById('PieChart').getContext('2d');
            const PieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: this.networks,
                    datasets: [{
                        label: '잔액',
                        data: this.amount,
                        backgroundColor: this.colors,
                        hoverOffset: 10
                    }]
                }
            });
            // 데이터 할당
            console.log('데이터 할당');
            PieChart;

        });



    }
}
</script>

<style>
.table {
    width: 100%;
    border: 1px solid #ddd;
    border-collapse: collapse;
}

.table th,
.table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.table th {
    background-color: #f2f2f2;
}
</style>

  