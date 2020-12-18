import { useEffect, useState } from 'react';
import { usePlatform } from './usePlatform';

const noCloseBtns = ['udn'];
export const useLoginClosBtn = () => {
    const platform = usePlatform();
    const [noCloseBtn, setNoCloseBtn] = useState(false);
    useEffect(() => {
        console.log('platform', platform);
        const noBtn = noCloseBtns.find(val => val === platform);
        if (noBtn != null) setNoCloseBtn(true);
    }, []);
    return noCloseBtn;
};
