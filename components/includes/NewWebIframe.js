import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/display-name
const NewWebIframe = function ({ iframeSrc, title, iHeight }) {
    const iframeDom = useRef(null);
    const isMobile = useSelector(store => store.layout.isMobile);
    const [iframeHeight, setIframeHeight] = useState(1);

    useEffect(() => {
        // iframeDom.current.contentDocument.location.reload(true);
        // const ifdoc = document.getElementById('nweWebiFrame').document;

        var iframeId = document.getElementById('nweWebiFrame');
        var iframeContent = iframeId.contentWindow || iframeId.contentDocument;
        if (iframeContent.document) {
            iframeContent = iframeContent.document;
        }
        console.log('iframe', iframeContent);
        iframeContent.addEventListener('DOMContentLoaded', ready);

        if (iHeight != null) {
            setTimeout(() => {
                iframeDom.current.height = iHeight;
            }, 100);
        } else {
            window.addEventListener('message', receiveMessage, false);
        }
        return () => {
            if (iHeight == null) {
                window.removeEventListener('message', receiveMessage, false);
            }
        };
    }, []);

    useEffect(() => {
        iframeDom.current.height = iframeHeight;
    }, [iframeHeight]);

    useEffect(() => {
        iframeDom.current.height = iHeight;
    }, [iHeight]);

    useEffect(() => {
        if (isMobile) {
            const ifdoc = iframeDom.current.contentWindow.document;
            if (ifdoc.getElementsByClassName('homeFooter').length > 0) {
                ifdoc.getElementsByClassName('homeFooter')[0].style.display = 'none';
            }
        }
    }, [isMobile]);

    const receiveMessage = e => {
        if (e.data.iframeHeight) {
            setIframeHeight(e.data.iframeHeight + 30);
        }
    };

    const ready = () => {
        const ifdoc =
            iframeDom.current.document || iframeDom.current.contentDocument || iframeDom.current.contentWindow.document;
        console.log('iframe ready', ifdoc);
        ifdoc.getElementsByClassName('nav-container')[0].style.display = 'none';
        ifdoc.getElementsByClassName('footer-container')[0].style.display = 'none';
        ifdoc.getElementsByClassName('body-container')[0].style.padding = '0';
        if (isMobile) {
            ifdoc.getElementsByClassName('homeFooter')[0].style.display = 'none';
        }
    };
    const hideHeaderFooter = () => {
        // document.frames['iView'].document;
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
};
NewWebIframe.displayName = NewWebIframe;
export default React.memo(NewWebIframe);
