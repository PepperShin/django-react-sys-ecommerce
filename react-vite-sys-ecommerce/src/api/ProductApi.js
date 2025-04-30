import http from "./HttpCommon"

// dev_4_Fruit
// http://127.0.0.1:8000/api/products/
// 방식       url             기능
// GET       products/       list
// POST      products/       create
// GET       products/{id}   product
// Delete    products/{id}   delete product
// PUT       products/{id}   modify
export const getProducts = ()=>{
    return http.get('/api/products/')
}