import { useCallback, useState, memo } from 'react';
import { Tabs, Modal } from 'antd';

const AssetDetailModal = memo(({ isVisible, data, closeHandler }) => {
    const handleClose = () => {
        closeHandler();
    };
    console.log(data);
    return (
        <>
            <Modal
                title={`${data.content?.modalTitle}`}
                visible={isVisible}
                destroyOnClose={true}
                maskClosable={true}
                onCancel={handleClose}
                footer={null}
            >
                <div className="info">
                    {data.title &&
                        data.title.map((d, i) => {
                            return (
                                <div className="info__block" key={i}>
                                    <div className="info__title">{d.title}</div>
                                    <div className="info__amount">{data.content[d.dataIndex]}</div>
                                </div>
                            );
                        })}
                </div>
            </Modal>

            <style jsx>{`
                .info {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }

                .info__block {
                    width: 45%;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
                .info__title {
                    font-size: 16px;
                    color: #3f5372;
                }
                .info__amount {
                    font-size: 16px;
                    color: #0d1623;
                }
            `}</style>
            <style jsx global>{`
                .ant-modal {
                    margin: 0;
                    padding: 0;
                    top: unset;
                    position: fixed;
                    bottom: 0;
                    min-width: 100%;
                }

                .ant-modal-title {
                    font-size: 20px;
                    color: #0d1623;
                    font-weight: bold;
                    letter-spacing: 0.5px;
                }
            `}</style>
        </>
    );
});

export default AssetDetailModal;
