import { PageHead } from '../components/includes/PageHead';
import { Info } from '../components/includes/goOrder/infoArea/Info';

const OrderGO = () => {
    return (
        <>
            <PageHead title={'快速下單'} />
            <Info />
        </>
    );
};

OrderGO.getLayout = Page => Page;

export default OrderGO;
