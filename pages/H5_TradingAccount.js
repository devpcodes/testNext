import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';
import { useWindowSize } from '../hooks/useWindowSize';

function H5_TradingAccount() {
    const winSize = useWindowSize();

    return (
        <>
            <PageHead title={'交易帳務'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/H5_TradingAccount`}
                    title="永豐金證券"
                    iHeight={winSize.height || 1000}
                />
            </div>
        </>
    );
}

H5_TradingAccount.getLayout = Page => Page;

export default H5_TradingAccount;
