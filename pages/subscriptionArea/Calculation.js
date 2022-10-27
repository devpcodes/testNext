import { PageHead } from '../../components/includes/PageHead';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import CalculationComponents from '../../components/includes/subscriptionCalculation/page/CalculationComponents';

export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Calculation() {
    return (
        <div className="Calculation__container">
            <PageHead title={'申購試算'} />
            <div>
                <CalculationComponents />
            </div>
            <style jsx>{`
                .Calculation__container {
                    padding-top: 20px;
                    padding-left: 10%;
                    padding-right: 10%;
                }
                @media (max-width: 1024px) {
                    .Calculation__container {
                        padding-left: 5%;
                        padding-right: 5%;
                    }
                }
                @media (max-width: 768px) {
                    .Calculation__container {
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default Calculation;
