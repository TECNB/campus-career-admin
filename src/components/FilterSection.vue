<template>
    <div class="FilterSection">
        <div class="FilterBox !hidden md:!block" v-if="typeOptions!.length > 0">
            <div class="flex justify-center items-center gap-3" @click="toggleTypePicker">
                <p>显示：</p>
                <p class="text-black font-medium">{{ typeOrder }}</p>
                <el-icon v-if="ifShowTypeOrderPicker">
                    <ArrowUpBold />
                </el-icon>
                <el-icon v-else>
                    <ArrowDownBold />
                </el-icon>
            </div>
            <transition name="fade">
                <div class="absolute top-16 right-0 w-full rounded-xl bg-white shadow-lg px-3 pb-3"
                    v-if="ifShowTypeOrderPicker">
                    <p class="text-left hover:text-accent-100 cursor-pointer mt-2" v-for="option in typeOptions"
                        :key="option" @click="choseTypeOrder(option)">
                        {{ option }}
                    </p>
                </div>
            </transition>
        </div>

        <div class="FilterBox !hidden md:!block">
            <div class="flex justify-center items-center gap-3" @click="toggleDatePicker">
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
                <div class="absolute top-16 right-0 w-full rounded-xl bg-white shadow-lg px-3 pb-3"
                    v-if="ifShowDateOrderPicker">
                    <p class="text-left hover:text-accent-100 cursor-pointer mt-2" v-for="option in dateOptions"
                        :key="option" @click="choseDateOrder(option)">
                        {{ option }}
                    </p>
                </div>
            </transition>
        </div>

        <div class="FilterBoxAdd" @click="onImport" v-if="showImportButton">
            <el-icon>
                <Plus />
            </el-icon>
            <p>{{ importLabel }}</p>
        </div>

        <div class="FilterBoxAdd" @click="onAdd" v-if="showAddButton">
            <el-icon>
                <Plus />
            </el-icon>
            <p>{{ addLabel }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, PropType } from "vue";

const props = defineProps({
    typeOrder: String,
    dateOrder: String,
    typeOptions: Array as PropType<string[]>,
    dateOptions: Array as PropType<string[]>,
    showAddButton: Boolean,
    addLabel: String,
    showImportButton: Boolean,
    importLabel: String,
});

const emits = defineEmits(["update:typeOrder", "update:dateOrder", "add", "import"]);

const ifShowTypeOrderPicker = ref(false);
const ifShowDateOrderPicker = ref(false);

const toggleTypePicker = () => {
    ifShowTypeOrderPicker.value = !ifShowTypeOrderPicker.value;
};

const toggleDatePicker = () => {
    ifShowDateOrderPicker.value = !ifShowDateOrderPicker.value;
};

const choseTypeOrder = (option: string) => {
    emits("update:typeOrder", option);
    ifShowTypeOrderPicker.value = false;
};

const choseDateOrder = (option: string) => {
    emits("update:dateOrder", option);
    ifShowDateOrderPicker.value = false;
};

const onAdd = () => {
    emits("add");
};

const onImport = () => {
    emits("import");
};
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

    .FilterBoxAdd {
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
</style>