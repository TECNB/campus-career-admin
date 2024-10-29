// 数据返回的接口(定义请求响应参数的接口)
// 定义请求响应参数，不含data
export interface IssueDate {
    objectId: string;
    cover: string;
    name: string;
    shortDescription: string;
    issueTime: string; // 这里假设 issueTime 字段是字符串类型
    createTime: string;
}