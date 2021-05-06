import VipOrderStatus from '../components/includes/tradingAccount/vipOrderStatus/VipOrderStatus';

const DawhoOrderStatus = () => {
    return (
        <>
            <VipOrderStatus />
            <style global jsx>
                {`
                    .page__container {
                        background-color: #f9fbff;
                    }
                `}
            </style>
        </>
    );
};

export default DawhoOrderStatus;
