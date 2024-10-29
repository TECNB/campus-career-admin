const customerChartOptions = (xAxisData: string[], seriesData: number[]) => {
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
            y: 10,
            x2: 0,
            y2: 20,
            borderWidth: 1,
        },
        series: [
            {
                name: 'Series 1',
                type: 'line',
                symbol: 'circle',
                symbolSize: 6,
                data: seriesData,
                color: ['#5DB1FF'],
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(93, 177, 255, 0.3)' },
                            { offset: 1, color: 'rgba(93, 177, 255, 0)' },
                        ],
                    },
                },
                smooth: 0.5,
            },
        ],
    };
};

export default customerChartOptions;
