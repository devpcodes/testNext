import { Tooltip } from 'antd';
import cricleIcon from '../../../../../resources/images/components/loanZone/basic-help-circle.svg';
const LoanCalculationItem = ({ label, num, unit, style, tooltipText }) => {
    return (
        <div className="calculationItem__container" style={style}>
            <span className="calculationItem__label">
                {label}
                {tooltipText && (
                    <Tooltip placement="bottom" title={tooltipText} zIndex={10001}>
                        <img
                            src={cricleIcon}
                            style={{
                                marginTop: '-3px',
                                marginLeft: '2px',
                                filter: 'opacity(0.7)',
                                cursor: 'pointer',
                            }}
                        />
                    </Tooltip>
                )}
            </span>
            <span className="calculationItem__num">
                {num} {unit}
            </span>
            <style jsx>{`
                .calculationItem__container {
                    display: flex;
                    justify-content: space-between;
                }
                .calculationItem__label {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                }
                .calculationItem__num {
                    font-size: 16px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    text-align: right;
                    color: #0d1623;
                }
            `}</style>
        </div>
    );
};

export default LoanCalculationItem;
