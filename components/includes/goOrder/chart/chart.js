import { useLayoutEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const Chart = function () {
    const chart = useRef(null);

    useLayoutEffect(() => {
        let x = am4core.create('chartdiv', am4charts.XYChart);
        let data = [];
        let initValue = 300;

        for (let i = 0; i < 271; i++) {
            // 86400
            let visits = initValue + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({
                date: new Date(2018, 0, 1, 9, i, 0),
                name: 'name' + i,
                value: visits,
                quantity: Math.round(Math.random() * 1000),
            });
        }
        console.log(data);
        x.data = data;

        // 時間軸設定
        let timeAxis = x.xAxes.push(new am4charts.DateAxis());
        timeAxis.dataFields.category = 'time';
        timeAxis.title.text = '時間';
        timeAxis.fontSize = '15px';
        timeAxis.tooltip.label.fontSize = 12;
        timeAxis.baseInterval = { timeUnit: 'minute', count: 1 };
        timeAxis.renderer.grid.template.location = 0;
        timeAxis.gridIntervals.setAll([
            { timeUnit: 'hour', count: 1 },
            { timeUnit: 'hour', count: 1 },
            { timeUnit: 'hour', count: 1 },
            { timeUnit: 'hour', count: 1 },
            { timeUnit: 'minute', count: 30 },
        ]);

        // 價格軸設定
        let priceAxis = x.yAxes.push(new am4charts.ValueAxis());
        priceAxis.min = 280; // 跌停
        priceAxis.max = 320; // 漲停
        priceAxis.baseValue = 300; // 開盤價

        priceAxis.strictMinMax = true;
        priceAxis.calculateTotals = true;

        priceAxis.dataFields.category = 'price';
        priceAxis.fontSize = '15px';
        priceAxis.tooltip.label.fontSize = 12;

        // 線圖設定
        let series = x.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = 'date';
        series.dataFields.valueY = 'value';
        // series.tooltipText = '{valueY.value}';
        series.tooltip.label.fontSize = 12;
        x.cursor = new am4charts.XYCursor();

        let uRange = priceAxis.createSeriesRange(series);
        uRange.value = 300;
        uRange.endValue = 10000;
        uRange.contents.stroke = am4core.color('#f00');
        uRange.contents.fill = am4core.color('#f00');
        uRange.contents.fillOpacity = 0.1;

        let dRange = priceAxis.createSeriesRange(series);
        dRange.value = 0;
        dRange.endValue = 300;
        dRange.contents.stroke = am4core.color('#22a16f');
        dRange.contents.fill = am4core.color('#22a16f');
        dRange.contents.fillOpacity = 0.1;

        // let uMiddleRange = priceAxis.axisRanges.create();
        // uMiddleRange.value = 300;
        // uMiddleRange.endValue = 10000;
        // uMiddleRange.label.disabled = false;
        // uMiddleRange.label.rotation = 90;
        // uMiddleRange.label.fill = am4core.color("#000");
        // uMiddleRange.label.adapter.add("horizontalCenter", function() {
        //     return "middle";
        // });

        return () => {
            x.dispose();
        };
    }, []);
    return <div id="chartdiv" style={{ width: '100%', height: '300px' }}></div>;
};

export default Chart;
