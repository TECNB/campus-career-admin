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
            <el-table
                :data="tableData"
                class="tableBox"
                table-layout="fixed"
                @selection-change="handleSelectionChange"
                v-loading="loading"
                :row-style="{ height: '80px' }"
            >
                <el-table-column type="selection" width="40" v-if="isMediumScreen"/>
                <el-table-column prop="name" label="活动地点名称" />
                <el-table-column prop="createdAt" label="创建时间">
                    <template #default="{ row }">
                        <span>{{ new Date(row.createdAt).toLocaleString() }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column label="操作" width="200" align="center" v-if="userInfo.user?.userType === 'admin'">
                    <template #default="{ row }">
                        <el-button text bg type="success" size="small" @click="toUpdateActivity(row.id)">
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
            <el-pagination
                class="pageList"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                :layout="isMediumScreen ? 'total, sizes, prev, pager, next, jumper' : 'sizes, prev, pager, next'"
                :total="counts"
                :current-page.sync="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            ></el-pagination>
        </el-config-provider>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted,onBeforeUnmount } from 'vue';
// ElConfigProvider 组件
import { ElConfigProvider } from 'element-plus';
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';

import router from '../router/index';

import { Activity } from '../interfaces/Activity';
import { getAllActivityPlace,deleteActivityPlace,searchActivityPlace } from '../api/activityPlace';


const props = defineProps(['dateOrder', 'typeOrder']);


const filterOptions = [
    { label: '活动地点名称', value: 'name' },
    { label: '创建时间', value: 'createdAt' },
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
const isSearch = ref(false)

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

onMounted(async () => {
    await fetchTableData();
    updateScreenSize(); // 初始化时检查屏幕大小
    window.addEventListener("resize", updateScreenSize); // 监听窗口变化
});

const fetchTableData = async () => {
    loading.value = true;
    const data = {
        page: page.value,
        size: pageSize.value,
    };
    try {
        const res = await getAllActivityPlace(data);
        loading.value = false;
        allData.value = res.data.records;
        counts.value = res.data.total;
        tableData.value = allData.value;
    } catch (error) {
        loading.value = false;
        console.error('获取数据失败:', error);
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
        const res = await searchActivityPlace({
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
        await ElMessageBox.confirm('确定删除该活动吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });

        await deleteActivityPlace({ id });
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

const handleSelectionChange = (val: []) => {
    multipleSelection.value = val;
};

const toUpdateActivity = (id: string) => {
    console.log('toUpdateActivity')
    router.push('/updatePlace/' + id)
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
