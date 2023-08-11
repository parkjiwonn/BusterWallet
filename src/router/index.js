import { createRouter, createWebHistory } from 'vue-router'
import NewAccountView from '../views/CreateWallet/NewAccount.vue'
import Helloworld from '../views/Entry.vue'
import CreateNimonic from '../views/CreateWallet/CreateNimonic.vue'
import Success from '../views/CreateWallet/Success.vue'
import Home from '../views/WalletHome/Home.vue'
import Token from '../components/HomeTab/Token.vue'
import NFT from '../components/HomeTab/NFT.vue'
import Activity from '../components/HomeTab/Activity.vue'
import SendBoom from '../views/WalletHome/SendBoom/SendBoom.vue'
import Portfolio from '../views/WalletHome/Portfolio.vue'
import Login from '../views/Login.vue'
import Account from '../views/Menu/Account.vue'
import Setting from '../views/Menu/Setting.vue'
import Info from '../views/Menu/Info.vue'
import PrivacyContent from '../components/Modal/PrivacyContent.vue'
import TermContent from '../components/Modal/TermContent.vue'


console.log("들어옴");

const router = createRouter(
  {
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'NewAccount',
      component: NewAccountView
    },
    {
      path: '/WritePass/:network+',
      name: 'WritePass',
      component: ()=> import("@/views/FindPrivateKey/WritePass.vue")
    },
    {
      path: '/ViewPrivateKey/:network+',
      name: 'ViewPrivateKey',
      component: () => import("@/views/FindPrivateKey/ViewPrivateKey.vue")
    },
    {
      path: '/ResetPass/:nimonic+',
      name: 'ResetPass',
      component:() => import("@/views/Import/ResetPass.vue"),
      props: true
    },
    {
      path: '/ImportWallet',
      name: 'ImportWallet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Import/ImportWallet.vue')
    },
    {
      path: '/Entry',
      name: 'Entry',
      component : Helloworld
    },
    {
      path: '/CreateNimonic',
      name: 'CreateNimonic',
      component : CreateNimonic
    },
    {
      path: '/CheckNimonic/:nimonic+',
      name: 'CheckNimonic',
      component:() => import("@/views/CreateWallet/CheckNimonic.vue"),
      props: true
    },
    {
      path: '/Success',
      name : 'Success',
      component : Success
    },
    {
      path: '/Home',
      name : 'Home',
      component : Home,
      children:[
        {path: '/Home/Token', component : Token},
        {path: '/Home/NFT', component : NFT},
        {path: '/Home/Activity', component : Activity},
      ]
    },
    {
      path: '/Txhistory/:network/:accountId+',
      name : 'Txhistory',
      component:()=>import("../views/WalletHome/TxHistory.vue"),
    },
    {
      path: '/SendBoom',
      name: 'SendBoom',
      component : SendBoom
    },
    {
      path: '/PrivacyContent',
      name: 'PrivacyContent',
      component : PrivacyContent
    },
    {
      path: '/TermContent',
      name: 'TermContent',
      component : TermContent
    },
    {
      path: '/SendBoom2/:address+',
      name: 'SendBoom2',
      component:() => import("@/views/WalletHome/SendBoom/SendBoom2.vue"),
    },
    {
      path: '/SendBoom3/:Outcome/:UserData/:network+',
      name: 'SendBoom3',
      component:() => import("@/views/WalletHome/SendBoom/SendBoom3.vue"),
    },
    {
      path: '/Portfolio',
      name: 'Portfolio',
      component : Portfolio
    },
    {
      path: '/Login',
      name: 'Login',
      component : Login
    },
    {
      path: '/Account',
      name: 'Account',
      component : Account
    },
    {
      path: '/Setting',
      name: 'Setting',
      component : Setting
    },
    {
      path: '/Info',
      name: 'Info',
      component : Info
    },
  ]
})

export default router
