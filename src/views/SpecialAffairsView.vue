<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">专项事务</p>
            </div>
            <div class="flex justify-center content-center gap-5 p-7">
                <!-- 左侧主区域 -->
                <div class="w-2/3 grid grid-cols-2 gap-5">
                    <div
                        v-for="(item, index) in studyOptions"
                        :key="index"
                        class="bg-white rounded-lg shadow-md p-4 h-[250px] sm:h-[300px] lg:h-[300px] flex flex-col"
                    >
                        <!-- 标题加点击事件 -->
                        <p
                            @click="handleClick(item.link)"
                            class="text-lg text-left text-blue-400 cursor-pointer hover:text-black truncate"
                        >
                            {{ item.title }}
                        </p>
                        <p class="mt-2 mb-1 text-gray-500 text-left">{{ item.date }}</p>
                        <!-- 图片加点击事件 -->
                        <img
                            :src="item.image"
                            :alt="item.title"
                            @click="handleClick(item.link)"
                            class="w-full h-3/4 rounded-lg object-cover mt-auto cursor-pointer"
                        />
                    </div>
                </div>
                <!-- 右侧列表区域 -->
                <div class="w-1/3 flex flex-col justify-start content-center bg-blue-100 p-3">
                    <div
                        v-for="(item, index) in studyOptions"
                        :key="index"
                        class="flex justify-start content-center gap-3 px-7 py-5 border-b border-gray-300"
                    >
                        <!-- 左侧日期部分 -->
                        <div class="flex flex-col justify-center content-center">
                            <div class="bg-blue-400 px-2 py-1">
                                <p class="text-white">{{ new Date(item.date).getDate() }}</p>
                            </div>
                            <div class="bg-white px-2 py-1">
                                <p class="text-nowrap">
                                    {{ new Date(item.date).getFullYear() }}-{{ (new Date(item.date).getMonth() + 1).toString().padStart(2, '0') }}
                                </p>
                            </div>
                        </div>
                        <!-- 右侧标题加点击事件 -->
                        <div class="flex flex-col justify-center content-center">
                            <p
                                @click="handleClick(item.link)"
                                class="text-left text-gray-500 cursor-pointer hover:text-black"
                            >
                                {{ item.title }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
// 定义跳转逻辑
const handleClick = (link: string) => {
    window.open(link, '_blank'); // 在新标签页中打开链接
};

// 示例数据
const studyOptions = [
    {
        title: "24级迎新工作流程及总结",
        date: "2024-11-21",
        image: "http://10.248.6.72:8181/pic14.png",
        link: "http://10.248.6.72:8181/special-affairs1.xlsx", // 跳转链接
    },
    {
        title: "24年奖学金工作流程安排",
        date: "2024-11-22",
        image: "http://10.248.6.72:8181/pic15.png",
        link: "http://10.248.6.72:8181/special-affairs2.xlsx",
    },
    {
        title: "24年综测&奖学金评定说明",
        date: "2024-11-23",
        image: "http://10.248.6.72:8181/pic16.png",
        link: "http://10.248.6.72:8181/special-affairs3.xlsx",
    },
    {
        title: "24年综测&奖学金评定说明",
        date: "2024-11-24",
        image: "http://10.248.6.72:8181/pic16.png",
        link: "http://10.248.6.72:8181/special-affairs3.xlsx",
    },
    
];
</script>

<style lang="scss" scoped></style>