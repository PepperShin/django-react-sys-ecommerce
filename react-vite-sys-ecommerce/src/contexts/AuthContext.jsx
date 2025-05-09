// dev_5_Fruit
import { getCurrentUser, loginUser } from '@/api/AuthApi';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(); // context 메모리 공간에 저장한다. 어디서든 꺼내쓸 수 있다.

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));

    const login = async (username, password) => {
        try {
            const response = await loginUser(username, password) // 장고에서 JWT 토큰을 받아온다.
            const {access, refresh} = response.data // 객체 구조분할로 토큰의 access와 refresh를 나눈다.

            // 저장 영역은 크게 4가지 정도 있다.
            // 1. local storage
            // 2. session storage
            // 3. cookie
            // 4. 메모리 저장
            // 5. 파일로 저장
            localStorage.setItem("access", access)
            localStorage.setItem("refresh", refresh)
            setAccessToken(access)

            // 로그인이 된 후 로그인 정보를 받아서 어디서든 로그인 정보를 공유할 수 있게 함
            await getUser()

        } catch (error) {
            console.error('로그인 실패', error);
            throw error;
        }
    };

    const getUser = async () => {
        try{
            const response = await getCurrentUser();
            setUser(response.data);
            console.log(response.data)

        }catch(error){
            console.error("사용자 정보 받아오기 실패", error);
            logout();
        }
    }

    // 어차피 서버에 저장되어있는게 없으니 클라이언트에 저장되어 있는 값만 날리면 로그아웃 된다.
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        // dev_7_Fruit 카트 삭제
        localStorage.removeItem("cart");
    }

    const value = {
        login,
        logout,
        accessToken,
        user
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};
