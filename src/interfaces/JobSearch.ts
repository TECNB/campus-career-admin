export interface JobSearch {
    id?: number;  // id 在添加岗位时为可选项，修改时必填
    companyName: string;  // 企业名称
    positionName: string;  // 岗位名称
    hrName?: string;  // HR 名称，可选
    hrPhone?: string;  // HR 联系电话，可选
    majorRequirement?: string;  // 专业要求，可选，以逗号分隔
    participantCount?: number;  // 招聘人数，可选
    money?: string;  // 薪资待遇，可选，格式如 "10k-15k"
    area?: string;  // 工作地点，可选
    applicationLink?: string;  // 网申链接，可选
    additionalRequirements?: string;  // 其他要求，可选
    companyDescription?: string;  // 企业简介，可选
    createdAt: string; // 创建时间 (ISO 8601 格式)
    updatedAt: string; // 更新时间 (ISO 8601 格式)
}