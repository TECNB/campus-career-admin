<template>
    <div class="Table p-10">
        <!-- 顶部搜索栏 -->
        <div class="tableBar flex justify-between items-center mb-4">
            <div class="SearchInput flex items-center">
                <el-icon :size="16">
                    <Search />
                </el-icon>
                <input type="text" class="ml-2" placeholder="请输入活动名称" v-model="input" @keyup.enter="filterData"/>
            </div>
            <div class="FilterBox flex items-center cursor-pointer">
                <el-icon>
                    <Operation />
                </el-icon>
                <p class="ml-2">筛选</p>
            </div>
        </div>

        <!-- 表格数据 -->
        <el-scrollbar height="100%">
            <el-table :data="tableData" class="tableBox" table-layout="fixed" @selection-change="handleSelectionChange"
                v-loading="loading" :row-style="{ height: '80px' }">

                <el-table-column type="selection" width="40" />
                <el-table-column prop="category" label="活动内容">
                    <template #default="{ row }">
                        <span>{{ row.category }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="活动名称" width="120" />
                <el-table-column prop="startTime" label="活动开始时间" width="160">
                    <template #default="{ row }">
                        <span>{{ new Date(row.startTime).toLocaleString() }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="endTime" label="活动结束时间" width="160">
                    <template #default="{ row }">
                        <span>{{ new Date(row.endTime).toLocaleString() }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="place" label="活动地点" />
                <el-table-column prop="participantCount" label="活动人数" />
                <el-table-column prop="money" label="薪资待遇" />
                <el-table-column prop="nature" label="公司性质" />
                <el-table-column prop="area" label="工作地点" width="160" />
                <el-table-column prop="jobPosition" label="招聘岗位" />
                <el-table-column prop="applicationLink" label="网申链接" width="160">
                    <template #default="{ row }">
                        <a :href="row.applicationLink" target="_blank">{{ row.applicationLink }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="targetAudience" label="发送人群" />
                <el-table-column prop="activityImage" label="活动图片">
                    <template #default="{ row }">
                        <el-avatar :src="row.activityImage" size="large" shape="square"/>
                    </template>
                </el-table-column>
                <el-table-column prop="detail" label="活动详情" width="160" />

                <!-- 操作栏 -->
                <el-table-column label="操作" width="200" align="center">
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

import router from '../router/index';

import { Activity } from '../interfaces/Activity';
import { addActivity,getAllActivity,getActivityById,editActivity,deleteActivity } from '../api/activity';


const props = defineProps(['dateOrder', 'typeOrder']);


const input = ref('');

const tableData = ref<Activity[]>([]);


const pageSize = ref(10);
const counts = ref(tableData.value.length);
const page = ref(1);
// const user = 'admin';
const allData = ref<Activity[]>([]);

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
watch(() => props.typeOrder, (newVal) => {
    if (newVal === "招聘会") {
        // 筛选出category为"招聘会"的数据
        tableData.value = allData.value.filter((item) => item.category === "招聘会");
    } else if (newVal === "宣讲会") {
        // 筛选出category为"宣讲会"的数据
        tableData.value = allData.value.filter((item) => item.category === "宣讲会");
    } else if (newVal === "招聘公告") {
        // 筛选出category为"招聘公告"的数据
        tableData.value = allData.value.filter((item) => item.category === "招聘公告");
    } else {
        // 如果没有匹配项，则显示全部数据
        tableData.value = allData.value;
    }
    counts.value = tableData.value.length;
});

onMounted(async () => {
    loading.value = true;
    await getAllActivity().then((res) => {
        loading.value = false;
        allData.value = res.data.records;

        counts.value = allData.value.length;
        tableData.value = allData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);

    })
});

const filterData = () => {
    const filtered = allData.value.filter(activity => 
        activity.name.includes(input.value.trim())
    );
    counts.value = filtered.length;
    tableData.value = filtered.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);
};

const toUpdateActivity = (id: string) => {
    console.log('toUpdateActivity')
    router.push('/updateActivity/' + id)
}

const deletion = async (id: number) => {
    try {
        await ElMessageBox.confirm('确定删除该活动吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });

        await deleteActivity({ id });
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
