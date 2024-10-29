<template>
    <div class="TypeView">
        <el-scrollbar>
            <div class="header">
                <div class="title">
                    <p>分类管理</p>
                </div>
                <div class="FilterSection">
                    <!-- <div class="FilterBox">
                        <div class="flex justify-center items-center gap-3" @click="toggleIfShowTypeOrderPicker">
                            <p>显示：</p>
                            <p class="text-black font-medium">{{ typeOrder }}</p>
                            <el-icon>
                                <ArrowDownBold />
                            </el-icon>
                        </div>
                        <transition name="fade">
                            <div class="absolute top-16 right-0 w-full rounded-xl bg-white shadow-lg p-3"
                                v-if="ifShowTypeOrderPicker">
                                <p class="text-left hover:text-accent-100 cursor-pointer"
                                    @click="choseTypeOrder('已完成')">
                                    已完成</p>
                                <p class="text-left mt-5 hover:text-accent-100 cursor-pointer"
                                    @click="choseTypeOrder('未完成')">未完成</p>
                            </div>
                        </transition>
                    </div> -->
                    <div class="FilterBox">
                        <div class="flex justify-center items-center gap-3" @click="toggleIfShowDateOrderPicker">
                            <p>排序：</p>
                            <p class="text-black font-medium">{{ dateOrder }}</p>
                            <el-icon v-if="ifShowDateOrderPicker">
                                <ArrowUpBold />
                            </el-icon>
                            <el-icon v-else>
                                <ArrowDownBold />
                            </el-icon>
                        </div>
                        <transition name="fade">
                            <div class="absolute top-16 right-0 w-full rounded-xl bg-white shadow-lg p-3 z-50"
                                v-if="ifShowDateOrderPicker">
                                <p class="text-left hover:text-accent-100 cursor-pointer"
                                    @click="choseDateOrder('日期倒序')">
                                    日期倒序</p>
                                <p class="text-left mt-5 hover:text-accent-100 cursor-pointer"
                                    @click="choseDateOrder('日期正序')">日期正序</p>
                            </div>
                        </transition>

                    </div>
                    <div class="FilterBox" @click="toUpdateType('create')">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <p>添加分类</p>
                    </div>

                </div>
            </div>
            <TypeTable :dateOrder="dateOrder" :typeOrder="typeOrder"/>
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// 引入TypeTable
import TypeTable from "../components/TypeTable.vue"
import router from '../router';

const dateOrder = ref<string>("默认排序")
const typeOrder = ref<string>("所有分类")
const ifShowDateOrderPicker = ref<boolean>(false)
// const ifShowTypeOrderPicker = ref<boolean>(false)


// 选择日期排序
const choseDateOrder = (order: string) => {
    dateOrder.value = order
    ifShowDateOrderPicker.value = false
}
// 选择类型排序
// const choseTypeOrder = (order: string) => {
//     typeOrder.value = order
//     ifShowTypeOrderPicker.value = false
// }

// 控制是否显示日期排序选择框
const toggleIfShowDateOrderPicker = () => {
    ifShowDateOrderPicker.value = !ifShowDateOrderPicker.value
}
// 控制是否显示类型排序选择框
// const toggleIfShowTypeOrderPicker = () => {
//     ifShowTypeOrderPicker.value = !ifShowTypeOrderPicker.value
// }

const toUpdateType = (id:string) => {
    console.log('toUpdateType')
    router.push('/updateType/'+id)
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.TypeView {
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
                position: relative;

                cursor: pointer;



                color: rgba(160, 174, 192, 1);
                background: white;
                box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.26);

                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;
            }

            .FilterBox:nth-child(2) {
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
