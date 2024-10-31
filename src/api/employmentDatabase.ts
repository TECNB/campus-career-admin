import axios from '.';

import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有活动
export const getAllEmploymentDatabase = (): Promise<R<any>> => {
    return axios.get<R<any>>('api/employmentDatabase');
};

// 根据 objectId 获取活动
export const getEmploymentDatabaseById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/employmentDatabase/' + id);
};

// 添加活动
export const addEmploymentDatabase = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/employmentDatabase', params);
};

// 修改活动
export const editEmploymentDatabase = (params: any): Promise<R<any>> => {
    return axios.put<R<any>>('api/employmentDatabase', params);
};

// 删除活动
export const deleteEmploymentDatabase = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/employmentDatabase', params);
};