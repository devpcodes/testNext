import SumItem from './SumItem';
import theme from '../../../../resources/styles/theme';
import { formatNum } from '../../../../services/formatNum';
const SumColmn = ({ filterStock, totalOrderQty, totalMatchQty, totalCancelQty }) => {
    return (
        <div>
            <SumItem title={'篩選商品'} info={filterStock} className="item-first" />
            <SumItem title={'合計委託量'} info={formatNum(totalOrderQty)} className="item" />
            <SumItem title={'合計取消量'} info={formatNum(totalCancelQty)} className="item" />
            <SumItem title={'合計成交量'} info={formatNum(totalMatchQty)} className="item" />
            <SumItem
                title={'合計剩餘量'}
                info={formatNum(totalOrderQty - totalCancelQty - totalMatchQty)}
                className="item item-last"
            />

            <style jsx global>
                {`
                    .item {
                        width: calc(100% / 5 - 2%);
                        height: 72px;
                        margin-right: 2%;
                    }
                    .item-first {
                        width: calc(100% / 5);
                        height: 72px;
                        margin-right: 2%;
                    }
                    .item-last {
                        margin-right: 0;
                    }
                    @media (max-width: ${theme.mobileBreakPoint}px) {
                        .item-first {
                            width: 100%;
                            height: 72px;
                            display: block;
                            margin-right: 0;
                            margin-bottom: 14px;
                        }
                        .item {
                            height: 72px;
                            margin-right: 0;
                            width: calc(100% / 2 - 7px);
                            margin-right: 14px;
                        }
                        .item:nth-child(odd) {
                            margin-right: 0;
                        }
                        .item:nth-child(2) {
                            margin-bottom: 14px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default SumColmn;
