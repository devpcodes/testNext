const LoanCalculationItem = ({ label, num, unit, style }) => {
    return (
        <div className="calculationItem__container" style={style}>
            <span className="calculationItem__label">{label}</span>
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
