import axios from '../../../myAxios';
export const fetchGetQuote = async (code, token) => {
    const reqUrl = `/lykan/api/v1/labci/sinopacwidget/data/getquote?&ric=${code}`;
    try {
        const res = await axios.get(reqUrl);
        const data = res.data.substr(res.data.indexOf('['), res.data.indexOf(']') - res.data.indexOf('[') + 1);
        return JSON.parse(data)[0];
    } catch (error) {
        throw '伺服器錯誤';
    }
};
// {
//     data:{
//     "datalist":[
//     {
//     "hi":"144.33", 最高價
//     "symbol":"IBM",
//     "lo":"143.49", 最低價
//     "ls":"143.88", 現價
//     "vwap":"143.95",  成交量加權平均價
//     "am2":"-",  成交金額（細）
//     "trbc":572010,
//     "dp":4,
//     "amunit":"",
//     "ric":"IBM.NB",
//     "yh":"148.74", 52週高
//     "hc_d":"20210527",
//     "div":null,  股利
//     "vounit":"",
//     "yl":"105.92", 52週低
//     "ccy":"USD",
//     "lmtstatus":"",
//     "per":"-", 本益比 (TTM)
//     "refprice":"143.8200", 平盤參考價
//     "mktvalue":"-",  巿值
//     "assize":"0", 委賣量
//     "eps":"5.8603", 每股盈餘 (TTM)
//     "nm_cn":null,  簡中名
//     "am":"-", 成交總金額
//     "as":"-", 委賣價
//     "bdsize":"0", 委買量
//     "nc":"+0.06", 漲跌
//     "vo":"2,534,811",  總成交量
//     "exchsect":"NBN",
//     "hitime":"-",
//     "status":0,
//     "nm":"INTL BUS MACHINE",  全名
//     "pbr":"-",  股價淨值比 (LFY)
//     "bd":"-",  委買價
//     "exdate":"-", 除息日
//     "tone":"ODD",
//     "lotime":"-",
//     "paydate":"-", 股利發放日
//     "lot":"-",  每手股數
//     "yield":null,  股票殖利率
//     "asset_type":"EQTY",
//     "currency":"USD", 幣別
//     "cc":"USA", 國家
//     "op":"143.74", 開盤價
//     "optime":"-",
//     "nm_en":"INTL BUS MACHINE", 英文全名
//     "nm_zh":null, 繁中全名
//     "td":"20210528", 日期
//     "pc":"+0.04", 漲跌幅
//     "tm":"1600", 時間
//     "hc":"143.82", 昨收
//     "dc":"delay"   delay/realtime
//     }
//     ],
//     "responseCode":"S"
//     }
// }
