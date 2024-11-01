<template>
    <div class="AccountView">
        <el-scrollbar>
            <div class="header">
                <div class="title">
                    <p>就业日历</p>
                </div>
                
            </div>
            <ActivityCalendar />
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// 引入OrderTable
import ActivityCalendar from "../components/ActivityCalendar.vue"

const dateOrder = ref<string>("默认排序")
const typeOrder = ref<string>("所有用户")
const ifShowDateOrderPicker = ref<boolean>(false)
const ifShowTypeOrderPicker = ref<boolean>(false)


// 选择日期排序
const choseDateOrder = (order: string) => {
    dateOrder.value = order
    ifShowDateOrderPicker.value = false
}
// 选择类型排序
const choseTypeOrder = (order: string) => {
    typeOrder.value = order
    ifShowTypeOrderPicker.value = false
}

// 控制是否显示日期排序选择框
const toggleIfShowDateOrderPicker = () => {
    ifShowDateOrderPicker.value = !ifShowDateOrderPicker.value
}
// 控制是否显示类型排序选择框
const toggleIfShowTypeOrderPicker = () => {
    ifShowTypeOrderPicker.value = !ifShowTypeOrderPicker.value
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

.AccountView {
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
