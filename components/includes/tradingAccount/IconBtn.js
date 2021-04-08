import downloadIcon from '../../../resources/images/components/tradingAccount/ic-download.svg';
import refreshIcon from '../../../resources/images/components/tradingAccount/c-refresh.svg';
const IconBtn = ({ type, style, className }) => {
    const getImageHandler = type => {
        switch (type) {
            case 'download':
                return downloadIcon;
            case 'refresh':
                return refreshIcon;
        }
    };
    return (
        <>
            <button className={'download__btn ' + className} style={style}>
                <img src={getImageHandler(type)} />
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
            `}</style>
        </>
    );
};

export default IconBtn;
