import CurrencyBox from './CurrencyBox';

export const FutureQuickView = ({ unreal }) => {
    return (
        <>
            <div className="FutureQuickView__container">
                <p className="quickView__title">未平倉總損益</p>
                <CurrencyBox currencyData={unreal} autoColor={true} />
            </div>
            <style jsx>{`
                .FutureQuickView__container {
                    margin-top: 18px;
                    font-size: 1.6rem;
                    color: #0d1623;
                }
                @media (max-width: 768px) {
                    .FutureQuickView__container {
                        width: 100%;
                        text-align: center;
                        color: white;
                        padding: 0;
                    }
                }
                .quickView__title {
                    margin-bottom: 5px;
                }
                @media (max-width: 768px) {
                    .quickView__title {
                        color: white;
                        font-size: 2rem;
                    }
                }
            `}</style>
        </>
    );
};
