import { useState, useEffect } from 'react';
import moment from 'moment';
import icon from '../../../../resources/images/components/mySubscription/attention-error (1).svg';

const TimeLine = ({ style, data }) => {
    useEffect(() => {}, [data]);
    console.log('data', data);
    return (
        <div style={style}>
            <div className="line1__box">
                <span className="line1__item disabled">扣款 {moment(data.feeDate).format('MM/DD')}</span>
                <span className="line1__item active">抽籤 {moment(data.lotDate).format('MM/DD')}</span>
                <span className="line1__item">撥券 03/20</span>
            </div>
            <div className="line2__box">
                <span className="line2__item disabled"></span>
                <span className="line"></span>
                <span className="line2__item active"></span>
                <span className="line"></span>
                <span className="line2__item"></span>
            </div>
            <div className="line3__box">
                <span
                    className="line3__item disabled"
                    style={{
                        display: 'inline-block',
                        fontSize: '14px',
                    }}
                >
                    扣款 40,070
                </span>
                <span
                    className="line3__item active"
                    style={{
                        marginLeft: '23%',
                        width: '40px',
                        display: 'inline-block',
                        textAlign: 'center',
                        fontSize: '14px',
                    }}
                >
                    中籤
                </span>
                <span
                    className="line3__item"
                    style={{
                        display: 'inline-block',
                        marginLeft: '24%',
                        fontSize: '14px',
                    }}
                >
                    4558 寶緯 匯入1張
                </span>
            </div>
            <p className="time__desc">
                <img className="time__icon" src={icon} />
                <span>恭喜您中籤啦！若有資金需求除了賣股變現，另外提供您股票</span>
                <a>【 抵押低利借款方案 】</a>
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
