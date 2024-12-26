<template>
    <div class="PayBox" v-if="props.ifShow">
        <div class="Title">
            <p>购买方式选择</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon class="w-[90%] h-[90%] rounded-full object-cover aspect-square">
                    <Close />
                </el-icon>
            </div>
        </div>

        <!-- 下面为电子邮箱输入框 -->
        <div class="payMethod">
            <p>支付方式</p>

            <label class="chose">
                <input class="radio" type="radio" name="paymentMethod" value="alipay" checked>
                <!-- 图片来自于assets/images底下的alpay.png -->
                <img src="../assets/images/alipay.png" alt="" class="h-5 w-5">
                <span>支付宝</span>
            </label>

            <label class="chose">
                <input class="radio" type="radio" name="paymentMethod" value="wechat">
                <!-- 图片来自于assets/images底下的alpay.png -->
                <img src="../assets/images/wechat.png" alt="" class="h-5 w-5">
                <span>微信支付</span>
            </label>
        </div>
        <div class="Button">
            <div class="Login">
                <p>继续</p>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import { } from 'vue';

const props = defineProps(['ifShow']);
const emit = defineEmits();

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

</script>

<style lang="scss" scoped>
.PayBox {
    width: 30%;
    height: 300px;

    position: absolute;
    z-index: 99999;

    // 居中对齐
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: #ffffff;
    border-radius: 20px;
    text-align: left;

    padding: 20px;


    .Title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 24px;
        color: var(--text-100);
        font-weight: bold;

        margin-top: 20px;

        .Close {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 5vh;
            height: 5vh;

            border-radius: 50%;
            background-color: white;

        }
    }

    .payMethod {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;

        font-size: 20px;
        font-weight: bold;

        margin-top: 10px;
        .chose{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            // radio选中时的颜色
            .radio {
                accent-color: var(--accent-200);
            }
        }

        
    }

    .Button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        .Login {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;


            height: 50px;

            background-color: var(--bg-200);
            color: var(--accent-200);

            border-radius: 12px;
            border: 0.5px solid var(--text-200);
            font-weight: bold;


            padding: 12px;
            margin-top: 20px;

        }

        .Sign {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;


            height: 50px;

            background-color: var(--bg-100);
            color: var(--text-200);

            border-radius: 12px;
            border: 0.5px solid var(--text-200);
            font-weight: bold;


            padding: 12px;
            margin-top: 20px;
        }
    }

}
</style>
