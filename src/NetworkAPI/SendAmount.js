
export async function SendEth(senderPrivateKey, receiverAddress, amount) {
    try {
        const response = await fetch(`https://theblockbuster.org/wallet-server/ethreum/send`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderPrivateKey: senderPrivateKey,
                receiverAddress: receiverAddress,
                amount: amount
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //console.log('SendEth():', data);

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function CalculateGas(Ether, toAddress) {
    try {

        const ether = Ether * (10 ^ 10);

        const response = await fetch(`https://theblockbuster.org/wallet-server/ethreum/gas?ether=${ether}&toAddress=${toAddress}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //console.log('CalculateGas():', data);

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}



export async function SendNear(senderAcountId, senderPrivateKey, receiverId, amountStr) {
    try {

        //console.log('SendAmount.js senderAcountId:', senderAcountId);
        //console.log('SendAmount.js senderPrivateKey:', senderPrivateKey);
        //console.log('SendAmount.js receiverId:', receiverId);
        //console.log('SendAmount.js amountStr:', amountStr);

        const requestData = {
            senderAcountId: senderAcountId,
            senderPrivateKey: senderPrivateKey,
            receiverId: receiverId,
            amountStr: amountStr.toString()
        };

        const response = await fetch({
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        }, `https://theblockbuster.org/wallet-server/near/sendNear`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //console.log('SendNear():', data);
        // 요청에 대한 응답 처리
        const parsedMsg = JSON.parse(data.msg);
        //console.log('tx-hash :', parsedMsg.txHash);
        //console.log('transaction hash :', parsedMsg.txHash.transaction.hash);

        return parsedMsg.txHash.transaction.hash;

    

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function SendBuster(senderAccountId, senderPrivateKey, receiverID, inputAmount) {
    try {

        const requestData = {
            senderAcountId: senderAccountId,
            senderPrivateKey: senderPrivateKey,
            receiverId: receiverID,
            amountStr: inputAmount.toString()
        };

        const response = await fetch(`https://theblockbuster.org/wallet-server/sendBoom`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //console.log('SendBuster():', data);
        // 요청에 대한 응답 처리
        const parsedMsg = JSON.parse(data.msg);
        //console.log('tx-hash :', parsedMsg.txHash);
        //console.log('transaction hash :', parsedMsg.txHash.transaction.hash);

        return parsedMsg.txHash.transaction.hash;


    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}