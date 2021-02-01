import TradingSelect from './TradingSelect';
import PriceControl from './PriceControl';

const TradingContainer = () => {
    return (
        <div className="trading__container">
            <TradingSelect />
            <PriceControl title="限價" />
            <PriceControl title="股數" />
            <style jsx>{`
                .trading__container {
                    padding: 0 16px;
                }
            `}</style>
        </div>
    );
};

export default TradingContainer;
