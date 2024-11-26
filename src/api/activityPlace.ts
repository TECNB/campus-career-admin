import axios from '.';
import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有活动地点
export const getAllActivityPlace = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/activity-place',param);
};

// 根据 ID 获取活动地点
export const getActivityPlaceById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>(`api/activity-place/${id}`);
};

// 添加活动地点
export const addActivityPlace = (params: { name: string }): Promise<R<any>> => {
    return axios.post<R<any>>('api/activity-place', params);
};

// 修改活动地点
export const editActivityPlace = (params: { id: string; name: string }): Promise<R<any>> => {
    return axios.put<R<any>>('api/activity-place', params);
};

// 删除活动地点
export const deleteActivityPlace = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/activity-place', params);
};

// 搜索活动地点
export const searchActivityPlace = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/activity-place/search', params);
};

// 批量删除活动地点
export const batchDeleteActivityPlace = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/activity-place/batch', params);
}