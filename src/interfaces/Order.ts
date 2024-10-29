export interface Order {
    objectId: string;
    creator: string;
    solder: string;
    type: string;
    target: string;
    price: number;
    createTime: string;
    payTime: string;
    dealTime: string;
    finishState: boolean;
}
