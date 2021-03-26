import React, { useState, memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Input } from 'antd';
import { fetchUpdateSelectGroupName } from '../../../../services/selfSelect/updateSelectGroupName';
import { getToken } from '../../../../services/user/accessToken';
import { getSocalToken } from '../../../../services/user/accessToken';

const EditSelectStock = memo(({ isVisible, editData, handler, reloadSelect }) => {
    useEffect(() => {
        setIsModalVisible(isVisible);
    }, [isVisible]);

    const [isModalVisible, setIsModalVisible] = useState(isVisible);
    const socalLogin = useSelector(store => store.user.socalLogin);
    const textInput = useRef(null);

    const handleClose = () => {
        handler(false);
    };

    const handleConfirm = async () => {
        const isSocalLogin = Object.keys(socalLogin).length > 0 ? true : false;
        const token = isSocalLogin ? getSocalToken() : getToken();
        const res = await fetchUpdateSelectGroupName(
            editData.selectId,
            textInput.current.state.value,
            isSocalLogin,
            token,
        );
        if (res.success && res.message === 'OK') {
            editData.selectName = textInput.current.state.value;
            reloadSelect(editData);
            handler(false);
        }
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
                <Input placeholder="編輯自選名稱" ref={textInput} />
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
