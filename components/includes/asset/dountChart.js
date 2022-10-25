import { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useSelector, useDispatch } from 'react-redux';
import { formatNum } from '../../../services/formatNum';
am4core.addLicense(process.env.NEXT_PUBLIC_AMCHART_LICENSE);
am4core.useTheme(am4themes_animated);

const DountChart = function () {
    const realTimePrtLosSum = useSelector(store => store.asset.realTimePrtLosSum.data);
    const realTimePrtLosSumTotal = useSelector(store => store.asset.realTimePrtLosSum.total);

    useEffect(async () => {
        if (realTimePrtLosSum) {
            drawChart();
        }
    }, [realTimePrtLosSum]);

    const drawChart = () => {
        let chart = am4core.create('chartdiv', am4charts.PieChart);

        // fake Data
        chart.data = [
            {
                sector: '國內證券',
                size: parseInt(realTimePrtLosSum?.S?.sum_namt) + parseInt(realTimePrtLosSum?.L?.sum_namt),
            },
            {
                sector: '期貨',
                size: parseInt(realTimePrtLosSum?.F?.sum_balv) + parseInt(realTimePrtLosSum?.FF?.sum_dlbaln_twd),
            },
            {
                sector: '海外證券',
                size:
                    parseInt(realTimePrtLosSum?.H?.sum_twd) +
                    parseInt(realTimePrtLosSum?.FIP?.sum_twd) +
                    parseInt(realTimePrtLosSum?.MIP?.sum_twd),
            },
            {
                sector: '基金',
                size: parseInt(realTimePrtLosSum?.OF?.sum_twd) + parseInt(realTimePrtLosSum?.WM_FUND?.sum_twd),
            },
            { sector: '債券', size: realTimePrtLosSum?.BOND?.sum_total_value_twd },
            {
                sector: '結構型商品',
                size: parseInt(realTimePrtLosSum?.SN?.sum_twd) + parseInt(realTimePrtLosSum?.WM_SN?.sum_twd),
            },
            { sector: '在途款', size: parseInt(realTimePrtLosSum?.WM_FUND_INTRANSIT?.sum_twd) },
            { sector: '約當現金', size: parseInt(realTimePrtLosSum?.WM_TRUST_DEPOSIT?.sum_twd) },
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
        label2.text = `$${formatNum(realTimePrtLosSumTotal)}`;
        label2.horizontalCenter = 'middle';
        label2.verticalCenter = 'middle';
        label2.fontWeight = 800;
        label2.fontSize = 28;

        chart.innerRadius = 100;

        // let label3 = chart.seriesContainer.createChild(am4core.Label);
        // label3.text = '總損益 +100.24%';
        // label3.horizontalCenter = 'middle';
        // label3.y = 25;
        // label3.fontWeight = 800;
        // label3.fontSize = 14;
        // label3.fill = '#f45a4c';
        // label3.background.fill = '#f45a4c';
        // label3.background.opacity = 0.2;
        // label3.padding(6, 10, 4, 10);

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());

        // 設定顏色
        pieSeries.colors.list = [
            am4core.color('#C43826'), // 國內證券
            am4core.color('#C97B1D'), // 期貨
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
