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
    useEffect(() => {
        //依賴初始化需要時間，所以延遲100毫秒做連線
        setTimeout(() => {
            if (solace.current == null) {
                solace.current = solaceClient('', getCookie('user_id'));
                solace.current.connect();
                solace.current.setMessageEvent('ST', function (xhr) {
                    console.log(xhr);
                    dispatch(setSolaceData(xhr.data));
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

    const unsubscribeHandler = () => {
        if (topic.current.length !== 0) {
            topic.current.forEach(oldTopic => {
                if (oldTopic.indexOf('SNP') === -1) {
                    solace.current.unsubscribe(oldTopic);
                }
            });
        }
    };

    const subscribeHandler = () => {
        console.log(subscribeTopic, topic.current);
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
