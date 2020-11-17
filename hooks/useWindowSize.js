import { useState, useEffect } from 'react';

import { checkMobile } from '../services/components/layouts/checkMobile';

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
        isMobile: false,
    });

    useEffect(() => {
        function handleResize() {
            const winWidth = window.innerWidth;

            setWindowSize({
                width: winWidth,
                height: window.innerHeight,
                isMobile: checkMobile(winWidth),
            });
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};
