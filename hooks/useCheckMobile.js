import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkMobile } from '../services/components/layouts/checkMobile';
import { resize } from '../store/components/layouts/action';

export const useCheckMobile = () => {
    const dispatch = useDispatch();
    const isMobile = useSelector(store => store.layout.isMobile);

    useEffect(() => {
        function handleResize() {
            const winWidth = window.innerWidth;
            dispatch(resize(winWidth, checkMobile(winWidth)));
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};
