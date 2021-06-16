import { Switch } from 'antd';
const SwitchBox = () => {
    const switchChangeHandler = () => {};
    return (
        <div className="firstSell__box">
            <span className="text">長效單</span>
            <Switch checked={false} size="small" onChange={switchChangeHandler} />
            <span className="info"> 當金額≥119.99時以120.35委託買進</span>
            <style jsx>{`
                .firstSell__box {
                    margin-top: 18px;
                    margin-bottom: 26px;
                    position: relative;
                }
                .firstSell__box .text {
                    color: #0d1623;
                }
                .info {
                    display: inline-block;
                    width: 140px;
                    font-size: 1.2rem;
                    position: absolute;
                    right: 8px;
                    top: 0;
                    text-align: right;
                    color: #6c7b94;
                }
            `}</style>
            <style global jsx>{`
                .info__item {
                    font-size: 1.5rem;
                    color: #a9b6cb;
                    padding: 0 4px 1px 5px;
                    border-radius: 2px;
                    border: solid 1px #e6ebf5;
                    margin-right: 5px;
                    font-weight: bold;
                }
                @media (max-width: 350px) {
                    .firstSell__box {
                        font-size: 1.1rem;
                    }
                }
                .firstSell__box .ant-switch-small {
                    width: 46px;
                    margin-left: 18px;
                    height: 25px;
                    background-color: #e6ebf5;
                }
                .firstSell__box .ant-switch-handle:before {
                    width: 19px;
                    height: 19px;
                    box-shadow: 0 2px 4px 0 rgba(169, 182, 203, 0.35);
                    background-color: #a9b6cb;
                    /* left: -8px; */
                }
                .firstSell__box .ant-switch-checked .ant-switch-handle:before {
                    left: -8px;
                    background-color: #fff;
                }
                .firstSell__box .ant-switch-checked {
                    background-color: #22a16f;
                }
            `}</style>
        </div>
    );
};
export default SwitchBox;
