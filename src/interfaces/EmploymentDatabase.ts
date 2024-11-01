export interface EmploymentDatabase {
    id: number;
    category: string;
    title: string;
    attachment: string;
    details: string;
    createdAt: string; // 创建时间 (ISO 8601 格式)
    updatedAt: string; // 更新时间 (ISO 8601 格式)
}
