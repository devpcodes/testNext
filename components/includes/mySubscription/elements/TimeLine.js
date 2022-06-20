import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import icon from '../../../../resources/images/components/mySubscription/attention-error (1).svg';
import { formatNum } from '../../../../services/formatNum';

const TimeLine = ({ style, data }) => {
    const feeDataItem1Dom = useRef(null);
    const [feeDataItem01Dom, setfeeDataItem01Dom] = useState('line1__item');
    const feeDataItem2Dom = useRef(null);
    const [feeDataItem02Dom, setfeeDataItem02Dom] = useState('line2__item');
    const feeDataItem3Dom = useRef(null);
    const [feeDataItem03Dom, setfeeDataItem03Dom] = useState('line3__item');
    const resultDataItem1Dom = useRef(null);
    const [resultDataItem01Dom, setResultDataItem01Dom] = useState('line1__item');
    const resultDataItem2Dom = useRef(null);
    const [resultDataItem02Dom, setResultDataItem02Dom] = useState('line2__item');
    const resultDataItem3Dom = useRef(null);
    const [resultDataItem03Dom, setResultDataItem03Dom] = useState('line3__item');
    const endDataItem1Dom = useRef(null);
    const [endDataItem01Dom, setEndDataItem01Dom] = useState('line1__item');
    const endDataItem2Dom = useRef(null);
    const [endDataItem02Dom, setEndDataItem02Dom] = useState('line2__item');
    const endDataItem3Dom = useRef(null);
    const [endDataItem03Dom, setEndDataItem03Dom] = useState('line3__item');
    const endDataItem2LineDom = useRef(null);
    const [endDataItem02LineDom, setEndDataItem02LineDom] = useState('line');
    const [text, setText] = useState('');
    const [label2Text, setLabel2Text] = useState('待抽籤');
    const [link, setLink] = useState('');
    const [label3TextUp, setLabel3TextUp] = useState('');
    const [label3TextDown, setLabel3TextDown] = useState('');
    useEffect(() => {
        console.log('======', moment(data.currentDate).isSame(moment(data.feeDate)), data.currentDate, data.feeDate);
        resetHandler();

        console.log('---=-=-=-', data.status);
        if (moment(data.currentDate).isSame(moment(data.feeDate))) {
            setfeeDataItem01Dom('line1__item active');
            setfeeDataItem02Dom('line2__item active');
            setfeeDataItem03Dom('line3__item active');
        }
        if (moment(data.currentDate).isAfter(moment(data.feeDate))) {
            setfeeDataItem01Dom('line1__item disabled');
            setfeeDataItem02Dom('line2__item disabled');
            setfeeDataItem03Dom('line3__item disabled');
        }

        if (moment(data.currentDate).isSame(moment(data.lotDate))) {
            setResultDataItem01Dom('line1__item active');
            setResultDataItem02Dom('line2__item active');
            setResultDataItem03Dom('line3__item active');
        }
        if (moment(data.currentDate).isAfter(moment(data.lotDate))) {
            setResultDataItem01Dom('line1__item disabled');
            setResultDataItem02Dom('line2__item disabled');
            setResultDataItem03Dom('line3__item disabled');
        }

        if (moment(data.currentDate).isSame(moment(data.stkDate))) {
            setEndDataItem01Dom('line1__item active');
            setEndDataItem02Dom('line2__item active');
            setEndDataItem03Dom('line3__item active');
        }
        if (moment(data.currentDate).isAfter(moment(data.stkDate))) {
            setEndDataItem01Dom('line1__item disabled');
            setEndDataItem02Dom('line2__item disabled');
            setEndDataItem03Dom('line3__item disabled');
        }
        textHandler(data);
        visible3Handler(data);
    }, [data]);
    console.log('data', data); //disabled // active //【 抵押低利借款方案 】
    const resetHandler = () => {
        setfeeDataItem01Dom('line1__item');
        setfeeDataItem02Dom('line2__item');
        setfeeDataItem03Dom('line3__item');
        setResultDataItem01Dom('line1__item');
        setResultDataItem02Dom('line2__item');
        setResultDataItem03Dom('line3__item');
        setEndDataItem01Dom('line1__item');
        setEndDataItem02Dom('line2__item');
        setEndDataItem03Dom('line3__item');
        setEndDataItem02LineDom('line');
        setText('');
        setLabel2Text('待抽籤');
        setLink('');
        setLabel3TextUp('');
        setLabel3TextDown('');
    };
    const textHandler = () => {
        if (moment(data.currentDate).isBefore(moment(data.feeDate))) {
            setText(`記得截止日${moment(data.feeDate).format('MM/DD')}前將款項備足待扣喲!`);
            return;
        }
        if (
            data.orderStatus !== 'S1' &&
            data.orderStatus !== 'S2' &&
            data.orderStatus !== 'Y' &&
            data.orderStatus !== 'N1' &&
            data.orderStatus !== 'W1'
        ) {
            setText(data.statusMessage);
        }
    };
    // 中籤 未中籤 ui設定
    const visible3Handler = data => {
        if (data.orderStatus !== 'N1' && data.orderStatus !== 'W1') {
            setEndDataItem01Dom('line1__item none');
            setEndDataItem02Dom('line2__item none');
            setEndDataItem03Dom('line3__item none');
            setEndDataItem02LineDom('line none');
        }
        // if (data.status === 'N1' || data.status === 'W1') {
        //     setEndDataItem01Dom('line1__item');
        //     setEndDataItem02Dom('line2__item');
        //     setEndDataItem03Dom('line3__item');
        //     setEndDataItem02LineDom('line')
        // }
        console.log('1231231231235555');
        if (data.orderStatus === 'N1' || data.orderStatus === 'W1') {
            if (data.orderStatus === 'N1') {
                setLabel2Text('未中籤');
                setLabel3TextUp(`退款 ${moment(data.moneyDate).format('MM/DD')}`);
                setLabel3TextDown(`退款 ${formatNum(data.orderAmount)}`);
                setText(`好可惜未中籤！款項將於${moment(data.moneyDate).format('MM/DD')}退款請您留意！`);
            }
            if (data.orderStatus === 'W1') {
                setLabel2Text('中籤');
                setLabel3TextUp(`撥券 ${moment(data.stkDate).format('MM/DD')}`);
                setLabel3TextDown(`${data.stockId + ' ' + data.stockName}  匯入${Number(data.applyShare) / 1000}張`);
                if (
                    moment(data.currentDate).isSame(moment(data.lotDate)) ||
                    (moment(data.currentDate).isAfter(moment(data.lotDate)) &&
                        moment(data.currentDate).isBefore(moment(data.stkDate)))
                ) {
                    setText('恭喜您中籤啦！若有資金需求除了賣股變現外另提供您股票');
                    setLink('【 抵押低利借款方案 】');
                }
                if (moment(data.currentDate).isSame(moment(data.stkDate))) {
                    setText('今日會將股票匯入您交易帳戶請您留意');
                }
                if (moment(data.currentDate).isAfter(moment(data.stkDate))) {
                    setText('快來看看');
                    setLink('【 近期申購Go 】');
                }
            }
        }
    };
    return (
        <div style={style}>
            <div className="line1__box">
                <span ref={feeDataItem1Dom} className={feeDataItem01Dom}>
                    扣款 {moment(data.feeDate).format('MM/DD')}
                </span>
                <span
                    style={{
                        marginRight: data.orderStatus !== 'N1' && data.orderStatus !== 'W1' ? 97 : 0,
                    }}
                    className={resultDataItem01Dom}
                    ref={resultDataItem1Dom}
                >
                    抽籤 {moment(data.lotDate).format('MM/DD')}
                </span>
                <span ref={endDataItem1Dom} className={endDataItem01Dom}>
                    {label3TextUp}
                </span>
            </div>
            <div
                className="line2__box"
                style={{
                    width: data.orderStatus !== 'N1' && data.orderStatus !== 'W1' ? 211 : 'auto',
                }}
            >
                <span ref={feeDataItem2Dom} className={feeDataItem02Dom}></span>
                <span
                    className="line"
                    style={{
                        width: data.orderStatus !== 'N1' && data.orderStatus !== 'W1' ? '60%' : '30%',
                    }}
                ></span>
                <span className={resultDataItem02Dom}></span>
                <span ref={endDataItem2LineDom} className={endDataItem02LineDom}></span>
                <span className={endDataItem02Dom}></span>
            </div>
            <div className="line3__box">
                <span
                    ref={feeDataItem3Dom}
                    className={feeDataItem03Dom}
                    style={{
                        display: 'inline-block',
                        fontSize: '14px',
                        width: 76,
                    }}
                >
                    扣款 {formatNum(data.orderAmount)}
                </span>
                <span
                    className={resultDataItem03Dom}
                    style={{
                        marginLeft: data.orderStatus !== 'N1' && data.orderStatus !== 'W1' ? '33%' : '23%',
                        width: '40px',
                        display: 'inline-block',
                        textAlign: 'center',
                        fontSize: '14px',
                    }}
                    ref={resultDataItem3Dom}
                >
                    {label2Text}
                </span>
                <span
                    className={endDataItem03Dom}
                    ref={endDataItem3Dom}
                    style={{
                        display: 'inline-block',
                        marginLeft: '24%',
                        fontSize: '14px',
                    }}
                >
                    {label3TextDown}
                </span>
            </div>
            <p className="time__desc">
                {text && <img className="time__icon" src={icon} />}
                <span>{text}</span>
                <a>{link}</a>
            </p>
            <style jsx>{`
                .line1__item.disabled {
                    color: #6c7b94;
                }
                .line2__item.disabled {
                    background-color: #6c7b94;
                    box-shadow: 0px 0px 3px 1px #6c7b94;
                }
                .line3__item.disabled {
                    color: #6c7b94;
                }
                .none {
                    display: none !important;
                }

                .line1__item.active {
                    color: #c43826;
                }
                .line2__item.active {
                    background-color: #c43826;
                    box-shadow: 0px 0px 3px 1px #c43826;
                }
                .line3__item.active {
                    color: #c43826;
                }

                .line1__box {
                    display: flex;
                    justify-content: space-between;
                }
                .line2__box {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    margin-top: 6px;
                    margin-bottom: 6px;
                }
                .line1__item {
                    display: inline-block;
                    color: #0d1623;
                    font-size: 14px;
                }
                .line2__item {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #3f5372;
                    display: inline-block;
                    box-shadow: 0px 0px 3px 1px #3f5372;
                }
                .line2__item:first-child {
                    margin-left: 30px;
                }
                .line2__item:last-child {
                    margin-right: 30px;
                }
                .line {
                    height: 1px;
                    width: 30%;
                    display: inline-block;
                    background: #d7e0ef;
                    margin-top: 3px;
                    /* position: absolute; */
                    /* left: 10px; */
                }
                .time__desc {
                    margin-top: 6px;
                    margin-bottom: 0;
                    color: #0d1623;
                }
                .time__icon {
                    margin-top: -3px;
                    margin-right: 3px;
                }
                .time__desc a {
                    color: #daa360;
                }
            `}</style>
        </div>
    );
};

export default TimeLine;
