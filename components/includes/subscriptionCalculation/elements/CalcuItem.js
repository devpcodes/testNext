import { Tooltip } from 'antd';
const CalcuItem = ({ style, label, val, unit, icon, tooltip }) => {
    return (
        <div className="item__container" style={style}>
            <div className="label">
                {label}
                {icon && (
                    <Tooltip placement="top" trigger={['hover', 'click']} title={tooltip}>
                        <img className="icon" src={icon} />
                    </Tooltip>
                )}
            </div>
            <div>
                <span className="val__num">{val}</span>
                <span className="val__unit">{unit || '元'}</span>
            </div>
            <style jsx>{`
                .item__container {
                    display: flex;
                    justify-content: space-between;
                }
                .label {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                }
                .val__num {
                    font-weight: bold;
                    color: #0d1623;
                    font-size: 16px;
                }
                .val__unit {
                    font-weight: bold;
                    color: #0d1623;
                    font-size: 16px;
                    margin-left: 2px;
                }
                .icon {
                    margin-top: -3px;
                    margin-left: 2px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default CalcuItem;
