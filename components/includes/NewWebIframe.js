import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/display-name
const NewWebIframe = function ({ iframeSrc, title, iHeight }) {
    const iframeDom = useRef(null);
    const isMobile = useSelector(store => store.layout.isMobile);
    const [iframeHeight, setIframeHeight] = useState(1);

    setTimeout(() => {
        var iframeId = iframeDom.current;
        var iframeContent = iframeId.contentWindow || iframeId.contentDocument;
        if (iframeContent.document) {
            iframeContent = iframeContent.document;
        }
        iframeContent.addEventListener('DOMContentLoaded', ready);
    }, 100);

    useEffect(() => {
        // iframeDom.current.contentDocument.location.reload(true);
        // const ifdoc = document.getElementById('nweWebiFrame').document;
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
        console.log('ready');
        hideHeaderFooter();
    };
    const hideHeaderFooter = () => {
        console.log('onload');
        var iframeId = document.getElementById('nweWebiFrame');
        var iframeContent = iframeId.contentWindow || iframeId.contentDocument;
        if (iframeContent.document) {
            iframeContent = iframeContent.document;
        }
        iframeContent.getElementsByClassName('nav-container')[0].style.display = 'none';
        iframeContent.getElementsByClassName('footer-container')[0].style.display = 'none';
        iframeContent.getElementsByClassName('body-container')[0].style.padding = '0';
        if (isMobile) {
            iframeContent.getElementsByClassName('homeFooter')[0].style.display = 'none';
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
