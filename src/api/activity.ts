import axios from '.';

import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有活动
export const getAllActivity = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/activity',param);
};

// 根据 objectId 获取活动
export const getActivityById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/activity/' + id);
};

// 添加活动
export const addActivity = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/activity', params);
};

// 修改活动
export const editActivity = (params: any): Promise<R<any>> => {
    return axios.put<R<any>>('api/activity', params);
};

// 删除活动
export const deleteActivity = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/activity', params);
};

// 上传文件
export const uploadActivityFile = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/activity/file', params);
}

// 搜索活动
export const searchActivity = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/activity/search', params);
}
