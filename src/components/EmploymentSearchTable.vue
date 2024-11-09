<template>
    <div class="Table p-10">
        <!-- 顶部搜索栏 -->
        <div class="tableBar flex justify-between items-center mb-4">
            <div class="SearchInput flex items-center">
                <el-icon :size="16">
                    <Search />
                </el-icon>
                <input type="text" class="ml-2" placeholder="请输入文字进行搜索" v-model="input" @keyup.enter="filterData" />
            </div>
            <div class="FilterBox flex items-center cursor-pointer" @click="toggleFilter">
                <el-icon>
                    <Operation />
                </el-icon>
                <p class="ml-2">筛选</p>
            </div>
        </div>

        <!-- 筛选选项 -->
        <div class="mb-5 flex justify-start items-center gap-8" v-if="filterVisible">
            <p v-for="(option, index) in filterOptions" :key="index" :class="[
                selectedFilter === option.value ? 'text-blue-400 p-2 bg-blue-50 rounded-md cursor-pointer' : 'text-gray-500 cursor-pointer'
            ]" @click="selectFilter(option.value)">
                {{ option.label }}
            </p>
        </div>

        <!-- 表格数据 -->
        <el-scrollbar height="100%">
            <el-table :data="tableData" class="tableBox" table-layout="fixed" @selection-change="handleSelectionChange"
                v-loading="loading" :row-style="{ height: '80px' }">
                <el-table-column type="selection" width="40" />

                <el-table-column prop="id" label="序号" width="60" />
                <el-table-column prop="name" label="姓名" width="120" />
                <el-table-column prop="gender" label="性别" width="80" />
                <el-table-column prop="className" label="班级" width="150" />
                <el-table-column prop="userId" label="学号" width="130" />
                <el-table-column prop="contactNumber" label="联系电话" width="130" />
                <el-table-column prop="classTeacher" label="班主任" width="120" />
                <el-table-column prop="graduationTutor" label="毕业导师" width="120" />
                <el-table-column prop="futurePlan" label="毕业意向" width="120">
                    <template #default="{ row }">
                        <span>{{ row.futurePlan }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="companyName" label="公司名称" />
                <el-table-column prop="employmentStatus" label="就业状态" width="120" />
                <el-table-column prop="workLocation" label="工作地点" width="120" />
                <el-table-column prop="salary" label="薪资" width="100" />
                <el-table-column prop="companyNature" label="单位性质" width="100" />
                <el-table-column prop="createdAt" label="创建时间" width="160">
                    <template #default="{ row }">
                        <span>{{ new Date(row.createdAt).toLocaleString() }}</span>
                    </template>
                </el-table-column>

                <!-- 操作栏 -->
                <el-table-column label="操作" width="200" align="center" v-if="userInfo.user?.userType == 'teacher'">
                    <template #default="{ row }">
                        <el-button text bg type="success" size="small" @click="toUpdate(row.id)">
                            编辑
                        </el-button>

                        <el-button text bg type="danger" size="small" @click="deletion(row.id)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>

        <!-- 分页 -->
        <el-config-provider :locale="zhCn">
            <el-pagination class="pageList" :page-sizes="[10, 20, 30]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="counts" :current-page.sync="page"
                @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        </el-config-provider>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
// ElConfigProvider 组件
import { ElConfigProvider } from 'element-plus';
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';

import router from '../router/index';

import { EmploymentSearch } from '../interfaces/EmploymentSearch';
import { getAllEmploymentSearch, deleteEmploymentSearch } from '../api/employmentSearch';


const props = defineProps(['dateOrder', 'typeOrder']);

const filterOptions = [
    { label: '姓名', value: 'name' },
    { label: '性别', value: 'gender' },
    { label: '班级', value: 'className' },
    { label: '学号', value: 'userId' },
    { label: '联系电话', value: 'contactNumber' },
    { label: '班主任', value: 'classTeacher' },
    { label: '毕业导师', value: 'graduationTutor' },
    { label: '毕业意向', value: 'futurePlan' },
    { label: '公司名称', value: 'companyName' },
    { label: '就业状态', value: 'employmentStatus' },
    { label: '工作地点', value: 'workLocation' },
    { label: '薪资', value: 'salary' },
    { label: '单位性质', value: 'companyNature' },
];
const selectedFilter = ref('category');  // 默认筛选条件
const filterVisible = ref(false);
// 使用userInfoStore
const userInfo = userInfoStore();


const input = ref('');

const tableData = ref<EmploymentSearch[]>([]);


const pageSize = ref(10);
const counts = ref(tableData.value.length);
const page = ref(1);
// const user = 'admin';
const allData = ref<EmploymentSearch[]>([]);

let loading = ref(false);




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
// 通过watch监听props.typeOrder的变化
// watch(() => props.typeOrder, (newVal) => {
//     if (newVal === "招聘会") {
//         // 筛选出category为"招聘会"的数据
//         tableData.value = allData.value.filter((item) => item.category === "招聘会");
//     } else if (newVal === "宣讲会") {
//         // 筛选出category为"宣讲会"的数据
//         tableData.value = allData.value.filter((item) => item.category === "宣讲会");
//     } else if (newVal === "招聘公告") {
//         // 筛选出category为"招聘公告"的数据
//         tableData.value = allData.value.filter((item) => item.category === "招聘公告");
//     } else {
//         // 如果没有匹配项，则显示全部数据
//         tableData.value = allData.value;
//     }
//     counts.value = tableData.value.length;
// });

onMounted(async () => {
    loading.value = true;
    await getAllEmploymentSearch().then((res) => {
        loading.value = false;
        allData.value = res.data.records;

        counts.value = allData.value.length;
        tableData.value = allData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);

    })
});

