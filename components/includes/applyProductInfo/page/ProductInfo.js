import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tabs, Popover } from 'antd';
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
    const [menuCurrent, setMenuCurrent] = useState('p1');
    const [windowWidth, setWindowWidth] = useState(1600);
    const isMobile = useSelector(store => store.layout.isMobile);
    const menuList = [
        { title: '申辦啟用', key: 'p1' },
        { title: '借款申購試算', key: 'p2' },
        { title: '動用扣款', key: 'p3' },
        { title: '中籤還款', key: 'p4' },
        { title: '其他', key: 'p5' },
    ];

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
            type: '申辦啟用',
            title: '申辦資格為何?',
            content: [
                '已開立台股證券帳戶之客戶，符合下列條件：',
                '一、年滿20歲之本國自然人並僅具中華民國納稅義務人身分。',
                '二、有價證券買賣受託帳戶須無未結案違約情形。',
                '三、交割銀行帳戶限使用永豐銀行，且符合其【私房錢】貸款服務資格。',
                '線上完成簽署永豐金證券【申購便利通】與永豐銀行【私房錢】貸款服務契約，始得啟用本服務。',
            ],
            tag: 'tag1',
            open: false,
            group: 'p1',
            key: '1_1',
        },
        {
            type: '',
            title: '申辦需要臨櫃嗎?會不會很麻煩？時間會很長嗎?',
            content: [
                '不需臨櫃辦理，',
                '本服務為邀請制已進行系統預審免備文件且採線上申辧，流程簡便只要短短3分鐘４步驟，便可完成相關驗證立即啟用：同意條款-->選分公司-->契約簽署-->銀行設定。',
            ],
            open: false,
            group: 'p1',
            key: '1_2',
        },
        {
            type: '',
            title: '可申辦多個帳戶嗎?',
            content: [
                '不可以，本服務1人申辦1戶。只要是已開立台股帳戶的成年且未具他國納稅義務人身分者都可以申請。',
                '若您已開立任一授信帳戶將以授信帳戶所開立之分公司帳號做為未來【申購便利通】交易使用，但若您擁有多個狀態可使用之台股帳戶且尚未開立授信帳戶，您將可自行選取任一帳戶做為未來【申購便利通】交易使用。',
            ],
            open: false,
            group: 'p1',
            key: '1_3',
        },
        {
            type: '',
            title: '已經申辦永豐銀行【私房錢】如何啟用此服務?',
            content: ['您只須由線上申辦入口進入，系統將判斷您須完成的啟用流程，完成後即可立即啟用先抽後付之申購服務。'],
            open: false,
            group: 'p1',
            key: '1_4',
        },
        {
            type: '',
            title: '申辦啟用需要花錢嗎?',
            content: ['不需要，單純申辦是沒有任何費用的。'],
            open: false,
            group: 'p1',
            key: '1_5',
        },
        {
            type: '',
            title: '申辦啟用後不使用會產生相關費用嗎?',
            content: ['不會，申辦啟用後即可使用此服務未使用不會產生相關費用。'],
            open: false,
            group: 'p1',
            key: '1_6',
        },
        {
            type: '',
            title: '使用【申購便利通】申辦，點選申辦為什麼會出現簽署共同行銷的簽署流程?',
            content: ['申辦啟用服務有銀行與證券相關資料串接，須您簽署共銷取得您的資料使用同意。'],
            open: false,
            group: 'p1',
            key: '1_7',
        },
        {
            type: '',
            title: '申辦【申購便利通】於選取帳戶時，明明有多帳號為什麼不能用?',
            content: ['系統會排除無法使用的帳號。'],
            open: false,
            group: 'p1',
            key: '1_8',
        },
        {
            type: '',
            title: '為什麼有的申購個股可以使用【申購便利通】申購，有的不可以？',
            content:
                '本服務提供單檔總動用金額（申購款含相關費用）於20萬內之申購檔次，可使用【申購便利通】進行先抽後付的申購服務。',
            open: false,
            group: 'p2',
            key: '2_1',
        },
        {
            type: '',
            title: '使用【申購便利通】申購，送出後可以撤銷預約動用申請嗎？',
            content:
                '可以，在認購截止前您可於申購頁面取消動用申請，改以一般自備資金申購。（注：為避免撤銷後未能成功申請，建議您留意申購頁面的截止時間。）',
            open: false,
            group: 'p2',
            key: '2_2',
        },
        {
            type: '',
            title: '使用【申購便利通】申購動用失敗怎麼辦?也會收取【申購便利通】手續費嗎？',
            content: [
                '不會，',
                '使用【申購便利通】申購動用失敗，將不會收取【申購便利通】手續費，',
                '且申購委託將視為一般申購只要您帳戶餘額足夠即可依現行流程完成股票抽籤無須擔心，',
                '本服務預約動用成功才會依實際動用檔次，以檔計收【申購便利通】手續費。',
            ],
            open: false,
            group: 'p2',
            key: '2_3',
        },
        {
            type: '',
            title: '使用【申購便利通】申購動用成功免備款但什麼時候扣取相關款項？',
            content: '扣款日，同現行申購規範於扣款日進行扣款並存入證券商的申購有價證券代收付專戶。',
            open: false,
            group: 'p2',
            key: '2_4',
        },
        {
            type: '',
            title: '想申購某檔標的 ，有部份自備資金但不足，可以使用部份自備資金，將缺額以動用【申購便利通】申購嗎?',
            content:
                '不可以，同檔申購只能二選一，但您可依資金需求決定每檔次申購是要以自備資金申購或【申購便利通】申購。',
            open: false,
            group: 'p2',
            key: '2_5',
        },
        {
            type: '',
            title: '同檔期不同標的，可以分別使用一般自備資金申購和動用【申購便利通】申購嗎?',
            content:
                '可以，申購時間相同的二檔股票，可以分別使用自備資金申購與【申購便利通】申購，唯系統於扣款時仍以總額扣取，須留意您扣款日交割款項與帳戶資金狀況，確認申購預扣成功始得參加公開申購。',
            open: false,
            group: 'p2',
            key: '2_6',
        },
        {
            type: '',
            title: '使用【申購便利通】於申購開始日即點選動用，是不是就會開始計息?',
            content: [
                '不會，申購便利通服務提供預約動用之服務，您只要於截止日前點選並成功預約動用，銀行將於申購截止日當天進行動用，此時才開始計息，相關說明如下：',
                '計息天數：認購截止日為計息第一日，至您還款日為計息最後一日。',
                '試算利率：已申辦客戶使用實際利率試算、未申辦客戶使用最低利率試算',
                '利息計算：利息（四捨五入）＝總動用金額＊年利率＊（截止日起算至還款日之使用天數/365）',
                '利息收取：銀行於每月的21日收取',
            ],
            open: false,
            group: 'p2',
            key: '2_7',
        },
        {
            type: '',
            title: '申購價差如何試算？',
            content: '申購價差=（試算當日市價—承銷價）＊申購股數',
            chart: '2_8chart',
            open: false,
            group: 'p2',
            key: '2_8',
        },
        {
            type: '',
            title: '使用【申購便利通】每檔申購動用總金額如何計算？',
            content: '每檔次動用總金額=申購預扣款+【申購便利通】手續費',
            chart: '2_9chart',
            open: false,
            group: 'p2',
            key: '2_9',
        },
        {
            type: '',
            title: '申辦【申購便利通】於選取帳戶時，明明有多帳號為什麼不能用?',
            content: '未中籤會退還申購股款及郵寄費，退款完成後若您仍有欠款系統將會協助您完成銀行還款作業，',
            chart: '2_10chart',
            open: false,
            group: 'p2',
            key: '2_10',
        },
        {
            type: '',
            title: '申辦【申購便利通】於選取帳戶時，明明有多帳號為什麼不能用?',
            content: '中籤於撥券日會將股票撥入您的台股帳戶，當日即可賣出，交割款會於次二個營業日入您的交割帳戶，',
            chart: '2_11chart',
            open: false,
            group: 'p2',
            key: '2_11',
        },
        {
            type: '',
            title: '預約動用後為什麼使用額度沒有立即減少？何時會完成額度提款？',
            content:
                '【申購便利通】於申購期間提供預約動用服務，於截止日依銀行系統排程完成提款動用，使用額度於實際動用時才會依動用結果揭示。',
            open: true,
            group: 'p3',
            key: '3_1',
        },
        {
            type: '',
            title: '點選使用【申購便利通】申購當下預約動用成功後，為什麼截止日會回覆動用失敗？',
            content:
                '【申購便利通】於申購期間提供預約動用服務，但於載止日實際動用，須依客戶當下的額度與使用狀態回饋動用結果，請您留恴可動用額度及帳戶狀態，確保於截止日實際動用當天帳戶能成功動用，以免影響您的申購委託交易。',
            open: false,
            group: 'p3',
            key: '3_2',
        },
        {
            type: '',
            title: '預約動用失敗還可以申購嗎?',
            content:
                '可以，預約動用結果決定是否得以【申購便利通】服務先抽籤後付款，若客戶動用失敗該申購委託仍有效仍可以自備資金進行申購。',
            open: false,
            group: 'p3',
            key: '3_3',
        },
        {
            type: '',
            title: '使用【申購便利通】申購於截止日確認回覆動用成功，但扣款日卻申購扣款不足?',
            content:
                '本服務僅提供【申購便利通】平台介接永豐銀行【私房錢】貸款服務，申購人銀行存款不足支付應交割價款及預扣價款時，以交割價款為優先扣款，請您留意並審慎評估資金狀況，本服務提供動用成功撥款即收取【申購便利通】手續費，相關申購作業仍依現行規範。',
            open: false,
            group: 'p3',
            key: '3_4',
        },
        {
            type: '',
            title: '點選使用【申購便利通】申購試算當下的利率可能會變動嗎?',
            content:
                '會，點選使用【申購便利通】申購進行預約動用時，是以您當下實際利率進行試算，若您於截止日當日或借款期間利率有變動仍依您實際利率計息。',
            open: false,
            group: 'p3',
            key: '3_5',
        },
        {
            type: '',
            title:
                '有短期資金需求使用【申購便利通】申購且成功動用後，於公告抽籤結果前已無資金需求想先行償還銀行款項可以嗎?',
            content: [
                '可以，',
                '本服務資金運用彈性可隨借隨還，若使用【申購便利通】申購且公告為未中籤，',
                '系統將發動聰明還款指示檢視您的私房錢欠款狀態：',
                '若銀行私房錢欠款＞０：將依您私房錢欠款進行還款，其上限為未中籤退款，完成還款後請您留意是否仍有欠款，若無資金需求請您記得得償還，若未全數償還者將依您的利率並依實際動用天數於每月21日收取。',
                '若銀行私房錢欠款＝０：完成退款匯入您的交割帳戶將不進行償還。',
            ],
            open: false,
            group: 'p3',
            key: '3_6',
        },
        {
            type: '',
            title: '有短期資金需求使用【申購便利通】申購且成功動用後，可以隨時還款嗎?',
            content: [
                '可以，本服務資金運用彈性可隨借隨還',
                '本服務資金運用彈性可隨借隨還，若使用【申購便利通】申購且公告為未中籤，',
                '系統將發動聰明還款指示檢視您的私房錢欠款狀態：',
                '若銀行私房錢欠款＞０：將依您私房錢欠款進行還款，其上限為未中籤退款，完成還款後請您留意是否仍有欠款，若無資金需求請您記得得償還，若未全數償還者將依您的利率並依實際動用天數於每月21日收取。',
                '若銀行私房錢欠款＝０：完成退款匯入您的交割帳戶將不進行償還。',
            ],
            open: true,
            group: 'p4',
            key: '4_1',
        },
        {
            type: '',
            title: '未中籤退款?',
            content: ['未中籤會退還申購股款及郵寄費，', '故未中籤申購成本＝處理費＋手續費＋利息（截止～退款日還款）'],
            chart: '4_2chart',
            open: false,
            group: 'p4',
            key: '4_2',
        },
        {
            type: '',
            title: '未中籤系統是否會協助還款?',
            content: [
                '是的，',
                '使用【申購便利通】申購且公告為未中籤，',
                '系統將發動聰明還款指示檢視您的私房錢欠款狀態：',
                '若銀行私房錢欠款＞０：將依您私房錢欠款進行還款，其上限為未中籤退款，完成還款後請您留意是否仍有欠款，若無資金需求請您記得得償還，若未全數償還者將依您的利率並依實際動用天數於每月21日收取。',
                '若銀行私房錢欠款＝０：完成退款匯入您的交割帳戶將不進行償還。',
                '故未中籤申購成本＝處理費＋手續費＋利息（截止～退款日還款）',
            ],
            open: false,
            group: 'p4',
            key: '4_3',
        },
        {
            type: '',
            title: '未中籤系統聰明還款後要注意什麼?',
            content: [
                '無其他動用辋境下，申購動用總金額95,120—未中籤退款95,050＝仍有銀行欠款70，',
                '若無資金需求請您記得得償還，若未全數償還者將依您的利率並依實際動用天數於每月21日收取。',
            ],
            chart: '4_4chart',
            open: false,
            group: 'p4',
            key: '4_4',
        },
        {
            type: '',
            title: '中籤是否需要自行還款?',
            content:
                '是的，中籤於撥券日會將股票撥入您的台股帳戶，當日即可賣出，交割款會於次二個營業日入您的交割帳戶，此時即可自行償還銀行欠款',
            open: false,
            group: 'p4',
            key: '4_5',
        },
        {
            type: '',
            title: '申辦服務後，可以使用什麼平台進行【申購便利通】先抽後付的申購服務?',
            content: '目前【申購便利通】服務提供【大戶投】與【新理財網】平台使用，於其他平台僅可查詢到一般申購資料。',
            open: true,
            group: 'p5',
            key: '5_1',
        },
        {
            type: '',
            title: '【申購便利通】可以變更交割帳戶嗎?',
            content:
                '使用【申購便利通】申購除已撥款未抽籤、未中籤於未完成系統性還款外，皆可變更交割帳戶，唯須您留意臨櫃完成帳戶統整作業。',
            open: false,
            group: 'p5',
            key: '5_2',
        },
        {
            type: '',
            title: '【申購便利通】銷戶後還可以申購嗎?',
            content:
                '可以，只要您台股帳戶狀態仍可使用，即得以自備資金進行申購，請您記得於截止日前將款項備足於交割帳戶中，預備扣款日扣款。',
            open: false,
            group: 'p5',
            key: '5_3',
        },
        {
            type: '',
            title: '【申購便利通】銷戶後，還可以查看到之前【申購便利通】的使用紀録嗎?',
            content:
                '不可以，銷戶即表示取消使用此服務，包含無法使用【申購便利通】平台、即刻中止預約動用與還款指示，客戶須自備資金進行委託公開申購，且若有永豐銀行【私房錢】貸款服務欠款情事，亦須透過永豐銀行相關管道進行清償。',
            open: false,
            group: 'p5',
            key: '5_4',
        },
        {
            type: '',
            title: '台股帳戶銷戶後，還可以使用【申購便利通】嗎?',
            content: '不可以，【申購便利通】服務須要有台股帳戶並簽署證券【申購便利通】與銀行私房錢契約始得使用。',
            open: false,
            group: 'p5',
            key: '5_5',
        },
        {
            type: '',
            title: '【申購便利通】銷戶有限制嗎?銷戶後之前申購紀録會消失嗎?',
            content:
                '您無任何預約動用在途件即可進行銷戶，但若有預約動用在途件須待次一營業日完成動用撥款後始得進行銷戶，銷戶後您之前使用【申購便利通】的申購紀録仍可於我的申購清單中看到。',
            open: false,
            group: 'p5',
            key: '5_6',
        },
        {
            type: '',
            title: '【申購便利通】銷戶後，日後想要再次申辦可以嗎?',
            content: '可以，只要您台股帳戶狀態仍可使用，重新簽署證券【申購便利通】與銀行【私房錢】契約始得使用。',
            open: false,
            group: 'p5',
            key: '5_7',
        },
        {
            type: '',
            title: '已簽署授權交易，授權交易範圍包含使用【申購便利通】申購嗎?',
            content: '不包含，使用【申購便利通】申購須為簽署契約本人始得進行。',
            open: false,
            group: 'p5',
            key: '5_8',
        },
        {
            type: '',
            title: '使用【申購便利通】申購，點選動用為什麼會出現簽署共同行銷的簽署流程？',
            content: '使用【申購便利通】申購有銀行與證券相關資料串接故須您簽署共銷取得您的資料使用同意。',
            open: false,
            group: 'p5',
            key: '5_9',
        },
        {
            type: '',
            title: '使用【申購便利通】申購，出現交割帳戶與撥款帳戶須統整訊息怎麼辦？',
            content: '請您聯繫專人或臨櫃辧理帳戶統整作業。',
            open: false,
            group: 'p5',
            key: '5_10',
        },
    ];
    const chartFuncHandler = val => {
        switch (val) {
            case '2_8chart':
                return (
                    <>
                        <div className="flexBox">
                            <span>舉例：</span>
                            <p>
                                承銷價95、申購1張、試算當下市價100
                                <br />
                                申購價差5,000（+5.26%） =（（試算當日市價100—承銷價95））*1000股
                            </p>
                        </div>
                    </>
                );
            case '2_9chart':
                return (
                    <>
                        <div className="flexBox">
                            <span>舉例：</span>
                            <p>
                                申購承銷價95、申購1張、處理費20、郵寄費50、【申購便利通】手續費50（牌告）
                                <br />
                                現行一般申購預扣款95,070=承銷價95*1000股＋處理費20＋郵寄費50
                                <br />
                                使用【申購便利通】申購成功動用另收取手續費50
                                <br />
                                故每檔次動用總金額95,120＝95,070申購預扣款+50【申購便利通】手續費
                            </p>
                        </div>
                    </>
                );
            case '2_10chart':
                return (
                    <>
                        <div className="flexBox">
                            <span>舉例：</span>
                            <p>
                                總動用金額95,120 （承上述）、6/1截止日、6/4退款日、利率6%
                                <br />
                                動用天數＝截止日6/1～退款日還款6/4＝3天
                                <br />
                                未中籤申購成本117＝處理費20＋手續費50＋利息47（總動用金額95.120*利率6%*（動用天數3天/365天））
                            </p>
                        </div>
                    </>
                );
            case '2_11chart':
                return (
                    <>
                        <div className="flexBox">
                            <span>舉例：</span>
                            <p>
                                總動用金額95,120 （承上述）、6/1截止日、6/6撥款日、6/8撥券日賣出T+2日還款、利率6%
                                <br />
                                動用天數＝截止日6/1～撥券日賣出T+2日還款退款日還款6/8＝7天 <br />
                                中籤申購成本229＝處理費20＋郵寄費50+手續費50＋利息109（總動用金額95.120*利率6%*（動用天數7天/365天））
                            </p>
                        </div>
                    </>
                );
            case '4_2chart':
                return (
                    <>
                        <div className="flexBox">
                            <span>舉例：</span>
                            <p>
                                總動用金額95,120 （承上題述）、6/1截止日、6/4退款日、利率6%
                                <br />
                                動用天數＝截止日6/1～退款日還款6/4＝3天
                                <br />
                                未中籤申購成本117＝處理費20＋手續費50＋利息47（總動用金額95.120*利率6%*（動用天數3天/365天））
                            </p>
                        </div>
                    </>
                );
            case '4_4chart':
                return (
                    <>
                        <p>使用【申購便利通】申購動用總金額＝95,120</p>
                        <div className="flexBox">
                            <span>舉例：</span>
                            <p>
                                申購承銷價95、申購1張、處理費20、郵寄費50、【申購便利通】手續費50（牌告）
                                <br />
                                現行一般申購預扣款95,070=承銷價95*1000股＋處理費20＋郵寄費50
                                <br />
                                使用【申購便利通】申購成功動用另收取手續費50
                                <br />
                                故每檔次動用總金額95,120＝95,070申購預扣款+50【申購便利通】手續費
                            </p>
                        </div>
                        <p>未中籤會退還申購股款及郵寄費=95,050</p>
                        <div className="flexBox">
                            <span>舉例：</span>
                            <p>
                                申購承銷價95、申購1張、處理費20、郵寄費50
                                <br />
                                未中籤會退還95,050=申購股款95,000+郵寄費50
                            </p>
                        </div>
                    </>
                );
        }

        // if (val === '2_8chart') {
        //     return (
        //         <>
        //         <div className='flexBox'>
        //             <span>舉例：</span>
        //             <p>承銷價95、申購1張、試算當下市價100<br/>
        //                申購價差5,000（+5.26%） =（（試算當日市價100—承銷價95））*1000股</p>
        //         </div>
        //         </>
        //     );
        // }
    };
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
    const btnHref = val => {
        window.location.href = val;
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
                    <div>
                        回顧 2022 上半年申購實績
                        <Popover
                            content="市場公開資訊：截至2022年6月30日以住績效並不代表未來績效表現，本素材不構成任何投資建議。"
                            trigger={isMobile ? 'click' : 'hover'}
                            placement="bottom"
                            className="infoPopoverBtn"
                            overlayClassName="applyIndexBtn infoPopover"
                            overlayStyle={{ maxWidth: '170px' }}
                        >
                            <InfoCircleFilled />
                        </Popover>
                    </div>
                    <div className="flexBox">
                        <div>
                            <p>
                                <span>
                                    <CountUp start={0} end={45} duration={2} />
                                </span>
                                檔
                            </p>
                            <p>申購檔次</p>
                        </div>
                        <div>
                            <p>
                                <span>
                                    <CountUp start={0} end={42700} separator="," duration={2} />
                                </span>
                                元
                            </p>
                            <p>期間最高價差</p>
                        </div>
                        <div>
                            <p className="icon-arrow-up">
                                <span>
                                    <CountUp start={0} end={18.09} decimals={2} duration={2} />
                                </span>
                                %
                            </p>
                            <p>首日平均漲幅</p>
                        </div>
                    </div>
                    <div>
                        <Button type="primary" onClick={btnHref.bind(null, '/newweb/subscriptionArea/Subscription')}>
                            立即申購
                        </Button>
                        <br />
                        <a href={process.env.NEXT_PUBLIC_SUBSCRIPTION_ACCOUNT}>
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
                            itemNum={windowWidth > 768 ? 3 : windowWidth > 620 ? 2 : 1}
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
                            <p>
                                申辦啟用
                                <Popover
                                    content="須同時完成永豐金證券與永豐銀行相關簽署，服務始得啟用。"
                                    trigger={isMobile ? 'click' : 'hover'}
                                    placement="bottom"
                                    className="infoPopoverBtn"
                                    overlayClassName="applyIndexBtn infoPopover"
                                    overlayStyle={{ maxWidth: '170px' }}
                                >
                                    <InfoCircleFilled />
                                </Popover>
                            </p>
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
                            <p>
                                中籤還款
                                <Popover
                                    content="退款日退還認購股款集郵寄費50元(處理費20元不予退回)。"
                                    trigger={isMobile ? 'click' : 'hover'}
                                    placement="bottom"
                                    className="infoPopoverBtn"
                                    overlayClassName="applyIndexBtn infoPopover"
                                    overlayStyle={{ maxWidth: '170px' }}
                                >
                                    <InfoCircleFilled />
                                </Popover>
                            </p>
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
                    <div className="qaOuter">
                        <QaCollapse dataSource={qaData} chartFunc={chartFuncHandler} />
                    </div>
                </div>
            </div>
            <div className="goTo">
                <a href="/newweb/subscriptionArea/Subscription">立即申購</a>
                <a href={process.env.NEXT_PUBLIC_SUBSCRIPTION_ACCOUNT}>我要申辦</a>
            </div>
            <style jsx>
                {`
                
                #applyIndex__container {overflow: hidden;}
                .goTo{position:fixed; right:2%; bottom:5%; border-radius:50px; width:70px; box-shadow: 0 2px 15px 0 rgba(196, 56, 38, 0.5);
                    background-color: #c43826; z-index: 5;}
                .goTo > a {display:block;width:45px;font-size:16px;color:#FFF;font-weight:800;margin:0 auto;text-align:center;padding:1em 0 0.5em;}
                .goTo > a:not(:first-child) {border-top:1px solid #f45a4c;padding:0.5em 0 0.5em; }
                .goTo > a:last-child {border-top:1px solid #f45a4c;padding:0.5em 0 1em; }

                .flexBox{display:flex;justify-content:space-between;}

                .mainArea{min-height:40px; width:100%;padding:80px 0;position:relative;}
                .mainArea:nth-child(odd){background-color:#f9fbff;}
                .mainArea .contentBox {min-height:40px; width:100%; max-width:1185px;margin:0 auto;}
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
                .mainArea1 .icon-arrow-up::before {content:"";display:inline-block;width: 0;
                    height: 0;
                    margin-right:0.4em;
                    border-style: solid;
                    border-width: 0 10px 17.3px 10px;
                    border-color: transparent transparent #c43826 transparent;}
                .mainArea2 .areaContent {flex-wrap: wrap;justify-content:space-between;margin:55px auto 0;max-width:1080px;}
                .mainArea2 .areaContent .areaItem {width:30%;padding:0 20px 0;margin-bottom: 38px;}
                .mainArea2 .areaContent .areaItem div:nth-child(1){width:50px;margin-right:20px;flex-shrink:0;}
                .mainArea2 .areaContent .areaItem div:nth-child(1) img{width:100%;}
                .mainArea2 .areaContent .areaItem div:nth-child(2){}
                .mainArea2 .areaContent .areaItem div:nth-child(2) p:nth-child(1){font-size: 22px; font-weight: 800;color:#0d1623;margin-bottom:0.2em;}
                .mainArea2 .areaContent .areaItem div:nth-child(2) p:nth-child(2){ font-size: 14px; color: #3f5372;margin-bottom:0;letter-spacing:0.05em; line-height:1.5;}

                .mainArea3 .contentBox{max-width:1080px;}
                .mainArea3 .contentBox .slickBox{margin-bottom:40px;}
                .mainArea3 .contentBox .info{font-size:14px; margin: 0 auto; color:#3f5372;text-align:center;}

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
                .mainArea {width:100vw;padding:48px 32px;}
                .mainArea .contentBox .countBoxLeft{padding: 4em 0 4em;}
                .mainArea::before{content:'';display:block;width:100vw;}
                .mainArea.mainArea1 {background-color:#FFF; padding:6% 0;}
                .mainArea1 .contentBox{margin: 0 6%;position: relative;}
                .mainArea1 .bg{background:url(${bannerPAD}) no-repeat center top/100%;padding-top:68%;height:auto;}
                .mainArea1 .contentBox>div:nth-child(2){font-size:40px;padding-left:0.4em;}
                .mainArea1 .contentBox>div:nth-child(4){width:55%;}
                .mainArea2 {padding: 60px 32px 16px;}
                .mainArea2 .areaContent {width:90%;}
                .mainArea2 .areaContent .areaItem{width:50%;}
                .mainArea2 .areaContent .areaItem div:nth-child(2) p:nth-child(2){font-size:16px;}
                .mainArea.mainArea3{ padding: 48px 0;}
                .mainArea3 .contentBox{padding:0;}
                .mainArea3 .contentBox .slickBox{width: 100%; margin: 0 auto 40px;}
                .mainArea3 .contentBox .info{margin-top:2em;font-size:16px;}
                .mainArea.mainArea4 {padding: 48px 48px 0;}
                .mainArea4 .areaContent {flex-wrap:wrap;justify-content: space-between; margin-bottom:0;}
                .mainArea4 .areaContent .areaItem{width: calc(50% - 24px);margin-bottom:48px;}
                .mainArea5 .contentBox .areaContent > div:nth-child(1) img:first-child{display:none;}
                .mainArea5 .contentBox .areaContent > div:nth-child(1) img:last-child{display:block;}
                .mainArea.mainArea5{padding:48px 0 0;
                    background: linear-gradient(#f9fbff calc(100% - 24px), #FFF calc(100% - 24px) );}
                .mainArea5 .contentBox {width:100%;}
                .mainArea5 .contentBox .areaContent>div:nth-child(1) {width:35%;}
                .mainArea5 .contentBox .areaContent>div:nth-child(2) {width: 65%;padding:4em 4em;}
                .mainArea5 .contentBox .areaContent>div:nth-child(2) p{font-size: 20px;}
                .mainArea5 .contentBox .areaContent {margin: 40px auto 40px; }
                .mainArea6 .tabBox{ margin-bottom: 24px;}

                .goTo{ right:0%; bottom:3%; border-radius:16px 0 0 16px; width:50px; }
                .goTo > a {line-height:1.3;width:34px;}
                .bg-cycle{ display:none;}
            }
            @media screen and (max-width: 500px) {
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
                .mainArea1 .icon-arrow-up::before {  margin-right:0; border-width: 0 8px 13.9px 8px;}
                #applyIndex__container .mainArea1 .contentBox .ant-btn{margin:0.1em 0;}

                .bg-cycle{display:none}

                .mainArea2 .contentBox{width:92%;;}
                .mainArea2 .areaContent .areaItem{padding:0;text-align:center;align-content: flex-start;}
                .mainArea2 .areaContent .areaItem div:nth-child(1){margin:0 auto 10px;}
                .mainArea2 .areaContent .areaItem div:nth-child(2) p:nth-child(1){font-size:16px;}
                .mainArea3 .contentBox .slickBox{margin: 0 auto 20px;}
                .mainArea3 .contentBox .info{padding-bottom:40px;width:94%;text-align: justify;}
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
                .qaOuter{padding:4%;}
            }

            }`}
            </style>
            <style jsx global>
                {`
                    #applyIndex__container .flexBox {
                        display: flex;
                    }
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
                    #applyIndex__container .infoPopoverBtn {
                        margin-left: 0.5em;
                        color: #a8b7cc;
                        font-size: 16px;
                    }
                    .applyIndexBtn.infoPopover .ant-popover-arrow {
                        border-color: #0d1623 !important;
                    }
                    .applyIndexBtn.infoPopover .ant-popover-inner-content {
                        color: #fff;
                        background: #0d1623;
                        padding: 10px 8px;
                    }
                    @media screen and (max-width: 768px) {
                        #applyIndex__container .iconBox .ant-btn {
                            width: 6em;
                            margin: 0.2em 0;
                        }
                        #applyIndex__container .slickBox .slick-next {
                            right: 10px;
                            z-index: 5;
                        }
                        #applyIndex__container .slickBox .slick-next::before {
                            width: 17px;
                            height: 17px;
                        }
                        #applyIndex__container .slickBox .slick-prev {
                            left: 10px;
                            z-index: 5;
                        }
                        #applyIndex__container .slickBox .slick-prev::before {
                            width: 17px;
                            height: 17px;
                        }
                        #applyIndex__container #QaCollapse__content .ant-collapse-item {
                            padding: 10px 24px;
                        }
                    }
                    @media screen and (max-width: 500px) {
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
                        #applyIndex__container .price__difference {
                            padding: 4%;
                        }
                        #applyIndex__container .price__difference .percent {
                            margin-right: 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ProductInfo;
