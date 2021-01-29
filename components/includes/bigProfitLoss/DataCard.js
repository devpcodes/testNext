import { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import theme from '../../../resources/styles/theme';

export const DataCard = memo(({ title, subTitle, number, styleType }) => {
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

    return (
        <>
            <article className="data__container">
                <div className="title__container">
                    <p className="data__title">{title}</p>
                    {!isMobile && <p className="data__sub-title">{subTitle}</p>}
                </div>
                <div className="data__number">{number}</div>
            </article>
            <style jsx global>{`
                p {
                    margin: 0;
                }
                .data__container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 110px;
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
                }
                .data__container .data__number {
                    height: 56px;
                    line-height: 56px;
                    font-size: 4rem;
                    font-weight: 600;
                    text-align: right;
                    color: #0d1623;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .data__container {
                        height: 90px;
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
    number: PropTypes.any.isRequired, // TODO: 串資料後，需改成 number
    styleType: PropTypes.string,
};

DataCard.defaultProps = {
    subTitle: '',
    styleType: '',
};

DataCard.displayName = 'DataCard';
