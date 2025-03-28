<template>
    <div class="Table p-5 md:p-10">
        <!-- 顶部搜索栏 -->
        <div class="tableBar flex justify-between items-center mb-4">
            <div class="SearchInput flex justify-between items-center">
                <div class="">
                    <el-icon :size="16">
                        <Search />
                    </el-icon>
                    <input type="text" class="ml-2" placeholder="请输入文字进行搜索" v-model="input" @keyup.enter="filterData" />
                </div>
                <div class="!block md:!hidden" @click="toggleFilter">
                    <el-icon :size="16">
                        <Operation />
                    </el-icon>
                </div>
            </div>
            <div class="FilterBox md:!flex items-center cursor-pointer !hidden" @click="toggleFilter">
                <el-icon>
                    <Operation />
                </el-icon>
                <p class="ml-2">筛选</p>
            </div>
        </div>

        <!-- 筛选选项 -->
        <el-scrollbar>
            <div class="flex justify-start items-center gap-8 mb-5" v-if="filterVisible">
                <p v-for="(option, index) in filterOptions" :key="index" :class="[
                    selectedFilter === option.value ? 'text-blue-400 p-2 bg-blue-50 rounded-md cursor-pointer whitespace-nowrap' : 'text-gray-500 cursor-pointer whitespace-nowrap'
                ]" @click="selectFilter(option.value)">
                    {{ option.label }}
                </p>
            </div>
        </el-scrollbar>

        <!-- 表格数据 -->
        <el-scrollbar height="100%">
            <el-table :data="tableData" class="tableBox" table-layout="fixed" @selection-change="handleSelectionChange"
                v-loading="loading" :row-style="{ height: '80px' }">
                <el-table-column type="selection" width="40" v-if="isMediumScreen"/>
                <el-table-column label="详情" width="60" align="start" v-if="userInfo.user?.userType === 'teacher'">
                    <template #default="{ row }">
                        <el-button text bg type="success" size="small" @click="toUpdateUserInfo(row.studentId)">
                            查看
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="gender" label="性别" />
                <el-table-column prop="politicalStatus" label="政治面貌" width="170">
                    <template #default="{ row }">
                        <span>{{ row.politicalStatus }}</span>
                        <el-button type="primary" size="small" class="ml-3"
                            @click="goToPoliticalStatus(row.studentId)">
                            详情
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="isSpecialGroup" label="是否特殊群体" width="110">
                    <template #default="{ row }">
                        <span>{{ row.isSpecialGroup=='是' ? '是' : '否' }}</span>
                        <el-button v-if="row.isSpecialGroup=='是'" type="primary" size="small" class="ml-3"
                            @click="goToSpecialGroup(row.studentId)">
                            详情
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column prop="studentId" label="学号" />
                <el-table-column prop="idCard" label="身份证号" />
                <el-table-column prop="grade" label="年级" />
                <el-table-column prop="major" label="专业" />
                <el-table-column prop="className" label="班级" />
                <el-table-column prop="classRole" label="班级职务" />
                <el-table-column prop="specialization" label="专业方向" />
                <el-table-column prop="birthDate" label="出生日期" />
                <el-table-column prop="admissionDate" label="入学日期" />
                <el-table-column prop="expectedGraduation" label="预计毕业时间" />
                <el-table-column prop="nativePlace" label="籍贯" />
                <el-table-column prop="sourcePlace" label="生源地" />
                <el-table-column prop="ethnicity" label="民族" />
                <el-table-column prop="residence" label="户口所在地" />
                <el-table-column prop="homeAddress" label="家庭住址" />
                <el-table-column prop="counselor" label="辅导员姓名" />
                <el-table-column prop="counselorPhone" label="辅导员手机号" />
                <el-table-column prop="classTeacher" label="班主任姓名" />
                <el-table-column prop="classTeacherPhone" label="班主任手机号" />
                <el-table-column prop="graduationTutor" label="毕设导师姓名" />
                <el-table-column prop="graduationTutorPhone" label="毕设导师手机号" />
                <el-table-column prop="dormitoryNumber" label="寝室号" />
                <el-table-column prop="networkStatus" label="红旗网络" />
                <el-table-column prop="dormitoryMembers" label="寝室成员名单" />
                <el-table-column prop="email" label="电子邮箱" />
                <el-table-column prop="qqNumber" label="QQ号码" />
                <el-table-column prop="wechatId" label="微信号码" />
                <el-table-column prop="douyinId" label="抖音账号" />
                <el-table-column prop="parent1Name" label="家长1姓名" />
                <el-table-column prop="parent1Phone" label="家长1手机号" />
                <el-table-column prop="parent1IdCard" label="家长1身份证" />
                <el-table-column prop="parent1Company" label="家长1工作单位" />
                <el-table-column prop="parent1Job" label="家长1职业" />
                <el-table-column prop="parent2Name" label="家长2姓名" />
                <el-table-column prop="parent2Phone" label="家长2手机号" />
                <el-table-column prop="parent2IdCard" label="家长2身份证" />
                <el-table-column prop="parent2Company" label="家长2工作单位" />
                <el-table-column prop="parent2Job" label="家长2职业" />
                <el-table-column prop="emergencyContactName" label="紧急联系人姓名" />
                <el-table-column prop="emergencyContactPhone" label="紧急联系人手机号" />
                <el-table-column prop="emergencyContactIdCard" label="紧急联系人手机号" />



            </el-table>
        </el-scrollbar>

        <!-- 分页 -->
        <el-config-provider :locale="zhCn">
            <el-pagination class="pageList" :page-sizes="[10, 20, 30]" :page-size="pageSize"
                :layout="isMediumScreen ? 'total, sizes, prev, pager, next, jumper' : 'sizes, prev, pager, next'"
                :total="counts" :current-page.sync="page" @size-change="handleSizeChange"
                @current-change="handleCurrentChange"></el-pagination>
        </el-config-provider>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
