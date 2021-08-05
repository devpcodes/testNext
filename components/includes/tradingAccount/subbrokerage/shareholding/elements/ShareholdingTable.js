import { useState, useEffect } from 'react';
import { Button } from 'antd';
import AccountTable from '../../../vipInventory/AccountTable';

const ShareholdingTable = () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        const newColumns = [
            {
                title: '動作',
                dataIndex: 'active',
                key: 'active',
                width: 100,
                render: (text, record) => {
                    return (
                        <div>
                            <Button>賣出</Button>
                        </div>
                    );
                },
            },
        ];
        setColumns(newColumns);
    }, [data]);
    return (
        <div>
            <AccountTable
                scroll={{ x: 780, y: 600 }}
                columns={columns}
                dataSource={data}
                pagination={false}
                // loading={{
                //     indicator: (
                //         <div
                //             style={{
                //                 marginTop: '20px',
                //                 color: 'black',
                //                 fontSize: '1.6rem',
                //                 width: '100%',
                //                 transform: 'translateX(-49%) translateY(-54px)',
                //             }}
                //         >
                //             資料加載中...
                //         </div>
                //     ),
                //     spinning: (fetchData == null && !error) || controlReload != 0 ? true : false,
                // }}
            />
        </div>
    );
};

export default ShareholdingTable;
