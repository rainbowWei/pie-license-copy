import Vue from 'vue'
import Router from 'vue-router'
import Manage from '@/components/Manage'
import Uregiste from '@/components/Uregiste'
import User from '@/components/User'
import Login from '@/components/Login'
import Tank from '@/components/Tank'
import Per from '@/components/Per'
import Createsub from '@/components/createSub'  //创建许可
import saveSub from '@/components/saveSub'  //待提交许可
import haveCreat from '@/components/haveCreat'  //待提交许可

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/uregiste',
      name: 'Uregiste',
      component: Uregiste
    },
    {
      path: '/manage',
        name: 'Manage',
      component: Manage
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      redirect:'/Createsub',
      children:[
        {
          path: '/Createsub',
          name: 'Createsub',
          component: Createsub
        },{
          path: '/saveSub',
          name: 'saveSub',
          component: saveSub
        },{
          path: '/haveCreat',
          name: 'haveCreat',
          component: haveCreat
        }
      ]
    },{
      path: '/tank',
      name: 'Tank',
      component: Tank
    },{
      path: '/per',
      name: 'Per',
      component: Per
    }
  ]
})
