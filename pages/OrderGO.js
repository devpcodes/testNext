import { checkServer } from '../services/checkServer';
import { getParamFromQueryString } from '../services/getParamFromQueryString';

const OrderGO = () => {
    return (
        <>
            <div>
                <h1>Order GO!</h1>
            </div>
        </>
    );
};

// nav=0 為無 header，nav=1 為有 header。預設為：有 header。
const setOrderGOLayout = () => {
    const isServer = checkServer();
    if (isServer) {
        OrderGO.getLayout = Page => Page;
    } else {
        const nav = getParamFromQueryString('nav');
        if (nav == '0') {
            OrderGO.getLayout = Page => Page;
        }
    }
};

setOrderGOLayout();
export default OrderGO;
