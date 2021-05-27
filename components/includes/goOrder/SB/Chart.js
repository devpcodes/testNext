import { useEffect, useState, memo } from 'react';
import { fetchRenderTa } from '../../../../services/components/goOrder/sb/fetchRenderTa';
const Chart = memo(({ width, visible }) => {
    const [imgSrc, setImgSrc] = useState('');
    useEffect(() => {
        if (width) {
            getUUID(width);
        }
    }, [width]);
    const getUUID = async w => {
        try {
            const res = await fetchRenderTa({ width: w, height: 200 });
            if (res) {
                let reqUrl;
                if (process.env.NODE_ENV !== 'production') {
                    reqUrl = `https://webrd.sinotrade.com.tw/lykan/api/v1/labci/sinopacwidget/sschart/chart_img.gif?uuid=${res}&token=__token__`;
                } else {
                    reqUrl = `/lykan/api/v1/labci/sinopacwidget/sschart/chart_img.gif?uuid=${res}&token=__token__`;
                }
                setImgSrc(reqUrl);
            }
        } catch (error) {}
    };
    return <div style={{ display: visible ? 'block' : 'none' }}>{imgSrc && <img src={imgSrc} />}</div>;
});

export default Chart;
