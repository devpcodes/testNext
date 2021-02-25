import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { fetchStockMinuteKline } from '../../../../services/stock/stockMinuteKlineFetcher';

am4core.useTheme(am4themes_animated);

const Chart = function () {
    const code = useSelector(store => store.goOrder.code);
    const lot = useSelector(store => store.goOrder.lot);
    const solaceData = useSelector(store => store.solace.solaceData);
    const [kline, setKline] = useState({});

    const fetchMinuteKline = async () => {
        const res = await fetchStockMinuteKline(code);
        setKline(res);
    };

    let chart = am4core.create('chartdiv', am4charts.XYChart);

    // 抓取 kLine 資料
    useEffect(() => {
        if (code !== '') {
            fetchMinuteKline();
        }
    }, [code, lot]);

    // solace

    useEffect(() => {
        // get MKT Data
        console.log(' get MKT Data ');
        console.log(solaceData);
    }, [solaceData]);

    // page Load draw 2 times bug
    useEffect(() => {
        if (!_.isEmpty(kline)) {
            am4core.options.autoDispose = true;
            kline.OHCL.map(function (a) {
                a.ts = new Date(a.ts);
            });

            chart.data = kline.OHCL;

            // 時間軸設定
            let timeAxis = chart.xAxes.push(new am4charts.DateAxis());
            timeAxis.dataFields.category = 'time';
            timeAxis.fontSize = 12;
            timeAxis.tooltip.label.fontSize = 10;
            timeAxis.baseInterval = { timeUnit: 'minute', count: 1 };
            timeAxis.renderer.grid.template.location = 0;
            timeAxis.renderer.labels.template.location = 0.0001; // 不可設0
            timeAxis.renderer.minGridDistance = 1; // 手機板刻度固定

            timeAxis.min = new Date(2021, 1, 25, 9).getTime();
            timeAxis.max = new Date(2021, 1, 25, 13, 30).getTime();
            timeAxis.cursorTooltipEnabled = false;

            timeAxis.gridIntervals.setAll([
                { timeUnit: 'hour', count: 1 },
                { timeUnit: 'hour', count: 1 },
                { timeUnit: 'hour', count: 1 },
                { timeUnit: 'hour', count: 1 },
                { timeUnit: 'minute', count: 30 },
            ]);

            // 價格軸設定
            let priceAxis = chart.yAxes.push(new am4charts.ValueAxis());
            priceAxis.min = kline.DownLimit; // 跌停
            priceAxis.max = kline.UpLimit; // 漲停
            priceAxis.baseValue = kline.Reference; // 平盤價
            priceAxis.strictMinMax = true;
            priceAxis.calculateTotals = true;
            priceAxis.dataFields.category = 'price';
            priceAxis.fontSize = 12;
            priceAxis.tooltip.label.fontSize = 10;
            priceAxis.strictMinMax = true;
            priceAxis.cursorTooltipEnabled = false;

            // 線圖設定
            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = 'ts';
            series.dataFields.valueY = 'Close';
            series.tooltipText = '{valueY.value}';
            series.tooltip.label.fontSize = 10;
            series.numberFormatter.numberFormat = '#.00';

            chart.cursor = new am4charts.XYCursor();

            // 漲區塊設定
            let uRange = priceAxis.createSeriesRange(series);
            uRange.value = kline.Reference; // 平盤價
            uRange.endValue = kline.UpLimit; // 漲停
            uRange.contents.stroke = am4core.color('#f00');
            uRange.contents.fill = am4core.color('#f00');
            uRange.contents.fillOpacity = 0.1;

            // 跌區塊設定
            let dRange = priceAxis.createSeriesRange(series);
            dRange.value = kline.DownLimit; // 跌停
            dRange.endValue = kline.Reference; // 平盤價
            dRange.contents.stroke = am4core.color('#22a16f');
            dRange.contents.fill = am4core.color('#000');
            dRange.contents.fillOpacity = 0.1;
        }
    }, [kline]);
    return <div id="chartdiv" style={{ width: '100%', height: '250px' }}></div>;
};

export default Chart;
