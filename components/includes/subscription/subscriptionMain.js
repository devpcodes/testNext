import { useCallback, useState, useEffect, memo } from 'react';
import SubscriptionHeader from '../subscription/subscriptionHeader';
import SubscriptionCards from '../subscription/subscriptionCards';
import SubscriptionAdv from '../subscription/subscriptionAdv';
import { useSelector } from 'react-redux';
import { fetchSubscriptionList } from '../../../services/components/subscription/getSubscriptionList';

const SubscriptionMain = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const [subscriptionData, setSubscriptionData] = useState([]);
    useEffect(async () => {
        const response = await fetchSubscriptionList();
        if (response.success && response.message === 'OK') {
            setSubscriptionData(response.result);
        }
    }, []);

    return (
        <>
            <div className="subscriptionMain__container">
                <SubscriptionHeader title="申購專區" />
                <div className="subscription__cards__block">
                    {!!subscriptionData &&
                        subscriptionData.map((stockData, stockIndex) => <SubscriptionCards stockData={stockData} />)}
                    <SubscriptionAdv />
                </div>
            </div>

            <style jsx>{`
                .subscriptionMain__container {
                    padding-left: 10%;
                    padding-right: 10%;
                    padding-top: 20px;
                }
                .subscription__cards__block {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                }
                @media (max-width: 768px) {
                    .subscriptionMain__container {
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
            `}</style>
        </>
    );
});

export default SubscriptionMain;
