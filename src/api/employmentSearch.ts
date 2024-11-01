import axios from '.';

import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有活动
export const getAllEmploymentSearch = (): Promise<R<any>> => {
    return axios.get<R<any>>('api/employment-search');
};

// 根据 objectId 获取活动
export const getEmploymentSearchById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/employment-search/' + id);
};

// 添加活动
export const addEmploymentSearch = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/employment-search', params);
};

// 修改活动
export const editEmploymentSearch = (params: any): Promise<R<any>> => {
    return axios.put<R<any>>('api/employment-search', params);
};

// 删除活动
export const deleteEmploymentSearch = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/employment-search', params);
};

// 根据userId获取活动
export const getEmploymentSearchByUserId = (userId: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/employment-search/user/' + userId);
};