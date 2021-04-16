import SumItem from './SumItem';
import theme from '../../../../resources/styles/theme';
const SumColmn = () => {
    return (
        <div>
            <SumItem title={'篩選商品'} info={'2330 台積電'} className="item-first" />
            <SumItem title={'合計委託量'} info={'9,175,000'} className="item" />
            <SumItem title={'合計取消量'} info={'9,175,000'} className="item" />
            <SumItem title={'合計成交量'} info={'9,175,000'} className="item" />
            <SumItem title={'合計剩餘量'} info={'9,175,000'} className="item item-last" />

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
