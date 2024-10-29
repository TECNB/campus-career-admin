import axios from './';
// 引入Drop接口
import { Drop } from '../interfaces/Drop';


// 获取所有空投
export const getAllDrops = () => {
    return axios.get<Drop[]>('api/airDrop/all');
};

// 根据objectId获取空投
// export const getDropById = (objectId
//     : string) => {
//     return axios.get<Drop>('api/airDrop/objects/' + objectId);
// }

// 获取即将/正在发放的空投
export const getDropsNearest = () => {
    return axios.get<Drop[]>('api/airDrop/nearest');
}

// 添加空投
export const addDrop = (params: any) => {
    return axios.post<Drop>('api/airDrop/add', params);
}