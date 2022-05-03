import { wrapper } from '../store/store';
import { useEffect, useState } from 'react';
import { setNavItems } from '../store/components/layouts/action';
// import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';
import IndexPageComponent from '../components/includes/index/page/IndexPageComponent';
import { postArticleList } from '../services/pages/index/postArticleList';

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//     await store.dispatch(setNavItems());
// });
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());

    // return {
    //     props: { richClubNews },
    // };
});

const Home = function () {
    const [richClubNews, setRichClubNews] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = await postArticleList();
        setRichClubNews(res);
    };
    // const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <div>
            <PageHead title={'永豐金證券 SinoPac Securities'} />
            <IndexPageComponent richClubNews={richClubNews} />
        </div>
    );
};

export default Home;
