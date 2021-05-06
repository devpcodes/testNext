import { Button } from 'antd';
import trushIcon from '../../../../../resources/images/components/tradingAccount/ic-trash.svg';
const DelButton = ({ text, width, height, fontSize, style, ...props }) => {
    return (
        <>
            <Button
                style={{
                    display: 'inline-block',
                    width: '83px',
                    height: '40px',
                    padding: 0,
                    fontSize: fontSize || '1.4rem',
                    color: 'white',
                    border: 'none',
                    backgroundColor: '#c43826',
                    ...style,
                }}
                className="del__btn"
                icon={<img className="img" src={trushIcon} />}
                {...props}
            >
                {text}
            </Button>
            <style global jsx>{`
                .del__btn.ant-btn:hover {
                    background-color: rgb(183 43 25) !important;
                }
                .img {
                    margin-top: -4px;
                    margin-right: 4px;
                }
            `}</style>
        </>
    );
};

export default DelButton;
