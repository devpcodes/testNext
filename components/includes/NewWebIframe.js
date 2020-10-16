import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/display-name
const NewWebIframe = function ({ iframeSrc, title, iHeight }) {
    const iframeDom = useRef(null);
    // const winWidth = useSelector(store => store.layout.winWidth);
    const [iframeHeight, setIframeHeight] = useState(1);

    useEffect(() => {
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

    const receiveMessage = e => {
        if (e.data.iframeHeight) {
            setIframeHeight(e.data.iframeHeight + 30);
        }
    };
    return (
        <>
            <iframe
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
