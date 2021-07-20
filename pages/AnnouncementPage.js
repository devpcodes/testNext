import { PageHead } from '../components/includes/PageHead';
import AnnouncePageComp from '../components/includes/announcement/announce_page/AnnouncePageComp';
import { Provider } from "react-redux";
import { itemStore } from '../store/announcement/store';
function AnnouncementPage() {
    return (
        <>
        <Provider store={itemStore}>
            <PageHead title={'最新公告'} />
            <div className="bg_f9fbff">
                <AnnouncePageComp/>
            </div>
            <style jsx>{`
                .bg_f9fbff{background-color: #f9fbff;}
            `}</style>
        </Provider>
        </>
    );
}

export default AnnouncementPage;
