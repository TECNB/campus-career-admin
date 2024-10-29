import axios from './';
// 引入Collection接口
import { Collection } from '../interfaces/Collection';

// 获取推荐藏品
export const getRecommendedCollections = () => {
    return axios.get<Collection[]>('api/collections/recommended');
};
// 获取最受欢迎的10个藏品
export const getPopularCollections = () => {
    return axios.get<Collection[]>('api/collections/popular');
};
// 获取所有藏品
export const getAllCollections = () => {
    return axios.get<Collection[]>('api/collections/all');
};


// 搜索藏品
export const searchCollections = (params: any) => {
    return axios.post<Collection[]>('api/collections/search', params);
};

// 根据 objectld 获取藏品
export const getCollectionById = (objectId: string) => {
    return axios.get<Collection>('api/collections/objects/' + objectId);
}


// 根据分类获取藏品
export const getCollectionsByCategory = (categoryId: string) => {
    return axios.get<Collection[]>('api/collections/category/' + categoryId);
}

// 增加藏品浏览次数
export const addCollectionViews = (objectId: string) => {
    return axios.post('api/collections/objects/' + objectId + '/visit');
}

// 上传图片文件
export const uploadImage = (params: any) => {
    return axios.post('api/collections/upload', params);
}

// 藏品调价
export const updateCollectionPrice = (objectId: string, params: any) => {
    return axios.put('api/collections/objects/' + objectId + '/price', params);
}

// 获取所有已审核的藏品
export const getAllCheckedCollections = () => {
    return axios.get<Collection[]>('api/collections/allChecked');
}

// 获取所有未审核的藏品
export const getAllNotCheckedCollections = () => {
    return axios.get<Collection[]>('api/collections/allNotChecked');
}

// 审核藏品
export const checkCollection = (objectId: string,params:any) => {
    return axios.put('api/collections/objects/' + objectId + '/check',params);
}

// 获取自己上传的藏品
export const getCreatedCollection = () => {
    return axios.get<Collection[]>('api/user/me/issuedCollections');
}

// 根据 objectId 删除藏品
export const deleteCollection = (objectId: string) => {
    return axios.delete('api/collections/objects/' + objectId);
}