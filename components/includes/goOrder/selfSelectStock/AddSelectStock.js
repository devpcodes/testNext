import React, { useState, memo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Checkbox } from 'antd';
import SortableList from '../sortableList/sortable';
import { fetchQuickEditSelectMember } from '../../../../services/selfSelect/quickEditSelectMember';
import { fetchUpdateSelectGroup } from '../../../../services/selfSelect/updateSelectGroup';
import { getToken } from '../../../../services/user/accessToken';

const AddSelectStock = memo(({ isVisible, handleClose, isEdit, reloadSelect }) => {
    const code = useSelector(store => store.goOrder.code);
    const type = useSelector(store => store.goOrder.type);
    const [isEditSelfSelectGroup, setIsEditSelfSelectGroup] = useState(isEdit);
    const selectInfo = useSelector(store => store.goOrder.selectInfo);
    const [selectItem, setSelectItem] = useState([]); // 選項
    const [selectDefaultValue, setSelectDefaultValue] = useState([]); // 初始值
    const [selectCheckedValue, setSelectCheckedValue] = useState([]); // 選擇值
    const [selectCheckedSort, setSelectCheckedSort] = useState([]);

    useEffect(() => {
        setIsModalVisible(isVisible);
    }, [isVisible]);

    // useEffect(() => {

    // },[isEditSelfSelectGroup])

    const [isModalVisible, setIsModalVisible] = useState(isVisible);

    const handleOk = async () => {
        let reqData = [];
        selectItem.forEach(item => {
            // 複委託期貨選擇權規格未出來。先 for 證券用。
            if (item.disabled === true) {
                return;
            }

            let exchange;
            switch (type) {
                case 'S':
                    exchange = 'TAI';
                    break;
                default:
                    break;
            }
            const select = {
                selectId: item.value,
                symbol: code,
                exchange: exchange,
                market: type,
                action: selectCheckedValue.indexOf(item.value) === -1 ? 'D' : 'A',
            };
            reqData.push(select);
        });
        const res = await fetchQuickEditSelectMember(reqData, getToken());
        handleCancel();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        handleClose(false);
    };

    const editSelfSelect = () => {
        setIsEditSelfSelectGroup(true);
    };

    const completeSelfSelectGroupEdit = async () => {
        let sortArray = [];
        selectCheckedSort.forEach(data => {
            sortArray.push({ selectId: data.selectId });
        });
        await fetchUpdateSelectGroup(sortArray, getToken());
        await reloadSelect();
        setIsEditSelfSelectGroup(false);
    };

    const afterModalClose = () => {
        setIsEditSelfSelectGroup(false);
    };

    const handleCheckedSort = useCallback(sortArray => {
        setSelectCheckedSort(sortArray);
    });

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
                        <span className="header__tool__btn edit__btn" onClick={editSelfSelect}>
                            編輯
                        </span>
                        <span className="header__tool__btn complete__btn" onClick={completeSelfSelectGroupEdit}>
                            完成
                        </span>
                    </p>
                }
                className="add__select__self"
                visible={isModalVisible}
                onCancel={handleCancel}
                bodyStyle={{ maxHeight: 300, overflow: 'auto' }}
                cancelButtonProps={{ style: { display: 'none' } }}
                zIndex="14998"
                maskClosable={false}
                afterClose={afterModalClose}
                destroyOnClose={true}
                footer={[
                    <Button
                        key="confirm"
                        type="primary"
                        className="confirm"
                        danger
                        onClick={handleOk}
                        disabled={isEditSelfSelectGroup ? true : false}
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

                            {/* {selectInfo.data.map((d, i) => (
                                <li className="self__select__items" key={i}>
                                    <Checkbox className="self__select__checkbox" value={d.selectId} defaultChecked={d.isAllowAdd && d.isExist} disabled={!d.isAllowAdd}>
                                        {` ${d.selectName} (${d.selectCount})`}
                                    </Checkbox>
                                </li>
                            ))} */}
                        </ul>
                    </section>
                }

                {!!selectInfo && (
                    <section className="edit">
                        <SortableList reloadSelect={reloadSelect} handleCheckedSort={handleCheckedSort} />
                    </section>
                )}
            </Modal>
            <style jsx>{`
                .self__select__list {
                    padding: 0;
                    margin: 0;
                }
                .add,
                .header__tool__btn.edit__btn {
                    display: ${isEditSelfSelectGroup === true ? 'none' : 'block'};
                }
                .edit,
                .header__tool__btn.complete__btn {
                    display: ${isEditSelfSelectGroup === true ? 'block' : 'none'};
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
                    padding: 4px 0;
                }
            `}</style>
        </>
    );
});

export default AddSelectStock;
