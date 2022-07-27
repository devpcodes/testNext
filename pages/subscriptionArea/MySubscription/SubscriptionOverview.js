import { PageHead } from '../../../components/includes/PageHead';
import SubscriptionOverviewComp from '../../../components/includes/subscriptionOverview/page/SubscriptionOverviewComp';
// import SubscriptionMain from '../../components/includes/subscription/subscriptionMain';
function SubscriptionOverview() {
    return (
        <>
            <PageHead title={'申購專區'} />
            <div>
                <SubscriptionOverviewComp />
            </div>
        </>
    );
}

export default SubscriptionOverview;
