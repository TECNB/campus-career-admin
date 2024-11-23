import axios from '.';
import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有用户详细信息
export const getAllSpecialGroups = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/special-group',param);
};

// 根据 ID 获取用户详细信息
export const getSpecialGroupById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>(`api/special-group/${id}`);
};

// 添加用户详细信息
export const addSpecialGroup = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/special-group', params);
};

// 修改用户详细信息
export const editSpecialGroup = (params: any): Promise<R<any>> => {
    return axios.put<R<any>>('api/special-group', params);
};

// 删除用户详细信息
export const deleteSpecialGroup = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/special-group', params);
};

// 搜索用户详细信息
export const searchSpecialGroup = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/special-group/search', params);
};