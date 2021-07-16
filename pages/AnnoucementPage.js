import { PageHead } from '../components/includes/PageHead';
import AnnouncePageComp from '../components/includes/announcement/announce_page/AnnouncePageComp';
import { Provider } from "react-redux";
import { itemStore } from '../store/announcement/store';
function AnnoucementPage() {
    return (
        <>
        <Provider store={itemStore}>
            <PageHead title={'最新公告'} />
            <div>
                <AnnouncePageComp/>
            </div>
        </Provider>
        </>
    );
}

export default AnnoucementPage;
