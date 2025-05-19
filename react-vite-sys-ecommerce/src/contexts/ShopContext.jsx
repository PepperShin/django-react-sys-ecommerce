import { getProductsPaging } from '@/api/ProductApi';
import { createContext, useContext, useEffect, useState } from 'react';

//dev_10_Fruit
const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    // 정렬, 페이징, 카테고리 분류된 상품들
    const [products, setProducts] = useState([]);
    // 검색 관련
    const [search, setSearch] = useState('');
    // 정렬 관련
    const [ordering, setOrdering] = useState('');
    // 카테고리 분류
    const [category, setCategory] = useState('');
    // paging 관련
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    // min max 필터링
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(null);

    // {
    //   "count": 21, 얘가 totalCount
    //   "next": "http://127.0.0.1:8000/api/product-list/?ordering=-price&page=2",
    //   "previous": null,
    //   "results": [
    //       {
    //           "id": 8,
    //           "category": {
    //               "id": 4,
    //               "name": "도서"
    //           },
    //           "name": "역사",
    //           "price": "199.94",
    //           "description": "역사는(은) 도서 카테고리에 속하는 상품입니다.",
    //           "image": "http://127.0.0.1:8000/media/upload/product/%EC%97%AD%EC%82%AC_rpRPjCl.jpg",
    //           "is_sale": false,
    //           "sale_price": null
    //       },

    //상품 목록 호출
    const fetchProducts = async () => {
        try {
            const response = await getProductsPaging({
                page: currentPage,
                search, // 키와 밸류가 같으면 알아서 세팅이 된다. search : search와 동일. es6 문법
                ordering,
                category,
                min_price : minPrice,
                max_price : maxPrice,
            });
            console.log(response.data);
            setProducts(response.data.results);
            setTotalCount(response.data.count);
        } catch (error) {
            console.error('상품 목록을 불러오는 중 오류 발생:', error);
        }
    };

    // 조건이 변경될때마다 API 다시 호출
    useEffect(() => {
        fetchProducts();
    }, [currentPage, search, ordering, category, minPrice, maxPrice]);

    const value = {
        search,
        setSearch,
        currentPage,
        setCurrentPage,
        products,
        setProducts,
        ordering,
        setOrdering,
        category,
        setCategory,
        totalCount,
        setMinPrice,
        setMaxPrice,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
