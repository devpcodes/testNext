import go from '../../../../../resources/images/components/loanZone/arrow-chevron-down-copy (1).svg';
import info from '../../../../../resources/images/components/loanZone/ic-ic-attention-info-circle.svg';
import Bar from './Bar';
import { useDispatch } from 'react-redux';
import { setModal } from '../../../../../store/components/layouts/action';
import SinoBtn from '../../Collateral/elements/SinoBtn';
import VerticalTable from './VerticalTable';
const RepaymentBox = ({ style }) => {
    const dispatch = useDispatch();
    const clickHandler = () => {
        dispatch(
            setModal({
                visible: true,
                noCloseIcon: true,
                noTitleIcon: true,
                title: '如何申請動用',
                type: 'info',
                content: (
                    <>
                        <p style={{ marginBottom: '5px', color: '#0d1623' }}>
                            1. 每筆借款期限為6個月，到期可向分公司申請展延，或於借貸期間隨時申請還款。
                        </p>
                        <p style={{ marginBottom: '5px', color: '#0d1623' }}>2. 還款方式：</p>
                        <div style={{ marginLeft: '30px', color: '#0d1623' }}>
                            <p style={{ marginBottom: '5px' }}>
                                • <span style={{ fontWeight: 'bold' }}>賣股還款：</span>
                                透過線上或臨櫃交易賣出擔保品以償還該筆借款，扣除利息與相關費用並償還本金後，餘額將返還至您的交割帳戶。
                            </p>
                            <p>
                                • <span style={{ fontWeight: 'bold' }}>現金還款：</span>
                                請將還款金額轉帳或匯款至各分公司之償還帳戶，並去電至分公司進行還款指示，或以現金至臨櫃完成還款，還款費用以扣除利息與相關費用後再償還本金。
                            </p>
                        </div>
                        <VerticalTable />
                    </>
                ),
                okText: '確認',
                width: '600px',
            }),
        );
    };
    return (
        <div className="loan__container" style={style}>
            <div className="loan__head">
                <span className="loan__title">還款</span>
                <a className="loan__gobtn">
                    還款紀錄 <img className="loan__goIcon" src={go} />
                </a>
            </div>
            <div className="loan__content">
                <div>
                    <span className="canLoanMoney">應還款金額</span>
                    {/* <img className="canLoanIcon" src={info} /> */}
                    <span className="canLoanDesc">(含息)</span>
                </div>
                <p className="loan__money">$1,032,000</p>
                <div className="loan__contentBottom">
                    <div className="loan__left">
                        {/* <Bar /> */}
                        <div className="loan__text--box">
                            <div>
                                <span className="loan__money--lable">利息及其它費用</span>
                                <span className="loan__money--val">$53,000</span>
                            </div>
                        </div>
                    </div>

                    <div className="loan__right">
                        <SinoBtn
                            parentClass={'search__container'}
                            text={'立即還款'}
                            style={{
                                border: 'none',
                                outline: 'none',
                                width: '100%',
                                height: '40px',
                                fontSize: '16px',
                                padding: '9px 19px 9px 20px',
                                borderRadius: '2px',
                                backgroundColor: '#c43826',
                                color: 'white',
                                verticalAlign: 'top',
                            }}
                            onClick={clickHandler}
                        />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .loan__container {
                    height: 240px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                }
                .loan__head {
                    height: 39px;
                    border-bottom: solid 1px #d7e0ef;
                    background-color: #f2f5fa;
                    padding: 8px 12px 9px 30px;
                    display: flex;
                    justify-content: space-between;
                }
                .loan__title {
                    font-size: 16px;
                    color: #3f5372;
                }
                .loan__gobtn {
                    font-size: 14px;
                    letter-spacing: 0.35px;
                    color: #0d1623;
                }
                .loan__goIcon {
                    margin-top: -1px;
                    margin-left: 8px;
                }
                .loan__content {
                    padding: 30px 30px 16px 30px;
                }
                .canLoanMoney {
                    font-size: 16px;
                    letter-spacing: 0.5px;
                    color: #0d1623;
                }
                .canLoanIcon {
                    margin-left: 4px;
                    margin-top: -7px;
                    margin-right: 4px;
                }
                .canLoanDesc {
                    font-size: 16px;
                    color: #3f5372;
                }
                .loan__money {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                    color: #0d1623;
                }
                .loan__contentBottom {
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                }
                .loan__text--box {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 12px;
                }
                .loan__left {
                    flex: 4 0 0;
                    margin-right: 10%;
                }
                .loan__right {
                    flex: 1 0 0;
                    width: 100%;
                }
                .loan__footer {
                    height: 53px;
                    border-top: 1px solid #e6ebf5;
                    text-align: right;
                    padding-right: 28px;
                    padding-top: 11px;
                }
                .footer__text {
                    font-size: 16px;
                    color: #3f5372;
                    /* margin-top: 7px; */
                    display: inline-block;
                    margin-right: 12px;
                }
                .footer__link {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #c97b1d;
                }
                .loan__money--lable {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                    margin-right: 8px;
                }
                .loan__money--val {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                }
                .loan__all--label {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                    margin-right: 8px;
                }
                .loan__all--val {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                }
            `}</style>
        </div>
    );
};

export default RepaymentBox;
