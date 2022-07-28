import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tabs, Carousel, Steps } from 'antd';
import { RightOutlined, LeftOutlined, InfoCircleFilled } from '@ant-design/icons';
import { useUser } from '../../../../hooks/useUser';
import CountUp from 'react-countup';
import CardSlider from '../elements/cardSlider';
import bannerPC from '../../../../resources/images/pages/subscriptionArea/bg-banner-pc.png';
import bannerMB from '../../../../resources/images/pages/subscriptionArea/bg-banner-mb.png';
import bannerPAD from '../../../../resources/images/pages/subscriptionArea/bg-banner-pad.png';
import hands from '../../../../resources/images/pages/subscriptionArea/group-22.png';
import handsS from '../../../../resources/images/pages/subscriptionArea/group-22s.png';
import dotLine from '../../../../resources/images/pages/subscriptionArea/dot-line.svg';
import bgimgl from '../../../../resources/images/pages/subscriptionArea/bgimg-l.png';
import bgimgr from '../../../../resources/images/pages/subscriptionArea/bgimg-r.png';
import icon1 from '../../../../resources/images/pages/subscriptionArea/index-icon-1.svg';
import icon61 from '../../../../resources/images/pages/subscriptionArea/icon6-1.svg';
import icon62 from '../../../../resources/images/pages/subscriptionArea/icon6-2.svg';
import icon63 from '../../../../resources/images/pages/subscriptionArea/icon6-3.svg';
import icon64 from '../../../../resources/images/pages/subscriptionArea/icon6-4.svg';
import icon65 from '../../../../resources/images/pages/subscriptionArea/icon6-5.svg';
import icon66 from '../../../../resources/images/pages/subscriptionArea/icon6-6.svg';
import bg1 from '../../../../resources/images/pages/subscriptionArea/bg-1.svg';
import bg2 from '../../../../resources/images/pages/subscriptionArea/bg-2.svg';
import bg3 from '../../../../resources/images/pages/subscriptionArea/bg-3.svg';
import bg4 from '../../../../resources/images/pages/subscriptionArea/bg-4.svg';
import check from '../../../../resources/images/pages/subscriptionArea/check.svg';
import QaCollapse from '../../loan/Index/elements/QaCollapse';

