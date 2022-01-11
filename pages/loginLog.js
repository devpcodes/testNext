import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchLoginLog } from '../services/getLoginLog';
import { getToken } from '../services/user/accessToken';

function loginLog() {
    const [dataSource, setDataSource] = useState([]);
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

    return (
        <>
            <div className="login__content">
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
                    font-size: 14px;
                    font-weight: bold;
                }
                .title {
                    font-size: 24px;
                    font-weight: bold;
                }
            `}</style>
            <style jsx global>{`
                .ant-table-cell {
                    font-weight: bold;
                }
            `}</style>
        </>
    );
}

export default loginLog;
