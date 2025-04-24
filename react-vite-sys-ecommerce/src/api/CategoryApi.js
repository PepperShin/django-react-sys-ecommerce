import http from "./HttpCommon"

// dev_3
export const getCategories = ()=>{
    return http.get('/api/categories/')
}