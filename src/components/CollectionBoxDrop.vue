<template>
    <div class="CollectionBoxBlindBox" v-if="props.ifShow">

        <div class="Background">
            <div class="Title">
                <p class="text-lg font-medium">选择藏品并指定数量</p>
            </div>
            <div class="Close" @click="toggleVisibility">
                <el-icon :size="22">
                    <Close />
                </el-icon>
            </div>
        </div>
        <el-scrollbar height="500px">
            <div class="Content">
                <!-- v-for从CreatedCollection.collections中获取数据 -->
                <div v-for="(item, index) in CreatedCollection.collections" :key="index"
                    class="flex justify-around items-center gap-5 mt-5">
                    <img class="w-16 h-16 rounded-lg" :src="item.cover" alt="" />
                    <div class="flex justify-center items-start flex-col w-20">
                        <p class="text-left text-lg font-bold">{{ item.name }}</p>
                        <p class="text-left text-lg font-medium">{{ item.price }} ETH</p>
                    </div>
                    <el-input-number :disabled="ifDisabled" v-model="num[index]" :min="0" :max="maxNumber[index]"
                        @change="handleChange(index, $event)" :step="1" />
                </div>

            </div>
        </el-scrollbar>
        <p class="text-right ext-lg font-medium text-accent-100 cursor-pointer hover:text-accent-200 mt-5"
            @click="resetProbability">重置概率</p>

        <div class="Complete" @click="toggleVisibility">
            <p>确定添加</p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, computed } from "vue"
import { Collection } from '../interfaces/Collection';


// 引入CartListCollectionStore
import { CartListCollectionStore, CreatedCollectionStore } from '../stores/CollectionStore'

import { getCollectionById, getCreatedCollection } from '../api/collections'

// 实例化CartListCollectionStore
let CartListCollection = CartListCollectionStore()
const CreatedCollection = CreatedCollectionStore()

const props = defineProps(['ifShow', 'Selected']);
const emit = defineEmits(['updateUploadedImage', 'updateIfShow']);

// 定义一个数组用于储存购物车的内容,并且为响应式
let cartList = ref<Collection[]>([])
// 定义一个变量isDeleteVisible
let isDeleteVisible = cartList.value.map(() => ref(false));

let isCreatedCollectionNull = ref(true);

let loading = ref(false);
// 定义一个变量用于储存num数组的最大值
let maxNumber = ref<number[]>([]);

let ifDisabled = false;

let uploadImage = ref('');




// 定义一个变量用于控制是否展示购物车为空的情况
let isCartNullVisible = false;
// 定义一个变量用于储存cartList数组的总数
let cartListLength = cartList.value.length;
// 定义一个变量用于储存购物车的总价
let totalPrice = 0;

// 定义一个数组用于储存购物车的内容,并且为响应式
let num = ref<number[]>([]);

interface SelectedItem {
    items: string;
    itemsCount: number;
}


onMounted(async () => {
    loading.value = true


    // 设置通过空数组防止重复存入
    CreatedCollection.collections = []
    await getCreatedCollection().then((res) => {
        CreatedCollection.collections = res
    })
    // 设置num数组初始值为0
    num.value = Array(CreatedCollection.collections.length).fill(0);



    // 定义变量表示collectionItems的长度

    let createdCollectionItemsLength = CreatedCollection.collections.length

    // 如果collectionItemsLength=0时，isOwnedCollectionNull为true
    if (createdCollectionItemsLength !== 0) {
        isCreatedCollectionNull.value = false
    }
})



//当cartList改变时，isDeleteVisible也重新赋值
watch(cartList.value, (newValue) => {
    isDeleteVisible = newValue.map(() => ref(false));

    cartListLength = newValue.length;
    totalPrice = calculateTotalPrice(newValue);
})
//当cartList改变时，isDeleteVisible也重新赋值
watch(CartListCollection.collections, (newValue) => {
    cartList.value = newValue;
    isDeleteVisible = newValue.map(() => ref(false));

    // 如果cartList为空则显示还没有任何商品,快去购物吧
    if (cartList.value.length === 0) {
        isCartNullVisible = true
    } else {
        isCartNullVisible = false
    }
    totalPrice = calculateTotalPrice(cartList.value);
})
// 当props.Selected中的值改变时，更新num数组
watch(() => props.Selected, (newValue) => {
    for (let i = 0; i < num.value.length; i++) {
        num.value[i] = 0;
    }
    for (let i = 0; i < newValue.length; i++) {
        let index = CreatedCollection.collections.findIndex((item) => item.objectId === newValue[i].items);
        num.value[index] = newValue[i].itemsCount;
    }
}, { deep: true });

