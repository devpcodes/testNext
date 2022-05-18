import Breadcrumb from '../../../breadcrumb/breadcrumb';
import Btn from '../elements/Btn';
import LoanBox from '../elements/LoanBox';

const OverviewComponent = () => {
    return (
        <div className="overview__container">
            <Breadcrumb />
            <div className="overview__head">
                <h1 className="overview__title">借款總覽</h1>
                <div className="overview__btns">
                    <Btn type="accountInfo" text="帳戶詳情" style={{ marginRight: 16 }} />
                    <Btn type="money" text="借貸商品" />
                </div>
            </div>
            <LoanBox />
            <style jsx>{`
                .overview__container {
                    width: 80%;
                    margin: 0 auto;
                    padding-top: 24px;
                }
                .overview__title {
                    font-size: 28px;
                    color: #0d1623;
                    font-weight: bold;
                }
                .overview__head {
                    margin-top: 24px;
                    display: flex;
                    justify-content: space-between;
                }
            `}</style>
            <style jsx global>{`
                .page__container {
                    background-color: #f9fbff;
                    padding-bottom: 32px;
                }
            `}</style>
        </div>
    );
};

export default OverviewComponent;
