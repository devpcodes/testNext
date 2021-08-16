import React, { useState, memo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Checkbox, message } from 'antd';
import SortableList from './sortable';
import { fetchUpdateMultipleSelectStock } from '../../../services/selfSelect/updateMultipleSelectStock';
import { fetchUpdateSelectGroup } from '../../../services/selfSelect/updateSelectGroup';
import { getToken } from '../../../services/user/accessToken';
import { getSocalToken } from '../../../services/user/accessToken';

const AddSelectStock = memo(({ isVisible, handleClose, addSelectGroupWindowOpen }) => {
    const code = useSelector(store => store.goOrder.code);
    const type = useSelector(store => store.goOrder.type);
    const socalLogin = useSelector(store => store.user.socalLogin);
    const selectInfo = useSelector(store => store.goOrder.selectInfo);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const t30Exchange = useSelector(store => store.goOrder.T30Data.EXCHANGE);
    const [selectItem, setSelectItem] = useState([]); // 選項
    const [selectDefaultValue, setSelectDefaultValue] = useState([]); // 初始值
    const [selectCheckedValue, setSelectCheckedValue] = useState([]); // 選擇值

    useEffect(() => {
        setIsModalVisible(isVisible);
    }, [isVisible]);

    const [isModalVisible, setIsModalVisible] = useState(isVisible);

    const handleOk = async () => {
        let reqData = [];
        const isSocalLogin = Object.keys(socalLogin).length > 0 ? true : false;
        const token = isSocalLogin ? getSocalToken() : getToken();
        selectItem.forEach(item => {
            // 複委託期貨選擇權規格未出來。先 for 證券用。
            if (item.disabled === true) {
                return;
            }
            console.log(productInfo.exchange);
            let exchange;
            let market;
            switch (type) {
                case 'S':
                    exchange = t30Exchange ? t30Exchange : 'OES';
                    market = 'S';
                    break;
                case 'H':
                    exchange = productInfo.exchange;
                    market = 'SB';
                    break;
                default:
                    break;
            }
            const select = {
                selectId: item.value + '',
                symbol: code,
                exchange: exchange,
                market: market,
                action: selectCheckedValue.indexOf(item.value) === -1 ? 'D' : 'A',
            };
            reqData.push(select);
        });
        const res = await fetchUpdateMultipleSelectStock(reqData, isSocalLogin, token);
        handleCancel();
        if (res.success === true && res.message === 'OK') {
            message.success('成功編輯自選');
        }
    };

    const handleCancel = () => {
        handleClose(false);
        setIsModalVisible(false);
    };

    const addSelfSelect = () => {
        // handleClose(false);
        addSelectGroupWindowOpen();
    };

    useEffect(() => {
        if (selectInfo && selectInfo.data && Array.isArray(selectInfo.data)) {
            let options = [];
            let defaultValue = [];
            selectInfo.data.forEach(element => {
                const optionItems = {
                    label: `${element.selectName} (${element.selectCount})`,
                    value: element.selectId,
                    disabled: !element.isAllowAdd && !element.isExist,
                };
                options.push(optionItems);
                if (element.isExist) {
                    defaultValue.push(element.selectId);
                }
            });
            setSelectItem(options);
            setSelectDefaultValue(defaultValue);
            // setSelectCheckedValue(defaultValue);
        }
    }, [isModalVisible, selectInfo]);

    const onChange = checkedValues => {
        setSelectCheckedValue(checkedValues);
    };
    return (
        <>
            <Modal
                title={
                    <p className="title__box">
                        <span className="title">自選組合</span>
                        <span className="header__tool__btn add__btn" onClick={addSelfSelect}>
                            新增
                        </span>
                    </p>
                }
                className="add__select__self"
                visible={isModalVisible}
                onCancel={handleCancel}
                bodyStyle={{ maxHeight: 300, overflow: 'auto' }}
                zIndex="14998"
                maskClosable={false}
                destroyOnClose={true}
                footer={[
                    <Button
                        key="confirm"
                        type="primary"
                        className="confirm"
                        danger
                        onClick={handleOk}
                        // disabled={isEditSelfSelectGroup ? true : false}
                    >
                        確認
                    </Button>,
                ]}
            >
                {
                    <section className="add">
                        <ul className="self__select__list">
                            <Checkbox.Group
                                options={selectItem}
                                defaultValue={selectDefaultValue}
                                onChange={onChange}
                            />
                            <Checkbox.Group />
                        </ul>
                    </section>
                }
            </Modal>
            <style jsx>{`
                .self__select__list {
                    padding: 0;
                    margin: 0;
                }
                .add,
                .header__tool__btn.add__btn {
                }
                .edit,
                .header__tool__btn.complete__btn {
                }
                .self__select__items {
                    list-style: none;
                    margin: 11px 0;
                    font-size: 1.6rem;
                    font-weight: bold;
                }
                .title__box {
                    margin: 0;
                }
                .header__tool__btn {
                    display: block;
                    width: 56px;
                    height: 56px;
                    font-size: 1.6rem;
                    line-height: 56px;
                    text-align: center;
                    position: absolute;
                    right: 8px;
                    top: 0;
                    cursor: pointer;
                    color: #c43826;
                }
            `}</style>
            <style jsx global>{`
                .add__select__self .ant-modal-title {
                    text-align: center;
                    font-size: 1.6 rem;
                    font-weight: bold;
                }
                .add__select__self .ant-checkbox-checked .ant-checkbox-inner {
                    background-color: #c43826;
                    border-color: #c43826;
                }
                .add__select__self .ant-checkbox-input:focus + .ant-checkbox-inner,
                .add__select__self .ant-checkbox-wrapper:hover .ant-checkbox-inner,
                .add__select__self .ant-checkbox:hover .ant-checkbox-inner {
                    border-color: #c43826;
                }
                .add__select__self .ant-modal-close {
                    left: 0;
                }
                .add__select__self .ant-modal-footer {
                    text-align: center;
                }
                .confirm {
                    width: 98%;
                    height: 50px;
                    font-size: 1.6rem;
                    font-weight: bold;
                }
                .ant-checkbox-group-item {
                    display: block;
                    padding: 11px 0;
                    font-size: 1.6rem;
                    color: #0d1623;
                }
            `}</style>
        </>
    );
});

export default AddSelectStock;
