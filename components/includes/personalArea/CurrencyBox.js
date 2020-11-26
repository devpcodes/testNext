import PropTypes from 'prop-types';
import { formatNum } from '../../../services/formatNum';

const CurrencyBox = ({ currencyData, autoColor, digits } = { autoColor: false }) => {
    const amountClassName = amount => {
        let amountClassName = 'amount';
        amount = Number(amount);
        if (autoColor) {
            if (amount > 0) {
                amountClassName += ' red';
            } else if (amount < 0) {
                amountClassName += ' green';
            } else {
                amountClassName = 'amount';
            }
        }
        return amountClassName;
    };

    const formatAmount = amount => {
        if (autoColor) {
            amount = Number(amount);
            if (amount > 0) {
                amount = formatNum(amount.toFixed(digits), digits);
            } else {
                amount = amount.toFixed(digits);
                amount = formatNum(amount, digits);
            }
        } else {
            amount = Number(amount);
            amount = amount.toFixed(digits);
            amount = formatNum(amount, digits);
        }
        return amount;
    };

    return (
        <>
            <div className="currency__box">
                {currencyData?.length > 0 ? (
                    currencyData.map((item, index) => (
                        <div className="currency__item" key={index}>
                            <span className="currency">{item.currency}</span>
                            <p className={amountClassName(item.amount)}>{formatAmount(item.amount)}</p>
                        </div>
                    ))
                ) : (
                    <p className="amount--no">--</p>
                )}
            </div>
            <style jsx>{`
                .currency {
                    border: 1px solid #a9b6cb;
                    border-radius: 3px;
                    font-size: 10px;
                    color: #a9b6cb;
                    padding: 0 1px;
                }
                @media (max-width: 768px) {
                    .currency {
                        border: 1px solid white;
                        color: white;
                    }
                }
                .amount {
                    margin-top: -5px;
                    font-size: 3rem;
                    font-weight: bold;
                }
                .amount--no {
                    color: #0b1728;
                    font-size: 3rem;
                    font-weight: bold;
                    margin-top: -1rem;
                }

                .currency__item {
                    display: block;
                }
                .currency__item p {
                    margin-bottom: 5px;
                }
                @media (max-width: 768px) {
                    .currency__item p {
                        color: #ffffff;
                    }
                    .amount {
                        margin-top: 0;
                    }
                    .amount--no {
                        margin-top: 0;
                        color: #ffffff;
                    }
                }
                /* .currency__item:first-child {
                    margin-right: 15px;
                } */
                /* @media (max-width: 768px) {
                    .currency__item {
                        margin-right: 15px;
                    }
                } */
                @media (max-width: 768px) {
                    .currency__box {
                        width: 100%;
                    }
                }
                .currency__item .green {
                    color: #22a16f;
                }
                .currency__item .red {
                    color: #c43826;
                }
            `}</style>
        </>
    );
};
CurrencyBox.propTypes = {
    autoColor: PropTypes.bool,
    currencyData: function (props) {
        const err = [];
        if (props.currencyData == null) {
            return new Error('需要currencyData');
        }
        if (!Array.isArray(props.currencyData)) {
            return new Error('需要陣列');
        }
        if (props.currencyData.length !== 0) {
            props.currencyData.forEach(obj => {
                if (obj.currency == null) {
                    err.push('error');
                }
                if (obj.amount == null) {
                    err.push('error');
                }
            });
        }
        return err.length !== 0 && new Error('沒有必要的key: currency, amount');
    },
    digits: PropTypes.number,
};

CurrencyBox.defaultProps = {
    digits: 2,
};

export default CurrencyBox;
