import { formatNum } from '../../../services/formatNum';
import { useSelector } from 'react-redux';

export const getContentData = type => {
    const realTimePrtLosSum = useSelector(store => store.asset.realTimePrtLosSum.data);
    switch (type) {
        case 'S':
            return {
                sum_cost: {
                    title: '總成本',
                    amount: `$${formatNum(realTimePrtLosSum?.S.sum_cost)}`,
                    class: '',
                },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${formatNum(realTimePrtLosSum?.S.sum_unreal)}`,
                    class:
                        realTimePrtLosSum?.S.sum_unreal > 0 ? 'win' : realTimePrtLosSum?.S.sum_unreal < 0 ? 'loss' : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.S.sum_cost != '0'
                            ? `${parseFloat(
                                  (realTimePrtLosSum?.S.sum_unreal / realTimePrtLosSum?.S.sum_cost) * 100,
                              ).toFixed(2)}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.S.sum_unreal > 0 ? 'win' : realTimePrtLosSum?.S.sum_unreal < 0 ? 'loss' : '',
                },
            };
        case 'F':
            // 期貨原始保證金
            let otamt = 0;
            let mtamt = 0;
            realTimePrtLosSum?.F.data.map((data, index) => {
                otamt = otamt + +data.otamt;
            });
            // 期貨維持保證金
            realTimePrtLosSum?.F.data.map((data, index) => {
                mtamt = mtamt + +data.mtamt;
            });
            return {
                sum_balv: {
                    title: '權益數',
                    amount: `$${formatNum(realTimePrtLosSum?.F.sum_balv)}`,
                    class: '',
                },
                sum_futeamt_twd: {
                    title: '未平倉損益',
                    amount: `$${formatNum(realTimePrtLosSum?.F.sum_futeamt_twd)}`,
                    class:
                        realTimePrtLosSum?.F.sum_futeamt_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.F.sum_futeamt_twd < 0
                            ? 'loss'
                            : '',
                },
                otamt: {
                    title: '原始保證金',
                    amount: `$${formatNum(otamt)}`,
                    class: '',
                },
                mtamt: {
                    title: '維持保證金',
                    amount: `$${formatNum(mtamt)}`,
                    class: '',
                },
            };
        case 'FF':
            return {
                sum_dlbaln_twd: {
                    title: '權益數',
                    amount: `$${formatNum(realTimePrtLosSum?.FF.sum_dlbaln_twd)}`,
                    class: '',
                },
                // QQ3 : 未平倉損益資料不知道是什麼
                // QQ3: {
                //     title: '未平倉損益',
                //     amount: `$${formatNum(mtamt)}`,
                //     class: '',
                // },
                sum_dbaln_twd: {
                    title: '前日餘額',
                    amount: `$${formatNum(realTimePrtLosSum?.FF.sum_dbaln_twd)}`,
                    class: '',
                },
                // QQ5 原始保證金資料??
                // QQ5: {
                //     title: '原始保證金',
                //     amount: `$${formatNum(otamt)}`,
                //     class: '',
                // },
                sum_dtmmmrg_twd: {
                    title: '維持保證金',
                    amount: `$${formatNum(realTimePrtLosSum?.FF.sum_dtmmmrg_twd)}`,
                    class: '',
                },
                // QQ4 : 追繳保證金????
                // QQ4: {
                //     title: '追繳保證金',
                //     amount: `$--`,
                //     class: '',
                // },
            };
        case 'H':
            return {
                //  QQ-1 : 沒完整資料很難串，目前也沒有各市場分開。
                sum_cost: {
                    title: '總成本',
                    amount: `$${formatNum(realTimePrtLosSum?.H.sum_cost_twd)}`,
                    class: '',
                },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${formatNum(realTimePrtLosSum?.H.sum_twd - realTimePrtLosSum?.H.sum_cost_twd)}`,
                    class:
                        realTimePrtLosSum?.H.sum_twd - realTimePrtLosSum?.H.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.H.sum_twd - realTimePrtLosSum?.H.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.H.sum_cost_twd != '0'
                            ? `${parseFloat(
                                  ((realTimePrtLosSum?.H.sum_twd - realTimePrtLosSum?.H.sum_cost_twd) /
                                      realTimePrtLosSum?.H.sum_cost_twd) *
                                      100,
                              ).toFixed(2)}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.H.sum_twd - realTimePrtLosSum?.H.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.H.sum_twd - realTimePrtLosSum?.H.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
            };
        case 'MIP':
            return {
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${formatNum(realTimePrtLosSum?.MIP.sum_twd - realTimePrtLosSum?.MIP.sum_cost_twd)}`,
                    class:
                        realTimePrtLosSum?.MIP.sum_twd - realTimePrtLosSum?.MIP.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.MIP.sum_twd - realTimePrtLosSum?.MIP.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.MIP.sum_cost_twd != '0'
                            ? `${parseFloat(
                                  ((realTimePrtLosSum?.MIP.sum_twd - realTimePrtLosSum?.MIP.sum_cost_twd) /
                                      realTimePrtLosSum?.MIP.sum_cost_twd) *
                                      100,
                              ).toFixed(2)}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.MIP.sum_twd - realTimePrtLosSum?.MIP.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.MIP.sum_twd - realTimePrtLosSum?.MIP.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
            };
        case 'FIP':
            return {
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${formatNum(realTimePrtLosSum?.FIP.sum_twd - realTimePrtLosSum?.FIP.sum_cost_twd)}`,
                    class:
                        realTimePrtLosSum?.FIP.sum_twd - realTimePrtLosSum?.FIP.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.FIP.sum_twd - realTimePrtLosSum?.FIP.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.FIP.sum_cost_twd != '0'
                            ? `${parseFloat(
                                  ((realTimePrtLosSum?.FIP.sum_twd - realTimePrtLosSum?.FIP.sum_cost_twd) /
                                      realTimePrtLosSum?.FIP.sum_cost_twd) *
                                      100,
                              ).toFixed(2)}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.FIP.sum_twd - realTimePrtLosSum?.FIP.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.FIP.sum_twd - realTimePrtLosSum?.FIP.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
            };
        case 'WM_FUND':
            return {
                sum_cost_twd: {
                    title: '總成本',
                    amount: `$${formatNum(realTimePrtLosSum?.WM_FUND.sum_cost_twd)}`, //realTimePrtLosSum?.WM_FUND.sum_twd
                    class: '',
                },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${formatNum(
                        realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd,
                    )}`,
                    class:
                        realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.WM_FUND.sum_cost_twd != '0'
                            ? `${parseFloat(
                                  ((realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd) /
                                      realTimePrtLosSum?.WM_FUND.sum_cost_twd) *
                                      100,
                              ).toFixed(2)}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
                sum_prtlos_dividend: {
                    title: '累計配息',
                    amount: `$${formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend)}`,
                    class:
                        realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend > 0
                            ? 'win'
                            : realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend < 0
                            ? 'loss'
                            : '',
                },
                sum_roi_dividend: {
                    title: '含息報酬率(%)',
                    amount: `${formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_roi_dividend)}%`,
                    class:
                        realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend > 0
                            ? 'win'
                            : realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend < 0
                            ? 'loss'
                            : '',
                },
            };
        case 'OF':
            // 名目本金
            let trade_nonachieve = 0;

            realTimePrtLosSum?.OF.data.map((data, index) => {
                trade_nonachieve = trade_nonachieve + data.trade_nonachieve;
            });
            return {
                // QQ6 集保基金沒有總成本
                // sum_cost_twd: {
                //     title: '總成本',
                //     amount: `$--`,
                //     class: '',
                // },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${formatNum(trade_nonachieve)}`,
                    class: trade_nonachieve > 0 ? 'win' : trade_nonachieve < 0 ? 'loss' : '',
                },
                // QQ7 集保基金沒有成本無法算報酬率
                // rate_of_return: {
                //     title: '報酬率(%)',
                //     amount:
                //         realTimePrtLosSum?.WM_FUND.sum_cost_twd != '0'
                //             ? `${parseFloat(
                //                   ((realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd) /
                //                       realTimePrtLosSum?.WM_FUND.sum_cost_twd) *
                //                       100,
                //               ).toFixed(2)}%`
                //             : '--',
                //     class:
                //         realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd < 0
                //             ? 'loss'
                //             : '',
                // },
                // QQ8 集保基金沒有累積配息
                // sum_prtlos_dividend: {
                //     title: '累計配息',
                //     amount: `$${formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend)}`,
                //     class:
                //         realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend < 0
                //             ? 'loss'
                //             : '',
                // },
                // QQ9 集保基金沒有成本無法算報酬率
                // sum_roi_dividend: {
                //     title: '含息報酬率(%)',
                //     amount: `$${formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_roi_dividend)}`,
                //     class:
                //         realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend < 0
                //             ? 'loss'
                //             : '',
                // },
            };
        case 'BOND':
            return {
                sum_cost_twd: {
                    title: '總持有面額',
                    amount: `$${formatNum(realTimePrtLosSum?.BOND.sum_total_pv)}`,
                    class: '',
                },
                // QQ10 沒有成本沒有損益
                // sum_unreal: {
                //     title: '損益試算',
                //     amount: `$${formatNum(
                //         realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd,
                //     )}`,
                //     class:
                //         realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd < 0
                //             ? 'loss'
                //             : '',
                // },
                // QQ11 沒有成本沒有報酬率
                // rate_of_return: {
                //     title: '報酬率(%)',
                //     amount:
                //         realTimePrtLosSum?.WM_FUND.sum_cost_twd != '0'
                //             ? `${parseFloat(
                //                   ((realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd) /
                //                       realTimePrtLosSum?.WM_FUND.sum_cost_twd) *
                //                       100,
                //               ).toFixed(2)}%`
                //             : '--',
                //     class:
                //         realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.WM_FUND.sum_twd - realTimePrtLosSum?.WM_FUND.sum_cost_twd < 0
                //             ? 'loss'
                //             : '',
                // },
                // QQ12 沒有累計債息
                // sum_prtlos_dividend: {
                //     title: '累計債息',
                //     amount: `$${formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend)}`,
                //     class:
                //         realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend < 0
                //             ? 'loss'
                //             : '',
                // },
                // QQ13 沒有成本沒有報酬率
                // sum_roi_dividend: {
                //     title: '含息報酬率(%)',
                //     amount: `$${formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_roi_dividend)}`,
                //     class:
                //         realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend < 0
                //             ? 'loss'
                //             : '',
                // },
            };
        case 'SN':
            // 名目本金
            let total_amt_sn = 0;
            // 成交價金 (成本)
            let trade_amt_sn = 0;
            // 參考市值
            let market_amt_sn = 0;
            realTimePrtLosSum?.SN.data.map((data, index) => {
                total_amt_sn = total_amt_sn + data.total_amt;
                trade_amt_sn = trade_amt_sn + data.trade_amt;
                market_amt_sn = market_amt_sn + data.market_amt;
            });

            return {
                total_amt: {
                    title: '名目本金',
                    amount: `$${formatNum(total_amt_sn)}`,
                    class: '',
                },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${market_amt_sn - trade_amt_sn}`,
                    class: market_amt_sn - trade_amt_sn > 0 ? 'win' : market_amt_sn - trade_amt_sn < 0 ? 'loss' : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        trade_amt_sn != 0
                            ? `${parseFloat(((market_amt_sn - trade_amt_sn) / trade_amt_sn) * 100).toFixed(2)}%`
                            : '--',
                    class: market_amt_sn - trade_amt_sn > 0 ? 'win' : market_amt_sn - trade_amt_sn < 0 ? 'loss' : '',
                },
                // QQ15 找不到累積配息欄位
                // sum_prtlos_dividend: {
                //     title: '累計配息',
                //     amount: `$${formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend)}`,
                //     class:
                //         realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend < 0
                //             ? 'loss'
                //             : '',
                // },
                // QQ16 找不到累積配息欄位
                // sum_roi_dividend: {
                //     title: '含息報酬率(%)',
                //     amount: `$${formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_roi_dividend)}`,
                //     class:
                //         realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos_dividend < 0
                //             ? 'loss'
                //             : '',
                // },
            };
        case 'WM_SN':
            return {
                sum_invest_cost_twd: {
                    title: '名目本金',
                    amount: `$${formatNum(realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd)}`,
                    class: '',
                },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${formatNum(
                        realTimePrtLosSum?.WM_SN?.sub_total.sum_namt_twd -
                            realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd,
                    )}`,
                    class:
                        realTimePrtLosSum?.WM_SN?.sub_total.sum_namt_twd -
                            realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd >
                        0
                            ? 'win'
                            : realTimePrtLosSum?.WM_SN?.sub_total.sum_namt_twd -
                                  realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd <
                              0
                            ? 'loss'
                            : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd != '0'
                            ? `${parseFloat(
                                  ((realTimePrtLosSum?.WM_SN?.sub_total.sum_namt_twd -
                                      realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd) /
                                      realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd) *
                                      100,
                              ).toFixed(2)}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.WM_SN?.sub_total.sum_namt_twd -
                            realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd >
                        0
                            ? 'win'
                            : realTimePrtLosSum?.WM_SN?.sub_total.sum_namt_twd -
                                  realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd <
                              0
                            ? 'loss'
                            : '',
                },
                sum_acc_dividend_twd: {
                    title: '累計配息',
                    amount: `$${formatNum(realTimePrtLosSum?.WM_SN?.sub_total.sum_acc_dividend_twd)}`,
                    class:
                        realTimePrtLosSum?.WM_SN?.sub_total.sum_prtlos_dividend > 0
                            ? 'win'
                            : realTimePrtLosSum?.WM_SN?.sub_total.sum_prtlos_dividend < 0
                            ? 'loss'
                            : '',
                },
                sum_roi_dividend: {
                    title: '含息報酬率(%)',
                    amount: `${formatNum(realTimePrtLosSum?.WM_SN?.sub_total.sum_roi_dividend)}%`,
                    class:
                        realTimePrtLosSum?.WM_SN?.sub_total.sum_prtlos_dividend > 0
                            ? 'win'
                            : realTimePrtLosSum?.WM_SN?.sub_total.sum_prtlos_dividend < 0
                            ? 'loss'
                            : '',
                },
            };
        case 'WM_FUND_INTRANSIT':
            // QQ17 : 無詳細資料和算法
            return {
                // sum_cost: {
                //     title: '申購總額',
                //     amount: `$${formatNum(realTimePrtLosSum?.H.sum_cost_twd)}`,
                //     class: '',
                // },
                // sum_unreal: {
                //     title: '贖回總額',
                //     amount: `$${formatNum(realTimePrtLosSum?.H.sum_twd - realTimePrtLosSum?.H.sum_cost_twd)}`,
                //     class: '',
                // },
            };
        case 'WM_SN_INTRANSIT':
            // QQ18 : 無詳細資料和算法
            return {
                // sum_cost: {
                //     title: '買進總額',
                //     amount: `$${formatNum(realTimePrtLosSum?.H.sum_cost_twd)}`,
                //     class: '',
                // },
                // sum_unreal: {
                //     title: '賣出總額',
                //     amount: `$${formatNum(realTimePrtLosSum?.H.sum_twd - realTimePrtLosSum?.H.sum_cost_twd)}`,
                //     class: '',
                // },
            };
        case 'WM_TRUST_DEPOSIT':
            // QQ19 無圈存金額，無法分台幣美金
            return {
                // sum_cost: {
                //     title: '可動用餘額',
                //     amount: `$${formatNum(realTimePrtLosSum?.H.sum_cost_twd)}`,
                //     class: '',
                // },
                // sum_unreal: {
                //     title: '圈存總額',
                //     amount: `$${formatNum(realTimePrtLosSum?.H.sum_twd - realTimePrtLosSum?.H.sum_cost_twd)}`,
                //     class: '',
                // },
            };
        default:
            return {};
    }
};

export const getTitleData = type => {
    const realTimePrtLosSum = useSelector(store => store.asset.realTimePrtLosSum.data);
    let titleData = {};
    switch (type) {
        case 'S':
            titleData = {
                title: '台股庫存總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.S.sum_amt),
            };
            break;
        case 'F':
            titleData = {
                title: '國內期權總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.F.sum_balv),
            };
            break;
        case 'FF':
            titleData = {
                title: '國外期權總市值',
                currency: 'USD',
                sum: formatNum(realTimePrtLosSum?.FF.sum_dlbaln_twd),
            };
            break;
        case 'H':
            titleData = {
                title: '海外股票總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.H.sum_cost_twd),
            };
            break;
        case 'MIP':
            titleData = {
                title: '豐存美股(定期定股)總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.MIP.sum_twd),
            };
            break;
        case 'FIP':
            titleData = {
                title: '豐存美股(定期定額)總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.FIP.sum_twd),
            };
            break;
        case 'WM_FUND':
            titleData = {
                title: '信託基金總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.WM_FUND.sum_twd),
            };
            break;
        case 'OF':
            titleData = {
                title: '集保基金總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.OF.sum_twd),
            };
            break;
        case 'BOND':
            titleData = {
                title: '海外債券總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.BOND.sum_twd),
            };
            break;
        case 'SN':
            titleData = {
                title: '結構型商品總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.SN.sum_twd),
            };
            break;
        case 'WM_SN':
            titleData = {
                title: '基金結構型商品總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.WM_SN.sum_twd),
            };
            break;
        case 'WM_FUND_INTRANSIT':
            titleData = {
                title: '基金在途總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.WM_FUND_INTRANSIT.sum_twd),
            };
            break;
        case 'WM_SN_INTRANSIT':
            titleData = {
                title: '基金結構型在途總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.WM_SN_INTRANSIT.sum_twd),
            };
            break;
        case 'WM_TRUST_DEPOSIT':
            titleData = {
                title: '信託存款總市值',
                currency: 'NTD',
                sum: formatNum(realTimePrtLosSum?.WM_TRUST_DEPOSIT.sum_twd),
            };
            break;
        default:
            break;
    }
    return titleData;
};
