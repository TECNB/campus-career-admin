import axios from '.';
import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有用户详细信息
export const getAllUserDetails = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/user-detail',param);
};

// 根据 ID 获取用户详细信息
export const getUserDetailById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>(`api/user-detail/${id}`);
};

// 添加用户详细信息
export const addUserDetail = (params: { name: string; gender: string; className: string; studentId: string; contactNumber: string; classTeacher: string; graduationTutor: string }): Promise<R<any>> => {
    return axios.post<R<any>>('api/user-detail', params);
};

// 修改用户详细信息
export const editUserDetail = (params: { id: string; name: string; gender: string; className: string; studentId: string; contactNumber: string; classTeacher: string; graduationTutor: string }): Promise<R<any>> => {
    return axios.put<R<any>>('api/user-detail', params);
};

// 删除用户详细信息
export const deleteUserDetail = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/user-detail', params);
};

// 搜索用户详细信息
export const searchUserDetail = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/user-detail/search', params);
};