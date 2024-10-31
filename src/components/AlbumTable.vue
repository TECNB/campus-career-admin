<template>
    <div class="Table">

        <div class="body">

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
                    <input type="text" placeholder="请输入合集名称">
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
                <el-table v-loading="loading" :data="tableData" class="tableBox" table-layout="fixed"
                    @selection-change="handleSelectionChange" :row-style="{ height: '100px' }">
                    <el-table-column type="selection" width="40" />

                    <el-table-column prop="objectId" label="合集id" sortable></el-table-column>

                    <el-table-column prop="cover" label="图片">
                        <template v-slot="{ row }">
                            <el-image class="w-14 h-14 rounded-xl object-cover aspect-square" :src="row.cover"
                                :preview-src-list="[row.cover]" :preview-teleported="true">
                                <template #error>
                                    <div class="image-slot">
                                        <img src="../assets/images/no-image.png"
                                            class="w-14 h-14 rounded-xl object-cover aspect-square">
                                    </div>
                                </template>

                            </el-image>
                        </template>
                    </el-table-column>

                    <el-table-column prop="name" label="合集名称"></el-table-column>

                    <el-table-column label="操作" width="200" align="center">
                        <template v-slot="{ row }">
                            <el-button text bg type="success" size="small" @click="toUpdateType(row.objectId)">
                                编辑
                            </el-button>

                            <el-button text bg type="danger" size="small" @click="deletion(row.objectId)">
                                删除
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
import { Ref, onMounted, ref,watch } from 'vue';
// ElConfigProvider 组件
import { ElConfigProvider } from 'element-plus';
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// 引入router
import router from '../router';


// 引入接口Type
import { Type } from '../interfaces/Activity';


// 引入getAllAlbums
import { getAllAlbums } from '../api/album'


const props = defineProps(['dateOrder','typeOrder']);


const multipleSelection = ref<[]>([])
const pageSize = ref(10);
const page = ref(1);
const input = ref('');
const tableData: Ref<Type[]> = ref([]);
const counts = ref(tableData.value.length);
const loading = ref(false);
const allData = ref<Type[]>([]);

onMounted(async () => {
    loading.value = true;
    await getAllAlbums().then((res) => {
        loading.value = false;
        allData.value = res;

        counts.value = allData.value.length;
        tableData.value = allData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);

    })
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
// 通过watch监听props.typeOrder的变化
// watch(() => props.typeOrder, (newVal) => {
//     if (newVal == "已完成") {
//         // 筛选出finishState为true的数据
//         tableData.value = allData.value.filter((item) => item.finishState == true);
//         counts.value = tableData.value.length;
        
//     } else if (newVal == "未完成") {
//         // 筛选出finishState为false的数据
//         tableData.value = allData.value.filter((item) => item.finishState == false);
//         counts.value = tableData.value.length;
//     }
// });


const toUpdateType = (id:string) => {
    console.log('updateAlbum')
    router.push('/updateAlbum/'+id)
}

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

const handleSelectionChange = (val: []) => {
    multipleSelection.value = val
}
// const promotion =(id:string) =>{
//     console.log(id)
// }
const deletion = (id:string) =>{
    console.log(id)
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
