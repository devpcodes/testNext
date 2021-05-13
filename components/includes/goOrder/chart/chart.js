import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { fetchStockMinuteKline } from '../../../../services/stock/stockMinuteKlineFetcher';

am4core.addLicense(process.env.NEXT_PUBLIC_AMCHART_LICENSE);
let watermark;

// 缺暫停交易 StopTrade = 1

const Chart = function () {
    const code = useSelector(store => store.goOrder.code);
    const lot = useSelector(store => store.goOrder.lot);
    const solaceData = useSelector(store => store.solace.solaceData);
    const [kline, setKline] = useState({});
    const fetchMinuteKline = async () => {
        const res = await fetchStockMinuteKline(code);
        setKline(res);
    };

    // 抓取 kLine 資料
    useEffect(() => {
        if (code !== '') {
            fetchMinuteKline();
        }
    }, [code, lot]);

    // 接上 solace 資料
    useEffect(() => {
        if (solaceData && solaceData.length > 0) {
            let chart = am4core.registry.baseSprites.find(c => c.htmlContainer.id === 'chartdiv');

            if (chart) {
                let chartWatermark = chart.plotContainer.children.getIndex(
                    chart.plotContainer.children.indexOf(watermark),
                );
                if (chartWatermark) {
                    solaceData[0].data.OddlotSimtrade === 1 || solaceData[0].data.Simtrade === 1
                        ? (chartWatermark.text = '試撮')
                        : (chartWatermark.text = '');
                }

                if (solaceData[0].topic.indexOf('MKT') !== -1) {
                    const time =
                        lot === 'Board'
                            ? `${solaceData[0].data.Date} ${solaceData[0].data.Time}`
                            : `${solaceData[0].data.Date} ${solaceData[0].data.OddlotTime}`;
                    const close = lot === 'Board' ? solaceData[0].data.Close[0] : solaceData[0].data.OddlotClose;
                    let chartData = {
                        ts: new Date(time),
                        Close: close,
                    };
                    chart.addData(chartData);
                }
            }
        }
    }, [solaceData]);

    useEffect(() => {
        let chart = am4core.registry.baseSprites.find(c => c.htmlContainer.id === 'chartdiv');
        if (chart) {
            chart.dispose();
        }
        drawChart();
    }, [kline]);

    const drawChart = () => {
        if (!_.isEmpty(kline)) {
            let chart = am4core.create('chartdiv', am4charts.XYChart);

            if (kline.OHCL.length > 0) {
                kline.OHCL.map(function (a, b) {
                    a.ts = a.ts.replace(new RegExp(/-/gm), '/');
                    a.ts = new Date(a.ts);
                });
                chart.data = kline.OHCL;
            }

            // 整股零股
            // let chartAmount = lot === 'Board' ? kline.Amount : kline.OddAmount;
            // let chartHigh = lot === 'Board' ? kline.High : kline.OddHigh;
            // let chartLow = lot === 'Board' ? kline.Low : kline.OddLow;
            // let chartOpen = lot === 'Board' ? kline.Open : kline.OddOpen;
            // let chartVolume = lot === 'Board' ? kline.Volume : kline.OddVolume;
            let chartClose = lot === 'Board' ? kline.Close : kline.OddClose;

            // 補齊第一根線 (缺零股和數量)
            if (Array.isArray(chart.data) && chart.data.length) {
                let firstTick = Object.assign({}, chart.data[0]);
                firstTick.ts = new Date(chart.data[0].ts).setHours(9, 0, 0, 0);
                firstTick.Close = chart.data[0].Open;
                chart.data.unshift(firstTick);
            }

            // 時間軸設定 (resizable)
            let timeAxis = chart.xAxes.push(new am4charts.DateAxis());
            timeAxis.dataFields.category = 'time';
            timeAxis.interactionsEnabled = false;
            timeAxis.fontSize = 12;
            timeAxis.tooltip.label.fontSize = 10;
            timeAxis.baseInterval = { timeUnit: 'second', count: 1 };
            timeAxis.renderer.grid.template.location = 0;
            timeAxis.renderer.labels.template.location = 0.0001; // 不可設0
            timeAxis.cursorTooltipEnabled = false;
            timeAxis.renderer.minGridDistance = 1; // 手機板刻度固定
            timeAxis.min = new Date().setHours(9, 0, 0, 0);
            timeAxis.max = new Date().setHours(13, 30, 0, 0);
            timeAxis.groupData = true;
            timeAxis.groupCount = 1500;
            timeAxis.gridIntervals.setAll([
                { timeUnit: 'hour', count: 1 },
                { timeUnit: 'minute', count: 1 },
                { timeUnit: 'second', count: 1 },
            ]);

            timeAxis.dateFormats.setKey('hour', 'HH:mm');

            // 價格軸設定
            let priceAxis = chart.yAxes.push(new am4charts.ValueAxis());
            priceAxis.strictMinMax = true;
            if (kline.DownLimit === 0.01 && kline.UpLimit === 9995) {
                priceAxis.max =
                    chartClose > parseFloat((kline.Reference + kline.Reference * 0.2).toFixed(2))
                        ? chartClose
                        : parseFloat((kline.Reference + kline.Reference * 0.2).toFixed(2));
                priceAxis.min =
                    chartClose < parseFloat((kline.Reference - kline.Reference * 0.2).toFixed(2))
                        ? chartClose
                        : parseFloat((kline.Reference - kline.Reference * 0.2).toFixed(2));
            } else {
                priceAxis.min = kline.DownLimit; // 跌停
                priceAxis.max = kline.UpLimit; // 漲停

                // let label = chart.createChild(am4core.Label);
                // label.text = kline.Reference;
                // label.fontSize = 12;
                // label.isMeasured = false;
                // label.x = '0';
                // label.y = '77';
            }

            priceAxis.strictMinMax = true;
            priceAxis.baseValue = kline.Reference; // 平盤價
            priceAxis.dataFields.category = 'price';
            priceAxis.fontSize = 12;
            priceAxis.tooltip.label.fontSize = 10;
            priceAxis.cursorTooltipEnabled = false;
            priceAxis.renderer.minGridDistance = 18;
            priceAxis.adjustLabelPrecision = true;

            priceAxis.renderer.labels.template.adapter.add('text', (label, target, key) => {
                if (label > kline.Reference) {
                    return `[#f00]${label}`;
                } else if (label < kline.Reference) {
                    return `[#22a16f]${label}`;
                } else {
                    return label;
                }
            });

            let upLimitLine = chart.series.push(new am4charts.LineSeries());
            upLimitLine.dataFields.dateX = 'ts';
            upLimitLine.dataFields.valueY = 'UpLimit';
            upLimitLine.strokeWidth = 2;
            upLimitLine.stroke = am4core.color('#0d1623');
            let upLimitData = [
                { ts: new Date().setHours(8, 0, 0, 0), UpLimit: kline.UpLimit },
                { ts: new Date().setHours(13, 30, 0, 0), UpLimit: kline.UpLimit },
            ];
            upLimitLine.data = upLimitData;

            let downLimitLine = chart.series.push(new am4charts.LineSeries());
            downLimitLine.dataFields.dateX = 'ts';
            downLimitLine.dataFields.valueY = 'DownLimit';
            downLimitLine.strokeWidth = 2;
            downLimitLine.stroke = am4core.color('#0d1623');
            let downLimitData = [
                { ts: new Date().setHours(8, 0, 0, 0), DownLimit: kline.DownLimit },
                { ts: new Date().setHours(13, 30, 0, 0), DownLimit: kline.DownLimit },
            ];
            downLimitLine.data = downLimitData;

            // 線圖設定
            let priceSeries = chart.series.push(new am4charts.LineSeries());
            priceSeries.dataFields.dateX = 'ts';
            lot === 'Board' ? (priceSeries.dataFields.valueY = 'Close') : (priceSeries.dataFields.valueY = 'OddClose');
            priceSeries.tooltipText = '{valueY.value}';
            priceSeries.tooltip.label.fontSize = 12;
            priceSeries.numberFormatter.numberFormat = '#.00';

            priceSeries.tooltip.getFillFromObject = false;
            priceSeries.tooltip.background.fill = am4core.color('#000');
            priceSeries.tooltip.label.fill = am4core.color('#fff');

            priceSeries.adapter.add('tooltipText', function (ev, b) {
                var text = '[bold, #fff]{valueY}[/]\n';
                return text;
            });

            //
            // let volumeSeries = chart.series.push(new am4charts.ColumnSeries());
            // volumeSeries.dataFields.dateX = "ts";
            // volumeSeries.dataFields.valueX = "Volume";
            // volumeSeries.columns.template.fillOpacity = 0.5;
            // volumeSeries.columns.template.strokeOpacity = 0;

            // 取消縮放功能
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = 'none';

            // waterMark
            watermark = new am4core.Label();
            watermark.align = 'left';
            watermark.valign = 'top';
            watermark.fontSize = 20;
            watermark.opacity = 0.3;
            watermark.marginTop = 5;
            watermark.marginLeft = 5;
            watermark.fontWeight = 600;
            watermark.text = '';
            if (solaceData && solaceData.length > 0) {
                solaceData[0].data.OddlotSimtrade === 1 || solaceData[0].data.Simtrade === 1
                    ? (watermark.text = '試撮')
                    : (watermark.text = '');
            }
            chart.plotContainer.children.push(watermark);

            // 漲區塊設定
            let uRange = priceAxis.createSeriesRange(priceSeries);
            uRange.value = kline.Reference; // 平盤價
            uRange.endValue = kline.UpLimit; // 漲停
            uRange.contents.stroke = am4core.color('#f00');
            uRange.contents.fill = am4core.color('#f00');
            uRange.contents.fillOpacity = 0.1;

            // // 跌區塊設定
            let dRange = priceAxis.createSeriesRange(priceSeries);
            dRange.value = kline.DownLimit; // 跌停
            dRange.endValue = kline.Reference; // 平盤價
            dRange.contents.stroke = am4core.color('#22a16f');
            dRange.contents.fill = am4core.color('#22a16f');
            dRange.contents.fillOpacity = 0.1;
        }
    };

    return <div id="chartdiv" style={{ width: '100%', height: '230px' }}></div>;
};

export default Chart;
