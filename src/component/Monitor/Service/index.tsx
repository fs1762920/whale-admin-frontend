import React from "react";
import { Card, Space, Descriptions } from "antd";
import LineCharts from "@/component/Common/LineCharts";
import "./index.less";

const App: React.FC = () => {
  const eChartsRef: any = React.createRef();
  let lineChartData = {
    //折线图模拟数据
    xData: [
      "2021/08/13",
      "2021/08/14",
      "2021/08/15",
      "2021/08/16",
      "2021/08/17",
      "2021/08/18",
    ],
    seriesData: [22, 19, 88, 66, 5, 90],
  }

  return (
    <>
      <Space
        className="info-inline"
        direction="horizontal"
        wrap={true}
        size={16}
      >
        <Card title="CPU">
          <LineCharts xData={lineChartData.xData} seriesData={lineChartData.seriesData}></LineCharts>
        </Card>
        <Card title="Memo">
          <LineCharts xData={lineChartData.xData} seriesData={lineChartData.seriesData}></LineCharts>
        </Card>
      </Space>
      <Card className="info-block" title="服务器信息">
        <Descriptions column={2} bordered layout="vertical">
          <Descriptions.Item label="服务器名称">Cloud Database</Descriptions.Item>
          <Descriptions.Item label="系统架构">Prepaid</Descriptions.Item>
          <Descriptions.Item label="服务器IP">YES</Descriptions.Item>
          <Descriptions.Item label="操作系统">2018-04-24 18:00:00</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className="info-block" title="JVM信息">
      <Descriptions column={2} bordered layout="vertical">
          <Descriptions.Item label="Java名称">Java HotSpot(TM) 64-Bit Server VM</Descriptions.Item>
          <Descriptions.Item label="Java版本">1.8.0_111</Descriptions.Item>
          <Descriptions.Item label="启动时间">2023-02-03 13:24:44</Descriptions.Item>
          <Descriptions.Item label="运行时长">45天20小时56分钟</Descriptions.Item>
          <Descriptions.Item label="安装路径">/usr/java/jdk1.8.0_111/jre</Descriptions.Item>
          <Descriptions.Item label="项目路径">/home/ruoyi/projects/ruoyi-vue</Descriptions.Item>
          <Descriptions.Item label="运行参数">[-Dname=target/ruoyi-vue.jar, -Duser.timezone=Asia/Shanghai, -Xms512m, -Xmx1024m, -XX:MetaspaceSize=128m, -XX:MaxMetaspaceSize=512m, -XX:+HeapDumpOnOutOfMemoryError, -XX:+PrintGCDateStamps, -XX:+PrintGCDetails, -XX:NewRatio=1, -XX:SurvivorRatio=30, -XX:+UseParallelGC, -XX:+UseParallelOldGC]</Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default App;
