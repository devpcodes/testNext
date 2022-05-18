import { useEffect } from 'react';
import { Button } from 'antd';
import accountInfo from '../../../../../resources/images/components/loanZone/ic-ic-user-circle-black.svg';
import money from '../../../../../resources/images/components/loanZone/ic-ic-money.svg';
const Btn = ({ text, type, style }) => {
    const getImageHandler = type => {
        switch (type) {
            case 'accountInfo':
                return accountInfo;
            case 'money':
                return money;
        }
    };
    return (
        <>
            <Button className="subscription__description__btn" style={style}>
                <img src={getImageHandler(type)} /> {text}
            </Button>
            <style jsx global>{`
                .subscription__description__btn {
                    border: solid 1px #d7e0ef;
                    width: 121px;
                    height: 40px;
                    color: #0d1623;
                    font-size: 16px;
                    vertical-align: top;
                    margin-right: 0;
                }
                .subscription__description__btn:hover,
                .subscription__description__btn:focus {
                    border: solid 1px #d7e0ef;
                    color: #0d1623;
                }
            `}</style>
        </>
    );
};

export default Btn;
