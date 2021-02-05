import { useSelector } from 'react-redux';
import TradingSelect from './TradingSelect';
import PriceControl from './PriceControl';
import StockInfo from './StockInfo';
import SubmitBtn from './SubmitBtn';

const TradingContainer = () => {
    const lot = useSelector(store => store.goOrder.lot);
    return (
        <div className="trading__container">
            <TradingSelect />
            <PriceControl key="2" title="限價" />
            <PriceControl key="1" title={lot === 'Odd' ? '股數' : '張數'} />
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
