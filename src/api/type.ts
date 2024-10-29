import axios from './';
// 引入Collection接口
import { Type } from '../interfaces/Type';


// 添加分类
export const addType = (params: any) => {
    return axios.post('api/categories/add', params);
}
// 获取所有藏品分类
export const getAllTypes = () => {
    return axios.get<Type[]>('api/categories/all');
};

// 根据objectId获取分类
export const getTypeById = (objectId
    : string) => {
    return axios.get<Type>('api/categories/objects/' + objectId);
}

// 修改分类
export const editType = (objectId: string,formData:any) => {
    return axios.put('api/categories/objects/' + objectId,formData);
}

