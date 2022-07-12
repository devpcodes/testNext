import { useEffect, useState } from 'react';
const SubscriptionBtn = ({ text, width, colorType, onClick, style, loading }) => {
    const [myStyle, setMyStyle] = useState({});
    useEffect(() => {
        if (colorType === 'blue') {
            setMyStyle({
                padding: '3px 2px 3px 3px',
                borderRadius: '2px',
                backgroundColor: '#eaedf4',
                width: width || '100%',
                height: '26px',
                color: '#254a91',
                lineHeight: '14px',
                fontSize: '14px',
                ...style,
            });
        }
        if (colorType === 'green') {
            setMyStyle({
                padding: '3px 2px 3px 3px',
                borderRadius: '2px',
                backgroundColor: '#e3f2f1',
                width: width || '100%',
                height: '26px',
                color: '#22a16f',
                lineHeight: '14px',
                fontSize: '14px',
                ...style,
            });
        }
        if (colorType === 'yellow') {
            setMyStyle({
                padding: '3px 2px 3px 3px',
                borderRadius: '2px',
                backgroundColor: '#fcf6ef',
                width: width || '100%',
                height: '26px',
                color: '#daa360',
                lineHeight: '14px',
                fontSize: '14px',
                ...style,
            });
        }
        if (colorType === 'red') {
            setMyStyle({
                padding: '3px 2px 3px 3px',
                borderRadius: '2px',
                backgroundColor: '#f9ecea',
                width: width || '100%',
                height: '26px',
                color: '#c43826',
                lineHeight: '14px',
                fontSize: '14px',
                ...style,
            });
        }
    }, [colorType]);
    return (
        <>
            <button style={myStyle} className="subscription__btn" onClick={onClick} disabled={loading}>
                {text}
            </button>
            <style jsx>
                {`
                    .subscription__btn {
                        background-color: transparent;
                        border: none;
                    }
                `}
            </style>
        </>
    );
};

export default SubscriptionBtn;
