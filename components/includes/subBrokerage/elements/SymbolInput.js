import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import { message } from 'antd';
import { setSymbolList } from '../../../../store/subBrokerage/action';
import AddSelfSelect from '../../selfSelect/AddSelfSelect';

const maxLength = 10;
const SymbolInput = () => {
    const dispatch = useDispatch();
    const symbolList = useSelector(store => store.subBrokerage.symbolList);
    const setValueHandler = useCallback(value => {
        const data = [...symbolList];
        const findIndex = _.findIndex(data, ['symbol', value.symbol]);
        if (findIndex !== -1) {
            message.warning('股號已設定');
            return;
        }
        if (data.length >= maxLength) {
            message.warning(`常用股號最多設定${maxLength}組`);
            return;
        }
        data.push(value);
        dispatch(setSymbolList(data));
    });
    return (
        <div style={{ marginLeft: '25px', marginRight: '25px' }}>
            <span
                style={{
                    fontSize: '14px',
                    color: '#3f5372',
                    marginBottom: '20px',
                    marginTop: '5px',
                    display: 'inline-block',
                }}
            >
                可使用下方搜尋列，設定下單常用股號。
            </span>
            <AddSelfSelect
                width={'234px'}
                marketType={['SB']}
                className="addSelfSelect"
                controlFunction={setValueHandler}
                isOrder={true}
            />
            <style global jsx>{`
                .addSelfSelect .ant-select.ant-select-auto-complete.ant-select-single.ant-select-show-search {
                    width: 234px !important;
                }
            `}</style>
        </div>
    );
};

export default SymbolInput;