// 重置概率
const resetProbability = () => {
    num.value = Array(CreatedCollection.collections.length).fill(0);
    maxNumber.value = Array(CreatedCollection.collections.length).fill(1);
    ifDisabled = false;
}

// 实现handleChange方法
const handleChange = (index: number, value: any) => {
    num.value[index] = value;
    let items = CreatedCollectionStore().collections[index].objectId;


    uploadImage.value = CreatedCollectionStore().collections[index].cover;

    let itemsCount = value;



    // 选中的商品
    let Selected: SelectedItem = {
        items: items,
        itemsCount: itemsCount
    }

    // 不要向props.Selected中存入重复的items

    if (props.Selected.length === 0) {
        props.Selected.push(Selected)
    } else {
        let flag = false;
        for (let i = 0; i < props.Selected.length; i++) {
            if (props.Selected[i].items === items) {
                props.Selected[i].itemsCount = itemsCount;
                flag = true;
                break;
            }
        }
        if (!flag) {
            props.Selected.push(Selected)
        }
    }

    // 检查数组props.Selected中如果有itemsCount为0时，删除该商品
    for (let i = 0; i < props.Selected.length; i++) {
        if (props.Selected[i].itemsCount === 0) {
            props.Selected.splice(i, 1);
        }
    }


    console.log(props.Selected)
};



// 实现toggleVisibility方法
const toggleVisibility = () => {
    emit('updateIfShow', false);
    emit('updateUploadedImage', uploadImage.value);
};


const calculateTotalPrice = (list: any[]) => {
    let totalPrice = 0;
    for (let i = 0; i < list.length; i++) {
        totalPrice += Number(list[i].price);
    }
    return Number(totalPrice.toFixed(2));
};




</script>

<style lang="scss" scoped>
.CollectionBoxBlindBox {
    width: 375px;
    min-height: 100%;

    position: absolute;
    z-index: 99999;

    // 靠右对齐
    right: 2%;
    top: 2%;


    background: #ffffff;
    border-radius: 20px 20px 0px 0px;
    text-align: left;

    padding: 20px;

    .Background {
        display: flex;
        justify-content: space-between;
        align-items: center;



        height: 10%;

        border-radius: 20px 20px 0px 0px;
        border-bottom: 0.5px solid var(--text-200);

        margin-left: -20px;
        margin-right: -20px;
        margin-top: -20px;
        padding: 20px;


    }

    .Content {

        text-align: center;

        margin-top: 20px;

        .Detail {
            border-bottom: 0.5px solid var(--text-200);

            padding-bottom: 30px;

            .DetailUp {
                display: flex;
                justify-content: space-between;
                align-items: center;

                font-weight: bold;

                margin-bottom: 10px;
            }

            .DetailBelow {
                display: flex;
                justify-content: flex-start;
                align-items: center;



                font-size: 16px;


                margin-top: 10px;
                padding: 5px;

                .DetailBelowName {
                    display: flex;
                    justify-content: center;
                    align-items: center;


                    .Image {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }

                .icon {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                }
            }

            .DetailBelow:hover {
                border-radius: 20px;
                height: 100%;
                background-color: var(--accent-100);
            }
        }

        .Price {
            display: flex;
            justify-content: space-between;
            align-items: center;

            font-size: 20px;
            font-weight: bold;

            margin-top: 20px;
        }

        .payMethod {
            display: flex;
            justify-content: space-between;
            align-items: center;

            font-size: 20px;
            font-weight: bold;

            margin-top: 10px;

            // radio选中时的颜色
            .radio {
                accent-color: var(--accent-200);
            }
        }


    }
}

.Complete {
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
