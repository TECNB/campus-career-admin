const mapChartOptions = (seriesData: { name: string; value: number }[]) => {
    return {
        // 设置地图背景颜色为透明
        backgroundColor: 'transparent',
        // 提示框配置，这里设置不显示提示框
        tooltip: {
            show: false,
        },
        // 地理坐标系组件配置
        geo: {
            // 地图类型，这里使用中国地图
            map: 'china',
            // 地图提示框配置，设置不显示提示框
            tooltip: {
                show: false,
            },
            // 地图上的标签配置，设置不显示标签
            label: {
                show: false,
            },
            // 初始缩放比例为1.2倍
            zoom: 1.2,
            // 静默模式，设置为 true 不响应鼠标事件
            silent: true,
            // 是否显示地理坐标系组件
            show: true,
            // 是否开启拖拽漫游，默认关闭
            roam: false,
            // 长宽比，默认为1
            aspectScale: 0.75,
            // 区域样式配置，包括边框颜色、边框宽度、区域颜色、阴影颜色、阴影模糊度、阴影水平偏移和阴影垂直偏移等
            itemStyle: {
                borderColor: '#0FA3F0',
                borderWidth: 1,
                areaColor: '#070f71',
                shadowColor: 'rgba(1,34,73,0.48)',
                shadowBlur: 10,
                shadowOffsetX: -10,
                shadowOffsetY: 10,
            },
            // 区域选中状态配置，这里设置允许区域选中
            select: {
                disabled: true,
            },
            // 高亮状态配置，包括禁用高亮、高亮区域颜色等
            emphasis: {
                disabled: true,
                areaColor: '#00F1FF',
            },
            // 组件距离容器顶部的距离
            top: '10%',
            // 组件距离容器左侧的距离
            left: 'center',
            // 区域配置，这里配置南海诸岛的样式和是否高亮等
            regions: [
                {
                    name: '南海诸岛',
                    selected: false,
                    emphasis: {
                        disabled: true,
                    },
                    itemStyle: {
                        areaColor: '#00000000',
                        borderColor: '#00000000',
                    },
                },
            ],
            // 图层的 z-index 层级
            z: 1,
        },
        // 系列配置，这里是地图系列配置
        series: [
            {
                // 系列类型为地图
                type: 'map',
                // 使用的地图类型，同样是中国地图
                map: 'china',
                // 初始缩放比例为1.2倍
                zoom: 1.2,
                // 系列的提示框配置，设置显示提示框
                tooltip: {
                    show: true,
                },
                // 系列的标签配置，设置不显示标签，并设置文字颜色和对齐方式，show为true时显示省份
                label: {
                    show: false,
                    color: '#ffffff',
                    align: 'center',
                },
                // 系列距离容器顶部的距离
                top: '10%',
                // 系列距离容器左侧的距离
                left: 'center',
                // 长宽比，默认为1
                aspectScale: 0.75,
                // 是否开启拖拽漫游，默认关闭
                roam: false,
                // 区域样式配置，包括边框颜色、边框宽度、区域颜色和透明度等
                itemStyle: {
                    borderColor: '#3ad6ff',
                    borderWidth: 1,
                    // 下面为修改身份区域本身的颜色
                    areaColor: '#17348b',
                    opacity: 1,
                },
                // 区域选中状态配置，这里设置禁用区域选中
                select: {
                    disabled: true,
                },
                // 高亮状态配置，包括禁用高亮和高亮区域的文字颜色和区域颜色等
                emphasis: {
                    disabled: false,
                    label: {
                        align: 'center',
                        color: '#ffffff',
                    },
                    itemStyle: {
                        color: '#ffffff',
                        // 下面的为修改悬浮在省份上面时的颜色
                        areaColor: '#0075f4',
                    },
                },
                // 图层的 z-index 层级
                z: 2,
                // 系列的数据，这里使用了一个参数 seriesData 来动态传入数据
                data: seriesData,
            },
        ],
    };
};

export default mapChartOptions;
