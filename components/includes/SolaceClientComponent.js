import Head from 'next/head';
import { memo, useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { solaceClient } from '../../services/solaceClient';
import { getCookie } from '../../services/components/layouts/cookieController';
import { setSolaceData } from '../../store/solace/action';

const SolaceClientComponent = ({ subscribeTopic }) => {
    const solace = useRef(null);
    const dispatch = useDispatch();
    const topic = useRef([]);
    const solaceData = useRef([]);
    useEffect(() => {
        //依賴初始化需要時間，所以延遲100毫秒做連線
        setTimeout(() => {
            if (solace.current == null) {
                solace.current = solaceClient('', getCookie('user_id'));
                solace.current.connect();
                solace.current.setMessageEvent('ST', function (xhr) {
                    solaceEventHandler(xhr);
                });
            }
            subscribeHandler();

            return () => {
                if (solace.current != null) {
                    dispatch(setSolaceData({}));
                    solace.current.disconnect();
                }
            };
        }, 100);
    }, [subscribeTopic]);

    const solaceEventHandler = xhr => {
        //symbol 可能之後有少數抓不到symbol情況 得調整
        let symbol = xhr.topic.split('/')[3];
        let update = false;
        if (solaceData.current.length === 0) {
            solaceData.current.push(xhr);
        } else {
            const checkLastKey = xhr.topic.split('/')[xhr.topic.split('/').length - 1];
            solaceData.current = solaceData.current.map(val => {
                // console.log('===',xhr.topic, val.topic);
                if (val != null) {
                    const checkValLastKey = val.topic.split('/')[val.topic.split('/').length - 1];
                    console.log('update', checkLastKey, checkValLastKey, xhr.topic, val.topic);
                    if (val.topic.split('/')[3] === symbol && checkLastKey === checkValLastKey) {
                        update = true;
                        val.topic = xhr.topic;
                        Object.assign(val.data, xhr.data);
                        // console.log('newVal', val);
                        return val;
                    } else {
                        return val;
                    }
                }
            });
            if (!update) {
                solaceData.current.push(xhr);
            }
        }
        // console.log('solaceData', solaceData.current)
        dispatch(setSolaceData(solaceData.current));
    };

    const unsubscribeHandler = () => {
        if (topic.current.length !== 0) {
            topic.current.forEach(oldTopic => {
                if (oldTopic.indexOf('SNP') === -1) {
                    solace.current.unsubscribe(oldTopic);
                }
                clearReduxData(oldTopic);
                dispatch(setSolaceData(solaceData.current));
            });
        }
    };

    const clearReduxData = topic => {
        let symbol = topic.split('/')[3];
        const checkLastKey = topic.split('/')[topic.split('/').length - 1];
        solaceData.current = solaceData.current.filter(val => {
            const checkValLastKey = val.topic.split('/')[val.topic.split('/').length - 1];
            if (val.topic.split('/')[3] === symbol && checkLastKey === checkValLastKey) {
                return false;
            }
            return true;
        });
    };

    const subscribeHandler = () => {
        if (JSON.stringify(subscribeTopic) != JSON.stringify(topic.current)) {
            unsubscribeHandler();
        }
        if (subscribeTopic.length > 0) {
            subscribeTopic.forEach(topic => {
                if (topic.indexOf('SNP') >= 0) {
                    solace.current.createCacheSession(topic, function () {
                        console.log('createCacheSession success');
                    });
                } else {
                    solace.current.subscribe(topic);
                }
            });
            topic.current = subscribeTopic;
        }
    };

    return (
        <Head>
            <script type="text/javascript" src={`${process.env.NEXT_PUBLIC_SUBPATH}/js/solclient.js`}></script>
        </Head>
    );
};

function arePropsEqual(prevProps, nextProps) {
    let propsEqual = true;
    if (JSON.stringify(prevProps.subscribeTopic) != JSON.stringify(nextProps.subscribeTopic)) {
        propsEqual = false;
    }
    return propsEqual;
}

export default memo(SolaceClientComponent, arePropsEqual);
