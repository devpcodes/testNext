import React, { useState, memo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Checkbox } from 'antd';
import SortableList from '../sortableList/sortable';
import EditSelectStock from '../selfSelectStock/EditSelectStock';
import { setSelectInfo } from '../../../../store/goOrder/action';

const AddSelectStock = memo(({ isVisible, handleClose, isEdit, handleComplete }) => {
    const [isEditSelfSelectGroup, setIsEditSelfSelectGroup] = useState(isEdit);
    const [isEditSelfSelectNameVisitable, setIsEditSelfSelectNameVisitable] = useState(false);
    const selectInfo = useSelector(store => store.goOrder.selectInfo);

    useEffect(() => {
        setIsModalVisible(isVisible);
    }, [isVisible]);
    const [isModalVisible, setIsModalVisible] = useState(isVisible);

    const handleOk = () => {
        // 存檔
        alert(123456);
        setIsModalVisible(false);
        handleClose(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        handleClose(false);
    };

    const editSelfSelect = () => {
        setIsEditSelfSelectGroup(true);
    };

    const completeSelfSelectGroupEdit = () => {
        setIsEditSelfSelectGroup(false);
    };

    const afterModalClose = () => {
        setIsEditSelfSelectGroup(false);
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
                {!!selectInfo && (
                    <section className="add">
                        <ul className="self__select__list">
                            {selectInfo.data.map((d, i) => (
                                <li className="self__select__items" key={i}>
                                    <Checkbox key={d.id} defaultChecked={d.isExist}>
                                        {' '}
                                        {d.name}{' '}
                                    </Checkbox>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {!!selectInfo && (
                    <section className="edit">
                        <SortableList handleComplete={handleComplete} />
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
            `}</style>
        </>
    );
});

export default AddSelectStock;