// ElConfigProvider 组件
import { ElConfigProvider } from 'element-plus';
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';

import router from '../router/index';

import { Activity } from '../interfaces/Activity';
import { getAllUserInfos, deleteUserInfo, searchUserInfo } from '../api/userInfo';
import { getSpecialGroupById } from '../api/specialGroup';


const props = defineProps(['dateOrder', 'typeOrder']);
const emits = defineEmits(["selectionChange"]);


const selectedIds = ref<string[]>([]);

const filterOptions = [
    { label: '姓名', value: 'name' },
    { label: '学号', value: 'studentId' },
    { label: '身份证号', value: 'idCard' },
    { label: '年级', value: 'grade' },
    { label: '专业', value: 'major' },
    { label: '班级', value: 'className' },
    { label: '班级职务', value: 'classRole' },
    { label: '专业方向', value: 'specialization' },
    { label: '出生日期', value: 'birthDate' },
    { label: '入学日期', value: 'admissionDate' },
    { label: '预计毕业时间', value: 'expectedGraduation' },
    { label: '籍贯', value: 'nativePlace' },
    { label: '生源地', value: 'sourcePlace' },
    { label: '民族', value: 'ethnicity' },
    { label: '户口所在地', value: 'residence' },
    { label: '家庭住址', value: 'homeAddress' },
    { label: '辅导员姓名', value: 'counselor' },
    { label: '辅导员手机号', value: 'counselorPhone' },
    { label: '班主任姓名', value: 'classTeacher' },
    { label: '班主任手机号', value: 'classTeacherPhone' },
    { label: '毕设导师姓名', value: 'graduationTutor' },
    { label: '毕设导师手机号', value: 'graduationTutorPhone' },
    { label: '寝室号', value: 'dormitoryNumber' },
    { label: '红旗网络', value: 'networkStatus' },
    { label: '寝室成员名单', value: 'dormitoryMembers' },
];
const selectedFilter = ref('name');  // 默认筛选条件
const filterVisible = ref(false);

// 使用userInfoStore
const userInfo = userInfoStore();


const input = ref('');
const tableData = ref<Activity[]>([]);

const pageSize = ref(10);
const counts = ref(tableData.value.length);
const page = ref(1);
const allData = ref<Activity[]>([]);
const multipleSelection = ref<[]>([])

// 是否搜索
const isSearch = ref(false);

let loading = ref(false);

// 定义是否处于中等屏幕以上的状态
const isMediumScreen = ref(false);

// 更新屏幕宽度的响应式逻辑
const updateScreenSize = () => {
    isMediumScreen.value = window.innerWidth >= 768;
};

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateScreenSize); // 组件卸载时移除监听器
});

// 通过watch监听props.dateOrder的变化
watch(() => props.dateOrder, (newVal) => {
    if (newVal == "日期正序") {
        tableData.value.sort((a, b) => {
            return a.createdAt > b.createdAt ? 1 : -1;
        });
    } else if (newVal == "日期倒序") {
        tableData.value.sort((a, b) => {
            return a.createdAt < b.createdAt ? 1 : -1;
        });
    }
});

