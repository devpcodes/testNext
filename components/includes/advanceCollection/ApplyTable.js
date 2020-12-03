import _ from 'lodash';
import { useRef, useEffect } from 'react';
import { Table } from 'antd';
import { useWindowSize } from '../../../hooks/useWindowSize';
const ApplyTable = ({ ...props }) => {
    const { width } = useWindowSize();
    const sortColumns = useRef([]);
    useEffect(() => {
        sortColumns.current = _.orderBy(props.columns, ['index'], ['asc']);
        console.log('columns', sortColumns.current);
    }, []);
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
    return (
        <div className="applyTable__container">
            {width <= 580 ? (
                <>
                    {props.dataSource.map((item, key) => {
                        return (
                            <div className="item__box" key={key}>
                                {sortColumns.current.map((column, key2) => {
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
