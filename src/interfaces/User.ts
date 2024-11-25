export interface User {
    userId: string;
    studentId: string;
    username: string;
    passwordHash: string;
    userType: 'teacher' | 'student' | 'admin'; // 具体的 userType 可根据实际情况添加
    avatarUrl: string;
    token: string;
    salt: string;
    lastLogin: string; // ISO 日期格式，适合使用 string
    phone: string;
    createdAt: string | null;
    updatedAt: string | null;
}
