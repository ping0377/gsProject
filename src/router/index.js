import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Menu from '@/components/Menu'
// nav1
import Index from '@/components/nav1/Index'
import User from '@/components/nav1/User'
import MyInfo from '@/components/edit/MyInfo'
import ProtocolEdit from '@/components/edit/Protocol_edit'
import ShopEdit from '@/components/edit/Shop_edit'
// nav2
import Payment from '@/components/nav2/Payment'
import Recharge from '@/components/nav2/Recharge'
import Consume from '@/components/nav2/Consume'
import Reservation from '@/components/nav2/Reservation'
import SMS from '@/components/nav2/SMS'
import ActPayment from '@/components/nav2/ActPayment'
// nav3
import Approve from '@/components/nav3/Approve'
import UserManage from '@/components/nav3/UserManage'
import VipRecord from '@/components/nav3/VipRecord'
import Record from '@/components/nav3/nav/Record'
// nav4
import ShopManage from '@/components/nav4/ShopManage'
import ShopReview from '@/components/nav4/ShopReview'
// nav5
import Certificate from '@/components/nav5/Certificate'
import Honor from '@/components/nav5/Honor'
import ShopSort from '@/components/nav5/ShopSort'
import UserRank from '@/components/nav5/UserRank'
import ShopRank from '@/components/nav5/ShopRank'
// nav6
import Activity from '@/components/nav6/Activity'
import ActivityEdit from '@/components/edit/Activity_edit'
import ActivityInfoEdit from '@/components/edit/ActivityInfo_edit'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        requrireAuth: true
      },
      children:[
        // nav1
        {
          path: 'index',
          name: 'index',
          component: Index,
          meta: {
            requrireAuth: true,
            title: "主 页"
          }
        },
        {
          path: 'user',
          name: 'user',
          component: User,
          meta: {
            requrireAuth: true,
            title: "协会信息"
          }
        },
        // nav2
        {
          path: 'payment',
          name: 'payment',
          component: Payment,
          meta: {
            requrireAuth: true,
            title: "缴费详情"
          }
        },
        {
          path: 'recharge',
          name: 'recharge',
          component: Recharge,
          meta: {
            requrireAuth: true,
            title: "卡充值记录"
          }
        },
        {
          path: 'consume',
          name: 'consume',
          component: Consume,
          meta: {
            requrireAuth: true,
            title: "会员消费记录"
          }
        },
        {
          path: 'sms',
          name: 'sms',
          component: SMS,
          meta: {
            requrireAuth: true,
            title: "短信发送记录"
          }
        },
        {
          path: 'reservation',
          name: 'reservation',
          component: Reservation,
          meta: {
            requrireAuth: true,
            title: "预约单记录"
          }
        },
        {
          path: 'actpayment',
          name: 'actpayment',
          component: ActPayment,
          meta: {
            requrireAuth: true,
            title: "活动缴费详情"
          }
        },
        // nav3
        {
          path: 'approve',
          name: 'approve',
          component: Approve,
          meta: {
            requrireAuth: true,
            title: "会员认证申请"
          }
        },
        {
          path: 'usermanage',
          name: 'usermanage',
          component: UserManage,
          meta: {
            requrireAuth: true,
            title: "用户管理"
          }
        },
        {
          path: 'viprecord',
          name: 'viprecord',
          component: VipRecord,
          meta: {
            requrireAuth: true,
            title: "会员卡管理"
          }
        },
        // nav4
        {
          path: 'shopManage',
          name: 'shopManage',
          component: ShopManage,
          meta: {
            requrireAuth: true,
            title: "商家管理"
          }
        },
        // nav5
        {
          path: 'honor',
          name: 'honor',
          component: Honor,
          meta: {
            requrireAuth: true,
            title: "协会荣誉"
          }
        },
        {
          path: 'certificate',
          name: 'certificate',
          component: Certificate,
          meta: {
            requrireAuth: true,
            title: "证书上传"
          }
        },
        {
          path: 'shopsort',
          name: 'shopsort',
          component: ShopSort,
          meta: {
            requrireAuth: true,
            title: "商家类别"
          }
        },
        {
          path: 'userrank',
          name: 'userrank',
          component: UserRank,
          meta: {
            requrireAuth: true,
            title: "协会会员级别"
          }
        },
        {
          path: 'shoprank',
          name: 'shoprank',
          component: ShopRank,
          meta: {
            requrireAuth: true,
            title: "商家级别"
          }
        },
        // nav6
        {
          path: 'activity',
          name: 'activity',
          component: Activity,
          meta: {
            requrireAuth: true,
            title: "活动管理"
          }
        },
        {
          path: 'hello',
          name: 'hello',
          component: HelloWorld
        }
      ]
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu,
      meta: {
        requrireAuth: true
      },
    },
    {
      path: '/myinfo',
      name:'myinfo',
      component: MyInfo,
      meta: {
        requrireAuth: true
      },
    },
    {
      path: '/protocol_edit',
      name:'protocol_edit',
      component: ProtocolEdit,
      meta: {
        requrireAuth: true
      },
    },
    {
      path: '/shop_edit',
      name:'shop_edit',
      component: ShopEdit,
      meta: {
        requrireAuth: true
      },
    },
    {
      path: '/activityedit',
      name: 'activityedit',
      component: ActivityEdit,
      meta: {
        requrireAuth: true
      }
    },
    {
      path: '/activityinfoedit',
      name: 'activityinfoedit',
      component: ActivityInfoEdit,
      meta: {
        requrireAuth: true
      }
    },
    {
      path: '/shopReview',
      name: 'shopReview',
      component: ShopReview,
      meta: {
        requrireAuth: true
      }
    },
    {
      path: '/record',
      name: 'record',
      component: Record,
      meta: {
        requrireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from ,next) => {
  if(to.path == '/login'){
    next();
  }else if(to.meta.requrireAuth){
    let user = sessionStorage.getItem("OpenId");
    if(user){
      next();
    }else{
      next({
        path:'/login'
      });
    }
  }else{
    next();
  }
})

export default router;
