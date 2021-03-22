import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import TradingSelect from './TradingSelect';
import PriceControl from './PriceControl';
import StockInfo from './StockInfo';
import SubmitBtn from './SubmitBtn';

const TradingContainer = () => {
    const lot = useSelector(store => store.goOrder.lot);
    const code = useSelector(store => store.goOrder.code);
    const tradingSelectChildren = useMemo(() => <TradingSelect />, []);
    const priceChildren = useMemo(() => <PriceControl key="2" title="限價" />, []);
    const qtyChildren = useMemo(() => {
        return <PriceControl key="1" title={lot === 'Odd' ? '股數' : '張數'} />;
    }, [lot, code]);
    return (
        <div className="trading__container">
            {/* <TradingSelect /> */}
            {tradingSelectChildren}
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