const ProductInfo = () => {
    const [qaData, setQaData] = useState([]);
    const { TabPane } = Tabs;
    const [titleValue, setTitleValue] = useState(45); //申購檔次
    const [menuCurrent, setMenuCurrent] = useState('p1');
    const [windowWidth, setWindowWidth] = useState(1600);

    const menuList = [
        { title: '申辦啟用', key: 'p1' },
        { title: '借款申購試算', key: 'p2' },
        { title: '動用扣款', key: 'p3' },
        { title: '中籤還款', key: 'p4' },
        { title: '其他', key: 'p5' },
    ];
    // const contentStyle = {
    //     height: '160px',
    //     color: '#fff',
    //     lineHeight: '160px',
    //     textAlign: 'center',
    //     background: '#364d79',
    // };
    const slideCardData = [
        {
            stockId: '2756',
            stockName: '聯發國際',
            market: 'C',
            marketStatus: '初上櫃',
            brokerId: '8150',
            brokerName: '台新',
            price: 78.8, //申購價
            share: 262000, //總申購張數
            currentDate: '20220106',
            beginDate: '20220104',
            endDate: '20220106',
            feeDate: '20220107',
            lotDate: '20220110',
            moneyDate: '20220111',
            stkDate: '20220114',
            applyShare: '1000', //申購張數
            tfee: '20',
            mfee: '50',
            exShare: '1599000',
            exPrice: '66',
            close: '121.5', //市價
            diffPrice: '42700',
            diffRatio: '54',
            orderAmount: '66070',
            canOrder: 'false',
            status: '申購尚未開始',
            statusMessage: 'NO.1',
            lowest: 78,
            m1: 20,
            m2: 50,
            m3: 8,
            settingDate: '2022-01-06',
        },
        {
            stockId: '3707',
            stockName: '漢磊',
            market: 'C',
            marketStatus: '發行後轉上櫃',
            brokerId: '8150',
            brokerName: '台新',
            price: 52,
            share: 850000,
            currentDate: '20220530',
            beginDate: '20220530',
            endDate: '20220601',
            feeDate: '20220602',
            lotDate: '20220606',
            moneyDate: '20220607',
            stkDate: '20220614',
            applyShare: '1000',
            tfee: '20',
            mfee: '50',
            exShare: '1599000',
            exPrice: '66',
            close: '82.7',
            diffPrice: '36000',
            diffRatio: '38',
            orderAmount: '66070',
            canOrder: 'false',
            status: '申購尚未開始',
            statusMessage: 'NO.2',
            lowest: 79,
            m1: 20,
            m2: 50,
            m3: 9,
            settingDate: '2022-06-01',
        },
        {
            stockId: '6546',
            stockName: '正基',
            market: 'C',
            marketStatus: '發行後轉上櫃',
            brokerId: '8150',
            brokerName: '台新',
            price: 52,
            share: 850000,
            currentDate: '20220225',
            beginDate: '20220512',
            endDate: '20220516',
            feeDate: '20220517',
            lotDate: '20220518',
            moneyDate: '2022519',
            stkDate: '20220524',
            applyShare: '1000',
            tfee: '20',
            mfee: '50',
            exShare: '1599000',
            exPrice: '66',
            close: '82.7',
            diffPrice: '27000',
            diffRatio: '28',
            orderAmount: '66070',
            canOrder: 'false',
            status: '申購尚未開始',
            statusMessage: 'NO.3',
            lowest: 79,
            m1: 20,
            m2: 50,
            m3: 9,
            settingDate: '2022-05-16',
        },
        {
            stockId: '4768',
            stockName: '晶呈科技',
            market: 'C',
            marketStatus: '初上櫃',
            brokerId: '8150',
            brokerName: '台新',
            price: 78.8, //申購價
            share: 262000, //總申購張數
            currentDate: '20220106',
            beginDate: '20220330',
            endDate: '20220401',
            feeDate: '20220406',
            lotDate: '20220407',
            moneyDate: '20220408',
            stkDate: '20220413',
            applyShare: '1000', //申購張數
            tfee: '20',
            mfee: '50',
            exShare: '1599000',
            exPrice: '66',
            close: '121.5', //市價
            diffPrice: '17200',
            diffRatio: '20',
            orderAmount: '66070',
            canOrder: 'false',
            status: '申購尚未開始',
            statusMessage: 'NO.4',
            lowest: 78,
            m1: 20,
            m2: 50,
            m3: 8,
            settingDate: '2022-04-01',
        },
        {
            stockId: '6715',
            stockName: '嘉基',
            market: 'C',
            marketStatus: '發行後轉上櫃',
            brokerId: '8150',
            brokerName: '台新',
            price: 52,
            share: 850000,
            currentDate: '20220216',
            beginDate: '20220216',
            endDate: '20220218',
            feeDate: '20220221',
            lotDate: '20220222',
            moneyDate: '20220223',
            stkDate: '20220303',
            applyShare: '1000',
            tfee: '20',
            mfee: '50',
            exShare: '1599000',
            exPrice: '66',
            close: '82.7',
            diffPrice: '16500',
            diffRatio: '17',
            orderAmount: '66070',
            canOrder: 'false',
            status: '申購尚未開始',
            statusMessage: 'NO.5',
            lowest: 79,
            m1: 20,
            m2: 50,
            m3: 9,
            settingDate: '2022-02-18',
        },
        {
            stockId: '6799',
            stockName: '來頡',
            market: 'C',
            marketStatus: '發行後轉上櫃',
            brokerId: '8150',
            brokerName: '台新',
            price: 52,
            share: 850000,
            currentDate: '20220225',
            beginDate: '20220429',
            endDate: '20220504',
            feeDate: '20220505',
            lotDate: '20220506',
            moneyDate: '20220509',
            stkDate: '20220512',
            applyShare: '1000',
            tfee: '20',
            mfee: '50',
            exShare: '1599000',
            exPrice: '66',
            close: '82.7',
            diffPrice: '14000',
            diffRatio: '10',
            orderAmount: '66070',
            canOrder: 'false',
            status: '申購尚未開始',
            statusMessage: 'NO.6',
            lowest: 110,
            m1: 20,
            m2: 50,
            m3: 40,
            settingDate: '2022-05-04',
        },
    ];
    const qaDataLib = [
        {
            title: '【申辦】不限用途款項借貸戶申辦資格是什麼？',
            content: '只要是已開立台股帳戶的成年且未具他國納稅義務人身分者都可以申請。',
            open: true,
            group: 'p1',
            key: 1,
        },
        {
            title: '【申辦】申辦的方式和流程是甚麼？',
            content: [
                '您可線上申辦或臨櫃辦理。',
                '線上申辦只要上傳雙證件、選擇分公司並簽署契約就完成，申請送出後約1-3個工作天會收到審核結果通知。',
            ],
            open: false,
            group: 'p1',
            key: 2,
        },
        {
            title: '【申辦】一個人可在永豐金開立幾戶不限用途款項借貸戶？',
            content: '一戶。',
            group: 'p1',
            open: false,
            key: 3,
        },
        {
            title: '【申辦】開戶後，多久可以申請借貸？',
            content: '馬上。',
            open: false,
            group: 'p2',
            key: 4,
        },
        {
            title: '【申辦】不限用途借貸戶申辦須要開辦費嗎？',
            content: '不限用途借貸服務免開辦費。',
            open: false,
            group: 'p2',
            key: 5,
        },
        {
            title: '【試算】我是聯電的員工，我可以申辦不限用途款項借貸？',
            content: '擔保品公司內部人不提供線上服務，請臨櫃申辦再完成股票設質借貸。',
            open: false,
            group: 'p2',
            key: 6,
        },

        {
            title: '【借貸動用】有哪些股票可以申請借款呢？成數利率又是多少？',
            content: '點我查看符合本公司規定之上市櫃股票。',
            open: false,
            group: 'p3',
            key: 7,
        },
        {
            title: '【借貸動用】申請借貸後，何時會撥款？',
            content: '依您借款申請時間，將款項匯入至您分公司交割帳戶中。',
            open: false,
            group: 'p3',
            key: 8,
        },
        {
            title: '【借貸動用】每筆最少借款金額是多少？',
            content: '一萬元，並以千元為級距，最高不得超過100萬元',
            open: false,
            group: 'p3',
            key: 9,
        },
        {
            title: '【還款與其他】借款的利息如何計算？',
            content: '擔保品匯入後，未動用不起息，動用後以日計息並計算至還款前一日。',
            open: false,
            group: 'p4',
            key: 10,
        },
        {
            title: '【還款與其他】借款除了利息外還須支付那些費用？',
            content: [
                '線上借款手續費：每筆100元；臨櫃借款手續費每筆2000元。',
                '撥券費：每張1元。',
                '上述費用於還款或借款到期時收取。',
                '借貸服務免開辦費。',
            ],
            open: false,
            group: 'p4',
            key: 11,
        },

        {
            title: '【還款與其他】我要如何還款呢？',
            content: [
                '現金還款:需於營業日14:30前臨櫃提出申請。',
                '賣出還款:客戶自行賣出庫存，Ｔ日計算客戶應付之相關還款金額後,於T+2日收取還款金額並退還剩餘交割款。',
            ],
            open: false,
            group: 'p4',
            key: 12,
        },
        {
            title: '【還款與其他】擔保品如何申請返還？',
            content: '你可於現金還款後，申請擔保品返還。',
            open: false,
            group: 'p5',
            key: 13,
        },
        {
            title: '【還款與其他】我收到整戶維持不足的通知該怎麼辦？',
            content: '您可選擇償還部分借款或致電分公司增加/變更擔保品。',
            open: false,
            group: 'p5',
            key: 14,
        },
    ];

    const handleClick = key => {
        setMenuCurrent(key);
    };

    const handleScroll = key => {
        setMenuCurrent(key);
        scrollTo('qaArea');
    };

    useEffect(() => {
        console.log('window.innerWidth', window.innerWidth);
        setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        let group = menuCurrent;
        let data = qaDataLib.filter(x => x.group == group);
        setQaData(data);
    }, [menuCurrent]);

    const scrollTo = id => {
        let t = document.getElementById(id).offsetTop;
        window.scroll({
            top: t,
            behavior: 'smooth',
        });
    };

    return (
        <div id="applyIndex__container">
            <div className="mainArea mainArea1">
                <div className="bg"></div>
                <div className="contentBox">
                    <div>券商首創申購便利通</div>
                    <div>
                        <p>先抽後付</p>
                        <p>用小資金放大機會</p>
                    </div>
                    <div>回顧 2022 上半年申購實績</div>
                    <div className="flexBox">
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
                            <p>
                                <span>42,630</span>元
                            </p>
                            <p>期間最高價差</p>
                        </div>
                        <div>
                            <p className="icon-arrow-up">
                                <span>18.09</span>%
                            </p>
                            <p>首日平均漲幅</p>
                        </div>
                    </div>
                    <div>
                        <Button type="primary">立即申購</Button>
                        <br></br>
                        <a href="#">
                            尚未開通服務，我要申辦
                            <RightOutlined />
                        </a>
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
                    <div className="flexBox areaContent">
                        <div className="flexBox areaItem">
                            <div>
                                <img src={icon61}></img>
                            </div>
                            <div>
                                <p>免出資，更高效</p>
                                <p>20 萬內免出資，彈性資金運用更高效</p>
                            </div>
                        </div>
                        <div className="flexBox areaItem">
                            <div>
                                <img src={icon62}></img>
                            </div>
                            <div>
                                <p>零閒置，更彈性</p>
                                <p>隨借隨還零閒置，讓手頭資金運用更彈性</p>
                            </div>
                        </div>
                        <div className="flexBox areaItem">
                            <div>
                                <img src={icon63}></img>
                            </div>
                            <div>
                                <p>免切換，更順暢</p>
                                <p>交易帳務同平台免切換，告別資金撥轉與查詢困擾</p>
                            </div>
                        </div>
                        <div className="flexBox areaItem">
                            <div>
                                <img src={icon64}></img>
                            </div>
                            <div>
                                <p>線上申辦，更快速</p>
                                <p>線上申辦 3 分鐘，立即啟用免等待</p>
                            </div>
                        </div>
                        <div className="flexBox areaItem">
                            <div>
                                <img src={icon65}></img>
                            </div>
                            <div>
                                <p>提供試算，更清晰</p>
                                <p>借款申購提供一鍵試算預估報酬供評估</p>
                            </div>
                        </div>
                        <div className="flexBox areaItem">
                            <div>
                                <img src={icon66}></img>
                            </div>
                            <div>
                                <p>聰明還款，更安心</p>
                                <p>未中籤提供系統還款免人工轉帳，讓您更安心</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainArea mainArea3">
                <img src={bgimgl} className="bg-cycle cyclel"></img>
                <div className="contentBox">
                    <div className="areaTitle">
                        實績排行搶先看
                        <p></p>
                        <img src={dotLine}></img>
                    </div>
                    <div className="slickBox">
                        <CardSlider
                            rowData={slideCardData}
                            itemNum={windowWidth > 768 ? 3 : windowWidth > 425 ? 2 : 1}
                        />
                    </div>
                    <div className="info">
                        <InfoCircleFilled /> 市場公開資訊不代表未來績效表現，本素材不構成任何投資建議。
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
                    <div className="areaContent flexBox">
                        <div className="areaItem">
                            <p>申購前</p>
                            <p>申辦啟用</p>
                            <div>
                                持有台股帳戶，<span>線上 3 分鐘</span>立即啟用借款申購功能。
                            </div>
                            <a onClick={handleScroll.bind(null, 'p1')}>
                                了解更多
                                <RightOutlined />
                            </a>
                        </div>
                        <div className="areaItem">
                            <p>申購期間 </p>
                            <p>借款申購試算</p>
                            <div>
                                申購期間 <span>20 萬內抽籤股票</span>，可自由選擇申購方式。
                                <ul>
                                    <li>自備款現金申購</li>
                                    <li>免出資借款申購</li>
                                </ul>
                            </div>

                            <a onClick={handleScroll.bind(null, 'p2')}>
                                了解更多
                                <RightOutlined />
                            </a>
                        </div>
                        <div className="areaItem">
                            <p>截止~扣款日 </p>
                            <p>動用扣款</p>
                            <div>
                                <span>整筆借款酌收金流服務費 50 元</span>
                                ，於申購截止日動用後隔天扣款，可隨借隨還，依動用金額以日計息於每月 21 日收取。
                            </div>
                            <a onClick={handleScroll.bind(null, 'p3')}>
                                了解更多
                                <RightOutlined />
                            </a>
                        </div>
                        <div className="areaItem">
                            <p>抽籤日後</p>
                            <p>中籤還款</p>
                            <div>
                                <ul>
                                    <li>未中籤：退款後，若有銀行欠款系統將進行還款，無須轉帳。</li>
                                    <li>有中籤：若有銀行欠款須自行轉帳償還，未提供償還服務。</li>
                                </ul>
                            </div>
                            <a onClick={handleScroll.bind(null, 'p4')}>
                                了解更多
                                <RightOutlined />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainArea mainArea5">
                <img src={bgimgr} className="bg-cycle cycler"></img>
                <div className="contentBox">
                    <div className="areaTitle">
                        申辦資格
                        <p></p>
                        <img src={dotLine}></img>
                    </div>
                    <div className="areaContent flexBox">
                        <div>
                            <img src={hands}></img>
                            <img src={handsS}></img>
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
            <div className="mainArea mainArea6" id="qaArea">
                <div className="contentBox">
                    <div className="areaTitle">
                        常見問題
                        <p></p>
                        <img src={dotLine}></img>
                    </div>
                    <div className="tabBox">
                        <Tabs defaultActiveKey={'p1'} onChange={handleClick} activeKey={menuCurrent}>
                            {menuList.map(x => {
                                return <TabPane tab={x.title} key={x.key}></TabPane>;
                            })}
                        </Tabs>
                    </div>
                    <QaCollapse dataSource={qaData} />
                </div>
            </div>
            <div className="goTo">
                <a>立即申購</a>
                <a>我要申辦</a>
            </div>
            <style jsx>
                {`
                #applyIndex__container {width: 100vw; overflow: hidden;}
                .goTo{position:fixed; right:2%; bottom:5%; border-radius:50px; width:70px; box-shadow: 0 2px 15px 0 rgba(196, 56, 38, 0.5);
                    background-color: #c43826;}
                .goTo > a {display:block;width:45px;font-size:16px;color:#FFF;font-weight:800;margin:0 auto;text-align:center;padding:1em 0 0.5em;}
                .goTo > a:not(:first-child) {border-top:1px solid #f45a4c;padding:0.5em 0 0.5em; }
                .goTo > a:last-child {border-top:1px solid #f45a4c;padding:0.5em 0 1em; }

                .flexBox{display:flex;justify-content:space-between;}

                .mainArea{min-height:40px; width:100%;padding:80px 0;position:relative;}
                .mainArea:nth-child(odd){background-color:#f9fbff;}
                .mainArea .contentBox {min-height:40px; width:96%; max-width:1185px;margin:0 auto;}
                .mainArea .contentBox .areaTitle{font-size:32px;color:#0d1623;text-align:center;font-weight:800;}
                .mainArea .contentBox .areaTitle p{font-size:16px;color:#3f5372;text-align:center;font-weight:500;margin:0;line-height:1.8;}
                .mainArea .contentBox .areaTitle img{display: block;margin: 0.3em auto 1em;}

                .mainArea.mainArea1{background-color:#FFF;overflow:visible;background-color:#f9fbff; position:relative;}
                .mainArea1 .bg{position:absolute;width:100%;background:url(${bannerPC}) no-repeat center top/1600px; height:625px; z-index:0;top:0;}
                .mainArea1 .contentBox { max-width:1080px;font-size: 16px;z-index: 1; position: relative;}
                .mainArea1 .contentBox > div:nth-child(1){color:#d28a34; font-size:20px; font-weight:800;margin-bottom:20px;}
                .mainArea1 .contentBox > div:nth-child(2){color:#0d1623; font-size:48px; font-weight:800;padding-left:28px; border-left:8px solid #d28a34;line-height:1;}
                .mainArea1 .contentBox > div:nth-child(2) p{margin:0px;}
                .mainArea1 .contentBox > div:nth-child(2) p:first-child{margin-bottom:10px;}
                .mainArea1 .contentBox > div:nth-child(3){color:#0d1623; font-size:16px; line-height:1.5; margin:35px 0 15px; }
                .mainArea1 .contentBox > div:nth-child(4){margin:0 0 20px; width:70%; max-width:420px; }
                .mainArea1 .contentBox > div:nth-child(4) p:nth-child(1){font-weight: 700;margin-bottom: 0;color:#0d1623;}
                .mainArea1 .contentBox > div:nth-child(4) p:nth-child(1) span{font-size: 32px; font-weight: 900;margin-right:5px; line-height: 1.2;}
                .mainArea1 .contentBox > div:nth-child(5){width:205px; text-align:center;}
                .mainArea1 .contentBox > div:nth-child(5) a{font-size:14px; margin:0 auto;}

                .mainArea2 .areaContent {flex-wrap: wrap;justify-content:space-between;margin:55px auto 0;max-width:1080px;}
                .mainArea2 .contentBox {padding-top:20px;}
                .mainArea2 .areaContent .areaItem {width:30%;padding:0 20px 20px;margin-bottom: 35px;}
                .mainArea2 .areaContent .areaItem div:nth-child(1){width:50px;margin-right:20px;flex-shrink:0;}
                .mainArea2 .areaContent .areaItem div:nth-child(1) img{width:100%;}
                .mainArea2 .areaContent .areaItem div:nth-child(2){}
                .mainArea2 .areaContent .areaItem div:nth-child(2) p:nth-child(1){font-size: 22px; font-weight: 800;color:#0d1623;margin-bottom:0.2em;}
                .mainArea2 .areaContent .areaItem div:nth-child(2) p:nth-child(2){ font-size: 14px; color: #3f5372;margin-bottom:0;letter-spacing:0.05em; line-height:1.5;}

                .mainArea3 .contentBox{max-width:1080px;}
                .mainArea3 .contentBox .slickBox{margin-bottom:40px;}
                .mainArea3 .contentBox .info{margin: 0 auto; color:#3f5372;text-align:center;}

                .mainArea4 .areaContent {margin:65px auto 35px;}
                .mainArea4 .areaContent .areaItem{width:22%;background:url(${bg1}) right top no-repeat;}
                .mainArea4 .areaContent .areaItem:nth-child(2) {background-image:url(${bg2}) ;}
                .mainArea4 .areaContent .areaItem:nth-child(3) {background-image:url(${bg3});}
                .mainArea4 .areaContent .areaItem:nth-child(4) {background-image:url(${bg4});}
                .mainArea4 .areaContent .areaItem > p:nth-child(1) {font-size: 14px;color: #3f5372; margin-bottom: 0;}
                .mainArea4 .areaContent .areaItem > p:nth-child(2) {font-size: 22px; color: #0d1623; font-weight: 800;}
                .mainArea4 .areaContent .areaItem > div {font-size: 16px; color: #0d1623; width:90%; margin-bottom: 10px;font-weight: 700; }
                .mainArea4 .areaContent .areaItem > div span {color: #c43826;}
                .mainArea4 .areaContent .areaItem > div ul {margin:0; padding-inline-start: 1.3em;}
                .mainArea4 .areaContent .areaItem > div ul li {font-size: 16px; color: #0d1623;letter-spacing: -0.05em;}
                .mainArea4 .areaContent .areaItem > a {font-size: 14px;color: #3f5372;}

                .mainArea5 .contentBox {}
                .mainArea5 .contentBox .areaContent{margin:60px auto 40px;}
                .mainArea5 .contentBox .areaContent > div:nth-child(1) {width: 60%; max-width: 704px;}
                .mainArea5 .contentBox .areaContent > div:nth-child(1) img{width: 100%;}
                .mainArea5 .contentBox .areaContent > div:nth-child(1) img:last-child{display:none;}
                .mainArea5 .contentBox .areaContent > div:nth-child(2) {width: 40%;padding-left:55px;padding-top:32px;}
                .mainArea5 .contentBox .areaContent > div:nth-child(2) p {font-size: 22px;font-weight: 800;color: #0d1623;letter-spacing:-0.04em;display:flex; justify-content:flex-start;}
                .mainArea5 .contentBox .areaContent > div:nth-child(2) p::before {content:''; display:inline-block; width:24px; height:28px; background:url(${check}) center no-repeat;flex-shrink:0;
                margin-right: 10px;}

                .mainArea6 .contentBox {max-width:980px;}

                .tabBox{border-bottom:1px solid #ccc;margin-bottom:35px;}

                .bg-cycle{position:absolute;}
                .bg-cycle.cyclel{left:0;top:-80px;}
                .bg-cycle.cycler{right:0;bottom:-85px;}

                .forPC{display:inherite;}
                .forMB{display:none;}
            @media screen and (max-width: 768px) {
                .mainArea {width:100vw;}
                .mainArea .contentBox .countBoxLeft{padding: 4em 0 4em;}
                .mainArea::before{content:'';display:block;width:100vw;}
                .mainArea.mainArea1 {background-color:#FFF; padding:6% 0;}
                .mainArea1 .contentBox{margin: 0 6%;position: relative;}
                .mainArea1 .bg{background:url(${bannerPAD}) no-repeat center top/100%;padding-top:68%;height:auto;}
                .mainArea1 .contentBox>div:nth-child(2){font-size:40px;padding-left:0.4em;}
                .mainArea1 .contentBox>div:nth-child(4){width:55%;}
                .mainArea2 .areaContent {width:84%;}
                .mainArea2 .areaContent .areaItem{width:48%;}
                .mainArea3 .contentBox .slickBox{width: 94%; margin: 0 auto 40px;}
                .mainArea3 .contentBox .info{margin-top:2em;}
                .mainArea4 .areaContent {flex-wrap:wrap;justify-content: space-around;}
                .mainArea4 .areaContent .areaItem{width:42%;margin-bottom:40px;}
                .mainArea5 .contentBox .areaContent > div:nth-child(1) img:first-child{display:none;}
                .mainArea5 .contentBox .areaContent > div:nth-child(1) img:last-child{display:block;}
                .mainArea5 .contentBox {width:100%;}
                .mainArea5 .contentBox .areaContent>div:nth-child(1) {width:35%;}
                .mainArea5 .contentBox .areaContent>div:nth-child(2) {width: 65%;padding:4em 4em;}
                .mainArea5 .contentBox .areaContent>div:nth-child(2) p{font-size: 20px;}

                .goTo{ right:0%; bottom:3%; border-radius:16px 0 0 16px; width:50px; }
                .goTo > a {line-height:1.3;width:34px;}
                .bg-cycle{ display:none;}
            }
            @media screen and (max-width: 425px) {
                .flexBox{flex-wrap:wrap;}
                .forPC{display:none;}
                .forMB{display:block!important;}      
                .mainArea {padding:0;}
                .mainArea .contentBox .areaTitle{font-size:20px; width: 94%; margin: 0 auto;}
                .mainArea .contentBox .areaTitle p{font-size:16px;}  
                .mainArea .contentBox {width:100%;padding-top:30px;}

                .mainArea1 {margin:0;}
                .mainArea.mainArea1 { background-color: #f9fbff; padding: 6% 0 5%; }
                .mainArea.mainArea1 .contentBox{width:86%;}
                .mainArea1 .bg{background:url(${bannerMB}) no-repeat center top/100%;padding-top:90%;height:auto;}
                .mainArea1 .contentBox >div:nth-child(4){width:50%;}
                .mainArea1 .contentBox>div:nth-child(1){font-size:16px;margin-bottom:0.5em;}
                .mainArea1 .contentBox>div:nth-child(2){font-size:30px; padding-left:0.5em;margin: 1em 0;}
                .mainArea1 .contentBox>div:nth-child(2) p:first-child{margin-bottom:0.15em}
                .mainArea1 .contentBox>div:nth-child(3){ margin: 0.5em 0; font-size: 16px; line-height: 1.3;}
                .mainArea1 .contentBox>div:nth-child(4) { width: 100%;margin-bottom:0;  }
                .mainArea1 .contentBox>div:nth-child(5) {  width: 100%;margin-bottom:10px; }
                .mainArea1 .contentBox>div:nth-child(4) p:nth-child(1) span{font-size:24px;}
                #applyIndex__container .mainArea1 .contentBox .ant-btn{margin:0.1em 0;}

                .bg-cycle{display:none}

                .mainArea2 .contentBox{width:92%;;}
                .mainArea2 .areaContent .areaItem{padding:0;text-align:center;align-content: flex-start;}
                .mainArea2 .areaContent .areaItem div:nth-child(1){margin:0 auto 10px;}
                .mainArea2 .areaContent .areaItem div:nth-child(2) p:nth-child(1){font-size:16px;}
                .mainArea3 .contentBox .slickBox{margin: 0 auto 20px;}
                .mainArea3 .contentBox .info{padding-bottom:40px;font-size:16px;width:94%;text-align: justify;}
                .mainArea3 .contentBox .slickBox{width: 85%;}
                .mainArea4 .contentBox { width:96%}
                .mainArea4 .areaContent .areaItem{ width: 100%; background-position: 4% top; background-size: 13%; padding-left: 19%; }
                .mainArea4 .areaContent .areaItem>p:nth-child(1){font-size:16px;}
                .mainArea4 .areaContent .areaItem>p:nth-child(2){font-size:16px;margin-bottom:0.5em;}
                .mainArea4 .areaContent .areaItem>div{font-weight:500;}                
                .mainArea5 .contentBox .areaContent{flex-wrap: wrap;margin: 40px auto 40px;}
                .mainArea5 .contentBox .areaContent > *{width:100%!important;}
                .mainArea5 .contentBox .areaContent>div:nth-child(1) img:first-child{display:block;}
                .mainArea5 .contentBox .areaContent>div:nth-child(1) img:last-child{display:none;}
                .mainArea5 .contentBox .areaContent>div:nth-child(2) p{font-size:16px;}
                .mainArea5 .contentBox .areaContent>div:nth-child(2) p::before{width: 18px;background-size: contain; height: 25px;}

                .tabBox { padding-left: 5%; }
                .goTo{ right:0%; bottom:3%; border-radius:16px 0 0 16px; width:42px; }
                .goTo > a {line-height:1.1;width:24px;}
            }

            }`}
            </style>
            <style jsx global>
                {`
                    #applyIndex__container .mainArea3 .contentBox .info span {
                        color: #a7b1c4;
                    }
                    #applyIndex__container .slickBox .slick-next::before {
                        content: '';
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        border: 1px solid #a9b6cb;
                        border-width: 3px 3px 0 0;
                        transform: rotate(45deg);
                    }
                    #applyIndex__container .slickBox .slick-prev::before {
                        content: '';
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        border: 1px solid #a9b6cb;
                        border-width: 3px 0 0 3px;
                        transform: rotate(-45deg);
                    }

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

                    #applyIndex__container .ant-btn-primary {
                        background-color: #c43826;
                        border-color: #c43826;
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
                        width: 100%;
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
                        #applyIndex__container .slickBox .slick-next::before {
                            content: '';
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            border: 1px solid #a9b6cb;
                            border-width: 3px 3px 0 0;
                            transform: rotate(45deg);
                        }
                        #applyIndex__container .slickBox .slick-prev::before {
                            content: '';
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            border: 1px solid #a9b6cb;
                            border-width: 3px 0 0 3px;
                            transform: rotate(-45deg);
                        }
                        #applyIndex__container .slickBox .ant-carousel .slick-next {
                            right: -20px;
                        }
                        #applyIndex__container .slickBox .ant-carousel .slick-prev {
                            left: -20px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ProductInfo;
