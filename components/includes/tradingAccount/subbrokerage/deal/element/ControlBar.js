import { useState } from 'react';
import { useDispatch } from 'react-redux';
import IconBtn from '../../../vipInventory/IconBtn';
import { Radio, Button } from 'antd';
import { setModal } from '../../../../../../store/components/layouts/action';

const options = [
    { label: '匯總', value: 'all' },
    { label: '明細', value: 'detail' },
];
const ControlBar = ({ reFreshHandler, typeChangeHandler, style }) => {
    const dispatch = useDispatch();

    const [val, setVal] = useState('detail');
    const changeHandler = e => {
        setVal(e.target.value);
        typeChangeHandler(e.target.value);
    };
    const clickHandler = () => {
        dispatch(
            setModal({
                content: (
                    <div style={{ height: '390px', overflow: 'auto' }}>
                        <p style={{ fontWeight: 'bold' }}>港股：</p>
                        <p className="info">
                            1.概算手續費 = 牌告手續費率1% + 其他費用0.12% + 3HKD稅費低收,各費用費率如下: -
                            手續費(價金*1%,最低手續費HKD100) - 印花稅 = 0.1%(小數點以下無條件進位) - 交易徵費 + 交易費 =
                            0.003% + 0.005%(小數點以下四捨五入) - 交收費 = 0.002%,最低收取HKD2。
                        </p>
                        <p className="info">2.正確手續費金額請於當日21:00後查詢對帳單資料。</p>
                        <p style={{ fontWeight: 'bold' }}>滬股通：</p>
                        <p className="info">
                            1.概算手續費=手續費+其他費用,各費用費率如下: - 手續費(價金*1%,最低手續費人民幣100)其他費用:
                            經手費 0.00487% / 證管費 0.002% / 過戶費 0.002% / 交易印花稅
                            0.1%(僅賣方收)以上取到小數點以下第2位; 無條件進位。
                        </p>
                        <p className="info">2.正確手續費金額請於當日21:00後查詢對帳單資料。</p>
                        <p style={{ fontWeight: 'bold' }}>美股：</p>
                        <p className="info">
                            1.概算手續費僅供參考，正確手續費金額以實際收取的手續費金額為主。概算手續費 = 手續費 +
                            其他費用,各費用費率如下: - 手續費(價金*1%,最低手續費USD100) - 證券交易稅(SEC Fee) =
                            0.00051%(依美國當局調整小數點以下無條件進位) - TAF每股0.000119(依美國當局調整最高5.95,
                            最低0.01)
                        </p>
                        <p className="info">2.正確手續費金額請於隔日10:00後查詢對帳單資料。</p>
                        <p className="info">3.成交時間所顯示之日期為交易市場當地日期。</p>
                        <p style={{ fontWeight: 'bold' }}>日股：</p>
                        <p className="info">手續費=(價金*1%, 最低手續費JPY 5000)。</p>
                    </div>
                ),
                type: 'info',
                visible: true,
                okText: '確定',
                title: '成交說明',
            }),
        );
    };
    return (
        <div className="dealControl__container" style={{ textAlign: 'left', ...style }}>
            <div className="left">
                <Radio.Group
                    style={{}}
                    options={options}
                    onChange={changeHandler}
                    value={val}
                    optionType="button"
                    buttonStyle="solid"
                    className="dealRadio"
                />
            </div>
            <div className="right">
                {/* <Button style={{ height: '40px', marginRight: '5px' }} onClick={clickHandler}>
                    說明
                </Button> */}
                <IconBtn onClick={clickHandler} type={'info'} style={{ verticalAlign: 'top' }} />
                <IconBtn
                    onClick={reFreshHandler}
                    type={'refresh'}
                    style={{ verticalAlign: 'top', marginLeft: '16px' }}
                />
            </div>
            <style jsx>{`
                .dealControl__container {
                    width: 100%;
                    /* display: flex;
                    justify-content: space-between; */
                }
                .left {
                    display: inline-block;
                }
                .right {
                    display: inline-block;
                    position: absolute;
                    right: 0;
                }
            `}</style>
            <style global jsx>{`
                .info {
                    color: #585858;
                }
                .confirm__container {
                    width: 70% !important;
                }
                .dealRadio .ant-radio-button-wrapper {
                    text-align: center;
                    width: 83px;
                    height: 40px;
                    line-height: 40px;
                }
                .dealRadio .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
                    color: #fff;
                    background: #c43826;
                    border-color: #c43826;
                }
                .dealRadio .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
                    color: #fff;
                    background: #c43826;
                    border-color: #c43826;
                }
                .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before {
                    background-color: white;
                }
                .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover:before {
                    background-color: white;
                }
                .dealRadio
                    .ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child {
                    border-right-color: white;
                }
                .dealRadio .ant-radio-button-wrapper:first-child {
                    border-right-color: white !important;
                }
                .dealRadio .ant-radio-button-wrapper:hover {
                    color: #0d1623;
                }
                .dealRadio .ant-radio-button-wrapper {
                    color: #0d1623;
                }
            `}</style>
        </div>
    );
};

export default ControlBar;
