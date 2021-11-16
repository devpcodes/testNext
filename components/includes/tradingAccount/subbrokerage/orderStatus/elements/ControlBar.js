import IconBtn from '../../../vipInventory/IconBtn';
import { Switch } from 'antd';
const ControlBar = ({ filterHandler, reFreshHandler, style }) => {
    const onChange = checked => {
        console.log(`switch to ${checked}`);
        filterHandler(checked);
    };
    return (
        <div className="controlBar" style={style}>
            <div className="touchPriceFilter">
                <span>觸價單</span>
                <Switch onChange={onChange} />
            </div>

            <IconBtn onClick={reFreshHandler} type={'refresh'} style={{ verticalAlign: 'top' }} />
            <style jsx>{`
                .controlBar {
                    text-align: right;
                    margin-bottom: 12px;
                }
                .touchPriceFilter {
                    display: inline-block;
                    margin-right: 20px;
                    margin-top: 7px;
                    font-size: 1.6rem;
                }
                .touchPriceFilter span {
                    margin-left: 5px;
                    margin-right: 9px;
                    vertical-align: middle;
                }
            `}</style>
            <style global jsx>{`
                .controlBar .ant-switch-checked {
                    background-color: #c43826;
                }
            `}</style>
        </div>
    );
};

export default ControlBar;
