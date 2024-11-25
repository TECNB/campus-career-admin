import axios from '.';
import { R } from '../interfaces/R'; // 保留 R 接口

// 获取所有谈话记录
export const getAllConversationRecords = (param:any): Promise<R<any>> => {
    return axios.get<R<any>>('api/conversation-records',param);
};

// 根据 ID 获取谈话记录
export const getConversationRecordById = (param:any,id: string): Promise<R<any>> => {
    return axios.get<R<any>>(`api/conversation-records/${id}`,param);
};

// 添加谈话记录
export const addConversationRecord = (params: { name: string; gender: string; className: string; studentId: string; contactNumber: string; classTeacher: string; graduationTutor: string }): Promise<R<any>> => {
    return axios.post<R<any>>('api/conversation-records', params);
};

// 修改谈话记录
export const editConversationRecord = (params: { id: string; name: string; gender: string; className: string; studentId: string; contactNumber: string; classTeacher: string; graduationTutor: string }): Promise<R<any>> => {
    return axios.put<R<any>>('api/conversation-records', params);
};

// 删除谈话记录
export const deleteConversationRecord = (params: any): Promise<R<any>> => {
    return axios.delete<R<any>>('api/conversation-records', params);
};

// 搜索谈话记录
export const searchConversationRecord = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>('api/conversation-records/search', params);
};