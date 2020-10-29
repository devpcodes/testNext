import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

function H5_goOrder() {
    return (
        <>
            <PageHead title={'即時盯盤'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/H5_goOrder`}
                    title="永豐金證券"
                    iHeight={88}
                />
            </div>
        </>
    );
}

H5_goOrder.getLayout = page => (
    <>
        <H5_goOrder>{page}</H5_goOrder>
    </>
);

export default H5_goOrder;
