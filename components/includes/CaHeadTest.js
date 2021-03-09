import Head from 'next/head';

const CaHeadTest = () => {
    return (
        <Head>
            <script type="text/javascript" src={process.env.NEXT_PUBLIC_twcaCryptoLib_test}></script>
            <script src={process.env.NEXT_PUBLIC_webca_test}></script>
            <script src={process.env.NEXT_PUBLIC_webCAES_test}></script>
        </Head>
    );
};

export default CaHeadTest;
