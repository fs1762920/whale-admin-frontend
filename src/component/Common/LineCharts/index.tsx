import React, { useEffect, useRef } from 'react';
import * as echarts from "echarts";
import "./index.less";

interface AppPropType {
    title?: string,
    xData: string[],
    seriesData: number[],
}

const App: React.FC<AppPropType> = (props) => {
    const chartRef:any = useRef();  //拿到DOM容器
    // 每当props改变的时候就会实时重新渲染
    useEffect(()=>{
        const chart = echarts.init(chartRef.current);   //echart初始化容器
        let option = {
            xAxis: {
                type: 'category',
                data: props.xData,
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: props.seriesData,
                type: 'line'
            }]
        };

        chart.setOption(option);
    }, [props]);

    return <div ref={chartRef} className="line-chart"></div>
}

export default App;