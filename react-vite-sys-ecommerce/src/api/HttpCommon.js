import axios from "axios"

// dev_3
const http = axios.create({
    baseURL: import.meta.env.VITE_REQUEST_URL, // 현업에서는 고정 아이피 또는 도메인.
    headers: { // http 프로토콜 헤더
        'Content-Type': 'application/json',
    }
}) // 전역화

export default http;