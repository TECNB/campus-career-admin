import axios from '.';
import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有用户详细信息
export const getAllUserInfos = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/user-info',param);
};

// 根据 ID 获取用户详细信息
export const getUserInfoById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>(`api/user-info/${id}`);
};

// 添加用户详细信息
export const addUserInfo = (params: { name: string; gender: string; className: string; studentId: string; contactNumber: string; classTeacher: string; graduationTutor: string }): Promise<R<any>> => {
    return axios.post<R<any>>('api/user-info', params);
};

// 修改用户详细信息
export const editUserInfo = (params: { id: string; name: string; gender: string; className: string; studentId: string; contactNumber: string; classTeacher: string; graduationTutor: string }): Promise<R<any>> => {
    return axios.put<R<any>>('api/user-info', params);
};

// 删除用户详细信息
export const deleteUserInfo = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/user-info', params);
};

// 搜索用户详细信息
export const searchUserInfo = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/user-info/search', params);
};