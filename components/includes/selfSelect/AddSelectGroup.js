import React, { useState, memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Input } from 'antd';
import { fetchAddSelectGroup } from '../../../services/selfSelect/addSelectGroup';
import { getToken } from '../../../services/user/accessToken';

const AddSelectGroup = memo(({ isAddSelectGroupVisitable, handleClose, callBack }) => {
    const textInput = useRef(null);

    const handleCancel = () => {
        handleClose();
    };

    const handleConfirm = async () => {
        fetchAddSelectGroup(textInput.current.state.value, getToken());
        handleClose();
    };

    const afterModalClose = () => {
        callBack();
    };

    return (
        <>
            <Modal
                visible={isAddSelectGroupVisitable}
                zIndex="1060"
                title="新增自選組合"
                closable={false}
                maskClosable={false}
                destroyOnClose={true}
                afterClose={afterModalClose}
                footer={[
                    <Button
                        key="group__cancel"
                        type="primary"
                        className="group__btn group__cancel"
                        onClick={handleCancel}
                    >
                        取消
                    </Button>,
                    <Button
                        key="group__confirm"
                        type="primary"
                        className="group__btn group__confirm"
                        danger
                        onClick={handleConfirm}
                    >
                        確認
                    </Button>,
                ]}
            >
                <div className="edit__block">
                    <Input placeholder="新增自選組合" ref={textInput} />
                </div>
            </Modal>
            <style jsx>{``}</style>
            <style jsx global>{`
                .ant-modal-title {
                    text-align: center;
                    font-size: 1.6 rem;
                    font-weight: bold;
                }
                .group__btn {
                    width: 48%;
                    height: 50px;
                    font-size: 1.6 rem;
                    font-weight: bold;
                }
                .group__cancel,
                .group__cancel:focus,
                .group__cancel:hover {
                    background-color: #e6ebf5;
                    border: #e6ebf5;
                    color: #333;
                }
            `}</style>
        </>
    );
});

export default AddSelectGroup;
