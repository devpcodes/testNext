import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

function PlaceOrderPopupWindow() {
    return (
        <>
            <PageHead title={'即時盯盤'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/PlaceOrderPopupWindow`}
                    title="永豐金證券"
                    iHeight={446}
                />
            </div>
        </>
    );
}

PlaceOrderPopupWindow.getLayout = page => (
    <>
        <PlaceOrderPopupWindow>{page}</PlaceOrderPopupWindow>
    </>
);

export default PlaceOrderPopupWindow;
