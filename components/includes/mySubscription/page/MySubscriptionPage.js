import SubscriptionHeader from '../../subscription/subscriptionHeader';

const MySubscriptionPage = () => {
    return (
        <div>
            <SubscriptionHeader onSelect={() => {}} />
            <style global jsx>{`
                .page__container {
                    background-color: #f9fbff;
                    padding-bottom: 32px;
                }
            `}</style>
        </div>
    );
};

export default MySubscriptionPage;
