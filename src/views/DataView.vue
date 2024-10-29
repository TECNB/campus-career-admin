<template>
    <div class="DataView">
        <el-scrollbar>
            <div class="header">
            <div class="title">
                <p>运营数据</p>
            </div>
            <div class="FilterSection">
                <!-- <div class="FilterBox">

                </div> -->
                
            </div>
        </div>
        <div class="body">
            <!-- 第一行的可视化数据：销售额、访客 -->
            <div class="DataLine1">
                <div class="Data1">
                    <!-- 头部标题以及按月、按周选择 -->
                    <div class="Data1Header">
                        <div class="flex justify-center items-center">
                            <p class="text-lg text-black font-medium mb-6">销售额</p>
                        </div>
                        <div class="FilterSectionType">
                            <!-- 应用selectType1方法 -->
                            <div :class="{ 'Selected0': SalesIndex === 0, 'Selected1': SalesIndex === 1 }">
                            </div>
                            <p @click="selectType1(0)" class="absolute left-[15%] z-50"  :class="{ 'text-blue-400': SalesIndex === 0, 'text-neutral-400': SalesIndex === 1 }">按月</p>

                            <p @click="selectType1(1)" class="absolute right-[15%] z-50" :class="{ 'text-blue-400': SalesIndex === 1, 'text-neutral-400': SalesIndex === 0 }">按周</p>
                        </div>
                    </div>
                    <!-- 主体数据部分 -->
                    <div class="Data1Body">
                        <!-- 主题数据部分左侧数值部分 -->
                        <div class="Data1Left">
                            <div class="LeftData">
                                <p>净销售额(元）</p>
                                <p>810</p>
                                <div class="flex justify-start items-center gap-2">
                                    <img class="size-5" src="../assets/images/trending-up@2x.png">
                                    <p class="!text-base">10.0% (+81)</p>
                                </div>
                            </div>
                            <div class="LeftData">
                                <p>订单</p>
                                <p>20</p>
                                <div class="flex justify-start items-center gap-2">
                                    <img class="size-5" src="../assets/images/trending-down@2x.png">
                                    <p class="!text-base">5% (-1)</p>
                                </div>
                            </div>
                        </div>

                        <!-- 主题数据部分右侧图表部分 -->
                        <div class="Data1Right">
                            <div ref="salesChartContainer" class="w-full h-full"></div>
                        </div>
                    </div>
                </div>
                <div class="Data1">
                    <!-- 头部标题以及按月、按周选择 -->
                    <div class="Data1Header">
                        <div class="flex justify-center items-center">
                            <p class="text-lg text-black font-medium mb-6">访客</p>
                        </div>
                        <div class="FilterSectionType">
                            <!-- 应用selectType2方法 -->
                            <div :class="{ 'Selected0': VisitorsIndex === 0, 'Selected1': VisitorsIndex === 1 }">
                            </div>
                            <p @click="selectType2(0)" class="absolute left-[15%] z-50" :class="{ 'text-blue-400': VisitorsIndex === 0, 'text-neutral-400': VisitorsIndex === 1 }">按月</p>

                            <p @click="selectType2(1)" class="absolute right-[15%] z-50" :class="{ 'text-blue-400': VisitorsIndex === 1, 'text-neutral-400': VisitorsIndex === 0 }">按周</p>
                        </div>
                    </div>
                    <!-- 主体数据部分 -->
                    <div class="Data1Body">
                        <!-- 主题数据部分左侧数值部分 -->
                        <div class="Data1Left">
                            <div class="LeftData">
                                <p>新用户</p>
                                <p>12</p>
                                <div class="flex justify-start items-center gap-2">
                                    <img class="size-5" src="../assets/images/trending-up@2x.png">
                                    <p class="!text-base">16.6% (+2)</p>
                                </div>
                            </div>
                            <div class="LeftData">
                                <p>老用户</p>
                                <p>45</p>
                                <div class="flex justify-start items-center gap-2">
                                    <img class="size-5" src="../assets/images/trending-down@2x.png">
                                    <p class="!text-base">6.6% (-3)</p>
                                </div>
                            </div>
                        </div>
                        <!-- 主题数据部分右侧图表部分 -->
                        <div class="Data1Right">
                            <div ref="visitorChartContainer" class="w-full h-full"></div>
                        </div>
                    </div>


                </div>
            </div>

            <div class="DataLine2">
                <div class="Data1">
                    <div class="Data1Header">
                        <div class="flex justify-center items-center">
                            <p class="text-lg text-black font-medium mb-3">流量来源</p>
                        </div>
                        <div class="FilterSectionType">

                            <div :class="{ 'Selected0': SourceIndex === 0, 'Selected1': SourceIndex === 1 }">
                            </div>
                            <p @click="selectType3(0)" class="absolute left-[15%] z-50" :class="{ 'text-blue-400': SourceIndex === 0, 'text-neutral-400': SourceIndex === 1 }">按月</p>

                            <p @click="selectType3(1)" class="absolute right-[15%] z-50" :class="{ 'text-blue-400': SourceIndex === 1, 'text-neutral-400': SourceIndex === 0 }">按周</p>
                        </div>
                    </div>
                    <div class="Data1Body">
                        <p class="text-left">站内搜索</p>
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="50" />
                        <p class="text-left">购物车</p>
                        <el-progress status="success" :text-inside="true" :stroke-width="18" :percentage="30" />
                        <p class="text-left">订阅店铺</p>
                        <el-progress status="warning" :text-inside="true" :stroke-width="18" :percentage="20" />
                    </div>
                </div>
                <div class="Data2">
                    <div class="Data2Header">
                        <div class="flex justify-center items-center">
                            <p class="text-lg text-black font-medium mb-2">客户</p>
                        </div>
                        <div class="FilterSectionType">
                            <el-icon color="#9FADC1">
                                <MoreFilled />
                            </el-icon>
                        </div>
                    </div>
                    <div class="Data2Body">
                        <div ref="customerChartContainer" class="w-full h-full"></div>
                    </div>
                </div>
                <div class="Data3">
                    <div class="Data3Header">
                        <div class="flex justify-center items-center">
                            <p class="text-lg text-black font-medium mb-2">客户性别分布</p>
                        </div>
                        <div class="FilterSectionType">
                            <el-icon color="#9FADC1">
                                <MoreFilled />
                            </el-icon>
                        </div>
                    </div>
                    <div class="Data3Body">
                        <div ref="genderChartContainer" class="w-full h-full"></div>
                    </div>
                </div>
            </div>
            <div class="DataLine3">
                <div class="Data1">
                    <div class="Data1Header">
                        <div class="flex justify-center items-center">
                            <p class="text-lg text-black font-medium mb-3">地域分布</p>
                        </div>
                        <el-icon>
                            <FullScreen />
                        </el-icon>
                    </div>
                    <div class="Data1Body">
                        <!-- 主题数据部分左侧数值部分 -->
                        <div class="Data1Left">
                            <div class="relative text-left">
                                <p class="text-2xl  inline-block">43</p>
                                <div class="inline-block bg-[#5DB1FF] rounded-3xl w-[60px] absolute bottom-1 ml-3">
                                    <div class="flex justify-center items-center gap-1 ">
                                        <img class="size-4" src="../assets/images/trending-up-white@2x.png">
                                        <p class="text-xs text-white">16.3%</p>
                                    </div>
                                </div>
                            </div>
                            <p class="text-xs text-left text-neutral-500">具体信息</p>
                            <div class="flex justify-start items-center gap-5">
                                <div class="flex justify-center items-start p-1 bg-green-500 rounded-full"/>
                                <p class="flex-1 text-left">浙江省</p>
                                <p class="text-neutral-400">20</p>
                            </div>
                            <div class="flex justify-start items-center gap-5">
                                <div class="flex justify-center items-start p-1 bg-blue-500 rounded-full"/>
                                <p class="flex-1 text-left">上海市</p>
                                <p class="text-neutral-400">10</p>
                            </div>
                          <div class="flex justify-start items-center gap-5">
                            <div class="flex justify-center items-start p-1 bg-orange-500 rounded-full"/>
                            <p class="flex-1 text-left">河南省</p>
                            <p class="text-neutral-400">7</p>
                          </div>
                          <div class="flex justify-start items-center gap-5">
                            <div class="flex justify-center items-start p-1 bg-yellow-500 rounded-full"/>
                            <p class="flex-1 text-left">广东省</p>
                            <p class="text-neutral-400">6</p>
                          </div>
                        </div>
                        <!-- 主题数据部分右侧图表部分 -->
                        <div class="Data1Right">
                            <div ref="mapContainer" class="w-full h-full"></div>
                        </div>
                    </div>
                </div>
                <div class="Data2">
                    <div class="Data2Header">
                        <div class="flex justify-center items-center">
                            <p class="text-lg text-black font-medium mb-2">客户</p>
                        </div>
                        <div class="FilterSectionType">
                            <el-icon color="#9FADC1">
                                <MoreFilled />
                            </el-icon>
                        </div>
                    </div>
                    <div class="Data2Body">
                        <div class="flex justify-start items-center gap-5">
                            <img class="w-9 h-9 rounded-full object-cover aspect-square"
                                src="https://hyper-star-1256277779.cos.ap-nanjing.myqcloud.com/collection/6q4unz6g86w70ghfwcoba26e/c0d0063367bb870f9c76a8fa867223a4.jpg" alt="">
                            <div class="flex-1 flex justify-center items-start flex-col">
                                <p>TEC</p>
                                <p class="text-neutral-500">台州</p>
                            </div>
                            <div class="flex justify-center items-start p-3 bg-neutral-300 rounded-full">
                                <el-icon>
                                    <ChatLineSquare />
                                </el-icon>
                            </div>
                        </div>
                        <div class="flex justify-start items-center gap-5">
                            <img class="w-9 h-9 rounded-full object-cover aspect-square"
                                src="https://hyper-star-1256277779.cos.ap-nanjing.myqcloud.com/avatar/11d6f0a2bb7086e7f10ebb5c1e758284.jpg" alt="">
                            <div class="flex-1 flex justify-center items-start flex-col">
                                <p>Eternity</p>
                                <p class="text-neutral-500">杭州</p>
                            </div>
                            <div class="flex justify-center items-start p-3 bg-neutral-300 rounded-full">
                                <el-icon>
                                    <ChatLineSquare />
                                </el-icon>
                            </div>
                        </div>
                        <div class="flex justify-start items-center gap-5">
                            <img class="w-9 h-9 rounded-full object-cover aspect-square"
                                src="https://hyper-star-1256277779.cos.ap-nanjing.myqcloud.com/avatar/3652d4c7092495a51f07cf52172d7944.jpg" alt="">
                            <div class="flex-1 flex justify-center items-start flex-col">
                                <p>laoshupi666</p>
                                <p class="text-neutral-500">河南</p>
                            </div>
                            <div class="flex justify-center items-start p-3 bg-neutral-300 rounded-full">
                                <el-icon>
                                    <ChatLineSquare />
                                </el-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </el-scrollbar>
        

    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import "../assets/echarts/china";
// import { getCityPositionByName } from '../assets/echarts/cityPostion'
import salesChartOptions from '../utils/SalesChartOptions';
import visitorChartOptions  from '../utils/VisitorChartOptions'
import customerChartOptions from '../utils/CustomerChartOptions'
import genderChartOptions from '../utils/GenderChartOptions'
import mapChartOptions from '../utils/MapChartOptions'

const salesChartContainer = ref<HTMLElement | null>(null);
const visitorChartContainer = ref<HTMLElement | null>(null);
const customerChartContainer = ref<HTMLElement | null>(null);
const genderChartContainer = ref<HTMLElement | null>(null);
const mapContainer = ref<HTMLElement | null>(null);

let mySalesChart: echarts.ECharts | null = null;
let myVisitorChart: echarts.ECharts | null = null;
let myCustomerChart: echarts.ECharts | null = null;
let myGenderChart: echarts.ECharts | null = null;
let myMapChart: echarts.ECharts | null = null;

onMounted(() => {
    // 在组件挂载后初始化 ECharts 实例
    mySalesChart = echarts.init(salesChartContainer.value!);
    myVisitorChart = echarts.init(visitorChartContainer.value!);
    myCustomerChart = echarts.init(customerChartContainer.value!);
    myGenderChart = echarts.init(genderChartContainer.value!);
    myMapChart = echarts.init(mapContainer.value!);


    // 调用渲染图表的方法
    renderSalesChart();
    renderVisitorChart();
    renderCustomerChart();
    renderGenderChart();
    renderMapChart();
});

// 在这里编写渲染图表的方法
const renderSalesChart = () => {
    // 使用一至日作为横轴的数据
    const xAxisData = ['一', '二', '三', '四', '五', '六', '日'];

    // 使用示例数据
    const seriesData = [25, 40, 20, 75, 35, 80, 25];

    // ECharts 配置项
    let options = salesChartOptions(xAxisData,seriesData);
    // 使用 setOption 方法设置图表配置
    mySalesChart?.setOption(options);
};

// 在这里编写渲染图表的方法
const renderVisitorChart = () => {
    // 使用一至日作为横轴的数据
    const xAxisData = ['一', '二', '三', '四', '五', '六', '日'];

    // 使用示例数据
    const seriesData = [25, 60, 50, 20, 35, 40, 25];

    let options = visitorChartOptions(xAxisData,seriesData)

    
    // 使用 setOption 方法设置图表配置
    myVisitorChart?.setOption(options);
};
// 实现折线图renderCustomerChart
const renderCustomerChart = () => {
    // 使用一至日作为横轴的数据
    const xAxisData = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

    // 使用示例数据
    const seriesData = [25, 60, 50, 20, 35, 40, 25];

    let options = customerChartOptions(xAxisData,seriesData)

    // 使用 setOption 方法设置图表配置
    myCustomerChart?.setOption(options);
};

// 实现饼图renderGenderChart
const renderGenderChart = () => {
    // 使用示例数据
    const seriesData = [
        { value: 1048, name: '男' },
        { value: 735, name: '女' },
        { value: 580, name: '未知' }
    ];

    let options = genderChartOptions(seriesData);

    // 使用 setOption 方法设置图表配置
    myGenderChart?.setOption(options);
};
// 实现renderMapChart
const renderMapChart = () => {
    // 使用示例数据
    const seriesData = [
        { name: '北京', value: 100 },
        { name: '上海', value: 200 },
    ];


    // ECharts 配置项
    // 配置地图
    const options = mapChartOptions(seriesData);

    // 使用 setOption 方法设置图表配置
    myMapChart?.setOption(options);
};


// 在组件销毁时销毁 ECharts 实例
onBeforeUnmount(() => {
    if (mySalesChart) {
        mySalesChart.dispose();
        mySalesChart = null;
    }
    if (myVisitorChart) {
        myVisitorChart.dispose();
        myVisitorChart = null;
    }
    if (myCustomerChart) {
        myCustomerChart.dispose();
        myCustomerChart = null;
    }
    if (myGenderChart) {
        myGenderChart.dispose();
        myGenderChart = null;
    }
    if (myMapChart) {
        myMapChart.dispose();
        myMapChart = null;
    }
});
// 定义SalesIndex
let SalesIndex = ref(0)
// 定义VisitorsIndex
let VisitorsIndex = ref(0)
// 定义SourceIndex
let SourceIndex = ref(0)


// 实现selectType1方法
const selectType1 = (index: number) => {
    SalesIndex.value = index
}
// 实现selectType2方法
const selectType2 = (index: number) => {
    VisitorsIndex.value = index
}
// 实现selectType3方法
const selectType3 = (index: number) => {
    SourceIndex.value = index
}

// chartOptions

</script>

<style lang="scss" scoped>
.DataView {
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

    .body {
        margin: 24px;

        .DataLine1 {
            display: flex;
            justify-content: center;
            align-content: center;
            gap: 20px;

            .Data1 {
                flex: 1;

                background-color: white;
                border-radius: 24px;

                padding: 20px;

                // 头部标题以及按月、按周选择
                .Data1Header {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;

                    .FilterSectionType {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        position: relative;


                        min-width: 120px;
                        height: 30px;

                        border-radius: 8px;


                        background-color: var(--bg-200);
                        color: rgba(113, 128, 150, 1);;


                        // 定义共同的样式
                        @mixin selected-style {
                            position: absolute;
                            width: 50%;
                            height: 80%;
                            border-radius: 8px;
                            background-color: var(--bg-100);
                            color:var(--bg-300);
                            transition: 0.25s ease-out;
                        }

                        .Selected0 {
                            @include selected-style;
                            transform: translateX(-45%);
                        }

                        .Selected1 {
                            @include selected-style;
                            transform: translateX(45%);
                        }

                    }
                }

                // 主体数据部分
                .Data1Body {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                    gap: 20px;

                    .Data1Left {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        flex-direction: column;
                        gap: 10px;

                        .LeftData {
                            display: flex;
                            justify-content: space-between;
                            align-content: center;
                            flex-direction: column;

                            background-color: rgba(250, 250, 250, 1);
                            border-radius: 8px;

                            padding: 15px;

                            p:nth-child(1) {
                                color: rgba(113, 128, 150, 1);
                                text-align: left;
                            }

                            p:nth-child(2) {
                                font-size: 24px;
                                font-weight: 500;

                                text-align: left;

                            }

                        }

                    }

                    .Data1Right {
                        flex: 2;
                    }
                }
            }
        }

        .DataLine2 {
            display: flex;
            justify-content: center;
            align-content: center;
            gap: 20px;

            margin-top: 20px;

            .Data1 {
                flex: 1;

                background-color: white;
                border-radius: 24px;

                padding: 20px;

                // 头部标题以及按月、按周选择
                .Data1Header {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;

                    .FilterSectionType {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        position: relative;


                        min-width: 120px;
                        height: 30px;

                        border-radius: 8px;


                        background-color: var(--bg-200);


                        // 定义共同的样式
                        @mixin selected-style {
                            position: absolute;
                            width: 50%;
                            height: 80%;
                            border-radius: 8px;
                            background-color: var(--bg-100);
                            transition: 0.25s ease-out;
                        }

                        .Selected0 {
                            @include selected-style;
                            transform: translateX(-45%);
                        }

                        .Selected1 {
                            @include selected-style;
                            transform: translateX(45%);
                        }

                    }
                }

                // 主体数据部分
                .Data1Body {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                    flex-direction: column;
                    gap: 5px;

                }
            }

            .Data2 {
                flex: 1;
                // 这里的flex布局是为了Data2Body能够使用flex: 1，来占满剩下的内容
                display: flex;
                justify-content: space-between;
                align-content: center;
                flex-direction: column;

                background-color: white;
                border-radius: 24px;

                padding: 20px;

                .Data2Header {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                }

                .Data2Body {
                    flex: 1;
                }
            }

            .Data3 {
                flex: 1;
                // 这里的flex布局是为了Data2Body能够使用flex: 1，来占满剩下的内容
                display: flex;
                justify-content: space-between;
                align-content: center;
                flex-direction: column;

                background-color: white;
                border-radius: 24px;

                padding: 20px;

                .Data3Header {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                }

                .Data3Body {
                    flex: 1;
                }
            }
        }

        .DataLine3 {
            display: flex;
            justify-content: center;
            align-content: center;
            gap: 20px;

            margin-top: 20px;

            .Data1 {
                flex: 2;

                background-color: white;
                border-radius: 24px;

                padding: 20px;

                // 头部标题以及按月、按周选择
                .Data1Header {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;

                    .FilterSectionType {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        position: relative;


                        min-width: 120px;
                        height: 30px;

                        border-radius: 8px;


                        background-color: var(--accent-100);


                        // 定义共同的样式
                        @mixin selected-style {
                            position: absolute;
                            width: 50%;
                            height: 80%;
                            border-radius: 8px;
                            background-color: var(--bg-100);
                            transition: 0.25s ease-out;
                        }

                        .Selected0 {
                            @include selected-style;
                            transform: translateX(-45%);
                        }

                        .Selected1 {
                            @include selected-style;
                            transform: translateX(45%);
                        }

                    }
                }

                // 主体数据部分
                .Data1Body {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                    gap: 20px;

                    .Data1Left {
                        flex: 1;
                        display: flex;
                        justify-content: flex-start;
                        align-content: flex-start;
                        flex-direction: column;
                        gap: 10px;

                        .LeftData {
                            display: flex;
                            justify-content: space-between;
                            align-content: center;
                            flex-direction: column;

                            background-color: rgba(250, 250, 250, 1);
                            border-radius: 8px;

                            padding: 15px;

                            p:nth-child(1) {
                                color: rgba(113, 128, 150, 1);
                                text-align: left;
                            }

                            p:nth-child(2) {
                                font-size: 24px;
                                font-weight: 500;

                                text-align: left;

                            }

                        }

                    }

                    .Data1Right {
                        flex: 2;
                    }

                }
            }

            .Data2 {
                flex: 1;
                // 这里的flex布局是为了Data2Body能够使用flex: 1，来占满剩下的内容
                display: flex;
                justify-content: space-between;
                align-content: center;
                flex-direction: column;

                background-color: white;
                border-radius: 24px;

                padding: 20px;

                .Data2Header {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                }

                .Data2Body {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    flex-direction: column;
                    gap: 20px;
                }
            }
        }
    }
}
</style>
