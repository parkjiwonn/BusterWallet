// // 이더리움 Tx History 가져오기
// export async function getEthTxHistory(address,network) {
//     try {
//         console.log('getEthTxHistory1');
//         const response = await fetch(`http://221.148.25.26:4000/ethereum/getTxList?network=${network}&account=${address}`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

// Buster Tx History 가져오기
export async function getBusterTxHistory(address) {
    try {
        console.log('getBusterTxHistory');
        const response = await fetch(`http://221.148.25.26:4000/getTxList?account=${address}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('getBusterTxHistory() :', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Near Tx History 가져오기
export async function getNearTxHistory(address) {
    try {
        console.log('getNearTxHistory 들어옴');
        const response = await fetch(`http://221.148.25.26:4000/near/getTxList?account=${address}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('getNearTxHistory() :', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Sepolia Tx History 가져오기
export async function getSepoliaTxHistory(address, network) {
    try {
        console.log('getNearTxHistory 들어옴');
        const response = await fetch(`http://221.148.25.26:4000/ethereum/getTxList?account=${address}&network=${network}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('getNearTxHistory() :', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Bitcoin Tx History 가져오기
export async function getBitcoinTxHistory(address) {
    try {
        console.log('getNearTxHistory 들어옴');
        const response = await fetch(`http://221.148.25.26:4000/bitcoin/getTxList?address=${address}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('getNearTxHistory() :', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}