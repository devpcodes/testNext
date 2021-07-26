import _ from 'lodash';
import { useEffect, useState, useRef } from 'react';
import { Table, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useWindowSize } from '../../../hooks/useWindowSize';
const ApplyTable = ({ ...props }) => {
    const { width } = useWindowSize();
    const [columnsData, setColumnsData] = useState([]);
    const [sortBtns, setSortBtns] = useState([]);
    const [sortKey, setSortKey] = useState('');
    const [sortType, setSortType] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const deep = useRef([]);

    useEffect(() => {
        sorterHandler(props.columns);
        setColumnsData(_.orderBy(props.columns, ['index'], ['asc']));
        setDataSource(props.dataSource);
        deep.current = _.cloneDeep(props.dataSource);
        setSortKey('');
        setSortType('');
    }, [props.columns, props.dataSource]);

    useEffect(() => {
        setSortKey('');
        setSortType('');
        setDataSource(deep.current);
    }, [width]);

    useEffect(() => {
        if (sortKey !== '') {
            const found = props.columns.find(item => {
                console.log(item);
                return item.key === sortKey;
            });
            // console.log(props.dataSource.sort(found.sorter), dataSource);
            const sortDeep = _.cloneDeep(deep.current);
            if (sortType === 'asc') {
                setDataSource(sortDeep.sort(found.sorter));
            } else if (sortType === 'desc') {
                const checkData = sortDeep.filter((item, index) => {
                    if (index !== 0) {
                        return item[sortKey] === sortDeep[index - 1][sortKey];
                    }
                });
                //每筆要排序的資料都相等，不做倒序
                if (checkData.length === sortDeep.length - 1) {
                    return;
                }
                setDataSource(sortDeep.sort(found.sorter).reverse());
            } else {
                console.log('deep', deep.current);
                setDataSource(deep.current);
            }
        }
    }, [sortKey, sortType]);

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
                        {column.render(item[column.dataIndex], item)}
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

    const sorterHandler = columns => {
        let sortColumns = [];
        sortColumns = columns.filter(item => {
            if (item.sorter != null) {
                return true;
            }
        });
        setSortBtns(sortColumns);
    };

    const sortClickHandler = key => {
        if (key === sortKey) {
            setSortType(type => {
                if (type === '') {
                    return 'asc';
                }
                if (type === 'asc') {
                    return 'desc';
                }
                if (type === 'desc') {
                    return '';
                }
            });
        } else {
            setSortType('asc');
            setSortKey(key);
        }
        setDataSource(deep.current);
    };

    const iconHandler = (sortKey, sortType, item) => {
        if (sortType === 'asc') {
            return (
                <ArrowUpOutlined
                    style={{
                        color: sortKey === item.key ? '#d23749' : '#a5a5a5',
                    }}
                />
            );
        }
        if (sortType === 'desc') {
            return (
                <ArrowDownOutlined
                    style={{
                        color: sortKey === item.key ? '#d23749' : '#a5a5a5',
                    }}
                />
            );
        }
        if (sortType === '' || sortKey === '') {
            return (
                <ArrowUpOutlined
                    style={{
                        color: '#a5a5a5',
                    }}
                />
            );
        }
    };

    return (
        <div className="applyTable__container">
            {width <= 580 || width == null ? (
                <>
                    {sortBtns.length > 0 && dataSource.length > 0 && (
                        <div style={{ textAlign: 'left', marginBottom: '10px', marginTop: '10px' }}>
                            {sortBtns.map(item => {
                                return (
                                    <Button
                                        type="primary"
                                        style={{
                                            display: 'inline-block',
                                            width: '90px',
                                            fontSize: '12px',
                                            marginRight: '3px',
                                            background: 'white',
                                            color:
                                                item.key === sortKey
                                                    ? sortType !== ''
                                                        ? '#d23749'
                                                        : '#828282'
                                                    : '#828282',
                                            border: '1px solid #e2e2e2',
                                        }}
                                        onClick={sortClickHandler.bind(null, item.key)}
                                        icon={
                                            item.key === sortKey ? (
                                                iconHandler(sortKey, sortType, item)
                                            ) : (
                                                <ArrowUpOutlined
                                                    style={{
                                                        color: '#a5a5a5',
                                                    }}
                                                />
                                            )
                                        }
                                    >
                                        {item.title}
                                    </Button>
                                );
                            })}
                        </div>
                    )}
                    {props?.loading?.spinning ? (
                        '資料讀取中...'
                    ) : dataSource.length > 0 ? (
                        dataSource.map((item, key) => {
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
                        })
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            {props?.loading?.spinning ? '資料讀取中...' : '查無資料'}
                        </div>
                    )}
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
