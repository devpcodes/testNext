import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

function H5_Future_Duplex() {
    return (
        <>
            <PageHead title={'即時盯盤'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/H5_Future_Duplex`}
                    title="永豐金證券"
                    iHeight={555}
                />
            </div>
        </>
    );
}

H5_Future_Duplex.getLayout = page => (
    <>
        <H5_Future_Duplex>{page}</H5_Future_Duplex>
    </>
);

export default H5_Future_Duplex;
