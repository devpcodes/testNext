import React from 'react';
import Head from 'next/head';
import Header from '../includes/header';
import Footer from '../includes/footer';
const Layout = React.memo((props) => {
    console.log('Layout')
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
            </Head>
            <Header/>
            {props.children}
            <Footer/>
        </>
    )
})

export default Layout;