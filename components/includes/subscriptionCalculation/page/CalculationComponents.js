import Breadcrumb from '../../breadcrumb/breadcrumb';
import Btn from '../../loan/overview/elements/Btn';
import CalcuInfo from '../elements/CalcuInfo';
import StockDetail from '../elements/StockDetail';

const CalculationComponents = () => {
    return (
        <>
            <Breadcrumb />
            <div className="calcu__head">
                <h1 className="calcu__title">申購試算</h1>
                <Btn type="info" text="試算說明" style={{ width: '121px', height: '40px' }} />
            </div>
            <div className="calcu__content">
                <div className="calcu__left">
                    <StockDetail />
                </div>
                <div className="calcu__right">
                    <CalcuInfo />
                </div>
            </div>
            <style jsx>{`
                .calcu__title {
                    font-size: 28px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.7px;
                    color: #0d1623;
                }
                .calcu__head {
                    display: flex;
                    justify-content: space-between;
                }
                .calcu__content {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                }
                .calcu__left {
                    flex: 2 0 0;
                    margin-right: 24px;
                }
                .calcu__right {
                    border: solid 1px #d7e0ef;
                    flex: 1 0 0;
                    background: white;
                }
            `}</style>
            <style global jsx>{`
                .page__container {
                    background-color: #f9fbff;
                    padding-bottom: 32px;
                }
            `}</style>
        </>
    );
};

export default CalculationComponents;
