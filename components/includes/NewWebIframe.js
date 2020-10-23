import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/display-name
const NewWebIframe = function ({ iframeSrc, title, iHeight }) {
    const iframeDom = useRef(null);
    const iframeContentReady = useRef(false);
    const iframeContentDoc = useRef(null);
    const isMobile = useSelector(store => store.layout.isMobile);
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
    }, 50);

    useEffect(() => {
        if (iHeight != null) {
            setTimeout(() => {
                if (iframeDom.current != null) {
                    iframeDom.current.height = iHeight;
                }
            }, 100);
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

    const ready = () => {
        console.log('ready');
        hideHeaderFooter();
    };

    const hideHeaderFooter = () => {
        console.log('onload');
        console.log('content', iframeContentDoc.current);
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
