import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDomain } from '../services/getDomain';

import { setDomain } from '../store/general/action';

export const useDomain = () => {
    const dispatch = useDispatch();
    const domain = useSelector(store => store.general.domain);

    // 依據來源設置 fetch 選單所帶的 domain 值
    const sourceHandler = () => {
        dispatch(setDomain(getDomain()));
    };

    useEffect(() => {
        sourceHandler();
    }, []);

    return domain;
};
