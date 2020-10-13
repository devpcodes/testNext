import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { QuickViewTable } from './QuickViewTable';
import { formatNum } from '../../../../services/formatNum';
import { useSelector } from 'react-redux';
import MyTransition from '../../myTransition';
import close from '../../../../resources/images/components/stockQuickView/close.png';
import CurrencyBox from '../CurrencyBox';
// eslint-disable-next-line react/display-name
const StockQuickView = React.memo(({ unreal, currencyData, tableInfo }) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (!isMobile) {
            setShowContent(true);
        }
    }, [isMobile]);

    //併上+-符號
    const getUnreal = unreal => {
        if (Number(unreal) > 0) {
            return '+' + formatNum(unreal);
        } else if (Number(unreal) <= 0) {
            return formatNum(unreal);
        } else {
            return unreal;
        }
    };

    const contentBtnClick = () => {
        if (noData()) {
            return;
        }
        setShowContent(prevState => !prevState);
    };

    //判斷無資料
    const noData = () => {
        //pc版不做此判斷
        if (!isMobile) {
            return false;
        }

        if (currencyData.length === 0) {
            if (tableInfo[0].key == 0) {
                return true;
            }
        }
        return false;
    };

    return (
        <>
            <div className="StockQuickView__container">
                <p>國內證券未實現損益</p>
                <p className="unrealized">{getUnreal(unreal)}</p>
                <div className="settlementMoney__box">
                    <p onClick={contentBtnClick} className="content__btn">
                        {isMobile ? '近三日交割款' : '當日交割款'}
                    </p>
                    {isMobile && <img onClick={contentBtnClick} src={close} />}
                    {isMobile && noData() && <p className="noData">無交割款</p>}
                    <MyTransition isVisible={showContent && !noData()} classNames={'maxHeight'}>
                        <div className="settlementMoney__content">
                            <CurrencyBox currencyData={currencyData} />
                            <QuickViewTable dataSource={tableInfo} />
                        </div>
                    </MyTransition>
                </div>
            </div>
            <style jsx>{`
                .StockQuickView__container {
                    margin-top: 18px;
                    font-size: 1.6rem;
                    color: #0d1623;
                    /* padding: 0 30px; */
                }
                @media (max-width: 768px) {
                    .StockQuickView__container {
                        width: 100%;
                        text-align: center;
                        color: white;
                        padding: 0;
                    }
                }
                .content__btn {
                    display: inline-block;
                    margin-bottom: 10px;
                    cursor: pointer;
                }
                img {
                    margin-left: 5px;
                    margin-top: -5px;
                    transition: all 0.3s;
                    transform: ${showContent ? 'rotate(-180deg)' : 'rotate(0)'};
                    cursor: pointer;
                }
                .StockQuickView__container .noData {
                    margin-top: 20px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid #17273d;
                }
                .StockQuickView__container p {
                    margin: 0;
                }
                @media (max-width: 768px) {
                    .StockQuickView__container p {
                        font-size: 2rem;
                    }
                }
                .StockQuickView__container .unrealized {
                    font-size: 3rem;
                    color: ${Number(unreal) >= 0 ? '#c43826' : '#22a16f'};
                    margin-top: 0.2rem;
                    font-weight: bold;
                }
                @media (max-width: 768px) {
                    .StockQuickView__container .unrealized {
                        margin-bottom: 20px;
                    }
                }
            `}</style>
        </>
    );
});
StockQuickView.propTypes = {
    unreal: PropTypes.string,
    currencyData: PropTypes.array,
    tableInfo: PropTypes.array,
};
export default StockQuickView;
