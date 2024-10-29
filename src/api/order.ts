import axios from './';
// 引入Collection接口
import { Order } from '../interfaces/Order';

// 获取订单数据
export const getOrders = () => {
    return axios.get<Order[]>('api/user/me/orders');
};
