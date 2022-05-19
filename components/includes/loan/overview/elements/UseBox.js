import go from '../../../../../resources/images/components/loanZone/arrow-chevron-down-copy (1).svg';
import info from '../../../../../resources/images/components/loanZone/ic-ic-attention-info-circle.svg';
import { useDispatch } from 'react-redux';
import Bar from './Bar';
import SinoBtn from '../../Collateral/elements/SinoBtn';
import { formatNum } from '../../../../../services/formatNum';
import { setModal } from '../../../../../store/components/layouts/action';
const UseBox = ({ style, usedFinancing, financing }) => {
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
                    <p>
                        本服務提供您於每筆借款申請(抵押擔保品)時同步進行動用，若您有動用前次借款餘額之需求，請去電至分公司或臨櫃辦理。
                    </p>
                ),
                okText: '確認',
            }),
        );
    };
    return (
        <div className="loan__container" style={style}>
            <div className="loan__head">
                <span className="loan__title">動用</span>
            </div>
            <div className="loan__content">
                <div>
                    <span className="canLoanMoney">可動用金額</span>
                </div>
                <p className="loan__money">${formatNum(Number(financing) - Number(usedFinancing))}</p>
                <div className="loan__contentBottom">
                    <div className="loan__left">
                        <Bar min={usedFinancing} max={financing} />
                        <div className="loan__text--box">
                            <div>
                                <span className="loan__money--lable">已動用金額</span>
                                <span className="loan__money--val">${formatNum(usedFinancing)}</span>
                            </div>
                            <div>
                                <span className="loan__all--label">已申請借款</span>
                                <span className="loan__all--val">${formatNum(financing)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="loan__right">
                        <SinoBtn
                            parentClass={'search__container'}
                            text={'立即動用'}
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

export default UseBox;
