import Head from 'next/head';
import { memo, useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { solaceClient } from '../../services/solaceClient';
import { getCookie } from '../../services/components/layouts/cookieController';
import { setSolaceData } from '../../store/solace/action';

const SolaceClientComponent = ({ subscribeTopic, only } = { only: true }) => {
    const solace = useRef(null);
    const dispatch = useDispatch();
    const topic = useRef([]);
    const solaceData = useRef([]);
    const currentSubscribe = useRef([]);
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
        if (subscribeTopic.length !== 0) {
            currentSubscribe.current = subscribeTopic;
        }
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
                if (val != null) {
                    const checkValLastKey = val.topic.split('/')[val.topic.split('/').length - 1];
                    if (val.topic.split('/')[3] === symbol && checkLastKey === checkValLastKey) {
                        update = true;
                        val.topic = xhr.topic;
                        updateData(xhr, val.data);
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
        filterSolaceData();
        dispatch(setSolaceData(solaceData.current));
    };

    // 更新髒數據
    const updateData = (realTimeData, prevData) => {
        const nextData = realTimeData.data;
        if (realTimeData.topic.indexOf('MKT') >= 0) {
            console.log(nextData);
            let High = prevData.High[0];
            let Low = prevData.Low[0];
            if (prevData.High[0] < nextData.Close[0]) {
                // && !data.Simtrade
                High = nextData.Close[0];
            }
            if (prevData.Low[0] > nextData.Close[0]) {
                Low = nextData.Close[0];
            }
            const DiffPrice = parseFloat((nextData.Close[0] - prevData.Reference).toFixed(2));
            const DiffRate = parseFloat(
                (((nextData.Close[0] - prevData.Reference) / prevData.Reference) * 100).toFixed(2),
            );
            const AvgPrice = parseFloat((nextData.AmountSum[0] / nextData.VolSum[0] / 1000).toFixed(2));
            let DiffType;
            if (DiffPrice > 0) {
                if (nextData.Close[0] < prevData.Upper) {
                    DiffType = 2;
                } else {
                    DiffType = 1;
                }
            } else if (DiffPrice < 0) {
                if (nextData.Close[0] > prevData.Lower) {
                    DiffType = 4;
                } else {
                    DiffType = 5;
                }
            } else {
                DiffType = 3;
            }
            // console.log(DiffPrice, DiffRate, AvgPrice, DiffType);
            Object.assign(prevData, nextData);
            prevData.High[0] = High;
            prevData.Low[0] = Low;
            prevData.DiffPrice[0] = DiffPrice;
            prevData.DiffRate[0] = DiffRate;
            prevData.AvgPrice[0] = AvgPrice;
            prevData.DiffType[0] = DiffType;
        } else {
            Object.assign(prevData, nextData);
        }
    };

    // 避免遇到訂閱到其它不需訂閱的資料存在redux
    const filterSolaceData = () => {
        solaceData.current = solaceData.current.filter(item => {
            if (checkTopic(item)) {
                return true;
            }
        });
    };

    const checkTopic = item => {
        return currentSubscribe.current.some(topic => {
            let symbol = topic.split('/')[3];
            let dataSymbol = item.topic.split('/')[3];
            if (symbol == dataSymbol) {
                return true;
            }
        });
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
