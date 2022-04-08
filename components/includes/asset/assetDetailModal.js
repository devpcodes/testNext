import { useCallback, useState, memo } from 'react';
import { Tabs, Modal } from 'antd';

const AssetDetailModal = memo(({ isVisible, data, closeHandler }) => {
    const handleClose = () => {
        closeHandler();
    };
    return (
        <>
            <Modal
                title={`${data.name}`}
                visible={isVisible}
                destroyOnClose={true}
                maskClosable={true}
                onCancel={handleClose}
            >
                <p>{`${data.name}22`}</p>
            </Modal>

            <style jsx>{``}</style>
            <style jsx global>{`
                .ant-modal {
                    margin: 0;
                    padding: 0;
                    top: unset;
                    position: fixed;
                    bottom: 0;
                    min-width: 100%;
                }
            `}</style>
        </>
    );
});

export default AssetDetailModal;
