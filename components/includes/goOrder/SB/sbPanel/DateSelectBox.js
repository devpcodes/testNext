// import { DatePicker, ConfigProvider } from "antd"; 版本衝突，無法使用...
import { useState, useEffect } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import tw from 'date-fns/locale/zh-TW';
import dIcon from '../../../../../resources/images/components/goOrder/sb/calendar-calendar-calendar.svg';
import moment from 'moment';
registerLocale('tw', tw);
const DateSelectBox = ({ style, width, ...props }) => {
    const [startDate, setStartDate] = useState('');
    useEffect(() => {
        const newDate = moment().add(6, 'months').format('YYYY/MM/DD');
        let selectDate = new Date(newDate);
        setStartDate(selectDate);
    }, []);
    const onChangeHandler = date => {
        setStartDate(date);
    };
    return (
        <div className="date__container" style={style}>
            <img className={'icon'} src={dIcon} />
            <DatePicker
                locale="tw"
                selected={startDate}
                onChange={onChangeHandler}
                dateFormat="yyyy/MM/dd"
                {...props}
            />
            <style global jsx>{`
                .date__container {
                    position: relative;
                }
                .date__container .icon {
                    position: absolute;
                    right: 8px;
                    z-index: 1;
                    top: 8px;
                }
                .date__container .react-datepicker__month-container {
                    width: 200px;
                }
                .date__container .react-datepicker__day-names {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 5px;
                }
                .date__container .react-datepicker__week {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 5px;
                }
                .date__container .react-datepicker__current-month {
                    margin-top: -4px;
                }
                .date__container .react-datepicker__input-container input {
                    height: 44px;
                    border: 1px solid #dadada;
                    border-radius: 2px;
                    padding-left: 10px;
                    font-size: 1.6rem;
                    font-weight: bold;
                    width: ${width};
                    color: #0d1623;
                }
                .date__container .react-datepicker {
                    border: 1px solid #d6d6d6;
                }
                .date__container .react-datepicker__header {
                    border-bottom: 1px solid #d4d4d4;
                }
            `}</style>
        </div>
    );
};
export default DateSelectBox;
