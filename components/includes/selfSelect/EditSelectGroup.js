import React, { memo } from 'react';
import { Modal, Button } from 'antd';
import SelectGroupList from './SelectGroupList';
const EditSelectGroup = memo(({ isEditSelectGroupVisitable, handleClose, callBack }) => {
    const handleCancel = () => {
        handleClose();
    };

    const handleOk = () => {
        handleClose();
    };

    // const afterModalClose = () => {
    //     console.log('afterModalClose');
    // };

    return (
        <>
            <Modal
                title={
                    <p className="title__box">
                        <span className="title">編輯組合</span>
                        {/* <span className="header__tool__btn edit__btn" onClick={editSelfSelect}>
                            編輯
                        </span> */}
                    </p>
                }
                className="add__select__self"
                visible={isEditSelectGroupVisitable}
                onCancel={handleCancel}
                bodyStyle={{ maxHeight: 300, overflow: 'auto' }}
                cancelButtonProps={{ style: { display: 'none' } }}
                zIndex="999"
                width={380}
                maskClosable={false}
                // afterClose={afterModalClose}
                destroyOnClose={true}
                footer={[
                    <Button key="confirm" type="primary" className="confirm" danger onClick={handleOk}>
                        完成
                    </Button>,
                ]}
            >
                <SelectGroupList callBack={callBack} />
            </Modal>
            <style jsx>{`
                .self__select__list {
                    padding: 0;
                    margin: 0;
                }
                .self__select__items {
                    list-style: none;
                    margin: 11px 0;
                    font-size: 1.6rem;
                    font-weight: bold;
                }
                p.title__box {
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
                    text-align: right;
                    padding: 20px;
                }
                .ant-modal-footer .confirm,
                .ant-modal-footer .confirm:focus,
                .ant-modal-footer .confirm:hover {
                    background-color: #c43826;
                    border: solid 1px rgba(37, 74, 145, 0);
                    width: 86px;
                    height: 40px;
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

export default EditSelectGroup;
