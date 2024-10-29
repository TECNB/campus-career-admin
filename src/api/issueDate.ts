import axios from './';
// 引入Collection接口
import { IssueDate } from '../interfaces/IssueDate';

// 获取发行计划
export const getIssueDates = () => {
    return axios.get<IssueDate[]>('api/issueDate/all');
};
// 添加添加发行计划
export const addIssueDates = (params:any) => {
    return axios.post<IssueDate[]>('api/issueDate/add',params);
};
