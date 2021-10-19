import { useEffect, useState } from 'react';
import { usePlatform } from './usePlatform';

export const useOpenAccountUrl = () => {
    const platform = usePlatform();
    const [url, setUrl] = useState(
        'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer開戶按鈕',
    );
    useEffect(() => {
        console.log('platform', platform);
        switch (platform) {
            case 'udn':
                setUrl('https://www.sinotrade.com.tw/openact?strProd=0102&strWeb=0135');
                break;
            case 'alpha':
                setUrl('https://www.sinotrade.com.tw/openact?strProd=0064&strWeb=0086');
                break;
            case 'cnyes':
                setUrl('https://www.sinotrade.com.tw/openact?strProd=0108&strWeb=0007');
                break;
            default:
                setUrl(
                    'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer開戶按鈕',
                );
                break;
        }
    }, [platform]);

    return url;
};
