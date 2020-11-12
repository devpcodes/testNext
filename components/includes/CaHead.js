import Head from 'next/head';

const CaHead = () => {
    return (
        <Head>
            <script
                type="text/javascript"
                src="https://servicerd.sinotrade.com.tw/myStatic/public/ca/twcaCryptoLib-webCA.js"
            ></script>
            <script src="https://servicerd.sinotrade.com.tw/myStatic/public/ca/webca.ap.js"></script>
            <script src="https://servicerd.sinotrade.com.tw/myStatic/dist/ca/webCA-ES.bundle.js"></script>
        </Head>
    );
};

export default CaHead;
