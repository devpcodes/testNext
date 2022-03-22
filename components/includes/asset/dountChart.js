import { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.addLicense(process.env.NEXT_PUBLIC_AMCHART_LICENSE);
am4core.useTheme(am4themes_animated);

const DountChart = function () {
    useEffect(() => {
        drawChart();
    }, []);

    const chartData = {
        1996: [
            { sector: 'Agriculture', size: 6.6 },
            { sector: 'Mining and Quarrying', size: 0.6 },
            { sector: 'Manufacturing', size: 23.2 },
            { sector: 'Electricity and Water', size: 2.2 },
            { sector: 'Construction', size: 4.5 },
            { sector: 'Trade (Wholesale, Retail, Motor)', size: 14.6 },
            { sector: 'Transport and Communication', size: 9.3 },
            { sector: 'Finance, real estate and business services', size: 22.5 },
        ],
    };

    const drawChart = () => {
        let chart = am4core.create('chartdiv', am4charts.PieChart);

        // fake Data
        chart.data = [
            { sector: '國內證券', size: 23.2 },
            { sector: '海外證券', size: 6.6 },
            { sector: '基金', size: 2.2 },
            { sector: '債券', size: 4.5 },
            { sector: '結構型商品', size: 14.6 },
            { sector: '在途款', size: 9.3 },
            { sector: '約當現金', size: 22.5 },
        ];

        // dount chart 中間文字設定
        chart.innerRadius = 100;
        let label = chart.seriesContainer.createChild(am4core.Label);
        label.text = '我的總資產';
        label.horizontalCenter = 'middle';
        label.y = -45;
        label.fontSize = 20;
        label.fontWeight = 800;

        chart.innerRadius = 100;
        let label2 = chart.seriesContainer.createChild(am4core.Label);
        label2.text = '$556,000,00';
        label2.horizontalCenter = 'middle';
        label2.verticalCenter = 'middle';
        label2.fontWeight = 800;
        label2.fontSize = 28;

        chart.innerRadius = 100;
        let label3 = chart.seriesContainer.createChild(am4core.Label);
        label3.text = '總損益 +100.24%';
        label3.horizontalCenter = 'middle';
        label3.y = 25;
        label3.fontWeight = 800;
        label3.fontSize = 14;
        label3.fill = '#f45a4c';
        label3.background.fill = '#f45a4c';
        label3.background.opacity = 0.2;
        label3.padding(6, 10, 4, 10);
        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());

        // 設定顏色
        pieSeries.colors.list = [
            am4core.color('#C43826'), // 國內證券
            am4core.color('#0D1623'), // 海外證券
            am4core.color('#DAA360'), // 基金
            am4core.color('#3F5372'), // 債券
            am4core.color('#6C7B94'), // 結構型商品
            am4core.color('#254A91'), // 在途款
            am4core.color('#A9B6CB'), // 約當現金
        ];

        // 關閉提示
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;

        pieSeries.dataFields.value = 'size';
        pieSeries.dataFields.category = 'sector';
    };

    return <div id="chartdiv" style={{ width: '300px', height: '300px' }}></div>;
};

export default DountChart;

// <div className='test'>
// <h6>基金</h6>
// <p>$135,000</p>
// <p>損益 -5.05%</p>
// </div>
