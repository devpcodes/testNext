import { useState } from 'react';
import { Button, message } from 'antd';
import ShareholdingTable from '../elements/ShareholdingTable';
import IconBtn from '../../../vipInventory/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../../../../store/components/layouts/action';
import { submitListService } from '../../../../../../services/components/goOrder/sb/submitService';
import { usePlatform } from '../../../../../../hooks/usePlatform';
import DelButton from '../../../vipOrderStatus/buttons/DelButton';

const ShareholdingPage = () => {
    const [showSell, setShowSell] = useState(false);
    const [selectData, setSelectData] = useState([]);
    const [controlReload, setControlReload] = useState(0);
    const userInfo = useSelector(store => store.user.currentAccount);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [submitListLoading, setSubmitListLoading] = useState(false);
    const platform = usePlatform();
    const dispatch = useDispatch();

    const sellBtnHandler = data => {
        console.log('dddd', data);
        if (data.length > 0) {
            setShowSell(true);
            setSelectData(data);
        } else {
            setShowSell(false);
            setSelectData([]);
        }
    };

    const sellClickHandler = async selectData => {
        if (selectData.length > 0) {
            dispatch(
                setModal({
                    title: '賣出確認',
                    content: `確認賣出${selectData.length}筆資料嗎？`,
                    visible: true,
                    type: 'confirm',
                    onOk: async () => {
                        dispatch(setModal({ visible: false }));
                        setSubmitListLoading(true);
                        try {
                            let res = await submitListService(userInfo, selectData, platform);
                            const sellSuccess = res.filter((item, i) => {
                                if (res[i] === 'True') {
                                    return true;
                                }
                            });
                            dispatch(
                                setModal({
                                    visible: true,
                                    content: `共賣出${selectData.length}筆資料，${sellSuccess.length}筆資料委託成功，${
                                        selectData.length - sellSuccess.length
                                    }筆資料委託失敗`,
                                    type: 'info',
                                    title: '系統訊息',
                                }),
                            );
                            setSubmitListLoading(false);
                            setSelectedRowKeys([]);
                            setShowSell(false);
                            setControlReload(prev => {
                                return (prev += 1);
                            });
                        } catch (error) {
                            message.info({
                                content: typeof error === 'string' ? error : '伺服器錯誤',
                            });
                            setSubmitListLoading(false);
                        }
                    },
                }),
            );
        }
    };

    const reFreshHandler = () => {
        setControlReload(prev => {
            return (prev += 1);
        });
    };

    const submitSuccessHandler = () => {
        setControlReload(prev => {
            return (prev += 1);
        });
    };
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-110px', width: '100%' }}>
                {showSell && (
                    // <Button
                    //     style={{ marginBottom: '10px', position: 'absolute', left: 0 }}
                    //     onClick={sellClickHandler.bind(null, selectData)}
                    // >
                    //     選取賣出
                    // </Button>
                    <DelButton
                        text="送單"
                        type={'submit'}
                        style={{ backgroundColor: '#10419c' }}
                        onClick={sellClickHandler.bind(null, selectData)}
                    />
                )}
                <IconBtn
                    onClick={reFreshHandler}
                    type={'refresh'}
                    style={{
                        verticalAlign: 'top',
                        marginBottom: '10px',
                        cursor: 'pointer',
                        position: 'absolute',
                        right: 0,
                    }}
                />
            </div>
            <ShareholdingTable
                showSellBtn={sellBtnHandler}
                controlReload={controlReload}
                submitSuccess={submitSuccessHandler}
                parentSelectedRowKeys={selectedRowKeys}
                submitListLoading={submitListLoading}
            />
        </div>
    );
};

export default ShareholdingPage;
