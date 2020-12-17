import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPlatform } from '../services/getPlatform';

import { setPlatform } from '../store/general/action';

export const usePlatform = () => {
    const dispatch = useDispatch();
    const platform = useSelector(store => store.general.platform);

    // 依據來源設置 fetch 選單所帶的 platform 值
    const sourceHandler = () => {
        dispatch(setPlatform(getPlatform()));
    };

    useEffect(() => {
        sourceHandler();
    }, []);

    return platform;
};
