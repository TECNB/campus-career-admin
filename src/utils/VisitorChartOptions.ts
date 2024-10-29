const visitorChartOptions = (xAxisData: string[], seriesData: number[]) => {
    return {
        xAxis: {
            type: 'category',
            data: xAxisData,
        },
        yAxis: {
            type: 'value',
            position: 'right',
        },
        grid: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 20,
            borderWidth: 1,
        },
        series: [
            {
                name: 'Series 1',
                type: 'bar',
                data: seriesData,
                color: ['#5DB1FF'],
                itemStyle: {
                    normal: {
                        barBorderRadius: [8, 8, 0, 0],
                    },
                },
            },
        ],
    };
};

export default visitorChartOptions;
