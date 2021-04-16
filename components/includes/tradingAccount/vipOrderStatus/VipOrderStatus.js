import Control from '../vipInventory/Control';
import theme from '../../../../resources/styles/theme';
import VipOrderStatusTable from './VipOrderStatusTable';
import SumColmn from './SumColumn';

const VipOrderStatus = () => {
    return (
        <div className="vipOrderStatus__container">
            <div className="control__container">
                <h2 className="title">委託回報</h2>
                <Control text={''} columns={[]} dataSource={[]} />
            </div>
            <div className="sum__container">
                <SumColmn />
            </div>
            <VipOrderStatusTable />
            <style jsx>
                {`
                    .sum__container {
                        margin-bottom: 17px;
                        margin-top: -7px;
                    }
                    .vipOrderStatus__container {
                        padding-left: 10%;
                        padding-right: 10%;
                        padding-top: 50px;
                    }
                    @media (max-width: 1250px) {
                        .vipOrderStatus__container {
                            padding-left: 5%;
                            padding-right: 5%;
                        }
                    }
                    @media (max-width: 1111px) {
                        .vipOrderStatus__container {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                    }
                    .title {
                        font-size: 2.8rem;
                        color: #0d1623;
                        margin-top: -30px;
                        margin-bottom: 20px;
                    }
                    .control__container {
                        position: relative;
                    }
                    @media (max-width: ${theme.mobileBreakPoint}px) {
                        .vipOrderStatus__container {
                            padding-left: 0;
                            padding-right: 0;
                        }
                        .control__container {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                        .title {
                            font-size: 2rem;
                            font-weight: bold;
                            margin-top: -36px;
                            margin-bottom: 10px;
                        }
                        .sum__container {
                            padding: 0 20px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default VipOrderStatus;
