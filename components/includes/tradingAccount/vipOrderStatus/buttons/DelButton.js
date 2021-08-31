import { Button } from 'antd';
import trushIcon from '../../../../../resources/images/components/tradingAccount/ic-trash.svg';
import submitIcon from '../../../../../resources/images/components/tradingAccount/basic-checkbox-checked.svg';
const DelButton = ({ text, width, height, fontSize, style, type, ...props }) => {
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
                className={type == null || type === 'del' ? 'del__btn' : 'submit__btn'}
                icon={<img className="img" src={type == null || type === 'del' ? trushIcon : submitIcon} />}
                {...props}
            >
                {text}
            </Button>
            <style global jsx>{`
                .del__btn.ant-btn:hover {
                    background-color: rgb(183 43 25) !important;
                }
                .submit__btn.ant-btn:hover {
                    background-color: rgb(11 50 123) !important;
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
