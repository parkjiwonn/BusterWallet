// i18n.js

import { createI18n } from 'vue-next-i18n'

const messages = {
    en: {
        message: {
            default: { 
                next: 'next',
            cancel: 'cancel',
            verify: 'verify', 
        },
            header: {
                createPw: 'create password',
                createMnemonic: 'createMnemonic',
                checkMnemonic: 'checkMnemonic',
            },
            alert:{
                agree: 'You must accept the terms and conditions before you can create a new wallet.'
            },
            entry: {
                hello: 'Hello Buster',
                welcome: 'Welcome to Vue.js',
                termsConditions: 'I agree to the terms and conditions of Buster Wallet',
                newAccount: 'New Create Account',
                import: 'Import Wallet',
                alertMessage: 'Please agree to the terms and conditions to continue.',

            },
            step1: {
                text1: 'This password unlocks the BusterWallet wallet only on that device.',
                text2: 'BusterWallet cannot recover this password.',
                newPw: 'Password (8 or more characters)',
                checkPw: 'Check Password',
                checkWarning: 'I understand that Buster Wallet cannot recover this password.',
                createWallet: 'Create a new wallet',
                invalidPw : 'It is not match'
            },
            step2: {
                title: 'Mnemonic Phrase',
                description: 'Record this 12-word mnemonic phrase and keep it in a reliable place that only you can access.',
                copySuccess: 'copySuccess',
                clipBoardCopy: 'clipBoardCopy',
            },
            step3: {
                title: 'Check Mnemonic',
                description: 'Enter the following word from the 12-digit mnemonic phrase.',
                warnText: 'You have entered an invalid word',
            },
            step4: {
                title: 'Wallet creation successful',
                description1: 'Your wallet has been successfully protected.',
                description2: 'Keep mnemonic phrases safe and confidential.',
                description3: 'This is your responsibility',
                warnText1: 'Buster Wallet cannot recover mnemonic phrases.',
                warnText2: 'Never share a mnemonic phrase with someone.',
                check: 'I checked',
            },
            Home: {
                buy: 'buy',
                send: 'send',
                portfolio: 'portfolio',
                Tokens: 'tokens',
                activity: 'activity',
            },
            networkAccount: {
                createAccount: 'create account',
            },
            networkImport: {
                importAccount: 'import account',
                nearText: 'Please enter a seed phrase for NearProtocol!',
                bitText: `Please Enter Ethereum's Private Key!`,
                etherText: `Please Enter Bitcoin Testnet's Private Key!`,
                cancel: 'cancel',
                verify: 'verify',
            },
            header: {
                wallet: 'wallet',
                account: 'account',
                setting: 'setting',
                locked: 'locked',
                info: 'info',
                createPw: 'create password',
                createMnemonic: 'createMnemonic',
                checkMnemonic: 'checkMnemonic',
            },
            viewPrivateKey: {
                title: 'Account Details',
                text: 'Private Key in Account',
                warnText: '!!WARNING!!',
                warnTextDescription: 'Do not expose this key. Anyone with a private key can steal assets with your account.',
            },
            writePass: {
                inputPw: 'Please enter password',
                invalidPw: 'Password mismatch',
            },
            importWallet: {
                Title: 'Recover using mnemonic phrases',
                description: 'Enter the mnemonic phrase associated with your account.',
                mnemonic: 'Mnemonic phrase (12 digits)',
                findAccount: 'Find My Account',
            },
            account: {
                accountDetail: 'Show Account Details',
                warn: 'You have to register the acoount in Near Protocol',
                accountDelete: 'Delete Account'
            },
            setting: {
                title: 'Settings',
                changeCurrency: 'Change Currency',
                changeLanguage: 'Change Language',
                changeNetwork: 'Change Network',
            },
            sendBoom: {
                target: 'send to',
                title: 'Please enter the destination account',
                specialCharacters: 'The text contains special characters.',
            },
            sendBoom2: {
                title: 'Send',
                receiver: 'receiver',
                money: 'assets',
                balance: 'balance',
                gas: 'gas',
                yak: 'about',
                amount: 'amount'
            },
            sendBoom3: {
                title: 'Transfer successful!',
                specialCharacters: 'The text contains special characters.',
            },
            login: {
                title: 'Welcome back',
                pw: 'Password',
                invalidPw: 'Password mismatch',
                unlocked: 'unlocked',
            },
            Tx:{
                button:'View Transaction History',
                noTx : 'There is no Transaction History'
            }
            
        }
    },
    ko: {
        message: {
            default: { next: '다음',
            cancel: '취소',
            verify: '확인', },
            header: {
                createPw: '비밀번호 생성',
                createMnemonic: '니모닉문구 생성',
                checkMnemonic: '니모닉문구 확인',
            },
            alert:{
                agree: '이용약관에 동의해야 새 지갑을 생성할 수 있습니다.'
            },
            entry: {
                hello: '안녕하세요. 버스터',
                welcome: '환영합니다. Vue.js',
                termsConditions: 'Buster Wallet의 이용약관에 동의합니다.',
                newAccount: '새 지갑 생성',
                import: '기존 지갑 가져오기',
                alertMessage: '이용약관에 동의해야 새 지갑을 생성할 수 있습니다.',
            },
            step1: {
                text1: '이 비밀번호는 해당 기기에서만 BusterWallet 지갑의 잠금을 해제합니다.',
                text2: 'BusterWallet은 이 비밀번호를 복구할 수 없습니다.',
                newPw: '새 비밀번호(8자 이상)',
                checkPw: '비밀번호 확인',
                checkWarning: 'BusterWallet이 이 비밀번호를 복구할 수 없음을 이해합니다.',
                createWallet: '비밀번호 생성',
                invalidPw:'비밀번호가 맞지 않습니다.'
            },
            step2: {
                title: '니모닉 문구',
                description: '이 12단어 니모닉 문구를 기록하고 본인만 접근 가능한 믿을 만한 장소에 보관하세요.',
                copySuccess: '복사성공',
                clipBoardCopy: '클립보드에 복사',
            },
            step3: {
                title: '니모닉 확인',
                description: '12자리 니모닉 문구 중에서 다음 단어를 입력하세요.',
                warnText: '잘못된 단어를 입력했습니다.',
            },
            step4: {
                title: '지갑 생성 성공',
                description1: '지갑을 성공적으로 보호했습니다.',
                description2: '니모닉 문구를 안전하게 비밀로 유지하세요.',
                description3: '이는 귀하의 책임입니다!',
                warnText1: ' BusterWallet은 니모닉 문구를 복구할 수 없습니다.',
                warnText2: '누군가와 니모닉 문구를 절대 공유하지 마세요.',
                check: '확인했습니다.',
            },
            Home: {
                buy: '구매',
                send: '보내기',
                portfolio: '포트폴리오',
                Tokens: '토큰',
                activity: '활동',
            },
            networkImport: {
                importAccount: '계정 가져오기',
                nearText: 'NearProtocol의 시드 문구를 입력해주세요!',
                bitText: 'Bitcoin Testnet의 PrivateKey를 입력해주세요!',
                etherText: 'Ethereum의 PrivateKey를 입력해주세요!',
                cancel: '취소',
                verify: '확인',
            },
            networkAccount: {
                createAccount: '계정 생성',
            },
            header: {
                wallet: '지갑',
                account: '계정',
                setting: '설정',
                locked: '잠금',
                info: '정보',
                createPw: '비밀번호 생성',
                createMnemonic: '니모닉문구 생성',
                checkMnemonic: '니모닉문구 확인',
            },

            viewPrivateKey: {
                title: '계정 세부정보 조회',
                text: '계정의 PrivateKey',
                warnText: '!!경고!!',
                warnTextDescription: '이 키를 노출하지 마세요. 비공개 키가 있는 사람이라면 누구든 귀하의 계정이 있는 자산을 훔칠 수 있습니다.',
            },
            writePass: {
                inputPw: '비밀번호를 입력해주세요.',
                invalidPw: '비밀번호가 일치하지 않습니다.',
            },
            importWallet: {
                Title: '니모닉문구 사용해서 복구',
                description: '계정과 연결된 니모닉 문구를 입력합니다.',
                mnemonic: '니모닉 문구(12자리)',
                findAccount: '내 계정 찾기',
            },
            account: {
                accountDetail: '계정 세부 정보 보기',
                warn: 'NearProtocol에 계정 등록 후 사용해주세요.',
                accountDelete: '계정 삭제하기',
            },
            setting: {
                title: '설정',
                changeCurrency: '통화 변경',
                changeLanguage: '언어 변경',
                changeNetwork: '네트워크 변경',
            },
            sendBoom: {
                target: '보낼 계정',
                title: '보낼 계정을 입력해주세요',
                specialCharacters: '텍스트에 특수 문자가 포함되어 있습니다.',
            },
            sendBoom2: {
                title: '송금',
                receiver: '받는 계정',
                money: '자산',
                balance: '잔액',
                gas: '가스',
                yak: '약',
                amount : '수량'
            },
            sendBoom3: {
                title: '송금 성공!',
                specialCharacters: '텍스트에 특수 문자가 포함되어 있습니다.',
            },
            login: {
                title: '재방문을 환영합니다.',
                pw: '패스워드',
                invalidPw: '비밀번호가 일치하지 않습니다.',
                unlocked: '잠금 해제',
            },
            Tx:{
                button:'Transaction 내역 보러가기',
                noTx : '존재하는 트랜잭션 내역이 없습니다.'
            }
        }
    },
}
//console.log('i18n 전');
//console.log('i18n localStorage.getItem() :', localStorage.getItem('language'));
if(localStorage.getItem('language')==null){
    //console.log('한글 설정 안되어있음.');
    localStorage.setItem('language', 'ko');
}

const i18n = createI18n(
    {
    messages, // set locale messages
    currentLocale : 'en',
    changeLocale:'en',
    locale: localStorage.getItem('language')

})
//console.log('i18n.locale222 :', i18n.locale);
export default i18n