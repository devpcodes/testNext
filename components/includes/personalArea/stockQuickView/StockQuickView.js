import { useState, useEffect } from 'react';
import { QuickViewTable } from './QuickViewTable';
import { formatNum } from '../../../../services/formatNum';
import {useSelector} from 'react-redux';
import MyTransition from '../../myTransition';
import close from '../../../../resources/images/components/stockQuickView/close.png';
export const StockQuickView = React.memo(({unreal, NTDTnetamt, USDTnetamt, CNYTnetamt, tableInfo}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if(!isMobile){
            setShowContent(true)
        }
    }, [isMobile]);
    const getUnreal = (unreal) => {
        if(Number(unreal) > 0){
            return '+' + formatNum(unreal)
        }else if(Number(unreal) <= 0){
            return formatNum(unreal)
        }else{
            return unreal;
        }
    }
    const contentBtnClick = () => {
        setShowContent((prevState)=> !prevState)
    }
    return (
        <>
            <div className="StockQuickView__container">
                <p>國內證券未實現損益</p>
                <p className="unrealized">{getUnreal(unreal)}</p>
                <div className="settlementMoney__box">
                    <p onClick={contentBtnClick} className="content__btn">{isMobile ? '近三日交割款' : '當日交割款'}</p>
                    {isMobile && <img src={close}/>}
                    <MyTransition
                        isVisible={showContent}
                        classNames={'maxHeight'}
                    >
                        <div className="settlementMoney__content">
                            <div className="currency__box">
                                <div className="currency__item">
                                    <span className="currency">NTD</span>
                                    <p className="amount">{formatNum(NTDTnetamt)}</p>
                                </div>
                                <div className="currency__item">
                                    <span className="currency">USD</span>
                                    <p className="amount">{formatNum(USDTnetamt)}</p>
                                </div>
                                <div className="currency__item">
                                    <span className="currency">CNY</span>
                                    <p className="amount">{formatNum(CNYTnetamt)}</p>
                                </div>
                            </div>
                            <QuickViewTable dataSource={tableInfo}/>
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
                @media (max-width:768px){
                    .StockQuickView__container{
                        width: 100%;
                        text-align: center;
                        color: white;
                        padding: 0;
                    }
                }
                .content__btn {
                    display: inline-block;
                    margin-bottom: 10px;
                }
                img {
                    margin-top: -5px;
                    transition: all .3s;
                    transform: ${showContent ? 'rotate(-180deg)' : 'rotate(0)'};
                }
                .StockQuickView__container p{
                    margin: 0;
                }
                @media (max-width:768px){
                    .StockQuickView__container p{
                        font-size: 2rem;
                    }
                }
                .StockQuickView__container .unrealized {
                    font-size: 3rem;
                    color: ${Number(unreal) >= 0 ? '#c43826' : '#22a16f'};
                    margin-top: 0.2rem;
                    font-weight: bold;
                }
                @media (max-width:768px){
                    .StockQuickView__container .unrealized {
                        margin-bottom: 20px;
                    }
                }

                .currency {
                    border: 1px solid #a9b6cb;
                    border-radius: 3px;
                    font-size: 10px;
                    color: #a9b6cb;
                    padding: 0 1px;
                }
                @media (max-width:768px){
                    .currency{
                        border: 1px solid white;
                        color: white;
                    }
                }
                .amount {
                    font-size: 2.6rem;
                    font-weight: bold;
                }
                .currency__item {
                    width: 50%;
                    display: inline-block;
                }
                @media (max-width:768px){
                    .currency__item{
                        float: left;
                    }
                }

                @media (max-width:768px){
                    .currency__box{
                        width: 100%;
                    }
                }
                /* .currency__box */
            `}</style>
        </>
    );
});
