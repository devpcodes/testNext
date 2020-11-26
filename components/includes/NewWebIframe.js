import { useEffect, useRef, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import MyTransition from '../../components/includes/myTransition';

const NewWebIframe = function ({ iframeSrc, title, iHeight, login, getIframeDom }) {
    const iframeDom = useRef(null);
    const iframeContentDoc = useRef(null);
    const initLoginStatus = useRef(false);
    const [showLoading, setShowLoading] = useState(false);

    const isMobile = useSelector(store => store.layout.isMobile);
    const personalAreaVisible = useSelector(store => store.layout.personalAreaVisible);
    const isLogin = useSelector(store => store.user.isLogin);
    const [pointerEvents, setPointerEvents] = useState('auto');

    setTimeout(() => {
        var iframeId = iframeDom.current;
        if (iframeId != null) {
            var iframeContent = iframeId.contentWindow || iframeId.contentDocument;
            if (iframeContent.document) {
                iframeContent = iframeContent.document;
            }
            iframeContentDoc.current = iframeContent;
        }
    }, 100);

    useEffect(() => {
        initLoginStatus.current = isLogin;
        if (iHeight != null) {
            setTimeout(() => {
                if (iframeDom.current != null) {
                    iframeDom.current.height = iHeight;
                }
            }, 100);
        }
        if (getIframeDom != null) {
            getIframeDom(iframeDom.current);
        }

        if (isMobile) {
            setShowLoading(true);
        }
        //避免事件沒觸發
        setTimeout(() => {
            if (showLoading) {
                setShowLoading(false);
            }
        }, 10000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (iframeDom.current != null) {
                iframeDom.current.height = iHeight;
            }
        }, 500);
    }, [iHeight]);

    useEffect(() => {
        if (login != null && login && initLoginStatus.current != login) {
            setTimeout(() => {
                var iframeId = iframeDom.current;
                var iframeContent = iframeId.contentWindow || iframeId.contentDocument;
                if (iframeContent.document) {
                    iframeContent = iframeContent.document;
                }
                iframeContentDoc.current = iframeContent;
                if (iframeContentDoc.current != null && iframeContentDoc.current.location != null) {
                    iframeContentDoc.current.location.reload(true);
                }
            }, 1000);
        }
    }, [login]);

    /*
        personalArea 顯示之後，阻止 iframe 成為點擊事件的 target。
        因為 antd 的 Popover 元件，若要點擊其他區塊收回時，點到 iframe 區塊會失效，且觸發 iframe 內的連結或事件。
    */
    useEffect(() => {
        if (personalAreaVisible) {
            setPointerEvents('none');
        } else if (isMobile && !personalAreaVisible) {
            // 延遲是為了避免手機裝置的點擊事件延遲 300ms 左右，personalArea 收回後馬上觸發到 iframe 內的連結或事件。
            setTimeout(() => {
                setPointerEvents('auto');
            }, 500);
        } else {
            setPointerEvents('auto');
        }
    }, [personalAreaVisible]);

    const onLoadHandler = () => {
        if (isMobile) {
            setShowLoading(false);
        }
    };

    return (
        <>
            <MyTransition isVisible={showLoading} classNames={'opacity'}>
                <div className="loading__container">
                    <div className="loadingio-spinner-spinner-dmclsmlqzeg">
                        <div className="ldio-imt7lxo4urc">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </MyTransition>
            <iframe
                title={title}
                ref={iframeDom}
                id="nweWebiFrame"
                name="newWebiFrame"
                width="100%"
                src={iframeSrc}
                style={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    pointerEvents: pointerEvents,
                }}
                onLoad={onLoadHandler}
            >
                你的瀏覽器不支援 iframe
            </iframe>
            <style jsx>{`
                .loading__container {
                    position: absolute;
                    width: 100%;
                    top: 150px;
                    text-align: center;
                }
                iframe {
                    border: none;
                }
                @keyframes ldio-imt7lxo4urc {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
                .ldio-imt7lxo4urc div {
                    left: 43.5px;
                    top: 24.5px;
                    position: absolute;
                    animation: ldio-imt7lxo4urc linear 0.9345794392523364s infinite;
                    background: #ce012a;
                    width: 13px;
                    height: 13px;
                    border-radius: 6.5px / 6.5px;
                    transform-origin: 6.5px 25.5px;
                }
                .ldio-imt7lxo4urc div:nth-child(1) {
                    transform: rotate(0deg);
                    animation-delay: -0.778816199376947s;
                    background: #ce012a;
                }
                .ldio-imt7lxo4urc div:nth-child(2) {
                    transform: rotate(60deg);
                    animation-delay: -0.6230529595015576s;
                    background: #ce012a;
                }
                .ldio-imt7lxo4urc div:nth-child(3) {
                    transform: rotate(120deg);
                    animation-delay: -0.4672897196261682s;
                    background: #ce012a;
                }
                .ldio-imt7lxo4urc div:nth-child(4) {
                    transform: rotate(180deg);
                    animation-delay: -0.3115264797507788s;
                    background: #ce012a;
                }
                .ldio-imt7lxo4urc div:nth-child(5) {
                    transform: rotate(240deg);
                    animation-delay: -0.1557632398753894s;
                    background: #ce012a;
                }
                .ldio-imt7lxo4urc div:nth-child(6) {
                    transform: rotate(300deg);
                    animation-delay: 0s;
                    background: #ce012a;
                }
                .loadingio-spinner-spinner-dmclsmlqzeg {
                    width: 64px;
                    height: 64px;
                    display: inline-block;
                    overflow: hidden;
                    background: none;
                }
                .ldio-imt7lxo4urc {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transform: translateZ(0) scale(0.64);
                    backface-visibility: hidden;
                    transform-origin: 0 0; /* see note above */
                }
                .ldio-imt7lxo4urc div {
                    box-sizing: content-box;
                }
                /* generated by https://loading.io/ */
            `}</style>
        </>
    );
};

NewWebIframe.propTypes = {
    iframeSrc: PropTypes.string,
    title: PropTypes.string,
    iHeight: PropTypes.number,
    login: PropTypes.bool,
    getIframeDom: PropTypes.func,
};

NewWebIframe.displayName = 'NewWebIframe';

export default memo(NewWebIframe);
