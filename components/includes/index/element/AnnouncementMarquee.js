import { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { getAnnounce } from '../../../../services/components/AnnouncementMarquee/announcements';
import Marquee from 'react-fast-marquee';
import PropTypes from 'prop-types';

const AnnouncementMarquee = ({ isOpen, onCloseAnnouncement }) => {
    const [anous, setAnous] = useState([]);

    const getAnous = async () => {
        const data = await getAnnounce();
        setAnous(data);
    };

    useEffect(() => {
        getAnous();
    }, []);

    return (
        <div className="anous-box">
            {isOpen ? (
                <Alert
                    banner
                    showIcon={false}
                    closable={true}
                    onClose={onCloseAnnouncement}
                    message={
                        <Marquee gradient={false}>
                            {Array.isArray(anous) &&
                                anous.map((e, i) => (
                                    <p key={i}>
                                        <a href="https://www.sinotrade.com.tw/m/CSCenter/CSCenter_13_5">{e.title}</a>
                                    </p>
                                ))}
                        </Marquee>
                    }
                />
            ) : null}
            <style jsx>
                {`
                    .anous-box {
                        position: absolute;
                        width: 100%;
                        height: 44px;
                        z-index: 1;
                    }

                    @media screen and (max-width: 450px) {
                        .anous-box {
                            height: 41px;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .ant-alert.ant-alert-no-icon {
                        height: 44px;
                        padding: 0;
                    }

                    .ant-alert-warning {
                        background-color: #c43826;
                    }

                    .ant-alert.ant-alert-no-icon p a {
                        display: block;
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
                        width: 24px;
                        height: 24px;
                    }

                    @media screen and (max-width: 450px) {
                        .ant-alert.ant-alert-no-icon {
                            height: 41px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default AnnouncementMarquee;

AnnouncementMarquee.propTypes = {
    isOpen: PropTypes.bool,
    onCloseAnnouncement: PropTypes.func,
};
