import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Collapse, message, Table } from 'antd';
import moment from 'moment';
import { setModal } from '../../../../../store/components/layouts/action';
import { formatNum } from '../../../../../services/formatNum';
import SinoSelect from './SinoSelect';
import { verifyHandler } from '../../../../../services/validator';
import { useCheckMobile } from '../../../../../hooks/useCheckMobile';
import { checkSignCA, sign } from '../../../../../services/webCa';
import { getToken } from '../../../../../services/user/accessToken';
import { postApply } from '../../../../../services/components/loznZone/calculation/postApply';
import icon from '../../../../../resources/images/components/loanZone/basic-help-circle (1).svg';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
const GoLoan = ({ visible, goLoanClose, allLoanMoney, goSubmitData }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { Panel } = Collapse;
    const isMobile = useCheckMobile();
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(
            setModal({
                visible,
                title: '借貸申請確認',
                content: renderContent(),
                noCloseIcon: true,
                noTitleIcon: true,
                onCancel: () => {
                    goLoanClose();
                    setTimeout(() => {
                        form.setFieldsValue({
                            loanMoney: allLoanMoney,
                        });
                    }, 300);
                    // dispatch(setModal({ visible: false }));
                },
                okButtonProps: {
                    style: {
                        background: '#c43826',
                    },
                },
                bodyStyle: {
                    padding: '16px 24px',
                },
                onOk: () => {
                    submitHandler();
                },
                centered: isMobile ? true : false,
            }),
        );
    }, [visible, allLoanMoney]);

    const submitHandler = async () => {
        try {
            const validate = await verifyLoanMoney(form.getFieldValue('loanMoney'));
            goLoanClose();
            dispatch(setModal({ visible: false }));
            setTimeout(() => {
                showNotInsinder();
            }, 200);
        } catch (error) {
            alert(false);
        }
    };

    const showNotInsinder = (loading = false) => {
        dispatch(
            setModal({
                visible: true,
                title: '簽署非內部人聲明',
                type: 'confirm',
                content: (
                    <>
                        <p
                            style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                fontStretch: 'normal',
                                fontStyle: 'normal',
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                            }}
                        >
                            標的股票非屬內部人聲明書
                        </p>
                        <p
                            style={{
                                margin: 0,
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                            }}
                        >
                            茲就甲方向乙方申請辦理不限用途款項借貸事宜，簽訂本契約如后：
                        </p>
                        <p
                            style={{
                                margin: 0,
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                            }}
                        >
                            第一條（法源）
                        </p>
                        <p
                            style={{
                                paddingLeft: 30,
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                            }}
                        >
                            甲乙雙方間基於不限用途款項借貸所生權利義務，悉依證券交易法令、證券商辦理不限用途款項借貸業務操作辦法（以下簡稱操作辦法）、金融消費者保護法及相關授權子法、臺灣證券交易所股份有限公司（以下簡稱證券交易所）、財團法人中華民國證券櫃檯買賣中心（以下簡稱證券櫃檯買賣中心）、臺灣集中保管結算所股份有限公司（以下簡稱集中保管結算所）相關章則、辦法、公告、函示及本契約之規定辦理；上開規定嗣經修訂變更者，亦同。甲方同意乙方、證券交易所、證券櫃檯買賣中心及證券主管機關
                            所指定之機構依相關法令規定蒐集、處理或國際傳輸及利用甲方
                            個人資料，並由乙方將甲方個人資料傳送至證券交易所、證券櫃 檯買賣中心及主管機關所指定之機構。
                        </p>
                    </>
                ),
                noCloseIcon: true,
                noTitleIcon: true,
                onCancel: () => {
                    goLoanClose();
                    dispatch(setModal({ visible: false }));
                },
                okButtonProps: {
                    style: {
                        background: '#c43826',
                        paddingLeft: '10px',
                        width: 150,
                    },
                    loading,
                },
                bodyStyle: {
                    padding: '16px 24px',
                    height: 400,
                    overflow: 'auto',
                },
                onOk: async () => {
                    showNotInsinder(true);
                    await submitData();
                },
                okText: '同意簽署',
                cancelText: '取消',
                centered: isMobile ? true : false,
                maskClosable: false,
            }),
        );
    };

    const submitData = async () => {
        const data = submitDataHandler(goSubmitData);
        const token = getToken();

        // if (checkSignCA(ca_content)) {
        //     const res = await postApply({
        //         branch: currentAccount.broker_id,
        //         account: currentAccount.account,
        //         applyFinancing: String(form.getFieldValue('loanMoney')),
        //         purpose: form.getFieldValue('loanSelect'),
        //         collaterals: data,
        //         ca_content,
        //         token,
        //     });
        // }
        try {
            let ca_content = sign(
                {
                    idno: currentAccount.idno,
                    broker_id: currentAccount.broker_id,
                    account: currentAccount.account,
                },
                true,
                token,
                true,
            );
            if (checkSignCA(ca_content)) {
                const moneyTime = await postApply({
                    branch: currentAccount.broker_id,
                    account: currentAccount.account,
                    applyFinancing: String(form.getFieldValue('loanMoney')),
                    purpose: form.getFieldValue('loanSelect'),
                    collaterals: data,
                    ca_content,
                    token,
                });
                goLoanClose();
                dispatch(setModal({ visible: false }));
                showLoanSuccessModal(moneyTime);
            }
            // const moneyTime = await postApply({
            //     branch: currentAccount.broker_id,
            //     account: currentAccount.account,
            //     applyFinancing: String(form.getFieldValue('loanMoney')),
            //     purpose: form.getFieldValue('loanSelect'),
            //     collaterals: data,
            //     ca_content: null,
            //     token,
            // });
        } catch (error) {
            // console.log('error',error)
            goLoanClose();
            dispatch(setModal({ visible: false }));

            setTimeout(() => {
                message.error(error);
                // showLoanSuccessModal('20220429143000');
            }, 500);
        }
    };
    const replacer = (match, p1, p2, p3, p4, p5, offset, string) => {
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        return p1 + '/' + p2 + '/' + p3 + ' ' + p4 + ':' + p5;
    };
    const showLoanSuccessModal = moneyTime => {
        // console.log('moneyTime', moneyTime, moment(Number(moneyTime)).format('YYYY/MM/DD'));
        moneyTime = moneyTime.substr(0, 12).replace(/([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/, replacer);
        dispatch(
            setModal({
                visible: true,
                title: '借貸申請送出',
                type: 'confirm',
                noCloseIcon: true,
                noTitleIcon: true,
                centered: isMobile ? true : false,
                cancelText: '查看明細',
                okButtonProps: {
                    style: {
                        background: '#c43826',
                    },
                },
                cancelButtonProps: {
                    style: {
                        paddingLeft: '11px',
                    },
                },
                onOk: () => {
                    goLoanClose();
                    dispatch(setModal({ visible: false }));
                },
                content: (
                    <>
                        <p>您的借貸申請已送出，款項如匯入完成將以簡訊或電子郵件進行通知。</p>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 5,
                            }}
                        >
                            <span
                                style={{
                                    color: '#3f5372',
                                    fontSize: '16px',
                                }}
                            >
                                借款金額
                            </span>
                            <span
                                style={{
                                    color: '#0d1623',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {formatNum(form.getFieldValue('loanMoney')) + ' ' + '元'}
                            </span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Collapse
                                style={{
                                    fontSize: '16px',
                                    color: '#3f5372',
                                    position: 'relative',
                                    width: '100%',
                                }}
                                bordered={false}
                                ghost={true}
                                expandIconPosition={'right'}
                                expandIcon={() => {
                                    return (
                                        <>
                                            <img
                                                src={icon}
                                                style={{
                                                    position: 'absolute',
                                                    left: 100,
                                                    top: 5,
                                                }}
                                            />
                                            <span
                                                style={{
                                                    color: '#0d1623',
                                                    fontSize: '16px',
                                                    float: 'right',
                                                }}
                                            >
                                                {moneyTime} 後
                                            </span>
                                        </>
                                    );
                                }}
                            >
                                <Panel
                                    header="預估撥款時間"
                                    style={{
                                        color: '#3f5372',
                                        fontSize: '16px',
                                    }}
                                >
                                    {renderTimeTable()}
                                </Panel>
                            </Collapse>
                        </div>
                    </>
                ),
            }),
        );
    };
    const renderTimeTable = () => {
        const columns = [
            {
                title: '申請時間',
                width: 100,
                dataIndex: 'applyTime',
                key: 'applyTime',
                align: 'center',
            },
            {
                title: '擔保品撥轉',
                width: 100,
                dataIndex: 'collateral',
                key: 'collateral',
                align: 'center',
            },
            {
                title: '撥款時間',
                width: 100,
                dataIndex: 'time',
                key: 'time',
                align: 'center',
            },
        ];
        const data = [
            { applyTime: '12:00 前', collateral: '當日下午', time: '當日下午14:30' },
            { applyTime: '12:00至14:00', collateral: '當日下午', time: '次日上午10:00' },
            { applyTime: '14:00至次日12:00', collateral: '次日下午', time: '次日下午14:30' },
        ];
        return (
            <div style={{ marginBottom: 10 }}>
                <Table
                    className="time__des"
                    columns={columns}
                    dataSource={data}
                    style={{ border: 'solid 1px #d7e0ef', marginTop: '10px' }}
                    pagination={false}
                    scroll={{ x: 330 }}
                />
            </div>
        );
    };

    const submitDataHandler = data => {
        const newData = data.map(element => {
            return {
                stockId: element.stockId,
                collateralQty: String(element.expectedCollateralShare),
            };
        });
        return newData;
    };

    const verifyLoanMoney = async loanMoney => {
        console.log('----loanMoney', loanMoney);
        var errors = form.getFieldsError();
        errors = errors.filter(val => {
            return val.errors.length !== 0;
        });

        if (errors.length > 0) {
            return new Promise((resolve, reject) => {
                reject();
            });
        }
        try {
            await verifyHandler(
                'checkLoanMoneyMax',
                loanMoney,
                allLoanMoney,
                `提醒您，本次您動用的金額折合可借款額度為110% (小於130%)，請確認是否進行借款？`,
            );
        } catch (error) {
            goLoanClose();
            dispatch(setModal({ visible: false }));

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    dispatch(
                        setModal({
                            visible: true,
                            title: '提醒',
                            type: 'confirm',
                            content: (
                                <>
                                    <p>{error}</p>
                                    <p>本次借款送出後，若有餘額動用需求，請臨櫃辦理或洽您的所屬業務員。02-12345678。</p>
                                </>
                            ),
                            noCloseIcon: true,
                            noTitleIcon: true,
                            onCancel: () => {
                                goLoanClose();
                                dispatch(setModal({ visible: false }));
                                reject();
                            },
                            okButtonProps: {
                                style: {
                                    background: '#c43826',
                                    paddingLeft: '11px',
                                },
                            },
                            cancelButtonProps: {
                                style: {
                                    paddingLeft: '10px',
                                },
                            },
                            bodyStyle: {
                                padding: '16px 24px',
                            },
                            onOk: () => {
                                resolve(true);
                            },
                            okText: '繼續送出',
                            cancelText: '返回修改',
                            centered: isMobile ? true : false,
                        }),
                    );
                }, 200);
            });
        }
    };

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
                    <Form.Item
                        name="loanMoney"
                        label="動用金額"
                        rules={[
                            {
                                //提醒您，借貸申請動用金額須以千元為單位，單筆最低1萬元。
                                validator: (rule, value) => {
                                    return verifyHandler('checkHaveLoanMoney', value, null, '請輸入動用金額。');
                                },
                            },
                            {
                                validator: (rule, value) => {
                                    return verifyHandler(
                                        'checkLoanMoney',
                                        value,
                                        allLoanMoney,
                                        `可輸入金額為 10,000~${formatNum(allLoanMoney)}元，需以千元為填寫單位。`,
                                    );
                                },
                            },
                        ]}
                    >
                        <Input
                            addonBefore={<span>台幣</span>}
                            style={{
                                display: 'block',
                                width: '100%',
                                fontSize: '16px',
                                color: '#0d1623',
                            }}
                            // onChange={(val) => {
                            //     console.log('vvvv', form.getFieldValue('loanMoney'))
                            // }}
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

                .ant-collapse > .ant-collapse-item > .ant-collapse-heade {
                    color: '#3f5372';
                }
                .ant-collapse-ghost > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
                    padding: 0;
                }
                .ant-collapse-borderless > .ant-collapse-item:last-child .ant-collapse-header {
                    padding: 0;
                    color: #3f5372;
                    font-size: 16px;
                }

                .time__des .ant-table-thead > tr > th {
                    padding: 6px;
                    background: #f2f5fa;
                    color: #3f5372;
                    font-size: 16px;
                }
                .time__des .ant-table-tbody > tr > td {
                    padding: 9px;
                    color: #0d1623;
                    font-size: 16px;
                }
            `}</style>
        </>
    );
};

export default GoLoan;
