import OrderSelect from './OrderSelect';
import { useSelector } from 'react-redux';
import { themeColor } from '../../panel/PanelTabs';
import ChangeNum from '../../searchList/ChangeNum';
import SubmitBtn from './SubmitBtn';
import SwitchBox from './SwitchBox';
import DateSelectBox from './DateSelectBox';
const TradingSelect = () => {
    const bs = useSelector(store => store.goOrderSB.bs);

    return (
        <div className="tradingSelect__container">
            {/* <DateSelectBox/> */}
            <div className="trading__box">
                <OrderSelect
                    style={{ display: 'inline-block', marginRight: '4px', textAlign: 'center' }}
                    width="calc((100vw - 32px - 8px) / 2);"
                    height="44px"
                    value="0"
                    color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                    data={[
                        {
                            txt: '觸價單',
                            val: '0',
                        },
                    ]}
                    arrowLeft="-32px"
                />
                <OrderSelect
                    style={{ display: 'inline-block', marginLeft: '4px', textAlign: 'center' }}
                    width="calc((100vw - 32px - 8px) / 2);"
                    height="44px"
                    value="0"
                    color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                    data={[
                        {
                            txt: '可部份成交',
                            val: '0',
                        },
                    ]}
                    arrowLeft="-9px"
                />
                <ChangeNum
                    title={'觸發價'}
                    color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                    conditionText={bs === 'B' ? '≥' : '≤'}
                    textAlign={'center'}
                />
                <ChangeNum
                    title={'委託價'}
                    color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                    textAlign={'center'}
                />
                <ChangeNum
                    title={'股數'}
                    color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                    textAlign={'center'}
                />
                <SwitchBox />
            </div>

            <SubmitBtn text={'追價買進'} />

            <style jsx>{`
                .tradingSelect__container {
                    /* padding-left: 16px;
                    padding-right: 16px; */
                }
                .trading__box {
                    height: 193px;
                    overflow: auto;
                    padding-left: 16px;
                }
            `}</style>
        </div>
    );
};

export default TradingSelect;
