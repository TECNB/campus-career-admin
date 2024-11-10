import axios from '.';

import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有岗位
export const getAllJobSearch = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/job-search',param);
};

// 根据 objectId 获取岗位
export const getJobSearchById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/job-search/' + id);
};

// 添加岗位
export const addJobSearch = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/job-search', params);
};

// 修改岗位
export const editJobSearch = (params: any): Promise<R<any>> => {
    return axios.put<R<any>>('api/job-search', params);
};

// 删除岗位
export const deleteJobSearch = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/job-search', params);
};

// 搜索岗位
export const searchJobSearch = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/job-search/search', params);
}