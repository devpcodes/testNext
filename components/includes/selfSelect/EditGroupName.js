import React, { useState, memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Input } from 'antd';
import { fetchUpdateSelectGroupName } from '../../../services/selfSelect/updateSelectGroupName';
import { getToken, getSocalToken } from '../../../services/user/accessToken';

const EditGroupName = memo(({ isVisible, selectGroupName, selectGroupID, closeHandler }) => {
    useEffect(() => {
        setIsModalVisible(isVisible);
    }, [isVisible]);

    // useEffect(()=>{
    //     console.log(selectGroupName, selectGroupID)
    // }, [selectGroupName, selectGroupID])
    const [isModalVisible, setIsModalVisible] = useState(isVisible);
    const [inputValue, setInputValue] = useState(selectGroupName);
    const socalLogin = useSelector(store => store.user.socalLogin);
    const textInput = useRef(null);
    const handleClose = () => {
        closeHandler();
    };

    const handleConfirm = async () => {
        const isSocalLogin = Object.keys(socalLogin).length > 0 ? true : false;
        const token = isSocalLogin ? getSocalToken() : getToken();
        const res = await fetchUpdateSelectGroupName(selectGroupID, textInput.current.state.value, isSocalLogin, token);
        if (res.success && res.message === 'OK') {
            closeHandler(false);
        }
    };

    const groupOnchangeHandler = e => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <Modal
                visible={isModalVisible}
                zIndex="1050"
                title="編輯自選名稱"
                closable={false}
                maskClosable={false}
                destroyOnClose={true}
                width={320}
                className="edit__select__group__name"
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
                <div className="edit__block">
                    <Input
                        placeholder="編輯自選名稱"
                        ref={textInput}
                        value={inputValue}
                        onChange={groupOnchangeHandler}
                        maxLength="6"
                    />
                </div>
            </Modal>
            <style jsx>{`
                .edit__block {
                    padding: 20px 30px;
                }
            `}</style>
            <style jsx global>{`
                .ant-modal-title {
                    text-align: center;
                    font-size: 1.6 rem;
                    font-weight: bold;
                }
                .group__btn,
                .group__btn:focus,
                .group__btn:focus {
                    background-color: #c43826;
                    border: solid 1px rgba(37, 74, 145, 0);
                    width: 86px;
                    height: 40px;
                }
                .group__cancel,
                .group__cancel:focus,
                .group__cancel:hover {
                    background-color: #fff;
                    border: solid 1px #e6ebf5;
                    color: #333;
                }
                .edit__select__group__name .ant-modal-body {
                    padding: 24px;
                }
            `}</style>
        </>
    );
});

export default EditGroupName;
