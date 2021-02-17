import { memo, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { solaceClient } from '../../services/solaceClient';
import { getCookie } from '../../services/components/layouts/cookieController';
import { setSolaceData } from '../../store/solace/action';
import { loadScriptByURL } from '../../services/loadScriptByURL';

const SolaceClientComponent = ({ subscribeTopic }) => {
    const solace = useRef(null);
    const dispatch = useDispatch();
    const topic = useRef([]);
    const solaceData = useRef([]);
    const currentSubscribe = useRef([]);
    const [solaceLoaded, setSolaceLoaded] = useState(false);
    const [SNPLoaded, setSNPLoaded] = useState(false);
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
        if (solaceLoaded) {
            subscribeHandler();
        }
        if (subscribeTopic.length !== 0) {
            currentSubscribe.current = subscribeTopic;
        }
    }, [subscribeTopic, solaceLoaded]);

    useEffect(() => {
        if (SNPLoaded) {
            subscribeMKTQUT();
        }
    }, [SNPLoaded]);

    const solaceLoadedHandler = () => {
        if (solace.current == null) {
            solace.current = solaceClient('', getCookie('user_id'));
            solace.current.connect();
            solace.current.setMessageEvent('ST', function (xhr) {
                solaceEventHandler(xhr);
            });
            setSolaceLoaded(true);
        }
    };

    const solaceEventHandler = xhr => {
        console.log('xhr', xhr);
        //symbol 可能之後有少數抓不到symbol情況 得調整
        let symbol = xhr.topic.split('/')[3];
        let update = false;
        if (solaceData.current.length === 0) {
            updateSNPData(xhr);
            solaceData.current.push(xhr);
            setSNPLoaded(true);
        } else {
            // const hasSNP = solaceData.current.some((item)=>{item.topic.indexOf('SNP') >= 0})
            // console.log('sssss===', solaceData.current)
            // if(!hasSNP) {
            //     return;
            // }
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
        solaceData.current = filterSolaceData(solaceData.current);
        dispatch(setSolaceData(solaceData.current));
    };

    const updateSNPData = xhr => {
        if (xhr.topic.indexOf('SNP') >= 0 && xhr.topic.indexOf('ODDLOT') >= 0) {
            // xhr.data.OddlotClose = 0;
            return;
        }
        if (xhr.topic.indexOf('SNP') >= 0 && xhr.topic.indexOf('ODDLOT') === -1) {
            if (xhr.data.Open == 0) {
                xhr.data.Open = '--';
            }
            if (xhr.data.High[0] == 0) {
                xhr.data.High[0] = '--';
            }
            if (xhr.data.Low[0] == 0) {
                xhr.data.Low[0] = '--';
            }
            if (xhr.data.AvgPrice[0] == 0) {
                xhr.data.AvgPrice[0] = '--';
            }
        }
    };

    const updateMKTData = (realTimeData, prevData) => {
        const nextData = realTimeData.data;
        if (realTimeData.topic.indexOf('MKT') >= 0 && realTimeData.topic.indexOf('ODDLOT') >= 0) {
            Object.assign(prevData, nextData);

            // 刪simtrade
            if (nextData.OddlotSimtrade == null) {
                delete prevData['OddlotSimtrade'];
            }
        }
        if (realTimeData.topic.indexOf('MKT') >= 0 && realTimeData.topic.indexOf('ODDLOT') === -1) {
            console.log(nextData);
            let High = Array.isArray(prevData?.High) && (prevData?.High[0] || 0);
            let Low = Array.isArray(prevData?.Low) && (prevData?.Low[0] || 0);
            if (Array.isArray(prevData?.High) && Array.isArray(prevData?.Low)) {
                if (prevData.High[0] < nextData.Close[0]) {
                    // && !data.Simtrade
                    High = nextData.Close[0];
                }
                if (prevData.Low[0] > nextData.Close[0]) {
                    Low = nextData.Close[0];
                }
                if (prevData.High[0] == 0 || prevData.High[0] == '--') {
                    prevData.High[0] = nextData.Close[0];
                }
                if (prevData.Low[0] == 0 || prevData.Low[0] == '--') {
                    prevData.Low[0] = nextData.Close[0];
                }
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

            // 刪simtrade
            if (nextData.Simtrade == null) {
                delete prevData['Simtrade'];
            }
        }
    };

    const updateQUTData = (realTimeData, prevData) => {
        const nextData = realTimeData.data;
        if (realTimeData.topic.indexOf('QUT') >= 0) {
            if (nextData.BidVolume != null) {
                if (nextData.BidVolume[0] != 0) {
                    if (Number(nextData.BidPrice[0]) === 0 && parseInt(nextData.BidPrice[0]) == 0) {
                        nextData.BidPrice[0] = '市價';
                    }
                }
            }
            if (nextData.AskVolume != null) {
                if (nextData.AskVolume[0] != 0) {
                    if (Number(nextData.AskPrice[0]) === 0 && parseInt(nextData.AskPrice[0]) == 0) {
                        nextData.AskPrice[0] = '市價';
                    }
                }
            }
            Object.assign(prevData, nextData);

            // 刪simtrade
            if (realTimeData.topic.indexOf('ODDLOT') >= 0) {
                if (nextData.OddlotSimtrade == null) {
                    delete prevData['OddlotSimtrade'];
                }
            } else {
                if (nextData.Simtrade == null) {
                    delete prevData['Simtrade'];
                }
            }
        }
    };

    // 更新髒數據
    const updateData = (realTimeData, prevData) => {
        updateSNPData(realTimeData);
        updateMKTData(realTimeData, prevData);
        updateQUTData(realTimeData, prevData);
    };

    // 避免遇到訂閱到其它不需訂閱的資料存在redux
    const filterSolaceData = currentSolaceData => {
        currentSolaceData = currentSolaceData.filter(item => {
            if (checkTopic(item)) {
                return true;
            }
        });
        return currentSolaceData;
    };

    const checkTopic = item => {
        return currentSubscribe.current.some(topic => {
            let symbol = topic.split('/')[3];
            let dataSymbol = item.topic.split('/')[3];

            let symbolLength = topic.split('/').length;
            let dataSymbolLength = item.topic.split('/').length;
            if (symbol == dataSymbol && dataSymbolLength === symbolLength) {
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
                setSNPLoaded(false);
                solaceData.current = clearReduxData(oldTopic, solaceData.current);
                dispatch(setSolaceData(solaceData.current));
            });
        }
    };

    const clearReduxData = (topic, currentSolaceData) => {
        let symbol = topic.split('/')[3];
        const checkLastKey = topic.split('/')[topic.split('/').length - 1];
        currentSolaceData = currentSolaceData.filter(val => {
            const checkValLastKey = val.topic.split('/')[val.topic.split('/').length - 1];
            if (val.topic.split('/')[3] === symbol && checkLastKey === checkValLastKey) {
                return false;
            }
            return true;
        });
        return currentSolaceData;
    };

    const subscribeHandler = () => {
        if (JSON.stringify(subscribeTopic) != JSON.stringify(topic.current)) {
            unsubscribeHandler();
        }
        if (subscribeTopic.length > 0) {
            subscribeTopic.forEach(topic => {
                if (topic.indexOf('SNP') >= 0) {
                    setTimeout(() => {
                        solace.current.createCacheSession(topic, function () {
                            console.log('createCacheSession success');
                        });
                    }, 100);
                }
            });
            topic.current = subscribeTopic;
        }
    };

    const subscribeMKTQUT = () => {
        subscribeTopic.forEach(topic => {
            if (topic.indexOf('SNP') === -1) {
                solace.current.subscribe(topic);
            }
        });
    };

    return (
        <>{/* <script type="text/javascript" src={`${process.env.NEXT_PUBLIC_SUBPATH}/js/solclient.js`}></script> */}</>
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
