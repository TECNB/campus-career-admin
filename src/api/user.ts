import axios from '.';
// 引入LoginResData接口
import { User } from '../interfaces/User';


// 用户登录
export const login = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<User>('api/users/login', params);
}
// 用户注册
export const signup = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<User>('api/users/register', params);
}

// 通过token修改密码
export const updatePassword = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.put<User>('api/users/me/updatePassword', params);
}

// 通过token查看个人数据
export const check = () => {
    // 返回的数据格式可以和服务端约定
    return axios.get<User>('api/users/me');
}

// 修改头像
export const changeAvatar = (params:any) => {
    return axios.put<User>('api/users/me/changeAvatar',params);
}

// 根据 objectId 获取用户
export const getUserById = (objectId:string) => {
    return axios.get<User>('api/users/objects/'+objectId);
}

// 获取所有用户
export const getAllUsers = () => {
    return axios.get<User[]>('api/users/all');
}
