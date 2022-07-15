import { memo } from 'react';
import { useSelector } from 'react-redux';

const TimeLine = memo(({ stockData }) => {
    /* 
    stockData={
        beginDate:'20220512',
        endDate:'20220514',
        feeDate:'20220516',
        lotDate:'20220714',
        moneyDate:'20220720',
        stkDate:'20220722',
        currentDate:'20220714' //紅色日期，不帶就參考今天日期
    }
     */
    const formatDate = date => {
        if (date) {
            return `${date.slice(4, 6)}/${date.slice(6, 8)}`;
        } else {
            return '';
        }
    };

    const getDateClassName = date => {
        let dateClassName = '';
        let today = +new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
        const sdate = +new Date(date.slice(0, 4), date.slice(4, 6), date.slice(6, 8));
        if (stockData.currentDate) {
            let sd = stockData.currentDate;
            let sd_ = new Date(sd.slice(0, 4), sd.slice(4, 6), sd.slice(6, 8));
            today = +new Date(sd_.getFullYear(), sd_.getMonth(), sd_.getDate());
        }
        if (today > sdate) {
            dateClassName = 'before';
        } else if (today === sdate) {
            dateClassName = 'now';
        } else if (today < sdate) {
            dateClassName = 'after';
        }
        return `time__course ${dateClassName}`;
    };

    return (
        <>
            <div>
                <div className="time__block">
                    <div className={getDateClassName(stockData.beginDate)}>
                        <div className="step"> 開始 </div>
                        <div className="point"></div>
                        <div className="date"> {formatDate(stockData.beginDate)} </div>
                    </div>
                    <div className={getDateClassName(stockData.endDate)}>
                        <div className="step"> 截止 </div>
                        <div className="point"></div>
                        <div className="date"> {formatDate(stockData.endDate)} </div>
                    </div>
                    <div className={getDateClassName(stockData.feeDate)}>
                        <div className="step"> 扣款 </div>
                        <div className="point"></div>
                        <div className="date"> {formatDate(stockData.feeDate)} </div>
                    </div>
                    <div className={getDateClassName(stockData.lotDate)}>
                        <div className="step"> 抽籤 </div>
                        <div className="point"></div>
                        <div className="date"> {formatDate(stockData.lotDate)} </div>
                    </div>
                    <div className={getDateClassName(stockData.moneyDate)}>
                        <div className="step"> 退款 </div>
                        <div className="point"></div>
                        <div className="date"> {formatDate(stockData.moneyDate)} </div>
                    </div>
                    <div className={getDateClassName(stockData.stkDate)}>
                        <div className="step"> 撥券 </div>
                        <div className="point"></div>
                        <div className="date"> {formatDate(stockData.stkDate)} </div>
                    </div>
                    <hr className="time__line" />
                </div>
            </div>

            <style jsx>{`
                .time__block {
                    display: flex;
                    position: relative;
                }
                .time__course {
                    width: 16.666%;
                    text-align: center;
                    z-index: 1;
                }
                .time__course .point {
                    background: #fff;
                    padding: 0 3px;
                    width: fit-content;
                    margin: 0 auto;
                    border-radius: 50px;
                }
                .time__course .point::before {
                    content: '';
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border-radius: 8px;
                    vertical-align: middle;
                }
                .time__course.before > div {
                    color: #6c7b94;
                }
                .time__course.before .point::before {
                    background: #a9b6cb;
                    border: solid 2px #d7e0ef;
                }
                .time__course.after > div {
                    color: #0d1623;
                }
                .time__course.after .point::before {
                    background: #3f5372;
                    border: solid 2px #d7e0ef;
                }
                .time__course.now > div {
                    color: #c43826;
                }
                .time__course.now .point::before {
                    background: #c43826;
                    border: solid 2px #ebbdb7;
                }
                .time__line {
                    width: 84%;
                    position: absolute;
                    top: 44%;
                    border: none;
                    background: #d7e0ef;
                    height: 1px;
                    left: 8%;
                }
                .time__course .date {
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                .time__course .step {
                    font-size: 1.4rem;
                    font-weight: bold;
                }
            `}</style>
        </>
    );
});

export default TimeLine;
