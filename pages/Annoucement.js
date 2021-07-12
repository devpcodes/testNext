import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import AnnounceComp from '../components/includes/announcement/announce_main/AnnounceComp';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Annoucement() {
    return (
        <>
            <PageHead title={'最新公告'} />
            <div>
                <AnnounceComp/>
            </div>
        </>
    );
}

export default Annoucement;
