import axios from '.';

import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有就业信息
export const getAllEmploymentSearch = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/employment-search',param);
};

// 根据 objectId 获取就业信息
export const getEmploymentSearchById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/employment-search/' + id);
};

// 添加就业信息
export const addEmploymentSearch = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/employment-search', params);
};

// 修改就业信息
export const editEmploymentSearch = (params: any): Promise<R<any>> => {
    return axios.put<R<any>>('api/employment-search', params);
};

// 删除就业信息
export const deleteEmploymentSearch = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/employment-search', params);
};

// 根据userId获取就业信息
export const getEmploymentSearchByUserId = (userId: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/employment-search/user/' + userId);
};

// 搜索就业信息
export const searchEmploymentSearch = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/employment-search/search', params);
}

// 批量删除就业信息
export const batchDeleteEmploymentSearch = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/employment-search/batch', params);
}