const toggleFilter = () => {
    filterVisible.value = !filterVisible.value;
};

// 选择筛选项
const selectFilter = (value: string) => {
    selectedFilter.value = value;
    console.log(selectedFilter.value);
    filterData();
};

// 过滤数据
const filterData = () => {
    console.log('allData', allData.value)
    const filtered = allData.value.filter(table => {
        const value = table[selectedFilter.value as keyof EmploymentSearch];
        return value && value.toString().includes(input.value.trim());
    });
    tableData.value = filtered.slice(0, 10); // 这里假设分页大小为10，您可以根据实际需要修改
};
const toUpdate = (id: string) => {
    console.log('toUpdate')
    router.push('/updateEmployment-search/' + id)
}

const deletion = async (id: number) => {
    try {
        await ElMessageBox.confirm('确定删除该资料吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });

        await deleteEmploymentSearch({ id });
        ElMessage.success('删除成功');

        // 删除成功后更新表格数据
        const updatedData = allData.value.filter((item) => item.id !== id);
        allData.value = updatedData;
        updateTableData();
    } catch (error) {
        console.error(error);
        ElMessage.error('删除失败');
    }
};

// 处理每页显示数量变化逻辑
const handleSizeChange = (val: number) => {
    // 示例的处理每页显示数量变化逻辑
    pageSize.value = val;
    updateTableData(); // 更新显示的数据
};

// 处理当前页变化逻辑
const handleCurrentChange = (val: any) => {
    // 示例的处理当前页变化逻辑
    page.value = val;
    updateTableData(); // 更新显示的数据
};

const updateTableData = () => {
    const startIndex = (page.value - 1) * pageSize.value;
    const endIndex = page.value * pageSize.value;
    tableData.value = allData.value.slice(startIndex, endIndex);
};

const multipleSelection = ref<[]>([])
const handleSelectionChange = (val: []) => {
    multipleSelection.value = val
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
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 1;

            background-color: rgba(250, 250, 250, 1);
            border-radius: 12px;


            padding: 12px;
            margin-bottom: 20px;

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
            margin-bottom: 20px;
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
