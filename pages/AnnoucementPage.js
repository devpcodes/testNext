import { PageHead } from '../components/includes/PageHead';
import AnnouncePageComp from '../components/includes/announcement/announce_page/AnnouncePageComp';

function AnnoucementPage() {
    return (
        <>
            <PageHead title={'最新公告'} />
            <div>
                <AnnouncePageComp/>
            </div>
        </>
    );
}

export default AnnoucementPage;
