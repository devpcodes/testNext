import { useEffect, useContext, useRef, useState, useCallback } from 'react';
import { Progress } from 'antd';
import MyTransition from '../myTransition';

const LoadingComp = ({ showLoading }) => {
    const [loading, setLoading] = useState(false);
    const [percent, setPercent] = useState(0);
    const nowPercent = useRef(0);
    const timer = useRef(null);

    useEffect(() => {
        setLoading(showLoading);
    }, [showLoading]);

    useEffect(() => {
        if (loading) {
            percentHandler();
        } else {
            submitSuccess();
        }
        return () => {
            if (timer.current != null) {
                window.clearInterval(timer.current);
                timer.current = null;
            }
        };
    }, [loading]);

    const percentHandler = () => {
        nowPercent.current = 0;
        setPercent(nowPercent.current);
        timer.current = window.setInterval(() => {
            if (nowPercent.current >= 99 || nowPercent.current + 4 >= 99) {
                window.clearInterval(timer.current);
                timer.current = null;
                return;
            }
            nowPercent.current += Math.floor(Math.random() * 5);
            setPercent(nowPercent.current);
        }, Math.floor(Math.random() * 20));
    };

    const submitSuccess = () => {
        window.clearInterval(timer.current);
        timer.current = null;
        setPercent(100);
        setTimeout(() => {
            setLoading(false);
        }, 50);
    };

    return (
        <>
            <div className="loading__container">
                <MyTransition isVisible={loading} classNames={'opacity'}>
                    <>
                        <Progress type="circle" percent={percent} width={100} showInfo={true} />
                        <div className="page__mask"></div>
                    </>
                </MyTransition>
            </div>
            <style jsx>{`
                .page__mask {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 400;
                    height: 100%;
                    background-color: rgb(249 249 249 / 70%);
                }
            `}</style>
            <style global jsx>{`
                .loading__container .ant-progress.ant-progress-circle {
                    position: fixed;
                    z-index: 999;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .loading__container
                    .ant-progress.ant-progress-circle.ant-progress-status-success.ant-progress-show-info.ant-progress-default.opacity-appear-done.opacity-enter-done {
                    position: fixed;
                    z-index: 999;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            `}</style>
        </>
    );
};
export default LoadingComp;
