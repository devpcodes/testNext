import { PageHead } from '../components/includes/PageHead';
import SubscriptionMain from '../components/includes/subscription/subscriptionMain';
import Breadcrumb from '../components/includes/breadcrumb/breadcrumb';
function Subscription() {
    return (
        <>
            <PageHead title={'申購專區'} />
            <div>
                <SubscriptionMain />
            </div>
        </>
    );
}

export default Subscription;
