import { objectToQueryHandler } from '../../../objectToQueryHandler';
import axios from '../../../myAxios';
export const fetchRenderTa = async function ({ width, height, code = 'AAPL.NB' }) {
    console.log('render', width);
    const reqUrl = '/lykan/api/v1/labci/sinopacwidget/sschart/render_ta';
    const ts = new Date().getTime();
    const obj = {
        width,
        height,
        ta: '',
        ts,
        span: 'MINUTE_1',
        code,
        instrument: '',
        type: 'LINE',
        caption: '',
        imageOnly: 'true',
        dp: -1,
        assettype: 'EQUITY',
        qid: ts,
        token: '__token__',
        period: 'DAY_1',
        lang: 'zh_TW',
    };
    const qStr = objectToQueryHandler(obj);
    try {
        const res = await axios.get(reqUrl + qStr);
        return res.data?.data?.uuid;
    } catch (error) {
        throw '伺服器錯誤';
    }
};

// width=344&height=250&ta=&span=MINUTE_1&code=AAPL.NB&instrument=&type=LINE&caption=&ts=1622007834833&imageOnly=true&dp=-1&element=chartCanvas&assettype=EQUITY&cc=undefined&channel=undefined&token=___token___&period=DAY_1&lang=zh_TW?&qid=1622007834834&callback=yourcallbackfunction
//width=344&height=250&ta=&span=MINUTE_1&code=AAPL.NB&instrument=&type=LINE&caption=&ts=1622007834833&imageOnly=true&dp=-1&assettype=EQUITY&cc=undefined&channel=undefined&token=___token___&period=DAY_1&lang=zh_TW?&qid=1622007834834&callback=yourcallbackfunction
