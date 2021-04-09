import { useEffect, useState, useCallback } from 'react';
import theme from '../../../../resources/styles/theme';
import Control from './Control';
import VipInventoryTable from './VipInventoryTable';
import _ from 'lodash';
const VipInventoryComp = () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const getColumns = useCallback(columns => {
        setColumns(columns);
    });

    const getData = useCallback(data => {
        var deep = _.cloneDeep(data);
        const formatData = deep.map(item => {
            item.qty = parseInt(item.qty);
            item.lastprice = Number(item.lastprice);
            return item;
        });
        setData(formatData);
    });

    return (
        <div className="vipInventory__container">
            <div className="control__container">
                <h2 className="title">庫存查詢</h2>
                <Control text={'1-15檔個股 (共49檔個股)'} columns={columns} dataSource={data} fileName={'庫存'} />
            </div>
            <VipInventoryTable getColumns={getColumns} getData={getData} />
            <style jsx>
                {`
                    .vipInventory__container {
                        padding-left: 10%;
                        padding-right: 10%;
                        padding-top: 50px;
                    }
                    @media (max-width: 1250px) {
                        .vipInventory__container {
                            padding-left: 5%;
                            padding-right: 5%;
                        }
                    }
                    @media (max-width: 1111px) {
                        .vipInventory__container {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                    }

                    .title {
                        font-size: 2.8rem;
                        color: #0d1623;
                        margin-top: -30px;
                        margin-bottom: 20px;
                    }
                    .control__container {
                        position: relative;
                    }
                    @media (max-width: ${theme.mobileBreakPoint}px) {
                        .vipInventory__container {
                            padding-left: 0;
                            padding-right: 0;
                        }
                        .control__container {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                        .title {
                            font-size: 2rem;
                            font-weight: bold;
                            margin-top: -36px;
                            margin-bottom: 10px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default VipInventoryComp;
