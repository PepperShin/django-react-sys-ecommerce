// dev_6_Fruit
import http from "./HttpCommon";

// 카트 불러오기
export const getCarts = (guestCart) => {

    return http.get("/api/cart/");
}

// 카트 병합하기
export const mergeCart = (guestCart) => {
    console.log(guestCart)

    return http.post("/api/cart/merge/", {
        cart: guestCart,
    });
}