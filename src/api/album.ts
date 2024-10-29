import axios from './';
// 引入Album接口
import { Album } from '../interfaces/Album';


// 获取所有合集
export const getAllAlbums = () => {
    return axios.get<Album[]>('api/album/all');
};

// 根据objectId获取合集
export const getAlbumById = (objectId
    : string) => {
    return axios.get<Album>('api/album/objects/' + objectId);
}
// 添加合集
export const addAlbum = (params: any) => {
    return axios.post<Album>('api/album/add', params);
}
// 修改合集
export const editAlbum = (objectId: string,params: any) => {
    return axios.put<Album>('api/album/objects/' + objectId, params);
}
