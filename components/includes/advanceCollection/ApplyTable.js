import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useWindowSize } from '../../../hooks/useWindowSize';
const ApplyTable = ({ ...props }) => {
    const { width } = useWindowSize();
    const [columnsData, setColumnsData] = useState([]);
    useEffect(() => {
        setColumnsData(_.orderBy(props.columns, ['index'], ['asc']));
    }, [props.columns]);

    const mobileColumnHandler = (column, item) => {
        if (column.render != null) {
            return (
                <div>
                    <span
                        style={{
                            display: 'inline-block',
                            width: '40%',
                            textAlign: 'right',
                            fontWeight: 'bold',
                            height: column.title === '' ? 0 : 'auto',
                        }}
                        className="label"
                    >
                        {column.title}
                    </span>
                    <div
                        style={{
                            display: 'inline-block',
                            width: column.title === '' ? '100%' : '60%',
                            paddingLeft: column.title === '' ? 0 : '10px',
                        }}
                    >
                        {column.render(item[column.dataIndex])}
                    </div>
                </div>
            );
        }
        return (
            <span
                style={{
                    display: 'inline-block',
                    width: '40%',
                    textAlign: 'right',
                    fontWeight: 'bold',
                }}
                className="label"
            >
                {column.title}
            </span>
        );
    };
    console.log('=====render=====02');
    return (
        <div className="applyTable__container">
            {width <= 580 ? (
                <>
                    {props.dataSource.map((item, key) => {
                        return (
                            <div className="item__box" key={key}>
                                {columnsData.length > 0 &&
                                    columnsData.map((column, key2) => {
                                        return (
                                            <div key={key2}>
                                                {mobileColumnHandler(column, item)}
                                                {column.render == null ? (
                                                    <span className="val">{item[column.dataIndex]}</span>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}
                </>
            ) : (
                <Table {...props} />
            )}
            <style jsx>{`
                .item__box .val {
                    display: inline-block;
                    width: 60% !important;
                    padding-left: 10px;
                }
                .item__box {
                    width: 100%;
                    height: auto;
                    background: rgb(232, 232, 232);
                    margin: 15px 0 15px 0;
                    border-radius: 5px;
                    padding: 15px;
                    position: relative;
                }
            `}</style>
            <style jsx global>{`
                .applyTable__container .ant-table-cell {
                    font-size: 18px;
                    text-align: center;
                    background: #eaeaea;
                    border-bottom: 1px solid #d4d4d4;
                }
                .ant-table-row:nth-last-child(1) .ant-table-cell {
                    border-bottom: none;
                }
            `}</style>
        </div>
    );
};

export default ApplyTable;
