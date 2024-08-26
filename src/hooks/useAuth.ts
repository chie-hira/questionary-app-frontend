import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Payload } from "../types/payload";

// 認証を確認するフック
export const useAuth = () => {
    const [authInfo, setAuthInfo] = useState<{
        checked: boolean;
        isAuthenticated: boolean;
    }>({ checked: false, isAuthenticated: false });

    useEffect(() => {
        // 今回はトークンをローカルストレージに保存する
        const token = localStorage.getItem("token");

        if (!token) {
            setAuthInfo({ checked: true, isAuthenticated: false });
            return;
        }

        try {
            const decodedToken = jwtDecode<Payload>(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("token"); // トークンが期限切れの場合は削除
                setAuthInfo({ checked: true, isAuthenticated: false });
                return;
            }
            setAuthInfo({ checked: true, isAuthenticated: true });
        } catch (error: unknown) {
            console.log(error);
            setAuthInfo({ checked: true, isAuthenticated: false });
        }
    }, []);

    return authInfo;
};
