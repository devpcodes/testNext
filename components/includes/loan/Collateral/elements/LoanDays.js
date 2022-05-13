import { useEffect, useState } from 'react';
import { InputNumber, Tooltip } from 'antd';
import icon from '../../../../../resources/images/components/loanZone/basic-help-circle.svg';
const LoanDays = ({ changeDaysHandler, reset }) => {
    const [day, setDay] = useState('');
    const title = '本服務每期借款天數最長為180天，屆期可申請展延最多2次。';
    useEffect(() => {
        if (reset) {
            setDay('');
        }
    }, [reset]);
    useEffect(() => {
        changeDaysHandler(day);
    }, [day]);
    const onChange = val => {
        setDay(val);
    };
    return (
        <div className="loanDays__container">
            <span className="loanDays--text">預計借款天數</span>
            <Tooltip placement="bottom" title={title}>
                <img className="loanDays--img" src={icon} alt="借款天數說明" />
            </Tooltip>
            <InputNumber
                value={day}
                onChange={onChange}
                type="number"
                max={180}
                min={1}
                style={{
                    width: '40%',
                    maxWidth: '164px',
                    height: '32px',
                    marginLeft: '13px',
                    border: 'solid 1px #d7e0ef',
                    color: '#0d1623',
                    fontSize: '16px',
                }}
            />
            <span className="loanDays--day">天</span>
            <style jsx>{`
                .loanDays--text {
                    line-height: 62px;
                    display: inline-block;
                    font-size: 16px;
                    color: #0d1623;
                }
                .loanDays__container {
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    height: 62px;
                    padding-left: 15px;
                }
                .loanDays--img {
                    margin-top: -6px;
                    margin-left: 7px;
                    cursor: pointer;
                }
                .loanDays--day {
                    margin-left: 7px;
                    color: #0d1623;
                    font-size: 16px;
                }
                @media (max-width: 450px) {
                    .loanDays__container {
                        border-left: none;
                        border-right: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoanDays;
