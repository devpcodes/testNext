import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

function H5_Option_Combination() {
    return (
        <>
            <PageHead title={'即時盯盤'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/H5_Option_Combination`}
                    title="永豐金證券"
                    iHeight={903}
                />
            </div>
        </>
    );
}

H5_Option_Combination.getLayout = page => (
    <>
        <H5_Option_Combination>{page}</H5_Option_Combination>
    </>
);

export default H5_Option_Combination;
