import axios from '.';

import { R } from '../interfaces/R'; // 保留 R 接口

// 获取指定用户的简历或面试文件
export const getUserFile = (params: any): Promise<R<any>> => {
    return axios.get<R<any>>(`/api/user-resume-interview-attachment`,params);
};
