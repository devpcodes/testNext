import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Chart = dynamic(() => import('../components/includes/chart'), { ssr: false });

const Home = function () {
    const winWidth = useSelector((store) => store.layout.winWidth);
    const isMobile = useSelector((store) => store.layout.isMobile);

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1>winWidth: {winWidth}</h1>
                {/* <Chart /> */}
                <h2>
                    環境: {process.env.NODE_ENV}; 路徑：{process.env.NEXT_PUBLIC_SUBPATH}; {isMobile ? 'mobile' : 'PC'}
                </h2>
            </div>
            <style jsx>{`
                h1 {
                    color: black;
                    font-size: 100px;
                    text-align: center;
                    margin-bottom: 10px;
                    height: 80vh;
                }
                h2 {
                    text-align: center;
                }
            `}</style>
        </div>
    );
};
export default Home;
