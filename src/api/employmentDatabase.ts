import axios from '.';

import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有资料库
export const getAllEmploymentDatabase = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/employment-database',param);
};

// 根据 objectId 获取资料库
export const getEmploymentDatabaseById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/employment-database/' + id);
};

// 添加资料库
export const addEmploymentDatabase = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/employment-database', params);
};

// 修改资料库
export const editEmploymentDatabase = (params: any): Promise<R<any>> => {
    return axios.put<R<any>>('api/employment-database', params);
};

// 删除资料库
export const deleteEmploymentDatabase = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/employment-database', params);
};

// 下载附件
export const download = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/employment-database/download',params);
}

// 搜索资料库
export const searchEmploymentDatabase = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/employment-database/search', params);
}

// 批量删除资料库
export const batchDeleteEmploymentDatabase = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/employment-database/batch', params);
}