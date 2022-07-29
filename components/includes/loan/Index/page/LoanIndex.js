import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal, Button, Radio, Slider } from 'antd';
import { setModal } from '../../../../../store/components/layouts/action';
import { useUser } from '../../../../../hooks/useUser';
import { getToken } from '../../../../../services/user/accessToken';
import bannerPC from '../../../../../resources/images/components/loanZone/bg-banner-pc.png';
import bannerMB from '../../../../../resources/images/components/loanZone/bg-banner-mb.png';
import bannerPAD from '../../../../../resources/images/components/loanZone/bg-banner-pad.png';
import smile from '../../../../../resources/images/components/loanZone/smile.svg';
import icon1 from '../../../../../resources/images/components/loanZone/index-icon-1.svg';
import icon2 from '../../../../../resources/images/components/loanZone/index-icon-2.svg';
import icon3 from '../../../../../resources/images/components/loanZone/index-icon-3.svg';
import icon4 from '../../../../../resources/images/components/loanZone/index-icon-4.svg';
import cyclel from '../../../../../resources/images/components/loanZone/cycle-l.svg';
import cycler from '../../../../../resources/images/components/loanZone/cycle-r.svg';
import infi from '../../../../../resources/images/components/loanZone/infi.png';
import QaCollapse from '../elements/QaCollapse';
import { getClose, getAccountStatus } from '../../../../../services/components/loznZone/calculation/getApplyRecord';
import { formatNum } from '../../../../../services/formatNum';
const LoanIndex = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const winWidth = useSelector(store => store.layout.winWidth);
    const router = useRouter();
    const [sliderValue, setSliderValue] = useState(25); //撥券費
    const [radioValue, setRadioValue] = useState(7);
    const [qaData, setQaData] = useState([]);
    const [testVal, setTestVal] = useState('');
    const [close, setClose] = useState({});
    const [total, setTotal] = useState(0); //可借款額度
    const [paid, setPaid] = useState(0); //利息
    const [accPass, setAccPass] = useState(0); //利息
    const dispatch = useDispatch();
    const { isLogin } = useUser();
    useEffect(async () => {
        if (isLogin) {
            let token = getToken();
            let res = await getAccountStatus(token, currentAccount.broker_id, currentAccount.account);
            if (res.status == 'A' || (res.status == 'F' && res.blockReason == '1')) {
                setAccPass(1);
            } else {
                setAccPass(0);
            }
        }
    }, [isLogin, currentAccount]);

    useEffect(async () => {
        let res = await getClose();
        console.log(res);
        setClose(res);
    }, []);

    useEffect(async () => {
        toCount();
    }, [close, radioValue, sliderValue]);

    useEffect(() => {
        let data = [
            {
                type: '【申辦】',
                title: '不限用途款項借貸戶申辦資格是什麼？',
                content: [
                    '只要是已開立台股帳戶的成年且未具他國納稅義務人身分者都可以申請。',
                    '若您為本國法人、境內之華僑及外國人請臨櫃辦理。',
                ],
                tag: 'tag1',
                open: true,
                key: 1,
            },
            {
                type: '【申辦】',
                title: '申辦的方式和流程是甚麼？',
                content: [
                    '您可線上申辦或臨櫃辦理。',
                    '線上申辦只要上傳雙證件、選擇分公司並簽署契約就完成，申請送出後約1-3個工作天會收到審核結果通知。',
                ],
                open: false,
                key: 2,
            },
            {
                type: '【申辦】',
                title: '一個人可在永豐金開立幾戶不限用途款項借貸戶？',
                content: '一戶。',
                open: false,
                key: 3,
            },
            {
                type: '【申辦】',
                title: '申辦審核完成多久可以申請借貸？',
                content: '隔天。若您當天有緊急借款需求，請臨櫃辦理。',
                open: false,
                key: 4,
            },
            {
                type: '【申辦】',
                title: '不限用途借貸戶申辦須要開辦費嗎？',
                content: '不限用途借貸服務免開辦費。',
                open: false,
                key: 5,
            },
            {
                type: '【申辦】',
                title: '我是A股票的(超過10%大股東或內部人)員工，我可以申辦不限用途款項借貸?',
                content: '擔保品公司內部人不提供線上服務，請臨櫃申辦再完成股票設質借貸。',
                open: false,
                key: 6,
            },

            {
                type: '【借貸動用】',
                title: '有哪些股票可以申請借款呢？成數利率又是多少？',
                content: '請至上方【體驗試算】輸入股號股名進行查詢',
                open: false,
                tag: 'tag2',
                key: 7,
            },
            {
                type: '【借貸動用】',
                title: '申請借貸後，何時會撥款？',
                content: '依您借款申請時間，將款項匯入至您分公司交割帳戶中。(實際入帳時間仍須以銀行撥款為主)',
                chart: 'timeList',
                open: false,
                key: 8,
            },
            {
                type: '【借貸動用】',
                title: '每筆最少借款金額是多少？',
                content: '一萬元，並以千元為級距，最高不得超過100萬元',
                open: false,
                key: 9,
            },
            {
                type: '【借貸動用】',
                title: '借款的利息如何計算？',
                content: '擔保品匯入後，未動用不起息，動用後以日計息並計算至還款前一日。',
                open: false,
                key: 10,
            },
            {
                type: '【借貸動用】',
                title: '借款除了利息外還須支付那些費用？',
                content: [
                    '線上借款手續費：每筆100元；臨櫃借款手續費每筆2000元。',
                    '撥券費：每張1元。',
                    '上述費用於還款或借款到期時收取。',
                ],
                open: false,
                key: 11,
            },
            {
                type: '【借貸動用】',
                title: '借貸期間 6 個月到期是否能申請展延？',
                content: '目前僅提供人工申請借貸展延，且需於到期日前 5 日提出申請。',
                open: false,
                key: 11.5,
            },

            {
                type: '【還款與其他】',
                title: '我要如何還款呢？',
                content: [
                    '現金還款:需於營業日14:00前臨櫃提出申請。(可選擇申請返還擔保品，或擔保品不返還，額度內循環使用)',
                    '賣出還款:客戶自行賣出庫存，Ｔ日計算客戶應付之相關還款金額後,於T+2日收取還款金額並退還剩餘交割款。',
                ],
                open: false,
                key: 12,
            },
            {
                type: '【還款與其他】',
                title: '擔保品如何申請返還？',
                content: ['你可於現金還款後，申請擔保品返還。擔保品預計於案件結案 T日或T+1日返還。'],
                open: false,
                key: 12.5,
            },
            {
                type: '【還款與其他】',
                title: '擔保維持率如何計算？',
                content: [
                    '擔保维持率=(已抵押庫存市值+補繳保證金)/已申請借款 *100%。',
                    '如維持率低於130%，將通知借款人進行補繳作業 。',
                ],
                open: false,
                key: 13,
            },
            {
                type: '【還款與其他】',
                title: '我收到整戶維持不足的補繳通知該怎麼辦？',
                content: '您可選擇償還部分借款或致電分公司增加 / 變更擔保品。並請於通知三日內完成。',
                open: false,
                key: 14,
            },
        ];
        setQaData(data);
    }, []);

    // useEffect(() => {
    //     let newData = qaData.map((x,i)=>{
    //         return (
    //         <li key={i} className={}>
    //             <div className='qaBoxItem'>
    //                 <div>{x.title}<a className='plusIcon' onClick={openQA.bind(null,i)}></a></div>
    //                 <div>{x.content}</div>
    //             </div>
    //         </li>
    //         )
    //     })
    //     setTestVal(newData);
    // }, [qaData]);

    const toCount = () => {
        let n = sliderValue;
        let d = radioValue;

        let a = (Number(n) * 1000 * Number(close.prevClose) * Number(close.loanRate)).toFixed(0);
        let a_ = isNaN(a) ? 0 : a;
        setTotal(a_);
        let b = Number(a) * Number(close.groupRate) * (Number(d) / 365);
        let b_ = Math.ceil(b);
        let c = isNaN(b_) ? 0 : b_;
        setPaid(c);

        console.log('count', a_, c);
        // page*close*loanRate
        // ^*groupRate*(day/365)
    };

    const btnHref = val => {
        if (val === '/newweb/loan-zone/Overview' && accPass == 0) {
            noAccPass();
        } else {
            window.location.href = val;
        }
    };
    const chartFuncHandler = val => {
        if (val === 'timeList') {
            return (
                <table>
                    <tbody>
                        <tr>
                            <td>申請時間</td>
                            <td>擔保品撥轉</td>
                            <td>撥款時間</td>
                        </tr>
                        <tr>
                            <td>12:00前</td>
                            <td>當日下午</td>
                            <td>當日下午14:30</td>
                        </tr>
                        <tr>
                            <td>12:00至14:00</td>
                            <td>當日下午</td>
                            <td>次日上午10:00</td>
                        </tr>
                        <tr>
                            <td>
                                14:00至
                                <br />
                                次日12:00
                            </td>
                            <td>次日下午</td>
                            <td>次日下午14:30</td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    };
    const noAccPass = () => {
        dispatch(
            setModal({
                visible: true,
                noCloseIcon: true,
                noTitleIcon: true,
                className: 'loan_index_info',
                title: '提醒',
                type: 'confirm',
                bodyStyle: {
                    height: 'auto',
                    overflow: 'auto',
                },
                content: <p>歡迎您使用永豐金證券不限用途款項借貸服務，請先申辦借貸戶加入不限用途的行列。</p>,
                okText: '立即申辦',
                cancelText: '稍後申辦',
                width: '320px',
                okButtonProps: {
                    style: {
                        width: 'auto',
                    },
                },
                cancelButtonProps: {
                    style: {
                        width: 'auto',
                    },
                },
                onOk: () => {
                    btnHref(process.env.NEXT_PUBLIC_LOANACCOUNT);
                },
            }),
        );
    };

    const onChange2 = val => {
        // console.log(val,'stock')
        setSliderValue(val);
    };

    const onChange = val => {
        // console.log(val.target.value,'month')
        setRadioValue(val.target.value);
    };

    const showContent = n => {
        let v = testVal;
        v[n] = !testVal[n];
        setTestVal(v);
    };

    const openQA = n => {
        let now = qaData;
        let status = qaData[n].class;
        if (status == '') {
            now[n].class = 'hidden';
        } else {
            now[n].class = '';
        }
        setQaData(now);
        console.log('now', now);
    };

    return (
        <div id="loanIndex__container">
            <div className="mainArea mainArea1">
                <img src={cyclel} className="bg-cycle cyclel"></img>
                <div className="contentBox">
                    <div>不限用途款項借貸專區</div>
                    <div>
                        <p>股票借貸</p>
                        <p>靈活變現聰明錢</p>
                    </div>
                    <div>
                        免賣股，股利股息不錯過<br></br>
                        借款金額無限制，隨借隨還免綁約！
                    </div>
                    <div>
                        <Button type="primary" onClick={btnHref.bind(null, process.env.NEXT_PUBLIC_LOANACCOUNT)}>
                            立即申辦
                        </Button>
                        <br></br>
                        <Button onClick={btnHref.bind(null, '/newweb/loan-zone/Overview')}>前往借貸</Button>
                    </div>
                </div>
            </div>
            <div className="mainArea mainArea2">
                <div className="bottomBox">
                    <div className="line"></div>
                    <div className="bottomBoxItem">
                        <p>
                            <span>0</span> 元<br className="forMB"></br>開辦費
                        </p>
                        <p>開辦免手續費，3 分鐘輕鬆完成申請。</p>
                    </div>
                    <div className="bottomBoxItem">
                        <p>
                            <span>2.5</span> 小時<br className="forMB"></br>撥款
                        </p>
                        <p>動用申請後最快 2.5 小時即可完成撥款。</p>
                    </div>
                    <div className="bottomBoxItem">
                        <p>
                            借期{' '}
                            <div className="infiImg">
                                <img src={infi}></img>
                            </div>{' '}
                            <br className="forMB"></br>個月
                        </p>
                        <p>6 個月到期可申請展延或借新還舊。</p>
                    </div>
                </div>
                <div className="contentBox">
                    <div className="areaTitle">
                        先試算再借貸{}
                        <p>輸入您的股票來試算可以取得的借款金額吧</p>
                        <img src={smile}></img>
                    </div>
                    <div className="countBox">
                        <div className="countBoxLeft">
                            <div className="countBoxLeftContent">
                                <div className="dataRow">
                                    <div className="DataTitle">擔保商品</div>
                                    <div className="DataInfo">2330 台積電</div>
                                </div>
                                <div className="dataRow">
                                    <div className="DataTitle">擔保張數</div>
                                    <div className="DataInfo">
                                        <Slider defaultValue={sliderValue} onChange={onChange2} tooltipVisible />
                                    </div>
                                </div>
                                <div className="dataRow">
                                    <div className="DataTitle">貸款天數</div>
                                    <div className="DataInfo pb-1">
                                        <Radio.Group onChange={onChange} value={radioValue}>
                                            <Radio value={7}>1週</Radio>
                                            <Radio value={30}>1個月</Radio>
                                            <Radio value={90}>3個月</Radio>
                                            <Radio value={180}>6個月</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="dataRow">
                                    <div className="DataTitle">年利率</div>
                                    <div className="DataInfo">{Number(close.groupRate) * 100} %</div>
                                </div>
                            </div>
                        </div>
                        <div className="countBoxRight">
                            <div className="countBoxRightContent">
                                <p>可借貸總額</p>
                                <p className="tob">
                                    <span>{formatNum(total)}</span> 元
                                </p>
                                <p>預估利息</p>
                                <p className="tob">
                                    <span>{formatNum(paid)}</span> 元
                                </p>
                                <div className="sumBox">
                                    <p>
                                        <span>手續費</span>
                                        <span>100 元</span>
                                    </p>
                                    <p>
                                        <span>撥券費</span>
                                        <span>{sliderValue} 元</span>
                                    </p>
                                </div>
                                <Button type="primary" onClick={btnHref.bind(null, '/newweb/loan-zone/Collateral')}>
                                    體驗試算
                                </Button>
                                {/* c43826 */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainArea mainArea3">
                <img src={cycler} className="bg-cycle cycler"></img>
                <div className="contentBox">
                    <div className="areaTitle">
                        如何開始借貸
                        <p>你已經有永豐金帳戶了嗎？那就拿好雙證件馬上開始吧！</p>
                        <img src={smile}></img>
                    </div>
                    <div className="iconBox forPC">
                        <div>
                            <div className="iconBg iconBg1"></div>
                            <div className="wordy">
                                1. 線上申辦
                                <p>上傳雙證並簽署契約</p>
                            </div>
                            <div className="btnBox">
                                <Button onClick={btnHref.bind(null, '#tag1')}>了解更多</Button>
                                <Button
                                    onClick={btnHref.bind(
                                        null,
                                        process.env.NEXT_PUBLIC_LOAN_SERVICE + '/exopact/LNA/PQLogin',
                                    )}
                                    type="primary"
                                >
                                    申辦進度
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div className="iconBg iconBg2"></div>
                            <div className="wordy">
                                2. 庫存試算
                                <p>輸入股票張數試算可借款金額</p>
                            </div>
                        </div>
                        <div>
                            <div className="iconBg iconBg3"></div>
                            <div className="wordy">
                                3. 借款動用
                                <p>於可借款金額內動用申請</p>
                            </div>
                            <div className="singleBtn">
                                <Button onClick={btnHref.bind(null, '#tag2')}>了解更多</Button>
                            </div>
                        </div>
                        <div>
                            <div className="iconBg iconBg4"></div>
                            <div className="wordy">
                                4. 還款退券
                                <p>款項撥入交割銀行帳戶</p>
                            </div>
                        </div>
                    </div>
                    <div className="iconBox forMB">
                        <div>
                            <div className="iconBg iconBg1"></div>
                            <div className="wordy">
                                1. 線上申辦
                                <p>上傳雙證並簽署契約</p>
                                <div className="btnBox">
                                    <Button onClick={btnHref.bind(null, '#tag1')}>了解更多</Button>
                                    <Button
                                        onClick={btnHref.bind(
                                            null,
                                            process.env.NEXT_PUBLIC_LOAN_SERVICE + '/exopact/LNA/PQLogin',
                                        )}
                                        type="primary"
                                    >
                                        申辦進度
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="iconBg iconBg2"></div>
                            <div className="wordy">
                                2. 庫存試算
                                <p>輸入股票張數試算可借款金額</p>
                            </div>
                        </div>
                        <div>
                            <div className="iconBg iconBg3"></div>
                            <div className="wordy">
                                3. 借款動用
                                <p>於可借款金額內動用申請</p>
                                <div className="singleBtn">
                                    <Button onClick={btnHref.bind(null, '#tag2')}>了解更多</Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="iconBg iconBg4"></div>
                            <div className="wordy">
                                4. 還款退券
                                <p>款項撥入交割銀行帳戶</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainArea mainArea4">
                <div className="contentBox">
                    <div className="areaTitle">
                        常見問題
                        <p></p>
                        <img src={smile}></img>
                    </div>
                    <QaCollapse dataSource={qaData} chartFunc={chartFuncHandler} />
                </div>
            </div>
            <style jsx>
                {`
            .infiImg{width:1.7em; display: inline-block;margin-top:6%;}
            .infiImg img{width:100%;}
             #loanIndex__container {width: 100vw; overflow: hidden;}
            .bg-cycle{position:absolute;}
            .bg-cycle.cyclel{left:0;bottom:-350px;}
            .bg-cycle.cycler{right:0;top:-100px;}
            .mainArea{min-height:40px; width:100%;padding:80px 0;position:relative;}
            .mainArea:nth-child(odd){background-color:#f9fbff;}
            .mainArea:nth-child(1){background:url(${bannerPC}) no-repeat center top/1600px;height:580px;background-color:#f9fbff;overflow:visible;}
            .mainArea .contentBox {min-height:40px; width:96%; max-width:980px;margin:0 auto;}
            .mainArea1 {position:relative;}

            .mainArea1 .contentBox > div:nth-child(1){color:#d28a34; font-size:20px; font-weight:800;margin-bottom:20px;}
            .mainArea1 .contentBox > div:nth-child(2){color:#0d1623; font-size:48px; font-weight:800;padding-left:28px; border-left:8px solid #d28a34;line-height:1;}
            .mainArea1 .contentBox > div:nth-child(2) p{margin:0px;}
            .mainArea1 .contentBox > div:nth-child(2) p:first-child{margin-bottom:10px;}
            .mainArea1 .contentBox > div:nth-child(3){color:#0d1623; font-size:18px; line-height:1.5; margin:24px 0; }
            .mainArea1 .contentBox > div:nth-child(4){margin:top:10px; width:70%; max-width:205px; }

            .mainArea2 .bottomBox{z-index:5;position:absolute; top:-9em;height:125px;background:#fff;width:96%;max-width:980px;left:50%;transform:translateX(-50%);
                box-shadow: 0 2px 16px 0 rgba(169, 182, 203, 0.25);border-radius: 2px 2px 0 0; border-bottom:3px solid #daa360;display:flex;justify-content: space-around;flex-wrap: wrap;}
            .mainArea2 .bottomBox .line {position:relative;overflow:visible;width:100%;}
            .mainArea2 .bottomBox .line::before {content:'';width:1px;height:84px;display:block; background:#d7e0ef;position:absolute;top:20px;left:33.5%; }
            .mainArea2 .bottomBox .line::after {content:'';width:1px;height:84px;display:block; background:#d7e0ef;position:absolute;top:20px;left:66.5%; }
            .mainArea2 .bottomBox .bottomBoxItem{width:20%;}
            .mainArea2 .bottomBox .bottomBoxItem p{font-size:20px;font-weight:800;color:#0d1623;margin:-5px 0 0 0 ;}
            .mainArea2 .bottomBox .bottomBoxItem p:nth-child(1) span{font-size:30px;color:#daa360;}
            .mainArea2 .bottomBox .bottomBoxItem p:nth-child(2){font-size:16px;font-weight:300;margin:0; line-height: 1.4;}

            .mainArea2 {padding-top:160px;}
            .mainArea .contentBox .areaTitle{font-size:32px;color:#0d1623;text-align:center;font-weight:800;}
            .mainArea .contentBox .areaTitle p{font-size:20px;color:#3f5372;text-align:center;font-weight:500;margin:0;line-height:1.8;}
            .mainArea .contentBox .areaTitle img{margin-top:-0.8em;}
            .mainArea .contentBox .countBox {display:flex;justify-content:space-between;align-items:center;}
            .mainArea .contentBox .countBoxRight {width:325px;flex-shrink: 1;flex-shrink: 0.27;box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);background-color:#FFF;}
            .mainArea .contentBox .countBoxRightContent { padding:30px;}
            .mainArea .contentBox .countBoxRightContent p {font-size:16px; color:#3f5372;padding:0;margin:0;line-height:2;}
            .mainArea .contentBox .countBoxRightContent p span:nth-child(2){color:#0d1623;}
            .mainArea .contentBox .countBoxRightContent p.tob{line-height:1.5;margin-bottom:10px;}
            .mainArea .contentBox .countBoxRightContent p.tob span{font-size:28px;font-weight:800;color:#0d1623;}
            .mainArea .contentBox .countBoxLeft {width:100%;padding:44px 0 44px 44px;}
            .mainArea .contentBox .countBoxLeftContent {border:1px solid #d7e0ef; background-color:#F9FBFF;padding:44px;border-width:1px 0 1px 1px;}
            .mainArea .contentBox .dataRow{font-size:16px;font-weight:800;text-align:left;display:flex;}
            .mainArea .contentBox .DataTitle {color:#3f5372;width:4em;flex-shrink: 0;}
            .mainArea .contentBox .dataRow:not(:last-child) .DataTitle{height:4em;}
            .mainArea .contentBox .DataInfo{color:#0d1623;text-align:left;margin-left:2em;width:100%;}

            .sumBox{border: solid 1px #d7e0ef;border-width:1px 0;padding:10px 0;margin:20px 0 20px;}
            .sumBox p{display:flex;justify-content:space-between;}
            .iconBox{display:flex;display:flex;justify-content:space-between;margin-top:10px;position:relative;}
            .iconBox::before{content:'';width:80%;display:block;height:1px;background-color:#d7e0ef;position:absolute;top:40px;left:10%;z-index:0;}
            .iconBox > div{width:20%;text-align:center;position:relative;z-index:1;max-width:205px;}
            .iconBox .wordy{font-size:20px;font-weight:800;color:#0d1623;margin:20px 0;}
            .iconBox .wordy p{font-size:16px;margin:0;}
            .iconBox .btnBox{display:flex;justify-content:space-between;}
            .iconBg{box-sizing:border-box;width:80px;height:80px;border:5px solid #d7e0ef;border-radius:100px;text-align:center;margin: 0 auto;}
            .iconBg1{background:url(${icon1}) no-repeat center/50px ;background-color:#FFF;}
            .iconBg2{background:url(${icon2}) no-repeat center/50px ;background-color:#FFF;}
            .iconBg3{background:url(${icon3}) no-repeat center/50px ;background-color:#FFF;}
            .iconBg4{background:url(${icon4}) no-repeat center/50px ;background-color:#FFF;}

            .forPC{display:inherite;}
            .forMB{display:none;}
        @media screen and (max-width: 768px) {
            .mainArea {width:100vw;}
            .mainArea1 .contentBox{margin: 4%;position: relative;}
            .mainArea::before{content:'';display:block;width:100vw;}
            .mainArea:nth-child(1){background:url(${bannerPAD}) no-repeat center top/100%;padding:0 0 13em 0;height:auto;}
            .iconBox .btnBox{flex-wrap:wrap;justify-content: center;}
            .mainArea .contentBox .countBoxLeft{padding: 4em 0 4em;}
            .bg-cycle{position:absolute;}
            .bg-cycle.cyclel{ width: 12%; bottom: -74%; z-index: 0;}
            .bg-cycle.cycler{ width: 10%; top: auto; bottom: -17%;z-index:0;}
        }
        @media screen and (max-width: 500px) {
            .forPC{display:none;}
            .forMB{display:block!important;}      
            .infiImg{height:1.4em;margin-top:0%;}
            .mainArea .contentBox .areaTitle{font-size:20px; width: 94%; margin: 0 auto;}
            .mainArea .contentBox .areaTitle p{font-size:16px;}    
            .mainArea:nth-child(1){background:url(${bannerMB}) no-repeat center top/100%;padding:0;height:auto;}
            .mainArea1::before {content:'';display:block;width:100vw;padding-top:100%;}
            .mainArea1 .contentBox{position: absolute; top: 15px; left: 50%; transform: translateX(-50%);}
            .mainArea1 .contentBox >div:nth-child(4){width:50%;}
            .mainArea1 .contentBox>div:nth-child(1){font-size:16px;margin-bottom:0.5em;}
            .mainArea1 .contentBox>div:nth-child(2){font-size:30px; padding-left:0.5em;}
            .mainArea1 .contentBox>div:nth-child(2) p:first-child{margin-bottom:0.15em}
            .mainArea1 .contentBox>div:nth-child(3){ margin: 0.5em 0; font-size: 16px; line-height: 1.3;}
            #loanIndex__container .mainArea1 .contentBox .ant-btn{margin:0.1em 0;}
            .bg-cycle{display:none}
            .mainArea {padding: 6em 0;}
            .mainArea1 {margin:0;}
            .mainArea.mainArea1 .contentBox{width:86%;}
            .mainArea .contentBox{width:100%;}
            .mainArea .contentBox .pb-1{padding-bottom:1em;}
            .mainArea2 .areaTitle{margin-top:3em!important;}
            .mainArea2 .bottomBox{top:-7px;width: 100%; height: auto; padding: 2.5em 0 2em;line-height:1.2;}
            .mainArea2 .bottomBox .bottomBoxItem p{font-size:16px; text-align:center;}
            .mainArea2 .bottomBox .bottomBoxItem p:nth-child(1) span{font-size:20px;}
            .mainArea2 .bottomBox .bottomBoxItem p:nth-child(2){display:none;}
            .mainArea .contentBox .countBox{flex-wrap:wrap;}
            .mainArea .contentBox .countBoxLeft{padding:0;width: 94%;margin: 0 auto;}
            .mainArea .contentBox .countBoxLeftContent{border-width: 1px 1px 0 1px;padding: 5%;}
            .mainArea .contentBox .countBoxRightContent{padding: 5% 6%;margin: 0 auto;}
            .mainArea .contentBox .iconBox{flex-wrap:wrap;padding: 0 4%;}
            .iconBox>div{width:100%;max-width:100%;display: flex;flex-wrap: nowrap;margin-bottom:6em;}
            .iconBox .btnBox{justify-content: flex-start;}
            .iconBox>div .wordy{margin:0;text-align: left; margin-left: 6%;width: calc(88% - 40px);}
            .iconBox::before{left: calc(4% + 30px);height:calc(100% - 40px);width:1px;}
            .iconBg1, .iconBg2, .iconBg3, .iconBg4{background-size:80%;width:60px;height:60px;margin:0;}
            
            .mainArea2 .bottomBox .line::before,
            .mainArea2 .bottomBox .line::after { height:6em; top:1em; }
            .mainArea .contentBox .countBoxRight{width:100%;}           
        }
        `}
            </style>
            <style jsx global>
                {`
                    #loanIndex__container .ant-slider-handle {
                        width: 20px;
                        height: 20px;
                        border-color: #daa360;
                    }
                    #loanIndex__container .ant-slider-rail {
                        height: 12px;
                        border-radius: 12px;
                        background: #ffffff;
                        border: 1px solid #d7e0ef;
                    }
                    #loanIndex__container .ant-slider-track {
                        height: 12px;
                        border-radius: 12px;
                        background: #daa360;
                    }
                    #loanIndex__container .ant-btn-primary {
                        background-color: #c43826;
                        border-color: #c43826;
                    }
                    #loanIndex__container .ant-radio-inner:after {
                        background-color: #daa360;
                        width: 16px;
                        height: 16px;
                    }
                    #loanIndex__container .ant-radio-inner {
                        width: 24px;
                        height: 24px;
                    }
                    #loanIndex__container .ant-radio-checked .ant-radio-inner {
                        border-color: #daa360;
                    }
                    #loanIndex__container .ant-radio-group {
                        width: 96%;
                        display: flex;
                        justify-content: space-between;
                    }
                    #loanIndex__container .iconBox .ant-btn {
                        width: 47%;
                        font-size: 16px;
                        height: 3em;
                    }
                    #loanIndex__container .iconBox .singleBtn .ant-btn {
                        width: 64%;
                    }
                    #loanIndex__container .mainArea1 .contentBox .ant-btn {
                        width: 100%;
                        height: 48px;
                        font-size: 18px;
                        margin: 10px 0;
                    }
                    #loanIndex__container .mainArea .contentBox .ant-radio-wrapper {
                        font-size: 16px;
                        font-weight: 800;
                        color: #0d1623;
                        text-align: left;
                    }
                    #loanIndex__container .countBoxRightContent .ant-btn-primary {
                        width: 100%;
                        font-size: 16px;
                        height: 3em;
                    }
                    .record__container .repayment_table .ant-table-thead th:first-child::after {
                        content: '明細';
                    }
                    #loanIndex__container #QaCollapse__content .ant-collapse-item table {
                        max-width: 400px;
                        width: 100%;
                        margin: 10px 0;
                    }
                    #loanIndex__container #QaCollapse__content .ant-collapse-item table td {
                        width: 33%;
                        background-color: #fff;
                        color: #6f7e96;
                        border: 1px solid #d7e0ef;
                        padding: 5px 10px;
                    }
                    #loanIndex__container #QaCollapse__content .ant-collapse-item table tr:first-child td {
                        width: 33%;
                        background: #f2f5fa;
                        color: #0d1623;
                    }
                    @media screen and (max-width: 768px) {
                        #loanIndex__container .iconBox .ant-btn {
                            width: 6em;
                            margin: 0.2em;
                        }
                    }
                    @media screen and (max-width: 500px) {
                        #loanIndex__container #QaCollapse__content .ant-collapse-item table td {
                            font-size: 10px;
                            padding: 3px 5px;
                        }
                        #loanIndex__container .ant-radio-group {
                            flex-wrap: wrap;
                            justify-content: flex-start;
                        }
                        #loanIndex__container .mainArea .contentBox .ant-radio-wrapper {
                            width: 45%;
                            line-height: 1;
                            margin-bottom: 0.5em;
                        }
                    }
                `}
            </style>
        </div>
    );
};
export default LoanIndex;
