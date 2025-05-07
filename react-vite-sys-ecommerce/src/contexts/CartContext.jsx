// dev_6_Fruit
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// 비로그인을 위한 카트 구성 = 서버 User 모델 old_cart 형식과 맞춤
// {
//      "1":{"quantity":7,"price":"3000.00"},
//      "2":{"quantity":1,"price":"5000.00"}
// }

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const { user } = useAuth();

  // 비회원일때 카트를 localStorage 저장
  useEffect(() => {
    if (!user) {
      // user 객체가 null일때 (비로그인 일때)
      localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log('🛒 savedCart:', localStorage.getItem('cart'));
    }
  }, [cartItems, user]);

  const getTotalItems = ()=>{
    // let total = 0;
    // const items = Object.values(cartItems); // 상품 객체들을 배열로 가져옴
        // Object는 자바 스크립트 내장 객체. 객체를 만들고 다룰 때 사용하는 기본 클래스.
  
    // for (let i = 0; i < items.length; i++) {
    //   total += items[i].quantity; // 각 상품의 수량을 누적
    // }
  
    // return total;

    return Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
  }

  

  // 장바구니 추가
  const addToCart = async (product, quantity = 1) => {
    const productId = product.id;
    const price = product.price;

    if (user) {
      // 로그인 되어있을때
      try {

      } catch (err) {
        console.error("서버 장바구니 추가 실패", err);
      }
    } else {
      // 로그인이 되어있지 않을때
      setCartItems((prev) => {
        const existing = prev[productId];

        return {
          ...prev,
          // 전개 구문(Spread Syntax)이라 하며 파이썬의 언패킹과 같은 역할을 한다.
          // 주소값이 바뀌면서 useState 화면 갱신이 일어난다. (깊은 복사)

          [productId]: {
            // 2015 이전까지 키 값이 고정되었으나 es6 이후로 키를 변수화해서 저장 가능.
            // Es6의 객체 리터럴 문법 중 "계산된 속성명(computed property name)" 기능. [name] => 계산된 속성명
            price,
            quantity: existing ? existing.quantity + quantity : quantity,
          },
        };
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getTotalItems,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); // 훅처럼 이용할 수 있다.
