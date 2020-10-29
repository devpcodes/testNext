import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

function H5_TradingAccount() {
    return (
        <>
            <PageHead title={'交易帳務'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/H5_TradingAccount`}
                    title="永豐金證券"
                    iHeight={1000}
                />
            </div>
        </>
    );
}

H5_TradingAccount.getLayout = page => (
    <>
        <H5_TradingAccount>{page}</H5_TradingAccount>
    </>
);

export default H5_TradingAccount;
