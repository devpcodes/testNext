import { useCallback, useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import Control from '../vipInventory/Control';
import theme from '../../../../resources/styles/theme';
import VipOrderStatusTable from './VipOrderStatusTable';
import SumColmn from './SumColumn';
import DelButton from './buttons/DelButton';
import { delOrderList } from '../../../../services/components/tradingAccount/delOrderList';

const VipOrderStatus = () => {
    const [showDel, setShowDel] = useState(false);
    const [showSum, setShowSum] = useState(false);
    const [controlText, setControlText] = useState('');
    const [selectData, setSelectData] = useState([]);
    const [controlReload, setControlReload] = useState(0);
    const userInfo = useSelector(store => store.user.currentAccount);

    const delBtnHandler = useCallback(data => {
        if (data.length > 0) {
            setShowDel(true);
            setSelectData(data);
        } else {
            setShowDel(false);
            setSelectData([]);
        }
    });

    const delClickHandler = useCallback(() => {
        if (selectData.length > 0) {
            Modal.confirm({
                title: '刪單確認',
                content: `確認刪除${selectData.length}筆資料嗎？`,
                onOk: async () => {
                    let res = await delOrderList(userInfo, selectData, true);
                    const delSuccess = res.filter(item => {
                        if (item === 'True') {
                            return true;
                        }
                    });
                    setControlReload(prev => {
                        return (prev += 1);
                    });
                    Modal.info({
                        content: `共刪除${selectData.length}筆資料，${delSuccess.length}筆資料刪除成功，${
                            selectData.length - delSuccess.length
                        }筆資料刪除失敗`,
                    });
                },
            });
        }
    }, [selectData]);

    const reFreshHandler = useCallback(() => {
        setControlReload(prev => {
            return (prev += 1);
        });
    });

    const getSearchVal = useCallback(searchVal => {
        if (searchVal) {
            setShowSum(true);
        } else {
            setShowSum(false);
        }
    });

    const getPageTextHandler = useCallback(text => {
        setControlText(text);
    });

    return (
        <div className="vipOrderStatus__container">
            <div className="control__container">
                <h2 className="title">委託回報</h2>
                {showDel && (
                    <DelButton
                        text="刪單"
                        style={{ marginBottom: '22px', marginTop: '-4px' }}
                        onClick={delClickHandler}
                    />
                )}
                <Control text={controlText} columns={[]} dataSource={[]} onClick={reFreshHandler} />
            </div>
            {showSum && (
                <div className="sum__container">
                    <SumColmn />
                </div>
            )}
            {/* showDelBtn 有資料顯示刪單按鈕； controlReload 控制table重拉資料 */}
            <VipOrderStatusTable
                showDelBtn={delBtnHandler}
                controlReload={controlReload}
                getSearchVal={getSearchVal}
                getPageInfoText={getPageTextHandler}
            />
            <style jsx>
                {`
                    .sum__container {
                        margin-bottom: 17px;
                        margin-top: -7px;
                    }
                    .vipOrderStatus__container {
                        padding-left: 10%;
                        padding-right: 10%;
                        padding-top: 50px;
                    }
                    @media (max-width: 1250px) {
                        .vipOrderStatus__container {
                            padding-left: 5%;
                            padding-right: 5%;
                        }
                    }
                    @media (max-width: 1111px) {
                        .vipOrderStatus__container {
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
                        .vipOrderStatus__container {
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
                        .sum__container {
                            padding: 0 20px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default VipOrderStatus;
