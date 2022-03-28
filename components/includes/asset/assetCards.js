import { useCallback, useState, memo } from 'react';
import { Tabs, Card } from 'antd';

const AssetCards = memo(({}) => {
    const CustomTitle = () => {
        return (
            <>
                <div>
                    <div className="title">
                        台股庫存總市值 <span className="currency">NTD</span>
                    </div>
                    <div className="amount">$16,954,147</div>
                </div>
            </>
        );
    };

    return (
        <>
            <Card title={<CustomTitle />} className="card__items">
                <div className="asset__carousel__amount__detail">
                    <div className="amount__detail__items">
                        <p className="amount__detail__items__title">總成本</p>
                        <p className="amount__detail__items__value">$10,651,657</p>
                    </div>
                    <div className="amount__detail__items">
                        <p className="amount__detail__items__title">未實現損益</p>
                        <p className="amount__detail__items__value win">$980,000</p>
                    </div>
                    <div className="amount__detail__items">
                        <p className="amount__detail__items__title">報酬率</p>
                        <p className="amount__detail__items__value win">1.26%</p>
                    </div>
                </div>
            </Card>

            <style jsx>{`
                .asset__carousel__amount__detail {
                    display: flex;
                }
                .amount__detail__items {
                    width: 33%;
                }
                .amount__detail__items__title {
                    font-size: 16px;
                    color: #3f5372;
                    margin-bottom: 0px;
                    font-weight: bold;
                }
                .amount__detail__items__value {
                    font-size: 16px;
                    color: #0d1623;
                    margin-bottom: 0px;
                    font-weight: bold;
                }
                .amount__detail__items__value.win {
                    color: #f45a4c;
                }
                .amount__detail__items__value.loss {
                    color: #22a16f;
                }

                @media (max-width: 768px) {
                    .asset__carousel__amount__detail {
                        display: block;
                    }
                    .amount__detail__items {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        margin-bottom: 4px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .card__items {
                    width: 540px;
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

                .ant-card-head {
                    background-color: #f2f5fa;
                }
            `}</style>
        </>
    );
});

export default AssetCards;
