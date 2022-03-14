import { useEffect, useState } from 'react';
import { Table, Radio, Modal } from 'antd';
import { fetchLoginLog } from '../services/getLoginLog';
import { getLoginAlertSettings } from '../services/user/getLoginAlert';
import { setLoginAlertSettings } from '../services/user/setLoginAlert';
import { getToken } from '../services/user/accessToken';
import { setModal } from '../store/components/layouts/action';
import { useDispatch } from 'react-redux';

function loginHistory() {
    const [dataSource, setDataSource] = useState([]);
    const [emailStates, setEmailStates] = useState('');
    const dispatch = useDispatch();

    useEffect(async () => {
        const res = await getLoginAlertSettings(getToken());
        setEmailStates(res.isEnabled);
    }, []);

    useEffect(async () => {
        const res = await fetchLoginLog(10, getToken());
        res.map(function (d, i) {
            d.TDATE = `${d.TDATE.slice(0, 4)}/${d.TDATE.slice(4, 6)}/${d.TDATE.slice(6, 8)}`;
            d.STIME = `${d.STIME.slice(0, 2)}:${d.STIME.slice(2, 4)}:${d.STIME.slice(4, 6)}`;
            d.key = i;
        });
        setDataSource(res);
    }, []);

    const columns = [
        {
            title: '日期',
            dataIndex: 'TDATE',
        },
        {
            title: '時間',
            dataIndex: 'STIME',
        },
        {
            title: '登入平台',
            dataIndex: 'SRC_NAME',
        },
        {
            title: '登入狀態',
            dataIndex: 'CODE_NAME',
        },
        {
            title: '登入IP',
            dataIndex: 'IP',
        },
    ];

    const options = [
        { label: '開啟E-mail通知', value: true },
        { label: '關閉E-mail通知', value: false },
    ];

    const changeHandler = val => {
        if (val.target.value === false) {
            dispatch(
                setModal({
                    title: '關閉登入通知',
                    content: `您將關閉登入通知服務，請妥善保管帳號密碼以維護您的交易安全。`,
                    visible: true,
                    type: 'confirm',
                    onOk() {
                        // call API
                        dispatch(
                            setModal({
                                visible: false,
                            }),
                        );
                        setEmailStates(val.target.value);
                        setLoginAlertSettings(val.target.value, getToken());
                    },
                }),
            );
        } else {
            // call API
            setEmailStates(val.target.value);
            setLoginAlertSettings(val.target.value, getToken());
        }
    };

    return (
        <>
            <div className="login__content">
                <h3 className="title">「登入通知設定」服務</h3>
                <Radio.Group
                    style={{ paddingBottom: 20 }}
                    options={options}
                    onChange={changeHandler}
                    value={emailStates}
                    defaultValue={emailStates}
                    buttonStyle="solid"
                    className="dealRadio"
                />
                <p className="desc">
                    <p>請注意 : </p>
                    <p>
                        1. 設定開啟：當您每次登入永豐金證券電子平台時，系統將自動發送登入成功/失敗E-mail通知。
                        <br />
                        <span className="red">
                            2.
                            當您於永豐金證券電子平台輸入身分證字號或密碼錯誤導致登入失敗，為保障您的權益，本公司系統仍會自動發送「登入失敗通知訊息」，此「登入失敗通知訊息」無法取消發送。
                        </span>
                    </p>
                </p>
                <h3 className="title">最近登入紀錄</h3>
                <p className="desc">
                    你可以在以下列表，查看最近十筆登入永豐金證券各平台的紀錄，若對登入紀錄有任何疑慮，請盡速與客服聯繫 :
                    02-6630-8899 / 0800-038-123
                </p>
                <Table dataSource={dataSource} columns={columns} className="logTable" />;
            </div>

            <style jsx>{`
                .login__content {
                    max-width: 1560px;
                    margin: 0 auto;
                    padding: 20px 15px 22px 15px;
                }
                .desc {
                    font-size: 16px;
                }
                .title {
                    font-size: 28px;
                    font-weight: bold;
                }
                .red {
                    color: #c43826;
                }
            `}</style>
            <style jsx global>{`
                .ant-table-cell {
                    font-size: 16px;
                }
                .ant-table-thead .ant-table-cell {
                    min-width: 66px;
                }
            `}</style>
        </>
    );
}

export default loginHistory;
