import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Cascader } from 'antd';
import { setModal } from '../../../../../store/components/layouts/action';
import { formatNum } from '../../../../../services/formatNum';
import SinoSelect from './SinoSelect';
const GoLoan = ({ visible, goLoanClose, allLoanMoney }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const currentAccount = useSelector(store => store.user.currentAccount);
    useEffect(() => {
        dispatch(
            setModal({
                visible,
                title: '借貸申請確認',
                content: renderContent(),
                noCloseIcon: true,
                noTitleIcon: true,
                onCancel: () => {
                    dispatch(setModal({ visible: false }));
                    goLoanClose();
                },
                okButtonProps: {
                    style: {
                        background: '#c43826',
                    },
                },
                bodyStyle: {
                    padding: '16px 24px',
                },
            }),
        );
    }, [visible]);

    const renderContent = () => {
        return (
            <div>
                <p className="loan__lable">可借款總額</p>
                <p className="loan__money">
                    {formatNum(allLoanMoney)} <span className="loan__unit">元</span>
                </p>
                {/* <p className="loan__lable">借貸目的</p> */}
                <Form
                    form={form}
                    name="goLoan"
                    onFinish={() => {}}
                    initialValues={{
                        loanSelect: '01',
                        loanMoney: allLoanMoney,
                        loanAccount:
                            currentAccount.bhname + ' ' + currentAccount.broker_id + '-' + currentAccount.account,
                    }}
                >
                    <Form.Item name="loanSelect" label="借貸目的">
                        <SinoSelect
                            style={{
                                borderRadius: '2px',
                                borderSolid: '1px #d7e0ef',
                                backgroundColor: '#fff',
                                width: '100%',
                                height: '39px',
                                color: '#0d1623',
                                fontSize: '16px',
                                marginTop: '0',
                                border: 'solid 1px #d7e0ef',
                            }}
                            data={[
                                { text: '投資上市櫃有價證券', value: '01' },
                                { text: '期貨交易', value: '02' },
                                { text: '不動產交易', value: '03' },
                                { text: '其他理財', value: '04' },
                                { text: '消費性支出', value: '05' },
                                { text: '資金週轉', value: '06' },
                                { text: '其他目的', value: '07' },
                            ]}
                            dropdownStyle={{
                                zIndex: 1000001,
                                color: '#0d1623',
                                fontSize: '16px',
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="loanMoney" label="動用金額">
                        <Input
                            addonBefore={<span>台幣</span>}
                            style={{
                                display: 'block',
                                width: '100%',
                                fontSize: '16px',
                                color: '#0d1623',
                            }}
                            suffix="元"
                        />
                    </Form.Item>
                    <Form.Item name="loanAccount" label="撥入帳號">
                        <Input
                            style={{
                                display: 'block',
                                width: '100%',
                                background: '#e6ebf5',
                                fontSize: '16px',
                                color: '#3f5372',
                                border: 'solid 1px #d7e0ef',
                            }}
                            disabled={true}
                        />
                    </Form.Item>
                </Form>
                <p className="loan__description">目前借貸申請僅限一天一筆，且限定整筆動用。</p>
            </div>
        );
    };
    return (
        <>
            <style jsx>{`
                .loan__description {
                    margin-top: 12px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #3f5372;
                }
            `}</style>
            <style global jsx>{`
                .confirm__container .ant-modal-header {
                    background: white !important;
                }
                .ant-modal-body .loan__lable {
                    color: #0d1623;
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0;
                }
                .ant-modal-body .loan__money {
                    font-size: 28px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    margin: 0;
                    margin-top: 12px;
                    margin-bottom: 14px;
                }
                .ant-modal-body .loan__unit {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #0d1623;
                }
                .ant-form-item-label > label {
                    color: #0d1623;
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0;
                }
                .ant-form-item-label > label:after {
                    content: '';
                }
                .ant-form-horizontal .ant-form-item-label {
                    display: block;
                    width: 100%;
                    text-align: left;
                    margin-bottom: 6px;
                }
                .ant-row {
                    margin-bottom: 7px;
                }
                .ant-input-group-addon:first-child {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    background: #d7e0ef;
                }
                .ant-input-group {
                    border: 1px solid #3f5372;
                }
                .ant-input-suffix {
                    font-size: 16px;
                    color: #0d1623;
                }
                .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
                    line-height: 35px;
                    height: 38px !important;
                }
                .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    height: 37px;
                }
                .loan__description {
                    margin-top: 12px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #3f5372;
                }
                #goLoan_loanMoney,
                .ant-input-affix-wrapper > input.ant-input {
                    color: #0d1623;
                    font-size: 16px;
                }
            `}</style>
        </>
    );
};

export default GoLoan;
