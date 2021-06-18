// import { DatePicker, ConfigProvider } from "antd";
// import ja_JP from "antd/lib/locale-provider/ja_JP";
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import tw from 'date-fns/locale/zh-TW';
registerLocale('tw', tw);
const DateSelectBox = () => {
    const onChange = () => {};
    const onOk = () => {};
    return (
        <div>
            <DatePicker locale="tw" />
        </div>
    );
};
export default DateSelectBox;
