import { useCallback, useState, memo } from 'react';
import AssetHeader from '../asset/header';
import { useSelector } from 'react-redux';

const AssetDetailOverview = memo(({}) => {
    return (
        <>
            <div className="asset__detail__overview">
                <div>
                    <div className="title">
                        台股庫存總市值 <span className="currency">NTD</span>
                    </div>
                    <div className="amount">$16,954,147</div>
                </div>
                <div className="asset__detail__summary">
                    <div className="asset__detail__summary__item">
                        <div className="asset__detail__summary__item__title">總成本</div>
                        <div className="asset__detail__summary__item__amount">$10,651,654</div>
                    </div>
                    <div className="line"></div>
                    <div className="asset__detail__summary__item">
                        <div className="asset__detail__summary__item__title">損益試算</div>
                        <div className="asset__detail__summary__item__amount win">$980,000</div>
                    </div>
                    <div className="line"></div>
                    <div className="asset__detail__summary__item">
                        <div className="asset__detail__summary__item__title">報酬率</div>
                        <div className="asset__detail__summary__item__amount win">1.26%</div>
                    </div>
                </div>
            </div>

            <style jsx>{`
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
                    width: 30%;
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
                @media (max-width: 860px) {
                    .asset__detail__overview {
                        flex-direction: column;
                    }
                    .asset__detail__summary {
                        margin-top: 10px;
                    }
                    .line {
                        margin: 7px 20px 0 20px;
                    }
                    .asset__detail__overview {
                        padding: 24px 20px 24px 20px;
                    }
                }
            `}</style>

            <style jsx global>{``}</style>
        </>
    );
});

export default AssetDetailOverview;
