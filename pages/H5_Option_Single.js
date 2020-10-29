import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

function H5_Option_Single() {
    return (
        <>
            <PageHead title={'即時盯盤'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/H5_Option_Single`}
                    title="永豐金證券"
                    iHeight={903}
                />
            </div>
        </>
    );
}

H5_Option_Single.getLayout = page => (
    <>
        <H5_Option_Single>{page}</H5_Option_Single>
    </>
);

export default H5_Option_Single;