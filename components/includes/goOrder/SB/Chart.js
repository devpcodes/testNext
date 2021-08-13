import { useEffect, useState, memo, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { fetchRenderTa } from '../../../../services/components/goOrder/sb/fetchRenderTa';
const Chart = memo(({ width, visible }) => {
    const [imgSrc, setImgSrc] = useState('');
    const ric = useSelector(store => store.goOrderSB.ric);
    const code = useSelector(store => store.goOrder.code);
    const currChartRic = useRef('');
    const currWidth = useRef(0);
    useEffect(() => {
        setImgSrc('');
    }, [code]);

    useEffect(() => {
        if (width || ric) {
            if (ric !== currChartRic.current) {
                getUUID(width, ric);
            }
        }
    }, [width, ric, code]);

    const getUUID = async (w, ric) => {
        try {
            const res = await fetchRenderTa({ width: w, height: 200, ric });
            if (res) {
                let reqUrl;
                if (process.env.NODE_ENV !== 'production') {
                    reqUrl = `https://webrd.sinotrade.com.tw/lykan/api/v1/labci/sinopacwidget/sschart/chart_img.gif?uuid=${res}&token=__token__`;
                } else {
                    reqUrl = `/lykan/api/v1/labci/sinopacwidget/sschart/chart_img.gif?uuid=${res}&token=__token__`;
                }
                setImgSrc(reqUrl);
                currChartRic.current = ric;
                currWidth.width = w;
            }
        } catch (error) {}
    };

    const chartImg = useMemo(() => {
        console.log('src...', imgSrc);
        if (imgSrc) {
            return <img src={imgSrc} />;
        }
    }, [imgSrc]);

    return <div style={{ display: visible ? 'block' : 'none' }}>{chartImg}</div>;
});

export default Chart;
