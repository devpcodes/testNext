import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Tabs, Carousel } from 'antd';
import { useUser } from '../../../../hooks/useUser';
import CountUp from 'react-countup';
import bannerPC from '../../../../resources/images/pages/subscriptionArea/bg-banner-pc.png';
import bannerMB from '../../../../resources/images/pages/subscriptionArea/bg-banner-mb.png';
import bannerPAD from '../../../../resources/images/pages/subscriptionArea/bg-banner-pad.png';
import hands from '../../../../resources/images/pages/subscriptionArea/group-22.png';
import dotLine from '../../../../resources/images/pages/subscriptionArea/dot-line.svg';
import icon1 from '../../../../resources/images/pages/subscriptionArea/index-icon-1.svg';
import icon61 from '../../../../resources/images/pages/subscriptionArea/icon6-1.svg';
// import cyclel from '../../../../resources/images/components/loanZone/cycle-l.svg';
// import cycler from '../../../../resources/images/components/loanZone/cycle-r.svg';
import QaCollapse from '../../loan/Index/elements/QaCollapse';

const ProductInfo = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [sliderValue, setSliderValue] = useState(25); //撥券費
    const [radioValue, setRadioValue] = useState(7);
    const [qaData, setQaData] = useState([]);
    const [testVal, setTestVal] = useState('');
    const [state, setState] = useState({ current: 'all' });
    const { TabPane } = Tabs;
    const [titleValue, setTitleValue] = useState(45); //申購檔次
    const dispatch = useDispatch();
    const { isLogin } = useUser();
    const menuList = [
        { title: '申辦啟用', key: 'p1' },
        { title: '借款申購試算', key: 'p2' },
        { title: '動用扣款', key: 'p3' },
        { title: '中籤還款', key: 'p4' },
        { title: '其他', key: 'p5' },
    ];

    const handleClick = key => {
        setState({ current: key });
        console.log(key);
        if (key == 'all') {
            onClick('');
        } else {
            menuList.map(x => {
                if (x.key === key) {
                    onClick(x.title);
                }
            });
        }
    };
    useEffect(() => {
        let data = [
            {
                title: '【申辦】不限用途款項借貸戶申辦資格是什麼？',
                content: '只要是已開立台股帳戶的成年且未具他國納稅義務人身分者都可以申請。',
                open: true,
                key: 1,
            },
            {
                title: '【申辦】申辦的方式和流程是甚麼？',
                content: [
                    '您可線上申辦或臨櫃辦理。',
                    '線上申辦只要上傳雙證件、選擇分公司並簽署契約就完成，申請送出後約1-3個工作天會收到審核結果通知。',
                ],
                open: false,
                key: 2,
            },
            { title: '【申辦】一個人可在永豐金開立幾戶不限用途款項借貸戶？', content: '一戶。', open: false, key: 3 },
            { title: '【申辦】開戶後，多久可以申請借貸？', content: '馬上。', open: false, key: 4 },
            {
                title: '【申辦】不限用途借貸戶申辦須要開辦費嗎？',
                content: '不限用途借貸服務免開辦費。',
                open: false,
                key: 5,
            },
            {
                title: '【申辦】我是聯電的員工，我可以申辦不限用途款項借貸？',
                content: '擔保品公司內部人不提供線上服務，請臨櫃申辦再完成股票設質借貸。',
                open: false,
                key: 6,
            },

            {
                title: '【借貸動用】有哪些股票可以申請借款呢？成數利率又是多少？',
                content: '點我查看符合本公司規定之上市櫃股票。',
                open: false,
                key: 7,
            },
            {
                title: '【借貸動用】申請借貸後，何時會撥款？',
                content: '依您借款申請時間，將款項匯入至您分公司交割帳戶中。',
                open: false,
                key: 8,
            },
            {
                title: '【借貸動用】每筆最少借款金額是多少？',
                content: '一萬元，並以千元為級距，最高不得超過100萬元',
                open: false,
                key: 9,
            },
            {
                title: '【借貸動用】借款的利息如何計算？',
                content: '擔保品匯入後，未動用不起息，動用後以日計息並計算至還款前一日。',
                open: false,
                key: 10,
            },
            {
                title: '【借貸動用】借款除了利息外還須支付那些費用？',
                content: [
                    '線上借款手續費：每筆100元；臨櫃借款手續費每筆2000元。',
                    '撥券費：每張1元。',
                    '上述費用於還款或借款到期時收取。',
                    '借貸服務免開辦費。',
                ],
                open: false,
                key: 11,
            },

            {
                title: '【還款與其他】我要如何還款呢？',
                content: [
                    '現金還款:需於營業日14:30前臨櫃提出申請。',
                    '賣出還款:客戶自行賣出庫存，Ｔ日計算客戶應付之相關還款金額後,於T+2日收取還款金額並退還剩餘交割款。',
                ],
                open: false,
                key: 12,
            },
            {
                title: '【還款與其他】擔保品如何申請返還？',
                content: '你可於現金還款後，申請擔保品返還。',
                open: false,
                key: 13,
            },
            {
                title: '【還款與其他】我收到整戶維持不足的通知該怎麼辦？',
                content: '您可選擇償還部分借款或致電分公司增加/變更擔保品。',
                open: false,
                key: 14,
            },
        ];
        setQaData(data);
    }, []);
    useEffect(() => {
        if (!isLogin) {
            dispatch(showLoginHandler(true));
        }
    }, [isLogin]);
    // useEffect(async () => {
    //     let res = await getClose();
    //     console.log(res);
    //     setClose(res);
    // }, []);

    useEffect(() => {}, []);

    useEffect(() => {
        let data = [
            {
                title: '【申辦】不限用途款項借貸戶申辦資格是什麼？',
                content: '只要是已開立台股帳戶的成年且未具他國納稅義務人身分者都可以申請。',
                open: true,
                key: 1,
            },
            {
                title: '【申辦】申辦的方式和流程是甚麼？',
                content: [
                    '您可線上申辦或臨櫃辦理。',
                    '線上申辦只要上傳雙證件、選擇分公司並簽署契約就完成，申請送出後約1-3個工作天會收到審核結果通知。',
                ],
                open: false,
                key: 2,
            },
            { title: '【申辦】一個人可在永豐金開立幾戶不限用途款項借貸戶？', content: '一戶。', open: false, key: 3 },
            { title: '【申辦】開戶後，多久可以申請借貸？', content: '馬上。', open: false, key: 4 },
            {
                title: '【申辦】不限用途借貸戶申辦須要開辦費嗎？',
                content: '不限用途借貸服務免開辦費。',
                open: false,
                key: 5,
            },
            {
                title: '【申辦】我是聯電的員工，我可以申辦不限用途款項借貸？',
                content: '擔保品公司內部人不提供線上服務，請臨櫃申辦再完成股票設質借貸。',
                open: false,
                key: 6,
            },

            {
                title: '【借貸動用】有哪些股票可以申請借款呢？成數利率又是多少？',
                content: '點我查看符合本公司規定之上市櫃股票。',
                open: false,
                key: 7,
            },
            {
                title: '【借貸動用】申請借貸後，何時會撥款？',
                content: '依您借款申請時間，將款項匯入至您分公司交割帳戶中。',
                open: false,
                key: 8,
            },
            {
                title: '【借貸動用】每筆最少借款金額是多少？',
                content: '一萬元，並以千元為級距，最高不得超過100萬元',
                open: false,
                key: 9,
            },
            {
                title: '【借貸動用】借款的利息如何計算？',
                content: '擔保品匯入後，未動用不起息，動用後以日計息並計算至還款前一日。',
                open: false,
                key: 10,
            },
            {
                title: '【借貸動用】借款除了利息外還須支付那些費用？',
                content: [
                    '線上借款手續費：每筆100元；臨櫃借款手續費每筆2000元。',
                    '撥券費：每張1元。',
                    '上述費用於還款或借款到期時收取。',
                    '借貸服務免開辦費。',
                ],
                open: false,
                key: 11,
            },

            {
                title: '【還款與其他】我要如何還款呢？',
                content: [
                    '現金還款:需於營業日14:30前臨櫃提出申請。',
                    '賣出還款:客戶自行賣出庫存，Ｔ日計算客戶應付之相關還款金額後,於T+2日收取還款金額並退還剩餘交割款。',
                ],
                open: false,
                key: 12,
            },
            {
                title: '【還款與其他】擔保品如何申請返還？',
                content: '你可於現金還款後，申請擔保品返還。',
                open: false,
                key: 13,
            },
            {
                title: '【還款與其他】我收到整戶維持不足的通知該怎麼辦？',
                content: '您可選擇償還部分借款或致電分公司增加/變更擔保品。',
                open: false,
                key: 14,
            },
        ];
        setQaData(data);
    }, []);

    return (
        <div id="applyIndex__container">
            <div className="mainArea mainArea1">
                {/* <img src={cyclel} className="bg-cycle cyclel"></img> */}
                <div className="contentBox">
                    <div>券商首創申購便利通</div>
                    <div>
                        <p>先抽後付</p>
                        <p>用小資金放大機會</p>
                    </div>
                    <div>回顧 2022 上半年申購實績</div>
                    <div>
                        <div>
                            <p>
                                <span>
                                    <CountUp end={titleValue} duration={2} />
                                </span>
                                檔
                            </p>
                            <p>申購檔次</p>
                        </div>
                        <div>
                            <p className="icon-arrow-up">
                                <span>42,630</span>元
                            </p>
                            <p>期間最高價差</p>
                        </div>
                        <div>
                            <p>
                                <span>18.09</span>%
                            </p>
                            <p>首日平均漲幅</p>
                        </div>
                    </div>
                    <div>
                        <Button type="primary">立即申購</Button>
                        <br></br>
                        <a href="#">尚未開通服務，我要申辦</a>
                    </div>
                </div>
            </div>
            <div className="mainArea mainArea2">
                <div className="contentBox">
                    <div className="areaTitle">
                        什麼是申購便利通
                        <img src={dotLine}></img>
                        <p>
                            申購便利通是透過向銀行動用額度，讓投資人不再受限資金門檻，即可享先抽籤後付款的服務，快來抓緊每個申購抽籤的機會吧！
                        </p>
                    </div>
                    <div>
                        <div>
                            <img src={icon61}></img>
                        </div>
                        <div>
                            <p>免出資，更高效</p>
                            <p>20 萬內免出資，彈性資金運用更高效</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainArea mainArea3">
                {/* <img src={cycler} className="bg-cycle cycler"></img> */}
                <div className="contentBox">
                    <div className="areaTitle">
                        實績排行搶先看
                        <p></p>
                        <img src={dotLine}></img>
                    </div>
                </div>
            </div>
            <div className="mainArea mainArea4">
                <div className="contentBox">
                    <div className="areaTitle">
                        如何啟動第一筆服務
                        <p></p>
                        <img src={dotLine}></img>
                    </div>
                </div>
            </div>
            <div className="mainArea mainArea4">
                <div className="contentBox">
                    <div className="areaTitle">
                        申辦資格
                        <p></p>
                        <img src={dotLine}></img>
                        <img src={hands}></img>
                    </div>
                    <div>
                        <div>
                            <img src={dotLine}></img>
                        </div>
                        <div>
                            <p>年滿 20 歲之本國自然人</p>
                            <p>僅具中華民國納稅義務人身分</p>
                            <p>已開立台股證券帳戶且無違約未結案情形</p>
                            <p>交割戶須有永豐銀行帳戶且符合永豐銀行私房錢預審資格</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainArea mainArea5">
                <div className="contentBox">
                    <div className="areaTitle">
                        常見問題
                        <p></p>
                        <img src={dotLine}></img>
                    </div>
                    <div>
                        <Tabs
                            defaultActiveKey="all"
                            onChange={handleClick}
                            //tabBarGutter={mobleType ? 30:44}
                        >
                            {menuList.map(x => {
                                return <TabPane tab={x.title} key={x.key}></TabPane>;
                            })}
                        </Tabs>
                    </div>
                    <QaCollapse dataSource={qaData} />
                </div>
            </div>
            <style jsx>
                {`
             #applyIndex__container {width: 100vw; overflow: hidden;}
            .bg-cycle{position:absolute;}
            .bg-cycle.cyclel{left:0;bottom:-350px;}
            .bg-cycle.cycler{right:0;top:-100px;}
            .mainArea{min-height:40px; width:100%;padding:80px 0;position:relative;}
            .mainArea:nth-child(odd){background-color:#f9fbff;}
            .mainArea:nth-child(1){background:url(${bannerPC}) no-repeat center top/1600px;height:644px;background-color:#f9fbff;overflow:visible;}
            .mainArea .contentBox {min-height:40px; width:96%; max-width:980px;margin:0 auto;}
            .mainArea1 {position:relative;}
            .mainArea1 .icon-arrow-up::before {content:"";display:inline-block;width: 0;
                height: 0;
                border-style: solid;
                border-width: 0 10px 17.3px 10px;
                border-color: transparent transparent #c43826 transparent;}

            .mainArea1 .contentBox > div:nth-child(1){color:#d28a34; font-size:20px; font-weight:800;margin-bottom:20px;}
            .mainArea1 .contentBox > div:nth-child(2){color:#0d1623; font-size:48px; font-weight:800;padding-left:28px; border-left:8px solid #d28a34;line-height:1;}
            .mainArea1 .contentBox > div:nth-child(2) p{margin:0px;}
            .mainArea1 .contentBox > div:nth-child(2) p:first-child{margin-bottom:10px;}
            .mainArea1 .contentBox > div:nth-child(3){color:#0d1623; font-size:18px; line-height:1.5; margin:24px 0; }
            .mainArea1 .contentBox > div:nth-child(4){margin:top:10px; width:70%; max-width:205px; }

            .mainArea2 {padding-top:160px;}
            .mainArea .contentBox .areaTitle{font-size:32px;color:#0d1623;text-align:center;font-weight:800;}
            .mainArea .contentBox .areaTitle p{font-size:16px;color:#3f5372;text-align:center;font-weight:500;margin:0;line-height:1.8;}
            .mainArea .contentBox .areaTitle img{display: block;margin: 0.3em auto 1em;}
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

            .iconBg{box-sizing:border-box;width:80px;height:80px;border:5px solid #d7e0ef;border-radius:100px;text-align:center;margin: 0 auto;}
            .iconBg1{background:url(${icon1}) no-repeat center/50px ;background-color:#FFF;}
            .iconBg2{background:url(${icon1}) no-repeat center/50px ;background-color:#FFF;}
            .iconBg3{background:url(${icon1}) no-repeat center/50px ;background-color:#FFF;}
            .iconBg4{background:url(${icon1}) no-repeat center/50px ;background-color:#FFF;}



            .forPC{display:inherite;}
            .forMB{display:none;}
        @media screen and (max-width: 768px) {
            .mainArea {width:100vw;}
            .mainArea1 .contentBox{margin: 4%;position: relative;}
            .mainArea::before{content:'';display:block;width:100vw;}
            .mainArea:nth-child(1){background:url(${bannerPAD}) no-repeat center top/100%;padding:0 0 13em 0;height:auto;}

            .mainArea .contentBox .countBoxLeft{padding: 4em 0 4em;}
            .bg-cycle{position:absolute;}
            .bg-cycle.cyclel{ width: 12%; bottom: -74%; z-index: 0;}
            .bg-cycle.cycler{ width: 10%; top: auto; bottom: -17%;z-index:0;}
        }
        @media screen and (max-width: 425px) {
            .forPC{display:none;}
            .forMB{display:block!important;}      
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
            #applyIndex__container .mainArea1 .contentBox .ant-btn{margin:0.1em 0;}
            .bg-cycle{display:none}
            .mainArea {padding: 6em 0;}
            .mainArea1 {margin:0;}
            .mainArea.mainArea1 .contentBox{width:86%;}
            .mainArea .contentBox{width:100%;}
            .mainArea2 .areaTitle{margin-top:3em!important;}
            .mainArea .contentBox .countBox{flex-wrap:wrap;}
            .mainArea .contentBox .countBoxLeft{padding:0;width: 94%;margin: 0 auto;}
            .mainArea .contentBox .countBoxLeftContent{border-width: 1px 1px 0 1px;padding: 5%;}
            .mainArea .contentBox .countBoxRightContent{padding: 5% 6%;margin: 0 auto;}
            .mainArea .contentBox .iconBox{flex-wrap:wrap;padding: 0 4%;}

            .iconBg1,  .iconBg2, .iconBg3, .iconBg4{background-size:80%;width:60px;height:60px;margin:0;}
            .mainArea .contentBox .countBoxRight{width:100%;}
           
        }

            }`}
            </style>
            <style jsx global>
                {`
                    #applyIndex__container .ant-tabs-tab {
                        font-size: 16px;
                    }
                    #applyIndex__container .ant-tabs-tab:hover > div {
                        color: rgb(218, 163, 96);
                    }
                    #applyIndex__container .ant-tabs-nav:before {
                        display: none;
                    }
                    #applyIndex__container .ant-tabs-ink-bar {
                        background: rgb(218, 163, 96);
                        height: 4px;
                    }
                    #applyIndex__container .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                        color: rgb(218, 163, 96);
                    }
                    #applyIndex__container .ant-tabs-bottom > .ant-tabs-nav,
                    #applyIndex__container .ant-tabs-bottom > div > .ant-tabs-nav,
                    #applyIndex__container .ant-tabs-top > .ant-tabs-nav,
                    #applyIndex__container .ant-tabs-top > div > .ant-tabs-nav {
                        margin: 0;
                    }

                    #applyIndex__container .ant-slider-handle {
                        width: 20px;
                        height: 20px;
                        border-color: #daa360;
                    }
                    #applyIndex__container .ant-slider-rail {
                        height: 12px;
                        border-radius: 12px;
                        background: #ffffff;
                        border: 1px solid #d7e0ef;
                    }
                    #applyIndex__container .ant-slider-track {
                        height: 12px;
                        border-radius: 12px;
                        background: #daa360;
                    }
                    #applyIndex__container .ant-btn-primary {
                        background-color: #c43826;
                        border-color: #c43826;
                    }
                    #applyIndex__container .ant-radio-inner:after {
                        background-color: #daa360;
                        width: 16px;
                        height: 16px;
                    }
                    #applyIndex__container .ant-radio-checked .ant-radio-inner {
                        border-color: #daa360;
                        width: 24px;
                        height: 24px;
                    }
                    #applyIndex__container .ant-radio-group {
                        width: 96%;
                        display: flex;
                        justify-content: space-between;
                    }
                    #applyIndex__container .iconBox .ant-btn {
                        width: 47%;
                        font-size: 16px;
                        height: 3em;
                    }
                    #applyIndex__container .iconBox .singleBtn .ant-btn {
                        width: 64%;
                    }
                    #applyIndex__container .mainArea1 .contentBox .ant-btn {
                        //width: 100%;
                        height: 48px;
                        font-size: 18px;
                        margin: 10px 0;
                    }
                    #applyIndex__container .mainArea .contentBox .ant-radio-wrapper {
                        font-size: 16px;
                        font-weight: 800;
                        color: #0d1623;
                        text-align: left;
                    }
                    #applyIndex__container .countBoxRightContent .ant-btn-primary {
                        width: 100%;
                        font-size: 16px;
                        height: 3em;
                    }
                    @media screen and (max-width: 768px) {
                        #applyIndex__container .iconBox .ant-btn {
                            width: 6em;
                            margin: 0.2em 0;
                        }
                    }
                    @media screen and (max-width: 425px) {
                        #applyIndex__container .ant-radio-group {
                            flex-wrap: wrap;
                        }
                        #applyIndex__container .mainArea1 .contentBox .ant-btn {
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ProductInfo;
