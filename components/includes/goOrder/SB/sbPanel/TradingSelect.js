import { Select } from 'antd';
import OrderSelect from './OrderSelect';

const TradingSelect = () => {
    return (
        <div className="tradingSelect__container">
            <OrderSelect
                style={{ display: 'inline-block', marginRight: '4px', textAlign: 'center' }}
                width="calc((100vw - 32px - 8px) / 2);"
                height="44px"
                value="0"
                color="#f45a4c"
                data={[
                    {
                        txt: '觸價單',
                        val: '0',
                    },
                ]}
            />
            <OrderSelect
                style={{ display: 'inline-block', marginLeft: '4px', textAlign: 'center' }}
                width="calc((100vw - 32px - 8px) / 2);"
                height="44px"
                value="0"
                color="#f45a4c"
                data={[
                    {
                        txt: '可部份成交',
                        val: '0',
                    },
                ]}
            />
            <style jsx>{`
                .tradingSelect__container {
                    padding-left: 16px;
                    padding-right: 16px;
                }
            `}</style>
        </div>
    );
};

export default TradingSelect;
