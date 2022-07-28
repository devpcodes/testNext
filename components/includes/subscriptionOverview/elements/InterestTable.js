import { useState, useEffect } from 'react';
// import { fetchInterestDetail } from '../../../../services/components/subscriptionOverview/fetchAccountStatus';
import { getToken } from '../../../../services/user/accessToken';
import AccountTable from '../../tradingAccount/vipInventory/AccountTable';

const InterestTable = () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        const newColumns = [
            {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
            },
        ];
    }, [columns]);
    const getData = async () => {
        // try {
        //     const res = await fetchInterestDetail(getToken());
        //     if (res?.length > 0) {
        //         setData(res);
        //     }
        // } catch (error) {}
    };
    return (
        <>
            <AccountTable columns={columns} dataSource={data} pagination={false} scroll={{ x: 650 }} />
        </>
    );
};

export default InterestTable;
