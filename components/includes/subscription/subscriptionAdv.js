import { memo } from 'react';
import { useSelector } from 'react-redux';
import advImg from '../../../resources/images/pages/subscription/ic-empty@2x.png';
const SubscriptionAdv = memo(({}) => {
    return (
        <>
            <div className="subscriptionAdv">
                <img className="pic" src={advImg} />
                <h2 className="title">資金不足也可申購</h2>
                <p className="desc">存款不足也可申購，僅需少少利息就可享高報酬</p>
                <p className="more">
                    <a href={`${process.env.NEXT_PUBLIC_SUBPATH}/subscriptionArea/ProductInfo/`} target="_blank">
                        瞭解更多 ＞
                    </a>
                </p>
            </div>
            {/* https://webrd.sinotrade.com.tw/newweb/subscriptionArea/ProductInfo/ */}
            <style jsx>{`
                .subscriptionAdv {
                    text-align: center;
                }
                .pic {
                    width: 77px;
                    height: 92px;
                    margin-top: 65px;
                }
                .title {
                    font-size: 2.4rem;
                    font-weight: bold;
                    color: #0d1623;
                    margin: 19px 0 11px 0;
                }
                .desc {
                    margin: 0 0 20px 0;
                    font-size: 1.4rem;
                    color: #3f5372;
                    font-weight: bold;
                }
                .more {
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #c43826;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
});

export default SubscriptionAdv;
