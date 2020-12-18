import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setPlatform } from '../store/general/action';

import { useSessionStorage } from './useSessionStorage';

export const usePlatform = () => {
    const router = useRouter();
    const [nwPlatform, setNwPlatform] = useSessionStorage('newweb_platform', 'newweb');

    const dispatch = useDispatch();
    const platform = useSelector(store => store.general.platform);

    useEffect(() => {
        if (router.query.platform) {
            setNwPlatform(router.query.platform.toLowerCase());
        }
    }, [router.query]);

    useEffect(() => {
        dispatch(setPlatform(nwPlatform));
    }, [nwPlatform]);

    return platform;
};
