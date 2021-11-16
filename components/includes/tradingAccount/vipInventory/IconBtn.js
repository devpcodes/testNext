import downloadIcon from '../../../../resources/images/components/tradingAccount/ic-download.svg';
import refreshIcon from '../../../../resources/images/components/tradingAccount/c-refresh.svg';
import infoIcon from '../../../../resources/images/components/tradingAccount/ic-info.svg';
import eyeOpen from '../../../../resources/images/components/tradingAccount/ic-eyeopen.svg';
import eyeClose from '../../../../resources/images/components/tradingAccount/ic-eyeclose.svg';
import money from '../../../../resources/images/components/tradingAccount/ic-money.svg';
const IconBtn = ({ type, style, className, onClick, text }) => {
    const getImageHandler = type => {
        switch (type) {
            case 'download':
                return downloadIcon;
            case 'refresh':
                return refreshIcon;
            case 'info':
                return infoIcon;
            case 'eyeOpen':
                return eyeOpen;
            case 'eyeClose':
                return eyeClose;
            case 'money':
                return money;
        }
    };
    return (
        <>
            <button className={'download__btn ' + className} style={style} onClick={onClick}>
                <img src={getImageHandler(type)} />{text?<span>{text}</span>:''}
            </button>
            <style jsx>{`
                .download__btn {
                    margin: 0;
                    padding: 0;
                    border: solid 1px #d7e0ef;
                    border-radius: 2px;
                    outline: none;
                    width: 40px;
                    height: 40px;
                    box-sizing: border-box;
                    background-color: white;
                    transition: all 0.3s;
                }
                .download__btn:hover {
                    background-color: #f2f5fa;
                }
                .download__btn span{
                    vertical-align:middle;
                }
                .hover-light:hover{ 
                    filter: brightness(1.2);
                }
            `}</style>
        </>
    );
};

export default IconBtn;