// 通过watch监听props.dateOrder的变化


onMounted(async () => {
    await fetchTableData();
    updateScreenSize(); // 初始化时检查屏幕大小
    window.addEventListener("resize", updateScreenSize); // 监听窗口变化
});

const goToPoliticalStatus = (studentId: string) => {
    router.push(`/updatePolitical-status/${studentId}`);
};

const goToSpecialGroup = (studentId: string) => {
    router.push(`/updateSpecial-group/${studentId}`);
};

const fetchTableData = async () => {
    loading.value = true;
    const data = {
        page: page.value,
        size: pageSize.value,
    };
    try {
        const res = await getAllUserInfos(data);

        allData.value = res.data.records;
        counts.value = res.data.total;
        tableData.value = allData.value;
    } catch (error) {
        console.error('获取数据失败:', error);
    } finally {
        loading.value = false;
    }
};

const toggleFilter = () => {
    filterVisible.value = !filterVisible.value;
};

// 选择筛选项
const selectFilter = (value: string) => {
    selectedFilter.value = value;
};

// 搜索并筛选数据
const filterData = async () => {
    if (!selectedFilter.value || !input.value.trim()) {
        await fetchTableData();
        return;
    }

    loading.value = true;
    try {
        const res = await searchUserInfo({
            filterField: selectedFilter.value,
            filterValue: input.value.trim(),
            page: page.value,
            size: pageSize.value
        });
        loading.value = false;
        tableData.value = res.data.records;
        counts.value = res.data.total;
        isSearch.value = true;
    } catch (error) {
        loading.value = false;
        console.error('搜索数据失败:', error);
    }
};

const deletion = async (id: number) => {
    try {
        await ElMessageBox.confirm('确定删除该学生资料吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });

        await deleteUserInfo({ id });
        ElMessage.success('删除成功');
        await fetchTableData(); // 刷新数据
    } catch (error) {
        console.error(error);
        ElMessage.error('删除失败');
    }
};

// 处理每页显示数量变化逻辑
const handleSizeChange = (val: number) => {
    pageSize.value = val;
    fetchTableData();
};

// 处理当前页变化逻辑
const handleCurrentChange = (val: number) => {
    page.value = val;
    if (isSearch) {
        filterData();
    } else {
        fetchTableData();
    }
};

const handleSelectionChange = (selection: any[]) => {
    // 提取选中的 ID
    selectedIds.value = selection.map((item) => item.id);
    emits("selectionChange", selectedIds.value);
};
const toUpdateUserInfo = (id: string) => {
    console.log('toUpdateUserInfo')
    router.push('/updateUser-info/' + id)
}
</script>

<style lang="scss" scoped>
:deep(.el-tag) {
    border-radius: 9px;
}

.Table {
    width: auto;
    height: 92%;

    background: #fff;
    border-radius: 16px;

    margin: 24px;

    .tableBar {
        display: flex;
        justify-content: space-between;
        align-content: center;
        gap: 20px;

        /* 输入框样式 */
        .SearchInput {
            flex: 1;

            background-color: rgba(250, 250, 250, 1);
            border-radius: 12px;


            padding: 12px;
            margin-bottom: 10px;

            input {
                outline: none;
                padding-left: 10px;
                font-size: 16px;
                width: 200px;
                /* 调整输入框的宽度 */
                border: 0px;
                color: rgba(160, 174, 192, 1);
                background-color: rgba(250, 250, 250, 1);
            }
        }

        /* 筛选框样式 */
        .FilterBox {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;


            color: rgba(160, 174, 192, 1);
            background-color: rgba(250, 250, 250, 1);
            border-radius: 12px;


            padding: 12px;
            margin-bottom: 10px;
        }
    }
}


.tableBox {
    width: 100%;
    // 表格的外部是否有边框
    // border: solid 2px #f3f4f7;
    border-radius: 2px;
}

.pageList {
    text-align: center;
    margin-top: 30px;
}


:deep(.el-checkbox__inner) {
    width: 19px;
    height: 19px;
    border-radius: 22.5px;
}

:deep(.el-checkbox__inner::after) {
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    left: 7px;
    top: 4px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
    transform: rotate(50deg) scaleY(1.5);
}
</style>
