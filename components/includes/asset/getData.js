import { formatNum } from '../../../services/formatNum';
import { useSelector } from 'react-redux';

export const getContentData = type => {
    const realTimePrtLosSum = useSelector(store => store.asset.realTimePrtLosSum.data);
    let success;
    switch (type) {
        case 'S':
            success = realTimePrtLosSum?.S?.status.success;
            return {
                sum_cost: {
                    title: '總成本',
                    amount: `$${
                        success
                            ? formatNum(
                                  parseInt(realTimePrtLosSum?.S?.sum_cost) +
                                      parseInt(realTimePrtLosSum?.L?.unreal_sums?.sum_cost),
                              )
                            : '--'
                    }`,
                    class: '',
                },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${
                        success
                            ? formatNum(
                                  parseInt(realTimePrtLosSum?.S?.sum_unreal) +
                                      parseInt(realTimePrtLosSum?.L?.unreal_sums?.sum_unreal),
                              )
                            : '--'
                    }`,
                    class:
                        parseInt(realTimePrtLosSum?.S?.sum_unreal) +
                            parseInt(realTimePrtLosSum?.L?.unreal_sums?.sum_unreal) >
                        0
                            ? 'win'
                            : parseInt(realTimePrtLosSum?.S?.sum_unreal) +
                                  parseInt(realTimePrtLosSum?.L?.unreal_sums?.sum_unreal) <
                              0
                            ? 'loss'
                            : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.S?.sum_cost != '0'
                            ? `${parseFloat(
                                  ((parseInt(realTimePrtLosSum?.S?.sum_unreal) +
                                      parseInt(realTimePrtLosSum?.L?.unreal_sums?.sum_unreal)) /
                                      (parseInt(realTimePrtLosSum?.S?.sum_cost) +
                                          parseInt(realTimePrtLosSum?.L?.unreal_sums?.sum_cost))) *
                                      100,
                              ).toFixed(2)}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.S?.sum_unreal > 0
                            ? 'win'
                            : realTimePrtLosSum?.S?.sum_unreal < 0
                            ? 'loss'
                            : '',
                },
            };
        case 'F':
            // 期貨原始保證金
            let otamt = 0;
            let mtamt = 0;
            realTimePrtLosSum?.F?.data.map((data, index) => {
                otamt = otamt + +data.otamt;
            });
            // 期貨維持保證金
            realTimePrtLosSum?.F?.data.map((data, index) => {
                mtamt = mtamt + +data.mtamt;
            });
            success = realTimePrtLosSum?.F?.status.success;

            return {
                sum_balv: {
                    title: '權益數',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.F?.sum_balv) : '--'}`,
                    class: '',
                },
                sum_futeamt_twd: {
                    title: '未平倉損益',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.F?.sum_futeamt_twd) : '--'}`,
                    class:
                        realTimePrtLosSum?.F?.sum_futeamt_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.F?.sum_futeamt_twd < 0
                            ? 'loss'
                            : '',
                },
                sum_ybaln: {
                    title: '前日帳戶餘額',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.F?.sum_ybaln) : '--'}`,
                    class: '',
                },
                otamt: {
                    title: '原始保證金',
                    amount: `$${success ? formatNum(otamt) : '--'}`,
                    class: '',
                },
                mtamt: {
                    title: '維持保證金',
                    amount: `$${success ? formatNum(mtamt) : '--'}`,
                    class: '',
                },
                sum_axamt: {
                    title: '催繳保證金',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.F?.sum_axamt) : '--'}`,
                    class: '',
                },
            };
        case 'FF':
            success = realTimePrtLosSum?.FF?.status.success;
            return {
                sum_dbaln_twd: {
                    title: '權益數',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.FF?.sum_dbaln_twd) : '--'}`,
                    class: '',
                },
                sum_dtunpl_twd: {
                    title: '未平倉損益',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.FF?.sum_dtunpl_twd) : '--'}`,
                    class:
                        realTimePrtLosSum?.FF?.sum_dtunpl_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.FF?.sum_dtunpl_twd < 0
                            ? 'loss'
                            : '',
                },
                sum_dlbaln_twd: {
                    title: '前日餘額',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.FF?.sum_dlbaln_twd) : '--'}`,
                    class: '',
                },
                sum_dtimmrg_twd: {
                    title: '原始保證金',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.FF?.sum_dtimmrg_twd) : '--'}`,
                    class: '',
                },
                sum_dtmmmrg_twd: {
                    title: '維持保證金',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.FF?.sum_dtmmmrg_twd) : '--'}`,
                    class: '',
                },
                sum_dadamt_twd: {
                    title: '催繳保證金',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.FF?.sum_dadamt_twd) : '--'}`,
                    class: '',
                },
            };
        case 'H':
            success = realTimePrtLosSum?.H?.status.success;
            return {
                //  QQ-1 : 沒完整資料很難串，目前也沒有各市場分開。
                sum_cost: {
                    title: '總成本',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.H?.sum_cost_twd) : '--'}`,
                    class: '',
                },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${
                        success ? formatNum(realTimePrtLosSum?.H?.sum_twd - realTimePrtLosSum?.H?.sum_cost_twd) : '--'
                    }`,
                    class:
                        realTimePrtLosSum?.H?.sum_twd - realTimePrtLosSum?.H?.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.H?.sum_twd - realTimePrtLosSum?.H?.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.H?.sum_cost_twd != '0'
                            ? `${parseFloat(
                                  ((realTimePrtLosSum?.H?.sum_twd - realTimePrtLosSum?.H?.sum_cost_twd) /
                                      realTimePrtLosSum?.H?.sum_cost_twd) *
                                      100,
                              ).toFixed(2)}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.H?.sum_twd - realTimePrtLosSum?.H?.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.H?.sum_twd - realTimePrtLosSum?.H?.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
            };
        case 'MIP':
            success = realTimePrtLosSum?.MIP?.status.success;
            return {
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${
                        success
                            ? formatNum(realTimePrtLosSum?.MIP?.sum_twd - realTimePrtLosSum?.MIP?.sum_cost_twd)
                            : '--'
                    }`,
                    class:
                        realTimePrtLosSum?.MIP?.sum_twd - realTimePrtLosSum?.MIP?.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.MIP?.sum_twd - realTimePrtLosSum?.MIP?.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.MIP?.sum_cost_twd != '0'
                            ? `${parseFloat(
                                  ((realTimePrtLosSum?.MIP?.sum_twd - realTimePrtLosSum?.MIP?.sum_cost_twd) /
                                      realTimePrtLosSum?.MIP?.sum_cost_twd) *
                                      100,
                              ).toFixed(2)}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.MIP?.sum_twd - realTimePrtLosSum?.MIP?.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.MIP?.sum_twd - realTimePrtLosSum?.MIP?.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
            };
        case 'FIP':
            success = realTimePrtLosSum?.FIP?.status.success;
            return {
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${
                        success
                            ? formatNum(realTimePrtLosSum?.FIP?.sum_twd - realTimePrtLosSum?.FIP?.sum_cost_twd)
                            : '--'
                    }`,
                    class:
                        realTimePrtLosSum?.FIP?.sum_twd - realTimePrtLosSum?.FIP?.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.FIP?.sum_twd - realTimePrtLosSum?.FIP?.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.FIP?.sum_cost_twd != '0'
                            ? `${parseFloat(
                                  ((realTimePrtLosSum?.FIP?.sum_twd - realTimePrtLosSum?.FIP?.sum_cost_twd) /
                                      realTimePrtLosSum?.FIP?.sum_cost_twd) *
                                      100,
                              ).toFixed(2)}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.FIP?.sum_twd - realTimePrtLosSum?.FIP?.sum_cost_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.FIP?.sum_twd - realTimePrtLosSum?.FIP?.sum_cost_twd < 0
                            ? 'loss'
                            : '',
                },
            };
        case 'WM_FUND':
            success = realTimePrtLosSum?.WM_FUND?.status.success;
            return {
                sum_cost_twd: {
                    title: '總成本',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.WM_FUND?.sum_cost_twd) : '--'}`, //realTimePrtLosSum?.WM_FUND.sum_twd
                    class: '',
                },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos) : '--'}`,
                    class:
                        realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos > 0
                            ? 'win'
                            : realTimePrtLosSum?.WM_FUND?.sub_total.sum_prtlos < 0
                            ? 'loss'
                            : '',
                },
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        realTimePrtLosSum?.WM_FUND?.sub_total.sum_roi != '0'
                            ? `${realTimePrtLosSum?.WM_FUND?.sub_total.sum_roi}%`
                            : '--',
                    class:
                        realTimePrtLosSum?.WM_FUND?.sub_total.sum_roi > 0
                            ? 'win'
                            : realTimePrtLosSum?.WM_FUND?.sub_total.sum_roi < 0
                            ? 'loss'
                            : '',
                },
                sum_prtlos_dividend: {
                    title: '累計配息',
                    amount: `$${
                        success ? formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_acc_dividend_twd) : '--'
                    }`,
                    class: '',
                },
                sum_roi_dividend: {
                    title: '含息報酬率(%)',
                    amount: `${success ? formatNum(realTimePrtLosSum?.WM_FUND?.sub_total.sum_roi_dividend) : '--'}%`,
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
            let sum_cost_twd = 0;
            realTimePrtLosSum?.OF?.data.map((data, index) => {
                trade_nonachieve = trade_nonachieve + data.trade_nonachieve;
                sum_cost_twd = sum_cost_twd + (data.trade_value - data.trade_nonachieve);
            });
            success = realTimePrtLosSum?.OF?.status.success;
            return {
                // QQ6 集保基金沒有總成本
                sum_cost_twd: {
                    title: '總成本',
                    amount: `$${success ? formatNum(sum_cost_twd) : '--'}`,
                    class: '',
                },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${success ? formatNum(trade_nonachieve) : '--'}`,
                    class: trade_nonachieve > 0 ? 'win' : trade_nonachieve < 0 ? 'loss' : '',
                },
                // QQ7 集保基金沒有成本無法算報酬率
                rate_of_return: {
                    title: '報酬率(%)',
                    amount:
                        sum_cost_twd != '0'
                            ? `${parseFloat((trade_nonachieve / sum_cost_twd) * 100).toFixed(2)}%`
                            : '--',
                    class: trade_nonachieve > 0 ? 'win' : trade_nonachieve < 0 ? 'loss' : '',
                },
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
                // sum_cost_twd: {
                //     title: '總持有面額',
                //     amount: `$${formatNum(realTimePrtLosSum?.BOND?.sub_total.sum_invest_cost_twd)}`,
                //     class: '',
                // },
                // sum_unreal: {
                //     title: '損益試算',
                //     amount: `$${formatNum(
                //         realTimePrtLosSum?.BOND?.sub_total.sum_prtlos
                //     )}`,
                //     class:
                //         realTimePrtLosSum?.BOND?.sub_total.sum_prtlos > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.BOND?.sub_total.sum_prtlos < 0
                //             ? 'loss'
                //             : '',
                // },
                // rate_of_return: {
                //     title: '報酬率(%)',
                //     amount:
                //     `${parseFloat(realTimePrtLosSum?.BOND?.sub_total.sum_roi)}%`,
                //     class:
                //     realTimePrtLosSum?.BOND?.sub_total.sum_roi > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.BOND?.sub_total.sum_roi < 0
                //             ? 'loss'
                //             : '',
                // },
                // sum_prtlos_dividend: {
                //     title: '累計債息',
                //     amount: `$${formatNum(realTimePrtLosSum?.BOND?.sub_total.sum_acc_dividend_twd)}`,
                //     class: ""
                // },
                // sum_roi_dividend: {
                //     title: '含息報酬率(%)',
                //     amount: `$${formatNum(realTimePrtLosSum?.BOND?.sub_total.sum_roi_dividend)}`,
                //     class:
                //     realTimePrtLosSum?.BOND?.sub_total.sum_roi_dividend > 0
                //             ? 'win'
                //             : realTimePrtLosSum?.BOND?.sub_total.sum_roi_dividend < 0
                //             ? 'loss'
                //             : '',
                // },
                // sum_total_value_twd: {
                //     title: '合計參考市值',
                //     amount: `$${formatNum(realTimePrtLosSum?.BOND?.sum_total_value_twd)}`,
                //     class: '',
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
                parseFloat();
                total_amt_sn = total_amt_sn + parseFloat(data.total_amt);
                trade_amt_sn = trade_amt_sn + parseFloat(data.trade_amt);
                market_amt_sn = market_amt_sn + parseFloat(data.market_amt);
            });
            success = realTimePrtLosSum?.SN?.status.success;
            return {
                sum_total_amt_twd: {
                    title: '名目本金',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.SN?.sum_total_amt_twd) : '--'}`,
                    class: '',
                },
                sum_dividend_amt_twd: {
                    title: '累計配息',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.SN?.sum_dividend_amt_twd) : '--'}`,
                    class: '',
                },
                sum_ref_value_amt_twd: {
                    title: '損益試算',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.SN?.sum_ref_value_amt_twd) : '--'}`,
                    class:
                        realTimePrtLosSum?.SN?.sum_ref_value_amt_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.SN?.sum_ref_value_amt_twd < 0
                            ? 'loss'
                            : '',
                },
                sum_ref_value_prc_twd: {
                    title: '含息報酬率',
                    amount: `${success ? formatNum(realTimePrtLosSum?.SN?.sum_ref_value_prc_twd) : '--'}%`,
                    class:
                        realTimePrtLosSum?.SN?.sum_ref_value_prc_twd > 0
                            ? 'win'
                            : realTimePrtLosSum?.SN?.sum_ref_value_prc_twd < 0
                            ? 'loss'
                            : '',
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
            success = realTimePrtLosSum?.WM_SN?.status.success;
            return {
                sum_invest_cost_twd: {
                    title: '名目本金',
                    amount: `$${success ? formatNum(realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd) : '--'}`,
                    class: '',
                },
                sum_unreal: {
                    title: '損益試算',
                    amount: `$${
                        success
                            ? formatNum(
                                  realTimePrtLosSum?.WM_SN?.sub_total.sum_namt_twd -
                                      realTimePrtLosSum?.WM_SN?.sub_total.sum_invest_cost_twd,
                              )
                            : '--'
                    }`,
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
                    amount: `$${success ? formatNum(realTimePrtLosSum?.WM_SN?.sub_total.sum_acc_dividend_twd) : '--'}`,
                    class: '',
                },
                sum_roi_dividend: {
                    title: '含息報酬率(%)',
                    amount: `${success ? formatNum(realTimePrtLosSum?.WM_SN?.sub_total.sum_roi_dividend) : '--'}%`,
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
    let success;
    switch (type) {
        case 'S':
            success = realTimePrtLosSum?.S?.status.success;
            titleData = {
                title: '台股庫存總市值',
                currency: 'NTD',
                sum: success
                    ? formatNum(parseInt(realTimePrtLosSum?.S?.sum_namt) + parseInt(realTimePrtLosSum?.L?.sum_namt))
                    : '--',
            };
            break;
        case 'F':
            success = realTimePrtLosSum?.F?.status.success;
            titleData = {
                title: '國內期權總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.F?.sum_balv) : '--',
            };
            break;
        case 'FF':
            success = realTimePrtLosSum?.FF?.status.success;
            titleData = {
                title: '國外期權總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.FF?.sum_dbaln_twd) : '--',
            };
            break;
        case 'H':
            success = realTimePrtLosSum?.H?.status.success;
            titleData = {
                title: '海外股票總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.H?.sum_twd) : '--',
            };
            break;
        case 'MIP':
            success = realTimePrtLosSum?.MIP?.status.success;
            titleData = {
                title: '豐存美股(定期定額)總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.MIP?.sum_twd) : '--',
            };
            break;
        case 'FIP':
            success = realTimePrtLosSum?.FIP?.status.success;
            titleData = {
                title: '豐存美股(定期定股)總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.FIP?.sum_twd) : '--',
            };
            break;
        case 'WM_FUND':
            success = realTimePrtLosSum?.WM_FUND?.status.success;
            titleData = {
                title: '信託基金總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.WM_FUND?.sum_twd) : '--',
            };
            break;
        case 'OF':
            success = realTimePrtLosSum?.OF?.status.success;
            titleData = {
                title: '集保基金總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.OF?.sum_twd) : '--',
            };
            break;
        case 'BOND':
            success = realTimePrtLosSum?.BOND?.status.success;
            titleData = {
                title: '海外債/境外結構型總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.BOND?.sum_total_value_twd) : '--',
            };
            break;
        case 'SN':
            success = realTimePrtLosSum?.SN?.status.success;
            titleData = {
                title: '結構型商品總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.SN?.sum_twd) : '--',
            };
            break;
        case 'WM_SN':
            success = realTimePrtLosSum?.WM_SN?.status.success;
            titleData = {
                title: '信託結構型商品總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.WM_SN?.sum_twd) : '--',
            };
            break;
        case 'WM_FUND_INTRANSIT':
            success = realTimePrtLosSum?.WM_FUND_INTRANSIT?.status.success;
            titleData = {
                title: '信託基金在途總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.WM_FUND_INTRANSIT?.sum_twd) : '--',
            };
            break;
        case 'WM_SN_INTRANSIT':
            success = realTimePrtLosSum?.WM_SN_INTRANSIT?.status.success;
            titleData = {
                title: '信託結構型在途總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.WM_SN_INTRANSIT?.sum_twd) : '--',
            };
            break;
        case 'WM_TRUST_DEPOSIT':
            success = realTimePrtLosSum?.WM_TRUST_DEPOSIT?.status.success;
            titleData = {
                title: '信託存款總市值',
                currency: 'NTD',
                sum: success ? formatNum(realTimePrtLosSum?.WM_TRUST_DEPOSIT?.sum_twd) : '--',
            };
            break;
        default:
            break;
    }
    return titleData;
};
