import axios from './';
// 引入BlindBox接口
import { BlindBox } from '../interfaces/BlindBox';


// 获取所有盲盒
export const getAllBlindBoxs = () => {
    return axios.get<BlindBox[]>('api/blindBox/all');
};

// 根据objectId获取盲盒
export const getBlindBoxById = (objectId
    : string) => {
    return axios.get<BlindBox>('api/blindBox/objects/' + objectId);
}
// 添加盲盒
export const addBlindBox = (params: any) => {
    return axios.post<BlindBox>('api/blindBox/add', params);
}
