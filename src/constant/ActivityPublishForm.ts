import { ref, Ref } from 'vue';

// 定义类别的响应式变量
export const category = ref<string>('');

// 定义类别选项
export const allType = ref<any[]>([
    { objectId: '1', name: '招聘会' },
    { objectId: '2', name: '宣讲会' },
    { objectId: '3', name: '招聘广告' }
]);

// 定义活动名称的响应式变量
export const name = ref<string>('');

// 定义开始时间和结束时间的响应式变量
export const startTime: Ref<Date | null> = ref(null);
export const endTime: Ref<Date | null> = ref(null);

// 定义活动地点的响应式变量
export const place = ref<string>('');

// 定义地点选项
export const allPlace = ref<any[]>([
    { objectId: '1', name: '3C 108' },
    { objectId: '2', name: '喷泉广场' },
    { objectId: '3', name: '图书馆' },
    { objectId: '4', name: '西南门' }
]);

// 定义薪资待遇的响应式变量
export const money = ref<string>('');

// 定义薪资待遇选项
export const allMoney = ref<any[]>([
    { objectId: '1', name: '2000-5000' },
    { objectId: '2', name: '5000-8000' },
    { objectId: '3', name: '8000-15000' },
    { objectId: '4', name: '15000以上' }
]);

// 定义企业性质的响应式变量
export const nature = ref<string>('');

// 定义企业性质选项
export const allNature = ref<any[]>([
    { objectId: '1', name: '国有企业' },
    { objectId: '2', name: '私有企业' },
    { objectId: '3', name: '外资企业' },
    { objectId: '4', name: '合资企业' },
    { objectId: '5', name: '其他' }
]);

// 定义活动人数的响应式变量
export const participantCount: Ref<number | null> = ref(null);

// 定义日期选择器的快捷选项
export const shortcuts = [
    {
        text: '今天',
        value: () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return today;
        },
    },
    {
        text: '明天',
        value: () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            return tomorrow;
        },
    },
    {
        text: '一周后',
        value: () => {
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            nextWeek.setHours(0, 0, 0, 0);
            return nextWeek;
        },
    },
];

// 定义职位名称的响应式变量
export const jobPosition = ref<string>('');

// 定义报名链接的响应式变量
export const applicationLink = ref<string>('');

// 定义目标受众的响应式变量
export const targetAudience = ref<any>(null);

// 定义树形选择的数据结构
export const treeData = ref([
    {
        label: '21级本科',
        children: [
            { label: '电子信息2101', value: '电子信息2101' },
            { label: '电子信息2102', value: '电子信息2102' },
            { label: '电子信息2103', value: '电子信息2103' },
            { label: '电子信息2104', value: '电子信息2104' },
            { label: '软件工程2101', value: '软件工程2101' },
            { label: '软件工程2102', value: '软件工程2102' }
        ]
    },
    {
        label: '22级本科',
        children: [
            // 按需添加班级信息
        ]
    },
    {
        label: '23级本科',
        children: [
            // 按需添加班级信息
        ]
    },
    {
        label: '24级本科',
        children: [
            // 按需添加班级信息
        ]
    }
]);

// 定义 el-tree-select 的属性配置
export const defaultProps = {
    children: 'children',
    label: 'label',
    value: 'value'
};

// 定义活动详情
export const detail = ref<string>('');

// 工作地点
export const area = ref<string>('');
