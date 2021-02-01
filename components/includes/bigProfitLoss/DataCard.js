import { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import theme from '../../../resources/styles/theme';
import { formatNum } from '../../../services/formatNum';

export const DataCard = memo(({ title, subTitle, value, styleType, numberStyle }) => {
    const isMobile = useSelector(store => store.layout.isMobile);

    const getColor = styleType => {
        switch (styleType) {
            case 'buy':
                return '#f45a4c';
            case 'sell':
                return '#22a16f';
            default:
                return '#0d1623';
        }
    };

    const getNumberColor = value => {
        let color = '#0d1623';
        if (Number(value) == 0 || isNaN(Number(value))) {
            return color;
        }
        if (Number(value) > 0) {
            color = '#f45a4c';
        } else if (Number(value) < 0) {
            color = '#22a16f';
        }
        return color;
    };

    const formatValue = (value, numberStyle) => {
        if (typeof value !== 'number') {
            return '--';
        }

        let formatVal = formatNum(value);
        if (numberStyle && Number(value) > 0) {
            formatVal = `+${formatVal}`;
        }
        return formatVal;
    };

    return (
        <>
            <article className="data__container">
                <div className="title__container">
                    <p className="data__title">{title}</p>
                    {!isMobile && <p className="data__sub-title">{subTitle}</p>}
                </div>
                <div className="data__number">{formatValue(value, numberStyle)}</div>
            </article>
            <style jsx>{`
                p {
                    margin: 0;
                }
                .data__container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    margin: 16px 0;
                    padding: 28px 32px;
                    border: solid 1px #e6ebf5;
                    background-color: #f9fbff;
                }
                .title__container .data__title {
                    height: 28px;
                    line-height: 28px;
                    font-size: 2rem;
                    font-weight: 600;
                    color: ${getColor(styleType)};
                }
                .title__container .data__sub-title {
                    height: 22px;
                    line-height: 22px;
                    font-size: 1.6rem;
                    color: #a9b6cb;
                    margin-top: 4px;
                }
                .data__container .data__number {
                    height: 56px;
                    line-height: 56px;
                    font-size: 4rem;
                    font-weight: 600;
                    text-align: right;
                    color: ${numberStyle ? getNumberColor(value) : '#0d1623'};
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .data__container {
                        margin: 8px 0;
                        padding: 16px;
                        display: block;
                    }
                    .title__container .data__title {
                        height: 22px;
                        line-height: 22px;
                        font-size: 1.6rem;
                    }
                    .data__container .data__number {
                        height: 40px;
                        line-height: 40px;
                        font-size: 2.8rem;
                        font-weight: 600;
                        text-align: left;
                    }
                }
            `}</style>
        </>
    );
});

DataCard.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    value: PropTypes.number.isRequired,
    styleType: PropTypes.string,
    numberStyle: PropTypes.bool,
};

DataCard.defaultProps = {
    subTitle: '',
    styleType: '',
    numberStyle: false,
};

DataCard.displayName = 'DataCard';
