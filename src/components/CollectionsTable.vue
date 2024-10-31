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
                <el-table v-loading="loading" :data="tableData" class="tableBox" table-layout="fixed"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="40" />


                    <el-table-column prop="name" label="藏品名称"></el-table-column>
                    <!-- 以下是图片加载的逻辑 -->
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

                    <el-table-column prop="shortIntro" label="简介"></el-table-column>
                    <el-table-column prop="intro" label="具体介绍"></el-table-column>

                    <el-table-column prop="categoryName" label="分类"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>


                    <el-table-column prop="price" width="180" label="价格">
                        <template v-slot="{ row }">
                            <el-input-number v-model="row.price" :min="1" :max="99"
                                @change="handleChange(row.objectId, $event)" />
                        </template>
                    </el-table-column>


                    <el-table-column label="操作" width="250" align="center">
                        <template v-slot="{ row }">
                            <el-button v-if="!row.checked" text bg type="primary" size="small" @click="check(row.objectId,true)">
                                通过
                            </el-button>
                            <el-button v-if="!row.checked" text bg type="warning" size="small" @click="check(row.objectId,false)">
                                打回
                            </el-button>
                            <el-button v-if="row.checked" text bg type="success" size="small">
                                推广
                            </el-button>
                            <el-button v-if="row.checked" text bg type="danger" size="small" @click="handelDelete(row.objectId)">
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
import { onMounted, ref, Ref, watch } from 'vue';
// ElConfigProvider 组件
import { ElConfigProvider } from 'element-plus';
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn';



import { Collection } from '../interfaces/Collection';


import { updateCollectionPrice, getAllCheckedCollections, getAllNotCheckedCollections, getAllCollections,checkCollection,deleteCollection } from '../api/collections';
import { getTypeById } from '../api/activity';


const props = defineProps(['dateOrder', 'typeOrder']);


const input = ref('');
const tableData: Ref<Collection[]> = ref([]);
const loading = ref(false);

const pageSize = ref(10);
const counts = ref(tableData.value.length);
const page = ref(1);

const allData = ref<Collection[]>([]);

// 处理查询逻辑
// const handleQuery = () => {
//     // 示例的搜索逻辑（根据输入过滤数据）
//     tableData.value = tableData.value.filter((item) =>
//         item.itemName.toLowerCase().includes(input.value.toLowerCase())
//     );
//     counts.value = tableData.value.length;
// };


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
watch(() => props.typeOrder, async () => {
    // 根据props.typeOrder来选择使用不同的API获取数字藏品
    if (props.typeOrder == "已审核") {
        await getAllCheckedCollections().then(async (res) => {
            tableData.value = res;
            allData.value = res;
            counts.value = tableData.value.length;
            // 使用getTypeById获取到分类名称categoryName
            // 参数tableData.value中的categoryId，最后将其赋值给tableData.value中的categoryName
            await Promise.all(
                tableData.value.map(async (item) => {
                    await getTypeById(item.categoryId).then((res) => {
                        item.categoryName = res.name;
                    });
                })
            ).then(() => {
                loading.value = false;
            })
        }).catch((err) => {
            console.log(err)
        })
    } else if (props.typeOrder == "未审核") {
        await getAllNotCheckedCollections().then(async (res) => {
            tableData.value = res;
            allData.value = res;
            counts.value = tableData.value.length;
            // 使用getTypeById获取到分类名称categoryName
            // 参数tableData.value中的categoryId，最后将其赋值给tableData.value中的categoryName
            await Promise.all(
                tableData.value.map(async (item) => {
                    await getTypeById(item.categoryId).then((res) => {
                        item.categoryName = res.name;
                    });
                })
            ).then(() => {
                loading.value = false;
            })
        }).catch((err) => {
            console.log(err)
        })
    } else {
        await getAllCollections().then(async (res) => {
            tableData.value = res;
            allData.value = res;
            counts.value = tableData.value.length;
            // 使用getTypeById获取到分类名称categoryName
            // 参数tableData.value中的categoryId，最后将其赋值给tableData.value中的categoryName
            await Promise.all(
                tableData.value.map(async (item) => {
                    await getTypeById(item.categoryId).then((res) => {
                        item.categoryName = res.name;
                    });
                })
            ).then(() => {
                loading.value = false;
            })
        }).catch((err) => {
            console.log(err)
        })
    }
});


onMounted(async () => {
    loading.value = true;

    await getAllCollections().then(async (res) => {
        tableData.value = res;
        allData.value = res;
        counts.value = tableData.value.length;
        // 使用getTypeById获取到分类名称categoryName
        // 参数tableData.value中的categoryId，最后将其赋值给tableData.value中的categoryName
        await Promise.all(
            tableData.value.map(async (item) => {
                await getTypeById(item.categoryId).then((res) => {
                    item.categoryName = res.name;
                });
            })
        ).then(() => {
            loading.value = false;
        })
    }).catch((err) => {
        console.log(err)
    })
});

const handelDelete = async (id: string) => {
    await deleteCollection(id).then((res) => {
        console.log(res)
        ElMessage.success('删除成功');
    }).catch((err) => {
        console.log(err)
    })
}
const handleChange = async (id: string, value: any) => {
    console.log(value)
    const formdata = new FormData();
    formdata.append('price', value);
    // 通过updateCollectionPrice修改价格
    await updateCollectionPrice(id, formdata).then((res) => {
        console.log(res)
        ElMessage.success('价格修改成功');
    }).catch((err) => {
        console.log(err)
    })

}

const check = async (id: string, checked: boolean) => {
    let formData = new FormData();
    formData.append('checked', String(checked));
    await checkCollection(id,formData).then((res) => {
        console.log(res)
        if(checked){
            ElMessage.success('通过藏品成功');
        }else{
            ElMessage.success('藏品打回成功');
        }
        
    }).catch((err) => {
        console.log(err)
    })
}

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
// function getStatus(salesPercentage: number): string {
//     if (salesPercentage === 100) {
//         return 'success';
//     } else if (salesPercentage > 50) {
//         return '';
//     } else if (salesPercentage > 25) {
//         return 'warning';
//     } else {
//         return 'exception';
//     }
// }



</script>

<style lang="scss" scoped>
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

:deep(.el-input) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
    border-radius: 12px;
}

:deep(.el-input-number__increase:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__decrease:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__increase:hover) {
    color: var(--accent-200);
}

:deep(.el-input-number__decrease:hover) {
    color: var(--accent-200);
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset !important;
}
</style>
