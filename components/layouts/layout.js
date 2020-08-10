import React from 'react';
import Head from 'next/head';
import Header from '../includes/header';
import Footer from '../includes/footer';
const Layout = React.memo((props) => {
    console.log('Layout')
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="https://richclub.azureedge.net/public/apple-icon-180x180.png"/>
                <link rel='icon' type='image/png' sizes='32x32' href='/images/icons/32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/images/icons/16.png' />
                <meta name='theme-color' content='#000000' />
                <link rel='mask-icon' href='/images/icons/32.png' color='#5bbad5' />
                <link rel='manifest' href='/manifest.json' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
            </Head>
            <Header/>
                {props.children}
            <Footer/>
        </>
    )
})

export default Layout;