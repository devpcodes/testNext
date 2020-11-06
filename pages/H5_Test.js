import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

function H5_Test() {
    return (
        <>
            <PageHead title={'即時盯盤'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/H5_Test`}
                    title="永豐金證券"
                    iHeight={1200}
                />
            </div>
        </>
    );
}

H5_Test.getLayout = Page => Page;

export default H5_Test;
