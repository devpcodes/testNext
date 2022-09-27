import { useEffect, useState, useRef } from 'react';
import { Progress } from 'antd';
import MyTransition from '../../myTransition';
const Loading = ({ loading, step, ...props }) => {
    const [percent, setPercent] = useState(0);
    const nowPercent = useRef(0);
    const timer = useRef(null);
    const [startLoading, setStartLoading] = useState(false);
    useEffect(() => {
        if (loading == null) return;
        if (loading) {
            percentHandler();
        } else {
            submitSuccess();
        }
    }, [loading]);

    const percentHandler = () => {
        setStartLoading(true);
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
        }, Math.floor(Math.random() * step));
    };

    const submitSuccess = () => {
        window.clearInterval(timer.current);
        timer.current = null;
        setPercent(100);
        setTimeout(() => {
            setStartLoading(false);
        }, 50);
    };

    return (
        <>
            <MyTransition isVisible={startLoading} classNames={'opacity'}>
                <div className="reservation__container">
                    <Progress
                        type="circle"
                        percent={percent}
                        width={100}
                        showInfo={true}
                        {...props}
                        // format={(percent)=>{
                        //     if(percent < 100){
                        //         return(
                        //             <>
                        //                 <div style={{fontSize: '1.5rem'}}>傳送中...</div>
                        //                 <span style={{fontSize: '1.5rem'}}>{`${percent}%`}</span>
                        //             </>
                        //         )
                        //     }else{
                        //         return(
                        //             <>
                        //                 <div style={{fontSize: '1.5rem', color: '#73ab58'}}>傳送完成</div>
                        //                 <span style={{fontSize: '1.5rem', color: '#73ab58'}}>{`${percent}%`}</span>
                        //             </>
                        //         )
                        //     }
                        // }}
                    />
                    <div className="page__mask"></div>
                </div>
            </MyTransition>
            <style global jsx>{`
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
                .reservation__container .ant-progress.ant-progress-circle {
                    position: fixed;
                    z-index: 999;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .reservation__container
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

export default Loading;
