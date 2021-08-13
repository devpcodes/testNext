import { PageHead } from '../components/includes/PageHead';
import AnnounceComp from '../components/includes/announcement/announce_main/AnnounceComp';

function Announcement() {
    return (
        <>
            <PageHead title={'最新公告'} />
            <div className="bg_f9fbff">
                <AnnounceComp/>
                <style jsx>{`
                .bg_f9fbff{background-color: #f9fbff;}
                `}</style>
            </div>
        </>
    );
}

export default Announcement;
