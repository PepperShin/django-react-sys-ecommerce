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

export const getProductsPaging = ({ page = 1, search = "", ordering = "", category = "" }) => {
    const params = {
        page,
        search,
        ordering,
        category,    
    }
    // /api/product-list/?page=1&search=컴퓨터&ordering=-id
    return http.get('/api/product-list/', {params})
}