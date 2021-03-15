import React, { useState, memo, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';

const EditSelectStock = memo(({ isVisible, handler }) => {
    useEffect(() => {
        setIsModalVisible(isVisible);
    }, [isVisible]);
    const [isModalVisible, setIsModalVisible] = useState(isVisible);

    const handleClose = () => {
        handler(false);
    };

    const handleConfirm = () => {
        alert('handleConfirm');
    };

    return (
        <>
            <Modal
                visible={isModalVisible}
                zIndex="14999"
                title="編輯自選名稱"
                closable={false}
                maskClosable={false}
                destroyOnClose={true}
                footer={[
                    <Button
                        key="group__cancel"
                        type="primary"
                        className="group__btn group__cancel"
                        onClick={handleClose}
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
                <Input placeholder="編輯自選名稱" />
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

export default EditSelectStock;
