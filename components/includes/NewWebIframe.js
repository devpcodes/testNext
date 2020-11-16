import { useEffect, useRef, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/display-name
const NewWebIframe = function ({ iframeSrc, title, iHeight, login, getIframeDom }) {
    const iframeDom = useRef(null);
    const iframeContentReady = useRef(false);
    const iframeContentDoc = useRef(null);
    const isMobile = useSelector(store => store.layout.isMobile);
    const showMask = useSelector(store => store.layout.showMask);
    const [pointerEvents, setPointerEvents] = useState('auto');

    setTimeout(() => {
        var iframeId = iframeDom.current;
        if (iframeId != null) {
            var iframeContent = iframeId.contentWindow || iframeId.contentDocument;
            if (iframeContent.document) {
                iframeContent = iframeContent.document;
            }
            iframeContentDoc.current = iframeContent;
            iframeContentDoc.current.addEventListener('DOMContentLoaded', ready);
        }
    }, 100);

    useEffect(() => {
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
        return () => {
            if (iframeContentDoc.current != null) {
                iframeContentDoc.current.removeEventListener('DOMContentLoaded', ready, false);
            }
        };
    }, []);

    useEffect(() => {
        iframeDom.current.height = iHeight;
    }, [iHeight]);

    useEffect(() => {
        if (iframeContentReady.current) {
            if (isMobile) {
                hideHeaderFooter();
            }
        }
    }, [isMobile]);

    useEffect(() => {
        if (login != null && login) {
            setTimeout(() => {
                var iframeId = iframeDom.current;
                var iframeContent = iframeId.contentWindow || iframeId.contentDocument;
                if (iframeContent.document) {
                    iframeContent = iframeContent.document;
                }
                iframeContentDoc.current = iframeContent;

                if (iframeContentDoc.current != null && iframeContentDoc.current.location != null) {
                    iframeContentDoc.current.location.reload(true);
                    iframeContentDoc.current.addEventListener('DOMContentLoaded', ready);
                }
            }, 100);
        }
    }, [login]);

    /*
        mask 顯示之後，阻止 iframe 成為點擊事件的 target。
        因 antd 的 Popover 元件，若要點擊其他區塊收回時，點到 iframe 區塊會失效，且觸發 iframe 內的連結或事件。
    */
    useEffect(() => {
        console.log('showMask', showMask);
        if (showMask) {
            setPointerEvents('none');
        } else {
            // 延遲是為了避免手機裝置的點擊事件延遲 300ms 左右，mask 收回後馬上觸發到 iframe 內的連結或事件。
            setTimeout(() => {
                setPointerEvents('auto');
            }, 1800);
        }
    }, [showMask]);

    const ready = () => {
        console.log('ready');
        hideHeaderFooter();
    };

    const hideHeaderFooter = () => {
        console.log('onload');
        console.log('content', iframeContentDoc.current);
        if (iframeContentDoc.current != null && !iframeContentReady.current) {
            if (iframeContentDoc.current.getElementsByClassName('nav-container').length === 0) {
                iframeContentDoc.current.addEventListener('DOMContentLoaded', ready);
            }
            if (iframeContentDoc.current.getElementsByClassName('nav-container').length > 0) {
                iframeContentDoc.current.getElementsByClassName('nav-container')[0].style.display = 'none';
                iframeContentDoc.current.getElementsByClassName('footer-container')[0].style.display = 'none';
                iframeContentDoc.current.getElementsByClassName('body-container')[0].style.padding = '0';
            }
            if (isMobile) {
                if (iframeContentDoc.current.getElementsByClassName('homeFooter').length > 0) {
                    iframeContentDoc.current.getElementsByClassName('homeFooter')[0].style.display = 'none';
                }
            }
            iframeContentReady.current = true;
        }
    };

    return (
        <>
            <iframe
                onLoad={hideHeaderFooter}
                title={title}
                ref={iframeDom}
                id="nweWebiFrame"
                name="newWebiFrame"
                width="100%"
                src={iframeSrc}
                // scrolling="No"
                style={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    pointerEvents: pointerEvents,
                }}
            >
                你的瀏覽器不支援 iframe
            </iframe>
            <style jsx>{`
                iframe {
                    border: none;
                }
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

NewWebIframe.displayName = NewWebIframe;

export default memo(NewWebIframe);
