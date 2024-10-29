export interface User {
    objectId: string; // 用户对象ID
    hash: string; // 哈希值
    username: string; // 用户名
    userType: string; // 用户类型
    phone: string; // 手机号码
    avatar: string; // 头像
    orders: string[]; // 订单列表
    favoriteCollection: string[]; // 收藏的集合列表
    ownedCollection: string[]; // 拥有的集合列表
    sellingCollection: string[]; // 正在出售的集合列表
    token: string; // 令牌
    lastLogin: string; // 上次登录时间
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
}
