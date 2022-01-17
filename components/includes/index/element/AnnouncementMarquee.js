import React from 'react';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';
import PropTypes from 'prop-types';

const AnnouncementMarquee = ({ isOpen, onCloseAnnouncement }) => {
    return (
        <>
            {isOpen ? (
                <Alert
                    banner
                    showIcon={false}
                    closable={true}
                    onClose={onCloseAnnouncement}
                    message={
                        <Marquee gradient={false}>
                            <p>123</p>
                            <p>456</p>
                            <p>789</p>
                        </Marquee>
                    }
                />
            ) : null}
            <style jsx global>
                {`
                    .ant-alert.ant-alert-no-icon {
                        height: 44px;
                        padding: 0;
                    }

                    .ant-alert-warning {
                        background-color: #c43826;
                    }

                    .ant-alert.ant-alert-no-icon p {
                        color: white;
                    }

                    .marquee-container p {
                        margin: 10px auto 10px auto;
                    }

                    .ant-alert-close-icon {
                        z-index: 1;
                        width: 50px;
                        height: 100%;
                        background-color: #c43826;
                    }

                    .ant-alert.ant-alert-no-icon .ant-alert-close-icon {
                        top: 0;
                        right: 0;
                    }

                    .ant-alert-close-icon .anticon-close {
                        color: white;
                    }

                    .ant-alert-close-icon svg {
                        width: 20px;
                        height: 20px;
                    }
                `}
            </style>
        </>
    );
};

export default AnnouncementMarquee;

AnnouncementMarquee.propTypes = {
    isOpen: PropTypes.bool,
    onCloseAnnouncement: PropTypes.func,
};
