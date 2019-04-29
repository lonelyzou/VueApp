import Home from '../pages/Home/Home'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import Goods from '../pages/Shop/Goods/Goods'
import Info from '../pages/Shop/Info/Info'
import Ratings from '../pages/Shop/Ratings/Ratings'

export default [
  {
    path: '/home',
    component: Home,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path: '/shop/info',
        component: Info
      },
      {
        path: '/shop/ratings',
        component: Ratings
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  }
]
