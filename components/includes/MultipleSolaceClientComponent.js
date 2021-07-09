import { memo, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { solaceClient } from '../../services/solaceClient';
import { getCookie } from '../../services/components/layouts/cookieController';
import { setSolaceData } from '../../store/solace/action';
import { loadScriptByURL } from '../../services/loadScriptByURL';
import { checkLogin } from '../../services/components/layouts/checkLogin';
import { Mptp } from './Mptp';

const MultipleSolaceClientComponent = ({ subscribeTopic, idno }) => {
    const solace = useRef(null);
    const dispatch = useDispatch();
    const topic = useRef([]);
    const solaceData = useRef({});
    // const currentSubscribe = useRef([]);
    const [solaceLoaded, setSolaceLoaded] = useState(false);

    useEffect(() => {
        loadScriptByURL('solace', `${process.env.NEXT_PUBLIC_SUBPATH}/js/solclient.js`, solaceLoadedHandler);
        return () => {
            if (solace.current != null) {
                dispatch(setSolaceData([]));
                solace.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        subscribeHandler();
    }, [solaceLoaded, subscribeTopic]);

    // 寫死測試
    // const subscribeTopic = ['MKT/*/*/6770', 'QUT/*/*/2330', 'MKT/*/*/6555', 'QUT/*/*/1234', 'MKT/*/*/1260', 'QUT/*/*/2890'];
    // mapck 版本
    // const subscribeTopic = ["'TIC/v1/STK/*/*/6770", "'TIC/v1/STK/*/*/2330", "'TIC/v1/STK/*/*/6555", "'TIC/v1/STK/*/*/1234", "'TIC/v1/STK/*/*/1260", "'TIC/v1/STK/*/*/2890"]; // 'TIC/v1/FOP/*/*/TXFG1',
    // const idno = 'MCCAFIGAGI';
    // mapck 版本
    const MptpIns = new Mptp();

    const solaceLoadedHandler = () => {
        if (solace.current == null) {
            solace.current = solaceClient('', idno);
            solace.current.connect('mpack');
            solace.current.setMessageEvent('ST', function (xhr) {
                solaceEventHandler(xhr);
            });
            setSolaceLoaded(true);
        }
    };

    const solaceEventHandler = xhr => {
        if (xhr && xhr.topic) {
            const mptpIndex = MptpIns.get(xhr.topic.split('/', 3).join('/'));
            let solaceMptpData = {};
            let code = '';
            if (xhr.data.length === mptpIndex.length) {
                mptpIndex.forEach((data, index) => {
                    solaceMptpData[mptpIndex[index]] = xhr.data[index];
                    if (data === 'Code') {
                        console.log(data);
                        code = xhr.data[index];
                    }
                });
            } else {
                // 欄位錯誤 ( 停止訂閱 )
            }
            // solaceData.current[code] = solaceMptpData;   // 全部資料
            solaceData.current = solaceMptpData;
            console.log(solaceData.current);
            dispatch(setSolaceData(solaceData.current));
        }
    };

    const subscribeHandler = () => {
        if (JSON.stringify(subscribeTopic) != JSON.stringify(topic.current)) {
            unsubscribeHandler();
            if (subscribeTopic.length > 0) {
                console.log(subscribeTopic);
                subscribeTopic.forEach(topic => {
                    console.log(solace.current);
                    setTimeout(() => {
                        solace.current.subscribe(topic);
                    }, 500);
                });

                // 記住目前 TOPIC
                topic.current = subscribeTopic;
            } else {
                topic.current = [];
            }
        } else {
            console.log('same topic');
        }
    };

    const unsubscribeHandler = () => {
        if (topic.current.length !== 0) {
            topic.current.forEach(oldTopic => {
                solace.current.unsubscribe(oldTopic);
                solaceData.current = {};
                dispatch(setSolaceData(solaceData.current));
            });
        }
    };

    // 未完成
    // const checkTopic = item => {
    //     return currentSubscribe.current.some(topic => {
    //         return true;
    //     });
    // };
    return <></>;

    // debug Code
    setTimeout(() => {
        console.log(topic.current);
    }, 10000);
};

export default memo(MultipleSolaceClientComponent);
