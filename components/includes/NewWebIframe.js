import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/display-name
const NewWebIframe = function ({ iframeSrc, title }) {
    const iframeDom = useRef(null);
    const [iframeHeight, setIframeHeight] = useState(1);

    useEffect(() => {
        window.addEventListener('message', receiveMessage, false);
        return () => {
            window.removeEventListener('message', receiveMessage, false);
        };
    }, []);

    useEffect(() => {
        iframeDom.current.height = iframeHeight;
    }, [iframeHeight]);

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
};
NewWebIframe.displayName = NewWebIframe;
export default React.memo(NewWebIframe);
