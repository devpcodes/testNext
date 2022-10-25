import { useCallback, useState, memo } from 'react';
import AssetHeader from '../asset/header';
import { useSelector } from 'react-redux';
import { getContentData, getTitleData } from './getData';

const AssetDetailOverview = memo(({ type }) => {
    const CustomTitle = ({ type }) => {
        const titleDomData = getTitleData(type);
        return (
            <>
                <div>
                    <div className="title">
                        {titleDomData?.title} <span className="currency">{titleDomData?.currency}</span>
                    </div>
                    <div className="amount">${titleDomData?.sum}</div>
                </div>
            </>
        );
    };

    const GetDom = ({ type }) => {
        let dom = [];
        const domData = getContentData(type);
        if (Object.keys(domData).length > 0) {
            for (const [key, value] of Object.entries(domData)) {
                dom.push(
                    <>
                        <div className="asset__detail__summary__item">
                            <div className="asset__detail__summary__item__title">{value.title}</div>
                            <div className={`asset__detail__summary__item__amount ${value.class}`}>{value.amount}</div>
                        </div>
                        <div className="line"></div>
                    </>,
                );
            }
        }

        return <>{dom}</>;
    };

    return (
        <>
            <div className="asset__detail__overview">
                <CustomTitle type={type} />
                <div className="asset__detail__summary">
                    <GetDom type={type} />
                </div>
            </div>

            <style jsx>{``}</style>

            <style jsx global>{`
                .line:last-child {
                    display: none;
                }
                .line {
                    width: 1px;
                    height: 37px;
                    background: #d7e0ef;
                    margin: 18px 40px 0 40px;
                }

                .asset__detail__overview {
                    background: #fff;
                    border: solid 1px #d7e0ef;
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    padding: 24px 60px 24px 30px;
                }

                .title {
                    font-size: 16px;
                    color: #192639;
                    font-weight: bold;
                }

                .amount {
                    font-size: 24px;
                    font-weight: bold;
                    color: #0d1623;
                }

                .currency {
                    font-size: 12px;
                    font-weight: bold;
                    text-align: center;
                    color: #3f5372;
                    background-color: #d7e0ef;
                    padding: 2px 5px;
                    border-radius: 2px;
                    margin-left: 6px;
                }
                .asset__detail__summary {
                    display: flex;
                }

                .asset__detail__summary__item {
                    display: flex;
                    flex-direction: column;
                    align-self: flex-end;
                }

                .asset__detail__summary__item__title {
                    font-size: 16px;
                    color: #3f5372;
                    text-align: center;
                    font-weight: bold;
                }
                .asset__detail__summary__item__amount {
                    font-size: 16px;
                    color: #0d1623;
                    text-align: center;
                }
                .asset__detail__summary__item__amount.win {
                    color: #f45a4c;
                }
                .asset__detail__summary__item__amount.loss {
                    color: #22a16f;
                }
                @media (max-width: 1500px) {
                    .asset__detail__overview {
                        flex-direction: column;
                    }
                    .asset__detail__summary {
                        margin-top: 10px;
                    }
                }

                @media (max-width: 1200px) {
                    .asset__detail__overview {
                        flex-direction: column;
                    }
                    .asset__detail__summary {
                        flex-flow: wrap;
                    }
                    .asset__detail__summary__item {
                        width: 26%;
                        margin-top: 20px;
                    }
                    .line {
                        margin: 18px 5% 0 5%;
                    }
                    .line:nth-child(3n) {
                        display: none;
                    }
                }

                @media (max-width: 860px) {
                    .asset__detail__overview {
                        padding: 24px 20px 24px 20px;
                    }
                }
            `}</style>
        </>
    );
});

export default AssetDetailOverview;
