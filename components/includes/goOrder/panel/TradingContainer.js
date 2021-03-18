import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import TradingSelect from './TradingSelect';
import PriceControl from './PriceControl';
import StockInfo from './StockInfo';
import SubmitBtn from './SubmitBtn';

const TradingContainer = () => {
    const lot = useSelector(store => store.goOrder.lot);
    const priceChildren = useMemo(() => <PriceControl key="2" title="限價" />, []);
    const qtyChildren = useMemo(() => <PriceControl key="1" title={lot === 'Odd' ? '股數' : '張數'} />, []);
    return (
        <div className="trading__container">
            <TradingSelect />
            {priceChildren}
            {qtyChildren}
            <StockInfo />
            <SubmitBtn />
            <style jsx>{`
                .trading__container {
                    padding: 0 16px;
                }
            `}</style>
        </div>
    );
};

export default TradingContainer;
