import CalcuItem from './CalcuItem';
import Line from './Line';
import icon from '../../../../resources/images/components/subscriptionCalculation/basic-help-circle (4).svg';
import SinoBtn from '../../loan/Collateral/elements/SinoBtn';
const CalcuInfo = () => {
    return (
        <div className="info__container">
            <p className="info__title">申購便利通合計</p>
            <div>
                <span className="info__num">20,120</span>
                <span className="info__unit">元</span>
            </div>
            <Line style={{ marginTop: '20px' }} />
            <CalcuItem
                style={{ marginTop: '20px' }}
                label="申購款"
                val="20,120"
                icon={icon}
                tooltip={
                    <div>
                        <p style={{ marginBottom: '0' }}>
                            1.申購款：申購款＝（申購價*申購張數）+申購處理費(20元) ＋中籤通知郵寄工本費(50元)。
                        </p>
                        <p style={{ marginBottom: '0' }}>
                            2.退款：未中籤及不合格申購於退款日將郵寄工本費及認購款退回，申購處理費不予退回。
                        </p>
                        <p style={{ marginBottom: '0' }}>
                            3.申購人銀行存款不足，不夠支付交割價款及預扣價款時，以交割價款為優先扣款。
                        </p>
                    </div>
                }
            />
            <CalcuItem
                style={{ marginTop: '12px' }}
                label="金流服務費"
                val="50"
                icon={icon}
                tooltip={'提供申購借款相關金流服務與平台使用 ，以次計費完成銀行動用即收取不予退回。'}
            />
            <Line style={{ marginTop: '20px' }} />
            <CalcuItem style={{ marginTop: '20px' }} label="可動用金額" val="350,070" />
            <SinoBtn
                text={'借款紀錄'}
                style={{
                    display: 'block',
                    // border: '1px solid #d7e0ef',
                    outline: 'none',
                    width: '100%',
                    height: '48px',
                    fontSize: '16px',
                    padding: '9px 19px 9px 20px',
                    borderRadius: '2px',
                    backgroundColor: '#c43826',
                    color: 'white',
                    verticalAlign: 'top',
                    marginTop: '20px',
                    borderRadius: '2px',
                }}
            />
            <p className="description mr">預約成功將於截止日2022/06/06動用</p>
            <div className="footer">
                <span className="description">還沒有申購便利通帳戶？</span>
                <a className="link">立即開戶 ></a>
            </div>
            <style jsx>{`
                .info__container {
                    padding: 24px 30px;
                    border: solid 1px #d7e0ef;
                    border-radius: 2px;
                }
                .info__title {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                    margin-bottom: 0;
                }
                .info__num {
                    font-size: 28px;
                    font-weight: bold;
                    color: #0d1623;
                }
                .info__unit {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #0d1623;
                    padding-left: 4px;
                }
                .description {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                    text-align: center;
                    margin-bottom: 0;
                }
                .mr {
                    margin-top: 20px;
                }
                .footer {
                    text-align: center;
                    margin-top: 4px;
                }
                .link {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #daa360;
                }
                @media (max-width: 768px) {
                    .description {
                        font-size: 15px;
                    }
                    .info__container {
                        border-left: none;
                        border-right: none;
                        padding: 16px;
                    }
                }
            `}</style>
        </div>
    );
};

export default CalcuInfo;
