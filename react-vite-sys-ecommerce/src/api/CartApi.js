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

// 장바구니에서 상품 제거 또는 전체 비우기
export const deleteCart = (product_id = null) => {
    const config = {
      data: {},
    };
  
    if (product_id) {
      config.data.product_id = product_id;
    }
  
    return http.delete("/api/cart/", config);
  };