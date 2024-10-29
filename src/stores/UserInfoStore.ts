// userInfoStore.ts
import { defineStore } from 'pinia';
// 引入登录接口返回的数据类型User
import { User } from '../interfaces/User';


export interface UserInfoState {
    token: string;
    user: User | null;
}

export const userInfoStore = defineStore({
    id: 'auth',
    state: (): UserInfoState => ({
        token: localStorage.getItem('token') || '',
        user: null,
    }),
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        setUser(user: User) {
            this.user = user;
        },
        clearToken() {
            this.token = '';
            localStorage.removeItem('token');
        },
    },
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
