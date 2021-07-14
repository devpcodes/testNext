import icon from '../../../../resources/images/components/goOrder/ic-trending-up.svg';
import { Button } from 'antd';
const UpdateBar = ({ text }) => {
    return (
        <>
            <div className="noLogin__box">
                {<img className="noLoginIcon" src={icon} />}
                <span className="text">{text}</span>
                <Button
                    style={{
                        width: '70px',
                        height: '28px',
                        margin: '0 0 0 9px',
                        padding: '4px 1px 4px 2px',
                        borderRadius: '2px',
                        backgroundColor: '#254a91',
                        color: 'white',
                        position: 'absolute',
                        right: '16px',
                        top: '8px',
                        border: 'none',
                    }}
                    onClick={() => {
                        // reloadHandler();
                    }}
                >
                    更新
                </Button>
            </div>
            <style jsx>{`
                .noLogin__box {
                    height: 44px;
                    background-color: #e6ebf5;
                    position: relative;
                }
                .noLoginIcon {
                    margin-left: 16px;
                    /* margin-top: 15px; */
                }
                .text {
                    color: #254a91;
                    font-size: 1.4rem;
                    display: inline-block;
                    line-height: 44px;
                    margin-left: 8px;
                    font-weight: bold;
                }
            `}</style>
        </>
    );
};

export default UpdateBar;
