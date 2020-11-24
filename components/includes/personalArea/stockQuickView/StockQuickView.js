import React from 'react';
import PropTypes from 'prop-types';
import { QuickViewTable } from './QuickViewTable';
// import { useSelector } from 'react-redux';
// import MyTransition from '../../myTransition';
// import close from '../../../../resources/images/components/stockQuickView/close.png';
import CurrencyBox from '../CurrencyBox';

// eslint-disable-next-line react/display-name
const StockQuickView = React.memo(({ unreal, currencyData, tableInfo }) => {
    // const isMobile = useSelector(store => store.layout.isMobile);
    // const [showContent, setShowContent] = useState(false);

    // useEffect(() => {
    //     if (!isMobile) {
    //         setShowContent(true);
    //     }
    // }, [isMobile]);

    // const contentBtnClick = () => {
    //     if (noData()) {
    //         return;
    //     }
    //     setShowContent(prevState => !prevState);
    // };

    //判斷無資料
    const noData = () => {
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
                <p className="unrealized">
                    {Array.isArray(unreal) ? <CurrencyBox currencyData={unreal} autoColor={true} digits={0} /> : unreal}
                </p>
                {!noData() && (
                    <div className="settlementMoney__box">
                        <p>近三日交割款</p>
                        <div className="settlementMoney__content">
                            <QuickViewTable dataSource={tableInfo} />
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
                .StockQuickView__container {
                    font-size: 1.6rem;
                    color: #0d1623;
                }
                @media (max-width: 768px) {
                    .StockQuickView__container {
                        margin-top: 18px;
                        width: 100%;
                        text-align: center;
                        color: white;
                        padding: 0;
                    }
                }
                .StockQuickView__container .noData {
                    margin-top: 20px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid #17273d;
                }
                .StockQuickView__container p {
                    margin: 0;
                    font-weight: bold;
                }
                @media (max-width: 768px) {
                    .StockQuickView__container p {
                        font-size: 2rem;
                    }
                }
                .StockQuickView__container .unrealized {
                    font-size: 3rem;
                    color: #0b1728;
                    margin-top: -1rem;
                    font-weight: bold;
                }
                @media (max-width: 768px) {
                    .StockQuickView__container .unrealized {
                        margin-bottom: 5px;
                        color: #ffffff;
                    }
                }
                .settlementMoney__box p {
                    margin-bottom: 5px;
                }
                @media (max-width: 768px) {
                    .settlementMoney__box p {
                        margin-bottom: 10px;
                    }
                }
            `}</style>
        </>
    );
});
StockQuickView.propTypes = {
    // unreal: PropTypes.string,
    currencyData: PropTypes.array,
    tableInfo: PropTypes.array,
};
export default StockQuickView;
