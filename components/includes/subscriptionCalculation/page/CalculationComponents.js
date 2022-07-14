import Breadcrumb from '../../breadcrumb/breadcrumb';

const CalculationComponents = () => {
    return (
        <>
            <Breadcrumb />
            <h1 className="calcu__title">申購試算</h1>
            <style jsx>{`
                .calcu__title {
                    font-size: 28px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.7px;
                    color: #0d1623;
                }
            `}</style>
            <style global jsx>{`
                .page__container {
                    background-color: #f9fbff;
                    padding-bottom: 32px;
                }
            `}</style>
        </>
    );
};

export default CalculationComponents;
