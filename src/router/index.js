import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// const TopNav = () => import('../components/TopNav.vue');
// const SideBar = () => import('../components/SideBar.vue');
// const MyFootprint = () => import('../pages/MyFootprint.vue');
// const MyPlayList = () => import('../pages/MyPlayList.vue');
// const Onplay = () => import('../pages/OnPlay.vue');
// const Recommand = () => import('../pages/Recommand.vue');
// const Search = () => import('../pages/Search.vue');

// import TopNav from '@/components/TopNav';
// import SideBar from '@/components/SideBar';
import HomePage from '@/pages/HomePage';
// import Onplay from '@/pages/Onplay';

const MyFootprint = r => require.ensure([],()=>r (require('../pages/MyFootprint.vue')),'/MyFootprint');
const MyPlayList = r => require.ensure([],()=>r (require('../pages/MyPlayList.vue')),'/MyPlayList');
const Recommand = r => require.ensure([],()=>r (require('../pages/Recommand.vue')),'/Recommand');
const Search = r => require.ensure([],()=>r (require('../pages/Search.vue')),'/Search');
const Onplay = r => require.ensure([],()=>r (require('../pages/Onplay.vue')),'/Onplay');
// import MyFootprint from '@/pages/MyFootPrint';
// import MyPlayList from '@/pages/MyPlayList';
// import Recommand from '@/pages/Recommand';
// import Search from '@/pages/Search';

Vue.use(Router)

// const HomePage = {
//   template: `
//     <div>
//       <TopNav/>
//       <SideBar/>
//       <router-view/>
//     </div>
//   `,
//   components: { TopNav, SideBar}
// }
export default new Router({
  // scrollBehavior(to,from,savedPostion){
  //   return{x:0,y:0}
  // },
  // mode: 'history',
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
      // redirect:'/root'
      component: HomePage, 
      children: [{
        path: 'OnPlayList', 
        component: Onplay
      },{
        path: 'Recommand', 
        component: Recommand
      },{
        path: 'Search', 
        component: Search
      },{
        path: 'MyPlayList', 
        component: MyPlayList
      },{
        path: 'MyFootPrint', 
        component: MyFootprint
      }]
    }
    // {
    //   path: '/root',
    //   name: 'root',
    //   components: {
    //     Onplay: ()=> import(/*webpackChunkName:"root"*/'@/pages/Onplay.vue'),
    //     Recommand: ()=> import(/*webpackChunkName:"root"*/'@/pages/Recommand.vue'),
    //     Search: ()=> import(/*webpackChunkName:"root"*/'@/pages/Search.vue'),
    //     MyPlayList: ()=> import(/*webpackChunkName:"root"*/'@/pages/MyPlayList.vue'),
    //     MyFootprint: ()=> import(/*webpackChunkName:"root"*/'@/pages/MyFootprint.vue')
    //   }
    // }
  ]
})
