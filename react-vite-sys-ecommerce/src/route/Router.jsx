import Cart from '@/ui/components/fruits/Cart'
import CheckOut from '@/ui/components/fruits/CheckOut'
import Products from '@/ui/components/fruits/products'
import Shop from '@/ui/components/fruits/Shop'
import Hero from '@/ui/components/hero'
import Login from '@/ui/components/login/Login'
import MainLayout from '@/ui/layouts/MainLayout'
import { Children } from 'react'
import { createBrowserRouter } from 'react-router-dom'


const routes = [
    {
        path:'/',
        element:<MainLayout/>,
        loader:()=>'메인 레이아웃',
        children: [
            {
                path:'',
                element:<div><Hero/><Products></Products></div>,
                loader: () => '상품들',
            },
            { // dev_5_Fruit
                path:'login',
                element:<div><Hero/><Login></Login></div>,
                loader: () => '로그인',
            },
            { // dev_7_Fruit
                path:'cart',
                element:<Cart></Cart>,
                loader: () => '카트',
            },
            { // dev_8_Fruit
                path:'checkout',
                element:<CheckOut></CheckOut>,
                loader: () => '결제',
            },
            {  //dev_10_Fruit
                path:'shop',
                element:<Shop></Shop>,
                loader: () => '샵',
            },  
        ]
    }
]

const router = createBrowserRouter(routes)

export {router, routes}