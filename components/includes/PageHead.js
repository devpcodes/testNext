import Head from 'next/head';
import PropTypes from 'prop-types';

export const PageHead = ({ title }) => {
    return (
        <Head>
            <link rel="canonical" href={'https://www.sinotrade.com.tw' + process.env.NEXT_PUBLIC_SUBPATH} />
            <meta
                name="description"
                content="永豐金證券數位服務，透過最佳體驗的產品設計與最專業的內容經營，在不同階段的理財旅程服務投資者更聰明便捷的體驗。"
            ></meta>
            <meta
                name="keywords"
                content=",永豐金證券,永豐投顧,永豐,2890,大戶投,智慧單,借券,申購,不限用途款項借貸,PYTHON API,豐存股,美股,台股,期貨,複委託,投資,理財,股票,金融,上櫃,上市,基金,證券,財報,財富,股市,金融,股價,股票,選股"
            ></meta>
            <meta property="og:title" content="永豐金證券 SinoPac Securities" />
            <meta
                property="og:description"
                content=" 永豐金證券數位服務，透過最佳體驗的產品設計與最專業的內容經營，在不同階段的理財旅程服務投資者更聰明便捷的體驗。"
            />
            <meta property="og:url" content={'https://www.sinotrade.com.tw' + process.env.NEXT_PUBLIC_SUBPATH} />
            <meta property="og:site_name" content="永豐金證券" />
            <meta property="og:image" content={process.env.NEXT_PUBLIC_SUBPATH + '/head/OG_sinopac_securities.jpg'} />
            <title>{title}</title>
        </Head>
    );
};

PageHead.propTypes = {
    title: PropTypes.string.isRequired,
};
