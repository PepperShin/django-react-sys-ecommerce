import Products from '@/ui/components/fruits/products'
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
                element:<Products></Products>
            }
        ]
    }
]

const router = createBrowserRouter(routes)

export {router, routes}