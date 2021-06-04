import { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { fetchRenderTa } from '../../../../services/components/goOrder/sb/fetchRenderTa';
const Chart = memo(({ width, visible }) => {
    const [imgSrc, setImgSrc] = useState('');
    const ric = useSelector(store => store.goOrderSB.ric);
    const code = useSelector(store => store.goOrder.code);
    useEffect(() => {
        setImgSrc('');
    }, [code]);

    useEffect(() => {
        if (width && ric) {
            getUUID(width, ric);
        }
    }, [width, ric]);

    const getUUID = async (w, code) => {
        try {
            const res = await fetchRenderTa({ width: w, height: 200, code });
            console.log('UUID', res);
            if (res) {
                let reqUrl;
                if (process.env.NODE_ENV !== 'production') {
                    reqUrl = `https://webrd.sinotrade.com.tw/lykan/api/v1/labci/sinopacwidget/sschart/chart_img.gif?uuid=${res}&token=__token__`;
                } else {
                    reqUrl = `/lykan/api/v1/labci/sinopacwidget/sschart/chart_img.gif?uuid=${res}&token=__token__`;
                }
                setImgSrc(reqUrl);
            } else {
                setImgSrc('');
            }
        } catch (error) {}
    };
    return <div style={{ display: visible ? 'block' : 'none' }}>{imgSrc && <img src={imgSrc} />}</div>;
});

export default Chart;
