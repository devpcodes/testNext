import { useEffect, useRef, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/display-name
const NewWebIframe = function ({ iframeSrc, title, iHeight, login, getIframeDom }) {
    const iframeDom = useRef(null);
    const iframeContentDoc = useRef(null);

    const isMobile = useSelector(store => store.layout.isMobile);
    const personalAreaVisible = useSelector(store => store.layout.personalAreaVisible);

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
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (iframeDom.current != null) {
                iframeDom.current.height = iHeight;
            }
        }, 500);
    }, [iHeight]);

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
                }
            }, 100);
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

    return (
        <>
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
