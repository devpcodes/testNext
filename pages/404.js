import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
    const router = useRouter();
    const [showErr, setShowErr] = useState(true);
    useEffect(() => {
        if (router.asPath.indexOf('SinoTrade_login') >= 0) {
            setShowErr(false);
        }
        console.log('err', router.asPath);
    }, [router.asPath]);

    return (
        <>
            {showErr && (
                <div
                    style={{
                        color: 'rgb(0, 0, 0)',
                        background: 'rgb(255, 255, 255)',
                        fontFamily:
                            '-apple-system, BlinkMacSystemFont, Roboto, &quot;Segoe UI, Fira Sans, Avenir, Helvetica Neue, Lucida Grande, sans-serif',
                        height: '100vh',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div>
                        <h1
                            style={{
                                display: 'inline-block',
                                borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                                margin: '0px 20px 0px 0px',
                                padding: '10px 23px 10px 0px',
                                fontSize: '24px',
                                fontWeight: 500,
                                verticalAlign: 'top',
                            }}
                        >
                            404
                        </h1>
                        <div
                            style={{
                                display: 'inline-block',
                                textAlign: 'left',
                                lineHeight: '49px',
                                height: '49px',
                                verticalAlign: 'middle',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'normal',
                                    lineHeight: 'inherit',
                                    margin: '0px',
                                    padding: '0px',
                                }}
                            >
                                This page could not be found.
                            </h2>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
