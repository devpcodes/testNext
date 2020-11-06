import PropTypes from 'prop-types';
import CurrencyBox from './CurrencyBox';
const SBQuickView = ({ unreal, deliveryTrial }) => {
    return (
        <>
            <div className="SBQuickView__container">
                <p className="quickView__title">海外證券未實現損益</p>
                <CurrencyBox key={'SBunreal'} currencyData={unreal} autoColor={true} />
                <p className="quickView__title currentDay">當日交割款試算</p>
                <CurrencyBox key={'SBunreal2'} currencyData={deliveryTrial} />
            </div>
            <style jsx>{`
                .SBQuickView__container {
                    font-size: 1.6rem;
                    color: #0d1623;
                }
                @media (max-width: 768px) {
                    .SBQuickView__container {
                        margin-top: 18px;
                        width: 100%;
                        text-align: center;
                        color: white;
                        padding: 0;
                    }
                }
                .quickView__title {
                    margin-bottom: 5px;
                }
                @media (max-width: 768px) {
                    .quickView__title {
                        color: white;
                        font-size: 2rem;
                    }
                }
                .currentDay {
                    margin-top: 20px;
                }
            `}</style>
        </>
    );
};
SBQuickView.propTypes = {
    unreal: PropTypes.array,
    deliveryTrial: PropTypes.array,
};
export default SBQuickView;
