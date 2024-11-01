import axios from '.';

import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有活动
export const getAllJobSearch = (): Promise<R<any>> => {
    return axios.get<R<any>>('api/job-search');
};

// 根据 objectId 获取活动
export const getJobSearchById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/job-search/' + id);
};

// 添加活动
export const addJobSearch = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/job-search', params);
};

// 修改活动
export const editJobSearch = (params: any): Promise<R<any>> => {
    return axios.put<R<any>>('api/job-search', params);
};

// 删除活动
export const deleteJobSearch = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/job-search', params);
};