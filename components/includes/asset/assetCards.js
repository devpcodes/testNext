import { useCallback, useState, memo, useEffect } from 'react';
import { Tabs, Card } from 'antd';
import { useSelector } from 'react-redux';
import { formatNum } from '../../../services/formatNum';
import Link from 'next/link';
import { getContentData, getTitleData } from './getData';
import { useRouter } from 'next/router';
import rightAllow from '../../../resources/images/pages/asset/ic-ic-arrow-chevron-right@2x.png';

const AssetCards = memo(({ type }) => {
    const router = useRouter();

    const CustomTitle = ({ type }) => {
        const titleDomData = getTitleData(type);
        return (
            <>
                <Link href={`/AssetDetail?type=${type}${router.query.nav === '0' ? '&nav=0' : ''}`}>
                    <a>
                        <img src={rightAllow} alt={'rightAllow'} className="card__right__allow"></img>
                        <div className="title">
                            {titleDomData?.title} <span className="currency">{titleDomData?.currency}</span>
                        </div>
                        <div className="amount">${titleDomData?.sum}</div>
                    </a>
                </Link>
            </>
        );
    };

    const GetCardDom = ({ type }) => {
        let dom = [];
        const cardDomData = getContentData(type);
        if (Object.keys(cardDomData).length > 0) {
            for (const [key, value] of Object.entries(cardDomData)) {
                dom.push(
                    <div className="amount__detail__items" key={key}>
                        <p className="amount__detail__items__title">{value.title}</p>
                        <p className={`amount__detail__items__value ${value.class}`}>{value.amount}</p>
                    </div>,
                );
            }
        }

        return <>{dom}</>;
    };

    return (
        <>
            <Card title={<CustomTitle type={type} />} className="cards__detail">
                <div className="asset__carousel__amount__detail">
                    <GetCardDom type={type} />
                </div>
            </Card>

            <style jsx>{`
                .asset__carousel__amount__detail {
                    display: flex;
                    flex-wrap: wrap;
                }
            `}</style>
            <style jsx global>{`
                .card__right__allow {
                    position: absolute;
                    right: 21px;
                    top: 27px;
                }
                .amount__detail__items {
                    width: 33%;
                }
                .amount__detail__items:nth-child(n + 4) {
                    margin-top: 20px;
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
                .cards__detail {
                    width: 48%;
                    min-height: 266px;
                    min-width: 400px;
                }
                .cards__detail:nth-child(n + 1) {
                    margin-top: 20px;
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
                    .amount__detail__items:nth-child(n + 4) {
                        margin-top: 0;
                    }
                    .cards__detail {
                        width: 100%;
                        min-width: auto;
                    }
                }
            `}</style>
        </>
    );
});

export default AssetCards;
