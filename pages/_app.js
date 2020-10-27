import 'antd/dist/antd.min.css';
import '../resources/styles/globals.css';
import { useRef, useState, useEffect } from 'react';
import { wrapper } from '../store/store';
import Layout from '../components/layouts/layout';

function MyApp({ Component, pageProps, router }) {
    const getLayout = Component.getLayout || (page => <Layout children={page} />);
    const renderComp = getLayout(<Component {...pageProps} />);
    return <>{renderComp}</>;
}
export default wrapper.withRedux(MyApp);
