import { useDispatch, useSelector } from 'react-redux';
import icon from '../../../../../resources/images/components/loanZone/ic-ic-account.svg';
import { useRouter } from 'next/router';
import { setModal } from '../../../../../store/components/layouts/action';
import btnIcon from '../../../../../resources/images/components/loanZone/ic-ic-account.svg';
const CalculationDescription = ({ style }) => {
    const winWidth = useSelector(store => store.layout.winWidth);
    const dispatch = useDispatch();
    const router = useRouter();
    const clickHandler = () => {
        router.push('/loan-zone/Overview');
        // dispatch(
        //     setModal({
        //         visible: true,
        //         type: 'info',
        //         title: '試算說明',
        //         content: (
        //             <div>
        //                 <p style={{ marginBottom: 0, color: '#0d1623' }}>
        //                     1. 可借款額度以您可提供擔保之庫存市值與融通成數進行預估。
        //                 </p>
        //                 <p style={{ marginBottom: 0, color: '#0d1623' }}>
        //                     2. 實際借款額度不得超過授信總額。若您借款已達授信總額上限，請洽所屬分公司。
        //                 </p>
        //                 <p style={{ marginBottom: 0, color: '#0d1623' }}>3. 線上每筆借款上限300萬元。</p>
        //                 <p style={{ marginBottom: 0, color: '#0d1623' }}>4. 線上可擔保股票與借款成數/利率 點我查看</p>
        //                 <p style={{ marginBottom: 0, color: '#0d1623' }}>5. 本服務以日計息，自動用日起算</p>
        //                 <p style={{ marginBottom: 0, color: '#0d1623' }}>6. 線上動用手續費每筆100 元</p>
        //                 <p style={{ marginBottom: 0, color: '#0d1623' }}>
        //                     (匯入多筆庫存同時一次申請動用時，以一筆計算)
        //                 </p>
        //                 <p style={{ marginBottom: 0, color: '#0d1623' }}>7. 撥券費以股票張數計算，每張 1 元</p>
        //                 <p style={{ marginBottom: 0, color: '#0d1623' }}>8.上述4到7.點費用於還款或借貸到期時收取。</p>
        //             </div>
        //         ),
        //         okText: '我知道了',
        //         noCloseIcon: true,
        //         noTitleIcon: true,
        //     }),
        // );
    };
    return (
        <div className="description__container" onClick={clickHandler} style={style}>
            {winWidth <= 530 ? (
                <div className="description__icon--mobile">
                    <img className="des__icon" src={btnIcon} />
                </div>
            ) : (
                <>
                    <img className="des__icon" src={icon} />
                    <span className="description">借款總覽</span>
                </>
            )}

            <style jsx>{`
                .description__container {
                    padding: 8px 12px 7px 12px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    height: 40px;
                    cursor: pointer;
                }
                .description {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    white-space: nowrap;
                }
                .des__icon {
                    margin-top: -4px;
                    margin-right: 4px;
                }
                @media (max-width: 1280px) {
                    .description__container {
                        padding: 8px 6px 8px 6px;
                        border-radius: 2px;
                        border: solid 1px #d7e0ef;
                        background-color: #fff;
                        height: 40px;
                        cursor: pointer;
                    }
                    .description {
                        font-size: 14px;
                    }
                }
                @media (max-width: 530px) {
                    .description__container {
                        padding: 0;
                        border: none;
                        display: inline-block;
                        height: 10px;
                        margin-top: 6px;
                        float: right;
                        margin-right: 10px;
                    }
                    .description__icon--mobile {
                        border: 1px solid #d7e0ef;
                        padding: 8px;
                        border-radius: 2px;
                    }
                    .des__icon {
                        margin: 0;
                    }
                    .description__container {
                        margin-top: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default CalculationDescription;
