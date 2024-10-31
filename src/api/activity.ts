import axios from '.';
// 引入 Collection 接口
import { Activity } from '../interfaces/Activity';
import { R } from '../interfaces/R'; // 引入 R 接口

// 获取所有活动
export const getAllActivity = (): Promise<R<Activity[]>> => {
    return axios.get<R<Activity[]>>('api/activity');
};

// 根据 objectId 获取活动
export const getActivityById = (id: string): Promise<R<Activity>> => {
    return axios.get<R<Activity>>('api/activity/' + id);
};

// 添加活动
export const addActivity = (params: any): Promise<R<Activity>> => {
    return axios.post<R<Activity>>('api/activity', params);
};

// 修改活动
export const editActivity = (params: any): Promise<R<Activity>> => {
    return axios.put<R<Activity>>('api/activity', params);
};

// 删除活动
export const deleteActivity = (params: any): Promise<R<null>> => {
    return axios.delete<R<null>>('api/activity', params);
};
