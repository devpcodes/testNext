import PropTypes from 'prop-types';

import CurrencyBox from './CurrencyBox';

import theme from '../../../resources/styles/theme';

export const FutureQuickView = ({ openProfitLoss }) => {
    return (
        <>
            <div className="FutureQuickView__container">
                <p className="quickView__title">未平倉總損益</p>
                <CurrencyBox currencyData={openProfitLoss} autoColor={true} />
            </div>
            <style jsx>{`
                .FutureQuickView__container {
                    margin-top: 18px;
                    font-size: 1.6rem;
                    color: #0d1623;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .FutureQuickView__container {
                        width: 100%;
                        text-align: center;
                        color: white;
                        padding: 0;
                    }
                }
                .quickView__title {
                    margin-bottom: 5px;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .quickView__title {
                        color: white;
                        font-size: 2rem;
                    }
                }
            `}</style>
        </>
    );
};

FutureQuickView.propTypes = {
    openProfitLoss: PropTypes.array.isRequired,
};
