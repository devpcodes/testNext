import React, { useState, memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Input } from 'antd';
import { fetchAddSelectGroup } from '../../../services/selfSelect/addSelectGroup';
import { getToken } from '../../../services/user/accessToken';

const AddSelectGroup = memo(({ isAddSelectGroupVisitable, handleClose, callBack }) => {
    const textInput = useRef(null);
    const [inputValue, setInputValue] = useState('我的自選');
    useEffect(() => {
        setInputValue('我的自選');
    }, []);
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

    const groupOnchangeHandler = e => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <Modal
                visible={isAddSelectGroupVisitable}
                zIndex="1060"
                width={320}
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
                        確定
                    </Button>,
                ]}
            >
                <div className="edit__block">
                    <Input
                        placeholder="新增自選組合"
                        ref={textInput}
                        value={inputValue}
                        onChange={groupOnchangeHandler}
                        maxLength="6"
                    />
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
                    width: 86px;
                    height: 40px;
                    font-size: 1.6 rem;
                    font-weight: bold;
                }
                .ant-modal-footer .group__confirm,
                .ant-modal-footer .group__confirm:focus,
                .ant-modal-footer .group__confirm:hover {
                    background-color: #c43826;
                    border: solid 1px rgba(37, 74, 145, 0);
                }
                .group__cancel,
                .group__cancel:focus,
                .group__cancel:hover {
                    background-color: #fff;
                    border: solid 1px #e6ebf5;
                    color: #333;
                }
            `}</style>
        </>
    );
});

export default AddSelectGroup;
