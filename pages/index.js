import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
// import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';
import IndexPageComponent from '../components/includes/index/page/IndexPageComponent';
import { postArticleList } from '../services/pages/index/postArticleList';

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//     await store.dispatch(setNavItems());
// });
export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
    const richClubNews = await postArticleList();
    return {
        props: { richClubNews },
    };
});

const Home = function ({ richClubNews }) {
    // const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <div>
            <PageHead title={'永豐金理財網'} />
            <IndexPageComponent richClubNews={richClubNews} />
        </div>
    );
};

export default Home;
