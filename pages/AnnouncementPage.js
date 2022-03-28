import { PageHead } from '../components/includes/PageHead';
import AnnouncePageComp from '../components/includes/announcement/announce_page/AnnouncePageComp';

function AnnouncementPage() {
    return (
        <>
            <PageHead title={'最新公告'} />
            <div className="bg_f9fbff">
                <AnnouncePageComp/>
            </div>
            <style jsx>{`
                .bg_f9fbff{background-color: #f9fbff;}
            `}</style>
        </>
    );
}

export default AnnouncementPage;
