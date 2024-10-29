const genderChartOptions = (seriesData: { value: number; name: string }[]) => {
    return {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            data: ['男', '女', '未知'],
            orient: 'vertical',
            left: '70%',
            y: 'center',
            itemGap: 30,
            itemHeight: 15,
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['30%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 30,
                        fontWeight: 'bold',
                    },
                },
                labelLine: {
                    show: false,
                },
                data: seriesData,
            },
        ],
    };
};

export default genderChartOptions;
