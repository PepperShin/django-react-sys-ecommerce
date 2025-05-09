import { createPayment } from "@/api/PaymentApi";

const RequestPay = (shippingData, cart = null, pg = 'kakaopay', pay_method = 'card') => {
    const impCode = 'imp53308706'; // 상태코드

    // const { cartItems } = useCart() 함수에서는 컨텍스트 호출 불가
    // Promise로 래핑하여 비동기 처리를 await로 받을 수 있도록 한다
    return new Promise((resolve, reject) => {
        IMP.init(impCode); // 아임포트 가맹점 식별코드

        const data = {
            pg: pg, // 결제 PG사
            pay_method: pay_method, // 결제수단
            // merchant_uid: `payment-${crypto.randomUUID()}`, // 주문번호 생성(생략시 포트원에서 자동생성)
            name: '뭐가 뜰까요', // 결제창에 노출될 상품명
            amount: 100, // 결제 금액
            buyer_email: shippingData.email, // 로그인된 유저만 접근할 수 있는 페이지 이므로 request.user객체를 바로 쓸 수 있다.
            buyer_name: shippingData.full_name,
            buyer_tel: shippingData.phone,
            buyer_addr: shippingData.address1,
            buyer_postcode: shippingData.zipcode,
        };

        IMP.request_pay(data, async(rsp) => {
            if(rsp.success){
                console.log("결제성공", rsp)
                // 백엔드로 결제 검증 및 주문 요청 저장
                const res = await createPayment(shippingData, rsp.imp_uid, rsp.paid_amount)
                console.log("서버차리 완료", res)
                resolve(true)
            }else{
                alert(`결제 실패: ${rsp.error_msg}`)
                reject(new Error(rsp.error_msg)) // 결제 실패 시 reject
            }
        })
    });
};

export default RequestPay;
