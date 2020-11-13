import Head from 'next/head';

const CaHead = () => {
    return (
        <Head>
            <script type="text/javascript" src={process.env.NEXT_PUBLIC_twcaCryptoLib}></script>
            <script src={process.env.NEXT_PUBLIC_webca}></script>
            <script src={process.env.NEXT_PUBLIC_webCAES}></script>
        </Head>
    );
};

export default CaHead;
