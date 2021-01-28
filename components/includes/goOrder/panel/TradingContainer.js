import TradingSelect from './TradingSelect';
const TradingContainer = () => {
    return (
        <div className="trading__container">
            <TradingSelect />
            <style jsx>{`
                .trading__container {
                    padding: 0 16px;
                }
            `}</style>
        </div>
    );
};

export default TradingContainer;
