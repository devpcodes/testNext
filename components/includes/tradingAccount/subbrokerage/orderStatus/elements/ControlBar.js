import IconBtn from '../../../vipInventory/IconBtn';
import { Switch } from 'antd';
const ControlBar = ({ filterHandler, reFreshHandler }) => {
    const onChange = checked => {
        console.log(`switch to ${checked}`);
        filterHandler(checked);
    };
    return (
        <div className="controlBar">
            <div className="touchPriceFilter">
                <Switch onChange={onChange} />
                <span>觸價單</span>
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
                    margin-top: 10px;
                    font-size: 1.6rem;
                }
                .touchPriceFilter span {
                    margin-left: 5px;
                }
            `}</style>
        </div>
    );
};

export default ControlBar;
