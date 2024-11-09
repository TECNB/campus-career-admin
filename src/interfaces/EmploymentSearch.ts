export interface EmploymentSearch {
    id?: number;                  // 可选字段，数据库生成的唯一标识符
    name: string;                 // 姓名
    gender: "男" | "女";          // 性别，限定为 "男" 或 "女"
    className: string;            // 班级
    userId: string;            // 学号
    contactNumber: string;        // 联系方式
    classTeacher: string;         // 班主任
    graduationTutor: string;      // 毕业设计导师
    futurePlan: "就业" | "创业" | "考研" | "出国" | "征兵入伍" | "考公考编" | "不就业" | "其他";  // 毕业意向
    salary: string;               // 薪资待遇
    companyNature: string;        // 公司性质
    workLocation: string;         // 工作地点
    employmentStatus: "实习" | "签约" | "暂无";  // 就业情况
    companyName?: string;         // 实习/签约单位，若就业情况为 "暂无" 时可为空
    createdAt: string; // 创建时间 (ISO 8601 格式)
}