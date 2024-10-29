<template>
    <div class="Table">

        <div class="body">
            <!-- 表格 -->


            <!--下面为第一行的Nav-->
            <div class="tableBar">
                <!--下面为Nav中的搜索框-->
                <!--clearable: 表示输入框是否具有清除按钮，允许用户清空输入-->
                <!--@keyup.enter.native="handleQuery": 这是一个事件监听器，
            当用户按下"Enter"键时，
            会触发handleQuery方法，handleQuery方法通常用于执行搜索操作。-->
                <div class="SearchInput">
                    <el-icon :size="16">
                        <Search />
                    </el-icon>
                    <input type="text" placeholder="请输入数字藏品名称">
                </div>
                <div class="FilterBox">
                    <el-icon>
                        <Operation />
                    </el-icon>
                    <p>筛选</p>
                </div>
                <!-- <el-button type="primary" @click="addMemberHandle('add')">
                        + 添加学生
                    </el-button> -->
            </div>
            <!--下面为表格数据-->

            <el-scrollbar height="100%">
                <el-table :data="tableData" class="tableBox" table-layout="fixed"
                    @selection-change="handleSelectionChange" v-loading="loading" :row-style="{ height: '100px' }">
                    <el-table-column type="selection" width="40" />

                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column prop="avatar" label="用户名头像">
                        <template v-slot="{ row }">
                            <el-avatar :src="row.avatar" size="large"></el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="电话号码"></el-table-column>
                    <el-table-column prop="createdAt" label="创建时间">
                        <template v-slot="{ row }">
                            <span>{{ new Date(row.createdAt).toLocaleString() }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userStatus" label="用户状态">
                        <template v-slot="{ row }">
                            <el-tag :type="row.statusType ? 'danger' : 'success'" size="large">{{ row.userStatus ? '封禁' : '正常'
                                }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="200" align="center">
                        <template v-slot="{ row }">
                            <!-- <el-button text bg type="primary" size="small" @click="resetPassword(row.userId)"
                                :class="{ notAdmin: user !== 'admin' }">
                                重置
                            </el-button> -->
                            <el-button text bg type="warning" size="small" @click="changePosition(row.userId)">
                                封禁
                            </el-button>
                            <el-button text bg type="success" size="small">
                                解禁
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>



            <!-- 下面是page相关的管理配置 -->
            <el-config-provider :locale="zhCn">
                <el-pagination class="pageList" :page-sizes="[10, 20, 30]" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="counts" :current-page.sync="page"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
            </el-config-provider>


        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
// ElConfigProvider 组件
import { ElConfigProvider } from 'element-plus';
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// 引入el-switch所需要的两个图标

import { User } from '../interfaces/User'
import { getAllUsers } from '../api/user'


const props = defineProps(['dateOrder', 'typeOrder']);


const input = ref('');
const tableData = ref<User[]>([]);



const pageSize = ref(10);
const counts = ref(tableData.value.length);
const page = ref(1);
// const user = 'admin';
const allData = ref<User[]>([]);

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
//     if (newVal == "封禁") {
//         // 筛选出finishState为true的数据
//         tableData.value = allData.value.filter((item) => item.userStatus == newVal);
//         counts.value = tableData.value.length;

//     } else if (newVal == "正常") {
//         // 筛选出finishState为false的数据
//         tableData.value = allData.value.filter((item) => item.userStatus == newVal);
//         counts.value = tableData.value.length;
//     }
// });

onMounted(async () => {
    loading.value = true;
    await getAllUsers().then((res) => {
        loading.value = false;
        allData.value = res;

        counts.value = allData.value.length;
        tableData.value = allData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);

    })
});

// 处理查询逻辑
// const handleQuery = () => {
//     // 示例的搜索逻辑（根据输入过滤数据）
//     tableData.value = tableData.value.filter((item) =>
//         item.itemName.toLowerCase().includes(input.value.toLowerCase())
//     );
//     counts.value = tableData.value.length;
// };

// 重置密码逻辑
// const resetPassword = (id: number) => {
//     // 示例的重置密码逻辑
//     console.log(id)
// };

// 更改职位逻辑
const changePosition = (id: number) => {
    // 示例的更改职位逻辑
    console.log(id)
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

    .header {
        font-size: 26px;
        text-align: start;
        border-bottom: 1px solid var(--primary-200);

        padding: 16px;
    }

    .body {
        display: flex;
        flex-direction: column;

        height: 100%;
        background: #fff;
        border-radius: 16px;

        padding: 16px;

        .StatusSelection {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            gap: 20px;

            // 为item多留出boder的距离
            min-height: 80px;

            padding: 16px;

            .item {
                cursor: pointer;


                transition: all 0.1s ease-out;

                padding: 8px 16px;

                &:hover {
                    color: var(--accent-100);

                    border-bottom: 2px solid var(--accent-100);
                }

                &.active {
                    color: var(--accent-100);
                    border-bottom: 2px solid var(--accent-100);
                }
            }
        }

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
