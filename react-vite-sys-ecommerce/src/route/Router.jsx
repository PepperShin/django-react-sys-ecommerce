import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../ui/pages/MainPage'

const routes = [
    {
        path:'/',
        element:<MainPage></MainPage>, // MainPage는 컴포넌트
        loader:()=>'메인페이지'
    }
]

const router = createBrowserRouter(routes)

export {router, routes}