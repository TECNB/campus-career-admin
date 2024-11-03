export interface Activity {
    id: number; // 活动的唯一标识符
    category: string; // 活动类别
    name: string; // 活动名称
    startTime: string; // 活动开始时间 (ISO 8601 格式)
    endTime: string; // 活动结束时间 (ISO 8601 格式)
    place: string; // 活动地点
    participantCount: number; // 参与人数
    money: string; // 薪资待遇
    nature: string; // 公司性质
    area: string; // 工作区域
    jobPosition: string; // 招聘岗位
    applicationLink: string; // 网申链接
    targetAudience: string; // 发送人群
    activityImage: string; // 活动图片链接
    detail: string; // 活动详情
    createdAt: string; // 创建时间 (ISO 8601 格式)
    updatedAt: string; // 更新时间 (ISO 8601 格式)
    imagePaths: string[]; // 活动图片链接数组
}
