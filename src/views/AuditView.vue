<template>
    <div class="AuditView">
        <el-scrollbar>
            <div class="header">
                <div class="title">
                    <p>订单管理</p>
                </div>
                <div class="FilterSection">
                    <div class="FilterBox">
                        <p>显示：</p>
                        <p class="text-black font-medium">所有产品</p>
                        <el-icon>
                            <ArrowDownBold />
                        </el-icon>
                    </div>
                    <div class="FilterBox">
                        <p>排序：</p>
                        <p class="text-black font-medium">默认方式</p>
                        <el-icon>
                            <ArrowDownBold />
                        </el-icon>
                    </div>
                    <!-- <div class="FilterBox">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <p>添加订单</p>
                    </div> -->

                </div>
            </div>
            <OrderTable />
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
import { } from "vue"
// 引入OrderTable
import OrderTable from "../components/OrderTable.vue"
</script>

<style lang="scss" scoped>
.AuditView {
    height: 100%;

    .header {
        display: flex;
        justify-content: space-between;
        align-content: center;

        padding: 30px 30px 0 30px;

        .title {
            font-size: 36px;
            font-weight: 800;
        }

        .FilterSection {
            display: flex;
            justify-content: center;
            align-content: center;
            gap: 10px;

            .FilterBox {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;



                color: rgba(160, 174, 192, 1);
                background: white;
                box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.26);

                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;
            }

            .FilterBox:nth-child(3) {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;



                color: white;
                background: rgba(63, 140, 255, 1);
                box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.26);

                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;
            }
        }



    }
}
</style>
