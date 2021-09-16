import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { debounce } from '../services/throttle';

export const useActiveReturnMarket = () => {
    const [market, setMarket] = useState('');
    const websocketInfo = useSelector(store => store.activeReturn.websocketInfo);
    useEffect(() => {
        if (websocketInfo?.topic) {
            const topicArgs = websocketInfo.topic.split('/');
            if (websocketInfo.topic.indexOf('TFT') >= 0) {
                // debounce(setMarket.bind(null, 'S'), 2000);
                setMarket('S');
            }
            if (websocketInfo.topic.indexOf('R/F/S') >= 0) {
                // debounce(setMarket.bind(null, 'H'), 2000);
                setMarket('H');
            }
            if (topicArgs[2] === 'F') {
                debounce(checkFOMarket.bind(null, websocketInfo), 2000);
            }
        } else {
            setMarket('');
        }
    }, [websocketInfo]);

    const checkFOMarket = socketData => {
        switch (socketData.COMTYPE) {
            case '0':
            case '2':
                setMarket('F');
                break;
            case '1':
            case '3':
                setMarket('O');
                break;
        }
    };

    return market;
};
