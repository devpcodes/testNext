import { useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { usePlatform } from '../../../../../../hooks/usePlatform';
import { submitListService } from '../../../../../../services/components/goOrder/sb/submitService';
import { setModal } from '../../../../../../store/components/layouts/action';
import { setOrderList } from '../../../../../../store/subBrokerage/action';
import IconBtn from '../../../vipInventory/IconBtn';
import DelButton from '../../../vipOrderStatus/buttons/DelButton';
import BatchTable from '../elements/BatchTable';

const BatchPage = () => {
    const [showBtn, setShowBtn] = useState(false);
    const [selectData, setSelectData] = useState([]);
    const [parentLoading, setParentLoading] = useState(false);
    const orderList = useSelector(store => store.subBrokerage.orderList);
    const userInfo = useSelector(store => store.user.currentAccount);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const platform = usePlatform();
    const dispatch = useDispatch();
    const selectItemHandler = useCallback(data => {
        if (data.length > 0) {
            setShowBtn(true);
            setSelectData(data);
        } else {
            setShowBtn(false);
            setSelectData([]);
        }
    });
    const delHandler = (selectData, orderList, type) => {
        dispatch(
            setModal({
                visible: true,
                title: '刪除確認',
                content: `確認刪除${selectData.length}筆資料嗎？`,
                onOk: () => {
                    const newOrderList = orderList.filter(item => {
                        const delData = selectData.findIndex(sItem => {
                            return item.key === sItem.key;
                        });
                        if (delData === -1) {
                            return true;
                        }
                    });

                    dispatch(setOrderList(newOrderList));
                    setSelectedRowKeys([]);
                    setSelectData([]);
                    setShowBtn(false);

                    dispatch(
                        setModal({
                            visible: false,
                        }),
                    );
                },
            }),
        );
    };

    const submitHandler = (selectData, type) => {
        if (selectData.length > 0) {
            dispatch(
                setModal({
                    title: '賣出送出',
                    content: type === 'signle' ? '確認送出此筆資料嗎？' : `確認送出${selectData.length}筆資料嗎？`,
                    visible: true,
                    type: 'confirm',
                    onOk: async () => {
                        dispatch(setModal({ visible: false }));
                        let subData = dataHandler(selectData);
                        try {
                            setParentLoading(true);
                            let res = await submitListService(userInfo, subData, platform, true);
                            setParentLoading(false);
                            const sellSuccess = subData.filter((item, i) => {
                                if (res[i] === 'True') {
                                    return true;
                                }
                            });
                            // console.log('success...', keepHandler(sellSuccess));
                            const newData = keepHandler(sellSuccess);
                            dispatch(setOrderList(newData));
                            setSelectedRowKeys([]);
                            setSelectData([]);
                            setShowBtn(false);
                            dispatch(
                                setModal({
                                    visible: true,
                                    content: `共送出${selectData.length}筆資料，${sellSuccess.length}筆資料送出成功，${
                                        selectData.length - sellSuccess.length
                                    }筆資料送出失敗`,
                                    type: 'info',
                                    title: '系統訊息',
                                }),
                            );
                            // if (selectData.length > 1) {
                            //     dispatch(
                            //         setModal({
                            //             visible: true,
                            //             content: `共送出${selectData.length}筆資料，${
                            //                 sellSuccess.length
                            //             }筆資料送出成功，${selectData.length - sellSuccess.length}筆資料送出失敗`,
                            //             type: 'info',
                            //             title: '系統訊息',
                            //         }),
                            //     );
                            // } else {
                            //     dispatch(
                            //         setModal({
                            //             visible: true,
                            //             content: '委託已送出',
                            //             type: 'info',
                            //             title: '系統訊息',
                            //         }),
                            //     );
                            // }
                        } catch (error) {
                            setParentLoading(false);
                            dispatch(
                                setModal({
                                    visible: true,
                                    content: error,
                                    type: 'info',
                                    title: '系統訊息',
                                }),
                            );
                        }
                    },
                }),
            );
        }
    };

    const refreshHandler = () => {
        setRefresh(prev => {
            return (prev += 1);
        });
    };

    const dataHandler = data => {
        const newData = data.map(item => {
            item.price = item.Price;
            item.qty = item.Qty;
            item.exch = item.Exchid;
            if (item?.GTCDate) {
                item.useGtc = true;
                item.gtcDate = moment(item.GTCDate).format('YYYY-MM-DD');
            }
            return item;
        });
        return newData;
    };

    const keepHandler = data => {
        // let newData = data.filter(item => {
        //     if (item.isKeep) {
        //         return true;
        //     }
        // });
        if (data.length === 0) {
            return orderList;
        }

        let delKeys = [];
        orderList.forEach(item => {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (item.key === element.key) {
                    if (!!element.isKeep == false) {
                        delKeys.push(item.key);
                    }
                }
            }
        });
        const newData = orderList.filter(item => {
            for (const dkey of delKeys) {
                if (item.key === dkey) {
                    return false;
                }
            }
            return true;
        });

        console.log('newData', newData);
        return newData;
    };

    return (
        <div style={{ position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    top: '-110px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    {showBtn && (
                        <>
                            <DelButton text="刪單" onClick={delHandler.bind(null, selectData, orderList)} />
                            <DelButton
                                text="送單"
                                type={'submit'}
                                style={{ backgroundColor: '#10419c', marginLeft: '18px' }}
                                onClick={submitHandler.bind(null, selectData, orderList)}
                                loading={parentLoading}
                            />
                        </>
                    )}
                </div>
                <IconBtn type={'refresh'} style={{ verticalAlign: 'top' }} onClick={refreshHandler} />
            </div>
            <BatchTable
                selectItemHandler={selectItemHandler}
                submitHandler={submitHandler}
                refresh={refresh}
                parentLoading={parentLoading}
                parentSelectedRowKeys={selectedRowKeys}
            />
        </div>
    );
};

export default BatchPage;
