import axios from '.';
import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有活动目标受众
export const getAllActivityTargetAudience = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/activity-target-audience',param);
};

// 根据 ID 获取活动目标受众
export const getActivityTargetAudienceById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>(`api/activity-target-audience/${id}`);
};

// 添加活动目标受众
export const addActivityTargetAudience = (params: { audienceLabel: string; audienceValue: string; parentId?: string }): Promise<R<any>> => {
    return axios.post<R<any>>('api/activity-target-audience', params);
};

// 修改活动目标受众
export const editActivityTargetAudience = (params: { id: string; audienceLabel: string; audienceValue: string; parentId?: string }): Promise<R<any>> => {
    return axios.put<R<any>>('api/activity-target-audience', params);
};

// 删除活动目标受众
export const deleteActivityTargetAudience = (params:any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/activity-target-audience', params);
};

// 搜索活动目标受众
export const searchActivityTargetAudience = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/activity-target-audience/search', params);
};

// 批量删除活动目标受众
export const batchDeleteActivityTargetAudience = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/activity-target-audience/batch', params);
}