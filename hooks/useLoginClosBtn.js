import { useEffect, useState } from 'react';
import { usePlatform } from './usePlatform';

//一些特別處理的platform
//TODO 配合上版順序調整
export const noCloseBtns = ['udn'];
export const useLoginClosBtn = () => {
    const platform = usePlatform();
    const [noCloseBtn, setNoCloseBtn] = useState(false);
    useEffect(() => {
        setNoCloseBtn(noCloseBtns.includes(platform));
    }, [platform]);
    return noCloseBtn;
};
