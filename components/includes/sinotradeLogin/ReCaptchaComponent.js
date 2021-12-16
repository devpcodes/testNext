import { useEffect, useState } from 'react';

const ReCaptchaComponent = ({ onLoadReady }) => {
    const [recaptchaReady, setRecaptchaReady] = useState(false);
    useEffect(() => {
        const loadScriptByURL = (id, url, callback) => {
            const isScriptExist = document.getElementById(id);

            if (!isScriptExist) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                script.id = id;
                script.onload = function () {
                    if (callback) callback();
                };
                document.body.appendChild(script);
            }

            if (isScriptExist && callback) callback();
        };

        // load the script by passing the URL
        loadScriptByURL(
            'recaptcha-key',
            `https://www.recaptcha.net/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_reCAPTCHA}`,
            function () {
                console.log('Script loaded!');
                setRecaptchaReady(true);
            },
        );
    }, []);

    useEffect(() => {
        if (recaptchaReady) {
            onLoadReady(true);
        }
    }, [recaptchaReady]);
    return <></>;
};

export default ReCaptchaComponent;
