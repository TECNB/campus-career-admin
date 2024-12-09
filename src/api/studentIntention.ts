import axios from '.';

import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有学生意向
export const getAllStudentIntention = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/student-intention',param);
};

// 根据 objectId 获取学生意向
export const getStudentIntentionById = (id: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/student-intention/' + id);
};

// 根据studentId获取学生意向
export const getStudentIntentionByStudentId = (studentId: string): Promise<R<any>> => {
    return axios.get<R<any>>('api/student-intention/student/' + studentId);
};

// 添加学生意向
export const addStudentIntention = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/student-intention', params);
};

// 修改学生意向
export const editStudentIntention = (params: any): Promise<R<any>> => {
    return axios.put<R<any>>('api/student-intention', params);
};

// 删除学生意向
export const deleteStudentIntention = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/student-intention', params);
};

// 上传文件
export const uploadStudentIntentionFile = (params: any): Promise<R<any>> => {
    return axios.post<R<any>>('api/student-intention/file', params);
}

// 搜索学生意向
export const searchStudentIntention = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/student-intention/search', params);
}

// 批量删除学生意向
export const batchDeleteStudentIntention = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/student-intention/batch', params);
}
