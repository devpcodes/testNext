
(function ($) {

//################################################################################
//################################################################################
// The LabCI object for Generic Widget Package
// LabCI = { WP: { ... } }

    if (typeof (LabCI) === "undefined")
        LabCI = {WP: {}};
    else if (typeof (LabCI.WP) === "undefined")
        LabCI.WP = {};

    var ADVANCED_CRITERIA_ITEMS = {
        "APEEXCLXOR": {
            name: "P/E excluding extraordinary item",
            tooltip: "This ratio is calculated by dividing the latest Price Close by the Basic EPS Excluding Extraordinary Items for the latest fiscal year.",
            type: null,
            unit: "Times",
            dp: 3
        },
        "F_PER_CHG_RATE": {
            name: "PER (%)",
            tooltip: "PER (%)(Last Fiscal Year End)",
            type: [
                {id: "1y", name: "1YrAgo"},
                {id: "3y", name: "3YrsAgo"},
                {id: "5y", name: "5YrsAgo"}
            ],
            unit: "%",
            dp: 3
        },
        "F_PRC_CASHFLOW_RATIO": {
            name: "Price To Cash Flow per Share",
            tooltip: "This is the Current Price divided by the latest annual cash flow",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_EPS": {
            name: "EPS (JPY)",
            tooltip: "[Net Income / Mid-term Average Outstanding Issues&#10;&#10;Net Income: Last Mid-term End&#10;Mid-term Average Outstanding Issues: Last Mid-term",
            type: null,
            unit: "JPY",
            dp: 3
        },
        "F_DIV": {
            name: "Dividend per Share",
            tooltip: "This is the Dividends paid per share to the primary common shareholders for the most resent fiscal year",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_DIV_YIELD": {
            name: "Dividend Yield (%)",
            tooltip: "This value is the calculated as the Dividends paid per share to the primary common shareholders for the most resent fiscal year divided by the latest Price Close, multiplied by 100.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_EARNING_RATIO": {
            name: "Earning Ratio",
            tooltip: "This ratio is calculated by dividing the Basic EPS Excluding Extraordinary Items for the latest fiscal year by the latest Price Close.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_DIV_YIELD_GROWTH_RATE": {
            name: "Dividend Yield Growth Rate (%)",
            tooltip: "Dividend Yield Growth Rate (%): Target Period Can Be Selected.&#10;(Prv.Year / 3 Yrs Ago / 5 Yrs Ago / Prv. Year Same Quarter)&#10;&#10;Dividend Yield (%): DPS / Stock Price X 100&#10;Dividend: Total(Prv. Fiscal Year)&#10;Stock Price: Prv. Close",
            type: [
                {id: "1y", name: "1YrAgo"},
                {id: "3y", name: "3YrsAgo"},
                {id: "5y", name: "5YrsAgo"},
                {id: "10y", name: "10YrsAgo"}
            ],
            unit: "%",
            dp: 3
        },
        "F_PBR": {
            name: "Price To Book",
            tooltip: "This is the Current Price divided by the latest annual Book Value Per Share.",
            type: null,
            unit: "Times",
            dp: 3
        },
        "E_REVENUE": {
            name: "Revenue (Est)(x1M JPY)",
            tooltip: "Revenue (Est)(x1M JPY)",
            type: null,
            unit: "x1M JPY",
            dp: 3
        },
        "E_EBIT": {
            name: "Ordinary Income (Est)(Income Before Tax)(x1M JPY)",
            tooltip: "Ordinary Income (Est)(Income Before Tax)(x1M JPY)",
            type: null,
            unit: "x1M JPY",
            dp: 3
        },
        "E_NET_INCOME_RATE": {
            name: "Net Income Rate (Est)(%)",
            tooltip: "Current Fiscal Year - Net Income Rate (Est)(%)",
            type: null,
            unit: "%",
            dp: 3
        },
        "E_LONG_GROWTH_RATE": {
            name: "Long-term Growth Rate (Est)(%)",
            tooltip: "Long-term Growth Rate (%)&#10;&#10;Benchmark: Earnings Per Share or Operating EPS&#10;Terms: 3~5 Yrs",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_PBR_CHG_RATE": {
            name: "PBR (%)",
            tooltip: "PBR (%)(Prv. Fiscal Year End)",
            type: [
                {id: "1y", name: "1YrAgo"},
                {id: "3y", name: "3YrsAgo"},
                {id: "5y", name: "5YrsAgo"}
            ],
            unit: "%",
            dp: 3
        },
        "F_ROE": {
            name: "Return On Equity (ROE) (%)",
            tooltip: "This value is calculated as the Income Available to Common Stockholders for the most recent fiscal year divided by the Average Common Equity and is expressed as a percentage.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_ROA": {
            name: "Return On Assets (ROA) (%)",
            tooltip: "This value is calculated as the Income Available to Common Stockholders for the most recent fiscal year divided by the Total Asset and is expressed as a percentage.",
            type: null,
            unit: "%",
            dp: 3
        },
        "B_MKTCAP": {
            name: "Market Cap (x1M JPY)",
            tooltip: "[Actual][Prv. Close] Prv. Close Price X Outstanding Shares",
            type: null,
            unit: "x1M JPY",
            dp: 0
        },
        "F_ACT_REV": {
            name: "Sales (x1M JPY)",
            tooltip: "Sales(x1M JPY): Prv. Fiscal Year",
            type: null,
            unit: "x1M JPY",
            dp: 0
        },
        "F_REV_GROWTH_RATE": {
            name: "Revenue Growth Rate (%)",
            tooltip: "Revenue Growth Rate (%): Choice of Comparison Terms&#10;(Prv. Year / 3 Yrs Ago / 5 Yrs Ago / Prv. Year Same Quarter)",
            type: [
                {id: "1y", name: "Prv.Year"},
                {id: "3y", name: "3YrsAgo"},
                {id: "5y", name: "5YrsAgo"},
                {id: "1q", name: "Prv.YearSameQuarter"}
            ],
            unit: "%",
            dp: 3
        },
        "F_PSR": {
            name: "Price To Sales",
            tooltip: "This is the Current Price divided by the latest annual Revenue Per Share",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_REV_OVERSEAS": {
            name: "Overseas Sales Ratio (%)",
            tooltip: "[Actual] Overseas Sales Ratio shows how much percentage overseas sales is out of consolidated sales.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_OP_MARGIN": {
            name: "Operating Margin (%)",
            tooltip: "This ratio is calculated by dividing Operating Income by Revenue for the most recent fiscal year.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_MARGIN": {
            name: "Net Profit Margin (%)",
            tooltip: "This ratio is calculated by dividing Net Income by Revenue for the most recent fiscal year.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_REC_REV_RATIO": {
            name: "Receivables Turnover",
            tooltip: "This is the ratio of Total Revenue for the most recent fiscal year divided by Average Accounts Receivables. Average Receivables is the average of the Accounts Receivables at the beginning and end of the year.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_EBIT": {
            name: "Ordinary Profit Before Tax (x1M JPY)",
            tooltip: "Ordinary Profit (x1M JPY): Prv. Fiscal Year",
            type: null,
            unit: "x1M JPY"
        },
        "F_LONG_GROWTH_RATE": {
            name: "Ordinary Profit Growth Rate (%)",
            tooltip: "Ordinary Profit Growth Rate (%): Comparison Term Choice&#10;(Prv. Year / 3 Yrs Ago / 5 Yrs Ago / Prv. Year Same Quarter)",
            type: [
                {id: "1y", name: "Prv.Year"},
                {id: "3y", name: "3YrsAgo"},
                {id: "5y", name: "5YrsAgo"},
                {id: "1q", name: "Prv.YearSameQuarter"}
            ],
            unit: "%",
            dp: 3
        },
        "F_ROS_GROWTH_RATE": {
            name: "Profit Margin On Sales (%)",
            tooltip: "Profit Margin On Sales (%): Comparison Term Choice&#10;(Prv. Year / 3 Yrs Ago / 5 Yrs Ago / Prv. Year Same Quarter)&#10;&#10;Profit Margin On Sales (%): Net Income / Sales X 100",
            type: [
                {id: "1y", name: "Prv.Year"},
                {id: "3y", name: "3YrsAgo"},
                {id: "5y", name: "5YrsAgo"},
                {id: "1q", name: "Prv.YearSameQuarter"}
            ],
            unit: "%",
            dp: 3
        },
        "F_EV_OVER_EBITDA": {
            name: "EV / EBITDA Ratio (times)",
            tooltip: "[Actual] EV(Enterprise Value) / EBITDA",
            type: null,
            unit: "倍",
            dp: 3
        },
        "ACURRATIO": {
            name: "Current Ratio",
            tooltip: "This is the ratio of Total Current Assets for the most recent fiscal year divided by Total Current Liabilities for the same period.",
            type: null,
            unit: null,
            dp: 3
        },
        "F_PRC_SALE_RATIO": {
            name: "Price To Sales Ratio (%)",
            tooltip: "Stock Price / Sales Per Share&#10;&#10;Stock Price: Prv. Close&#10;Sales: Prv. Fiscal Year End",
            type: null,
            unit: "%",
            dp: 3
        },
        "AQUICKRATI": {
            name: "Quick Ratio",
            tooltip: "This ratio is defined as Cash plus Short Term Investments plus Accounts Receivable for the most recent fiscal year divided by the Total Current Liabilities for the same period.",
            type: null,
            unit: null,
            dp: 3
        },
        "F_DIV_PAYOUT": {
            name: "Payout Ratio (%)",
            tooltip: "This is the ratio of Dividends paid per share to the primary common shareholders divided by the Earning Per Shares for the most resent fiscal year.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_DEBT_ASSET_RATIO": {
            name: "Total Debt/Total Asset (%)",
            tooltip: "This ratio is the Total Debt for the most recent fiscal year divided by Total Assets for the same period.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_TOT_ASSET_EQTY_RATIO": {
            name: "Shareholder Equity Ratio (%)",
            tooltip: "This ratio is calculated is calculated by dividing Total Shareholder Equity by Total Asset",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_INT_BEAR_DEPT_RATIO": {
            name: "Interest-bearing Debt Ratio (%)",
            tooltip: "This ratio is calculated by dividing Total Interest-bearing debt by Total Shareholder Equity",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_INT_COV_RATIO": {
            name: "Interest Coverage",
            tooltip: "This is the ratio of Earnings Before Interest and Taxes for the most recent year divided by the Interest Expense for the same period, also known as Times Interest Earned.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_INV_REV_RATIO": {
            name: "Inventory Turnover",
            tooltip: "This value measures how quickly the Inventory is sold. It is defined as Cost of Goods Sold for the most recent fiscal year divided by Average Inventory. Average Inventory is the average of the Inventory at the beginning and end of the year.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_MARGIN_VOL_RATIO": {
            name: "Margin / Volume Ratio (times)",
            tooltip: "[Actual] (Margin Buy Balance - Margin Sell Balance) / Daily Average Volume",
            type: null,
            unit: "Times",
            dp: 3
        },
        "E_PER": {
            name: "P/E (Est.)",
            tooltip: "This ratio is calculated by dividing the Latest Price Close by the Forecast Basic EPS Excluding Extraordinary Items.",
            type: null,
            unit: "Times",
            dp: 3
        },
        "E_PER_CHG_RATE": {
            name: "PER Change Rate (Est)(%)",
            tooltip: "[Consensus Est] The lower PER is, the more stock price is under value.",
            type: [
                {id: "5", name: "5BizDaysAgo"},
                {id: "20", name: "20BizDaysAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "1y", name: "1YrAgo"}
            ],
            unit: "%",
            dp: 3
        },
        "E_EPS": {
            name: "EPS (Est)(JPY)",
            tooltip: "Earnings Per Share (Est)(JPY)",
            type: null,
            unit: "JPY",
            dp: 3
        },
        "E_PEG": {
            name: "PEG (Est)(times)",
            tooltip: "[Consensus Estimates] Price Earnings to Growth = PER / EPS. ",
            type: null,
            unit: "times",
            dp: 3
        },
        "E_BVPS": {
            name: "BPS (Est)(JPY)",
            tooltip: "[Consensus Estimates] Book-value Per Share",
            type: null,
            unit: "JPY",
            dp: 3
        },
        "E_DIV_YIELD": {
            name: "Dividend Yield (Est)(%)",
            tooltip: "This value is calculated as the consensus estaimated dividend per share per share to the primary common shareholders for the most resent fiscal year divided by the latest Price Close, multiplied by 100.",
            type: null,
            unit: "%",
            dp: 3
        },
        "E_DIV_YIELD_GROWTH_RATE": {
            name: "Dividend Yield Growth Rate (Est)(%)",
            tooltip: "[Consensus Estimates] Dividend Yield Growth",
            type: [
                {id: "5", name: "5BizDaysAgo"},
                {id: "20", name: "20BizDaysAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "1y", name: "1YrAgo"}
            ],
            unit: "%",
            dp: 3
        },
        "E_TURNOVER_CHG_RATE": {
            name: "Turnover % Change (Est.)",
            tooltip: "Estimated Turnover Change Rate (%)(vs. Prv. Year)",
            type: [
                {id: "1w", name: "1WkAgo"},
                {id: "1m", name: "1MthAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "12m", name: "12MthsAgo"}
            ],
            unit: "%",
            dp: 3
        },
        "E_OP_PROFIT_GROWTH_RATE5y": {
            name: "Profit Growth Rate in 5 years (Est)(%)",
            tooltip: "[Consensus Estimates]the last 4 years + Current term",
            type: null,
            unit: "%",
            dp: 3
        },
        "E_REV_GROWTH_RATE": {
            name: "Revenue Growth Rate (Est)(%)",
            tooltip: "Estimated Revenue Growth Rate (%)(vs. Previous Year)",
            type: null,
            unit: "%",
            dp: 3
        },
        "E_EARN_GROWTH_RATE": {
            name: "EarningsGrowth Rate (Est)(%)",
            tooltip: "Estimated Earnings Growth Rate (%)(vs. Previous Year)",
            type: null,
            unit: "%",
            dp: 3
        },
        "E_EARN_CHG_RATE_PREV": {
            name: "EstimatedEarningsReviseRate (Est)(%)",
            tooltip: "[Estimates]Earnings Revised Rate(Up or Down)",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_MKTCAP_JPY": {
            name: "Market Cap (x1M JPY)",
            tooltip: "Stock Price X Outstanding Shares&#10;&#10;Stock Price: Prv. Close&#10;Outstanding Shares excluding Own Shares: Based on Prv. Biz Day",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_MKTCAP_USD": {
            name: "Market Cap (x1M USD)",
            tooltip: "This value is calculated by multiplying the latest Price Close by the current number of Shares Outstanding.",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_MKTCAP": {
            name: "Market Cap (x1M JPY)",
            tooltip: "",
            type: null,
            unit: "%",
            dp: 3
        },
        "F_BPS": {
            name: "BPS (Book-value Per Share)(JPY)",
            tooltip: "Net Asset / Outstanding Shares&#10;&#10;Net Asset: Prv. Fiscal Year End&#10;Outstanding Shares: Prv. Fiscal Year End",
            type: null,
            unit: "%",
            dp: 3
        },
        "E_RATING": {
            name: "Rating (Est)",
            tooltip: "Average of Ratings by Broker Analysts (5.Buy, 4.Out Perform, 3.Hold, 2.Under Perform, 1.Sell)",
            type: null,
            unit: "",
            dp: 3
        },
        "E_TARGET_PRC_DEV_RATE": {
            name: "Target Price Deviation Rate (Est)(%)",
            tooltip: "(Target Price-Prv. Close) /  Target Price X 100&#10;&#10;Target Price: Average of Target Price by Broker Analysts",
            type: null,
            unit: "%",
            dp: 3
        },
        "E_EARN_CHG_RATE": {
            name: "Earnings Change Rate (Est)(%)",
            tooltip: "Earnings Change Rate (Est)(%)",
            type: [
                {id: "1w", name: "5BizDaysAgo"},
                {id: "1m", name: "20BizDaysAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "12m", name: "1YrAgo"}
            ],
            unit: "%",
            dp: 3
        },
        "E_TARGET_PRC_DEV_CHG_RATE": {
            name: "Change of Target Price Deviation Ratio (Est)(%)",
            tooltip: "Target Price Deviation Rate:  (Target Price - Prv. Close) / Target Price X 100  (%)&#10;Term Choice: 1 Wk Ago / 1 Mth Ago / 3 Mths Ago / 6 Mths Ago / 12 Mths Ago",
            type: [
                {id: "1w", name: "1WkAgo"},
                {id: "1m", name: "1MthAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "12m", name: "12MthsAgo"}
            ],
            unit: "%",
            dp: 3
        },
        "E_RATING_CHG": {
            name: "Broker Rating Score Change",
            tooltip: "Change of Average Score by Broker Analysts(5 ratings)&#10;&#10;Term Choice: 1 Wk Ago / 1 Mth Ago / 3 Mths Ago / 6 Mths Ago / 12 Mths Ago",
            type: [
                {id: "1w", name: "1WkAgo"},
                {id: "1m", name: "1MthAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "12m", name: "12MthsAgo"}
            ],
            unit: "%",
            dp: 3
        },
        "E_UPGRADE": {
            name: "Rating Upgrade",
            tooltip: "During specific term, rating was upgraded by broker analysts.",
            type: [
                {id: "1w", name: "1WkAgo"},
                {id: "1m", name: "1MthAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "12m", name: "12MthsAgo"}
            ],
            isbool: true,
            unit: "%",
            dp: 3
        },
        "E_DOWNGRADE": {
            name: "Rating Downgrade",
            tooltip: "During specific term, rating was downgraded by broker analysts.",
            type: [
                {id: "1w", name: "1WkAgo"},
                {id: "1m", name: "1MthAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "12m", name: "12MthsAgo"}
            ],
            isbool: true,
            unit: "%",
            dp: 3
        },
        "E_UP_TREND": {
            name: "Company estimates - revised uptrend",
            tooltip: "Company estimates were revised uptrend.",
            type: [
                {id: "1w", name: "1WkAgo"},
                {id: "1m", name: "1MthAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "12m", name: "12MthsAgo"}
            ],
            isbool: true,
            unit: "%",
            dp: 3
        },
        "E_DOWN_TREND": {
            name: "Company estimates - revised downtrend",
            tooltip: "Company estimates were revised downtrend.",
            type: [
                {id: "1w", name: "1WkAgo"},
                {id: "1m", name: "1MthAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "12m", name: "12MthsAgo"}
            ],
            isbool: true,
            unit: "%",
            dp: 3
        },
        "E_INT_BEAR_NPROFIT_RATIO": {
            name: "Interest-bearing Liabilities / Net Income (Est)(%)",
            tooltip: "[Consensus Estimates] Interest-bearing Liabilities / Net Income",
            type: null,
            unit: "%",
            dp: 3
        },
        "P_NET_CHG": {
            name: "Net Change",
            tooltip: "Stock Price Net Change (vs. Prv. Close)",
            type: null,
            unit: "",
            dp: 3
        },
        "P_NET_PCTCHG": {
            name: "Percentage Change",
            tooltip: "Percentage Change(vs. Prv. Close)",
            type: null,
            unit: "%",
            dp: 3
        },
        "P_BUYMARGIN": {
            name: "Margin Balance (Buy)",
            tooltip: "Margin Balance (Buy)",
            type: null,
            unit: null,
            dp: 0
        },
        "P_SELLMARGIN": {
            name: "Margin Balance (Sell)",
            tooltip: "Margin Balance (Sell)",
            type: null,
            unit: null,
            dp: 0
        },
        "P_BUYMAR_NC": {
            name: "Margin Balance (Buy)(vs. Prv. Week)",
            tooltip: "Margin Balance (Buy)(vs. Prv. Week)",
            type: null,
            unit: null,
            dp: 0
        },
        "P_SELLMAR_NC": {
            name: "Margin Balance (Sell)(vs. Prv. Week)",
            tooltip: "Margin Balance (Sell)(vs. Prv. Week)",
            type: null,
            unit: null,
            dp: 0
        },
        "P_MARGIN_RATIO": {
            name: "Margin Ratio",
            tooltip: "Margin Ratio",
            type: null,
            unit: "times",
            dp: 3
        },
        "TRDPRC_1": {
            name: "Stock Price (JPY)",
            tooltip: "[Hourly] Stock price is updated hourly.",
            type: null,
            unit: "JPY",
            dp: 0,
            scale: 3
        },
        "TRDPRC_1_chg_rate": {
            name: "Price Change Rate",
            tooltip: "",
            type: [
                {id: "5", name: "5BizDaysAgo"},
                {id: "20", name: "20BizDaysAgo"},
                {id: "3m", name: "3MthsAgo"},
                {id: "6m", name: "6MthsAgo"},
                {id: "1y", name: "1YrAgo"},
                {id: "3y", name: "3YrsAgo"},
                {id: "5y", name: "5YrsAgo"}
            ],
            unit: "%",
            dp: 3
        },
        "NETCHNG_1": {
            name: "Net Change",
            tooltip: "",
            type: null,
            unit: "%",
            dp: 3
        },
        "YRLOW": {
            name: "Year Low (JPY)",
            tooltip: "",
            type: null,
            unit: "JPY",
            dp: 0
        },
        "YRHIGH": {
            name: "Year High (JPY)",
            tooltip: "",
            type: null,
            unit: "JPY",
            dp: 0
        },
        "T_VOL_RATIO": {
            name: "Volume Average 6-Days / 25-Days",
            tooltip: "Volume Average Ratio: Volume Average(last 6 days) / Volume Average(last 25 days)",
            type: null,
            unit: "JPY",
            dp: 0
        },
        "T_UP_RATE": {
            name: "Gainers (%)",
            tooltip: "Gainers: Comparison Term Choice&#10;(Prv. Day / 5 Biz Days / 20 Biz Days / 3 Mths / 6 Mths / 1 Yr / 3 Yrs / 5 Yrs)",
            type: [
                {id: "", name: "Prv. Day"},
                {id: "5", name: "5 Biz Days"},
                {id: "20", name: "20 Biz Days"},
                {id: "3m", name: "3 Mths"},
                {id: "6m", name: "6 Mths"},
                {id: "1y", name: "1 Yr"},
                {id: "3y", name: "3 Yrs"},
                {id: "5y", name: "5 Yrs"}
            ],
            unit: "%",
            dp: 3
        },
        "T_DOWN_RATE": {
            name: "Losers (%)",
            tooltip: "Losers (%): Comparison Term Choice&#10;(Prv. Day / 5 Biz Days / 20 Biz Days / 3 Mths / 6 Mths / 1 Yr / 3 Yrs / 5 Yrs)",
            type: [
                {id: "", name: "Prv. Day"},
                {id: "5", name: "5 Biz Days Ago"},
                {id: "20", name: "20 Biz Days Ago"},
                {id: "3m", name: "3 Mths Ago"},
                {id: "6m", name: "6 Mths Ago"},
                {id: "1y", name: "1 Yr Ago"},
                {id: "3y", name: "3 Yrs Ago"},
                {id: "5y", name: "5 Yrs Ago"}
            ],
            unit: "%",
            dp: 3
        },
        "T_YRLOW_DATE": {
            name: "Year Low Update",
            tooltip: "Year Low Update",
            type: [
                {id: "", name: "Today"},
                {id: "5", name: "5 Biz Days Ago"},
                {id: "20", name: "20 Biz Days Ago"},
                {id: "3m", name: "3 Mths Ago"},
                {id: "6m", name: "6 Mths Ago"}
            ],
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_YRHIGH_DATE": {
            name: "Year High Update",
            tooltip: "Year High Update",
            type: [
                {id: "", name: "Today"},
                {id: "5", name: "5 Biz Days Ago"},
                {id: "20", name: "20 Biz Days Ago"},
                {id: "3m", name: "3 Mths Ago"},
                {id: "6m", name: "6 Mths Ago"}
            ],
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_UP_RATE_YRLOW": {
            name: "Up Rate From Year Low (%)",
            tooltip: "Up Rate From Year Low (%)",
            type: null,
            unit: "%",
            dp: 3
        },
        "T_DOWN_RATE_YRHIGH": {
            name: "Down Rate From Year High (%)",
            tooltip: "Down Rate From Year High (%)",
            type: null,
            unit: "%",
            dp: 3
        },
        "T_UP_RATE_52WLOW": {
            name: "Up Rate From 52-Wk Low (%)",
            tooltip: "[Hourly] Up Rate From 52-Week Low (%)",
            type: null,
            unit: "%",
            dp: 3
        },
        "T_DOWN_RATE_52WHIGH": {
            name: "Down Rate From 52-Wk High (%)",
            tooltip: "[Hourly] Down Rate From 52-Week High (%)",
            type: null,
            unit: "%",
            dp: 3
        },
        "T_AVG_TURNOVER": {
            name: "Daily Turnover (x1K JPY)",
            tooltip: "Daily Turnover: Accumulated turnover since market open of the day",
            type: null,
            unit: "x1K JPY",
            dp: 0
        },
        "T_DEV_SMA": {
            name: "Simple Moving Average Deviation Rate (%)",
            tooltip: "SMA deviation rate is the percentage difference between the latest price close with the simple moving average.&#10;Term: 5 Biz Days / 25 Biz Days / 75 Biz Days",
            type: [
                {id: "5", name: "5 Biz Days Ago"},
                {id: "25", name: "25 Biz Days Ago"},
                {id: "75", name: "75 Biz Days Ago"}
            ],
            unit: "%",
            dp: 3
        },
        "T_SD60": {
            name: "Volatility in last 60 days",
            tooltip: "[Hourly] Standard deviation of close prices in last 60 days.",
            type: null,
            unit: null,
            dp: 3
        },
        "T_RSI": {
            name: "Relative Strength Index (RSI) in last 14 days",
            tooltip: "The RSI is a momentum oscillator measuring the velocity and magnitude of directional price movements. It is calculated based on a 14-day timeframe and range between 0 and 100.",
            type: null,
            unit: null,
            dp: 3
        },
        "T_PSYCHO_LINE": {
            name: "Psychological Line",
            tooltip: "Psychological Line is the ratio of the number of rising periods over the total number of periods. If the ratio is above 50%, it indicates an uptrend. If it is below 50%, it indicates a downtrend.&#10;Term: 14 Biz Days",
            type: null,
            unit: null,
            dp: 3
        },
        "T_FAST_STO": {
            name: "Fast Stochastic",
            tooltip: "Fast Stochastic is a technical momentum indicator that compares a security's closing price to its price range over a given time period. In general stochastic above 80 is considered overbought and below 20 is considered oversold.&#10;Term: 14 Biz Days",
            type: null,
            unit: null,
            dp: 3
        },
        "T_SLOW_STO": {
            name: "Slow Stochastic",
            tooltip: "Slow Stochastic is calculated based on the 3-period moving average of Fast Stochastic.",
            type: null,
            unit: null,
            dp: 3
        },
        "P_BOOK_CLS_MTH": {
            name: "Account Closing Month",
            tooltip: "Account Closing Month",
            type: null,
            unit: null,
            dp: 3
        },
        "T_BOLLINGER": {
            name: "Bollinger (Old)",
            tooltip: "[Hourly] It is useful to see market turning point. Getting closer to the upper (or lower) band means over-sold (or over-bought).",
            type: null,
            unit: null,
            dp: 3
        },
        "T_DEV_SMA25_SD": {
            name: "Bollinger Band SMA25",
            tooltip: "[Hourly] It is useful to see market turning point. Getting closer to the upper (or lower) band means over-sold (or over-bought).",
            type: null,
            isfixedrange: true,
            fixedrange: {
                from: [
                    {id: "-99999999", name: "--"},
                    {id: "3", name: "3σ"},
                    {id: "2", name: "2σ"},
                    {id: "1", name: "1σ"},
                    {id: "0", name: "0σ"},
                    {id: "-1", name: "-1σ"},
                    {id: "-2", name: "-2σ", isdef: true},
                    {id: "-3", name: "-3σ"}
                ],
                to: [
                    {id: "99999999", name: "--"},
                    {id: "3", name: "3σ"},
                    {id: "2", name: "2σ", isdef: true},
                    {id: "1", name: "1σ"},
                    {id: "0", name: "0σ"},
                    {id: "-1", name: "-1σ"},
                    {id: "-2", name: "-2σ"},
                    {id: "-3", name: "-3σ"}
                ],
            },
            unit: null,
            dp: 3
        },
        "T_GOLDX": {
            name: "Golden Cross",
            tooltip: "[Hourly] Short-term moving average breaking above its long-term moving average or resistance level (Buy signal)",
            type: [
                {id: "--T_SHORT_GOLDX", name: "5-25dayPeriod"},
                {id: "--T_MID_GOLDX", name: "25-75dayPeriod"},
                {id: "_75_200", name: "75-200dayPeriod"},
                {id: "_13w_26w", name: "13-26wkPeriod"},
                {id: "_26w_52w", name: "26-52wkPeriod"},
                {id: "_9m_24m", name: "9-24monthPeriod"},
                {id: "_24m_60m", name: "24-60monthPeriod"}
            ],
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_DEADX": {
            name: "Dead Cross",
            tooltip: "[Hourly] Short-term moving average below its long-term moving average (Sell signal)",
            type: [
                {id: "--T_SHORT_DEADX", name: "5-25dayPeriod"},
                {id: "--T_MID_GOLDX", name: "25-75dayPeriod"},
                {id: "_75_200", name: "75-200dayPeriod"},
                {id: "_13w_26w", name: "13-26wkPeriod"},
                {id: "_26w_52w", name: "26-52wkPeriod"},
                {id: "_9m_24m", name: "9-24monthPeriod"},
                {id: "_24m_60m", name: "24-60monthPeriod"}
            ],
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_SHORT_ICLOUD_ABOVE": {
            name: "Above Short-term Ichimoku Cloud",
            tooltip: "25-day SMA Ichimoku gets above the cloud.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_MACD_BULLX": {
            name: "MACD (Bullish Signal)",
            tooltip: "A bullish signal when the MACD line crosses above the signal line. The signal line is a 9-day EMA of the MACD line.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_MACD_BEARX": {
            name: "MACD (Bearish Signal)",
            tooltip: "A bearish signal when the MACD line crosses below the signal line. The signal line is a 9-day EMA of the MACD line.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_MID_ICLOUD_ABOVE": {
            name: "Above Mid-term Ichimoku Cloud",
            tooltip: "75-day moving average rises above the Ichimoku cloud.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_SHORT_GOLDX": {
            name: "Short-term Golden Cross",
            tooltip: "Golden cross is a pattern created when a shorter term moving average crosses above a longer term moving average. This is typically seen as a bullish signal. It is based on the 5-day and 25-day SMA.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_MID_GOLDX": {
            name: "Mid-term Golden Cross",
            tooltip: "Golden cross is a pattern created when a shorter term moving average crosses above a longer term moving average. This is typically seen as a bullish signal. It is based on the 25-day and 75-day SMA.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_SHORT_DEADX": {
            name: "Short-term Dead Cross",
            tooltip: "Dead cross is a pattern created when a shorter term moving average crosses below a longer term moving average. This is typically seen as a bearish signal. It is based on the 5-day and 25-day SMA.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_MID_DEADX": {
            name: "Mid-term Dead Cross",
            tooltip: "Dead cross is a pattern created when a shorter term moving average crosses below a longer term moving average. This is typically seen as a bearish signal. It is based on the 25-day and 75-day SMA.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_SHORT_ICLOUD_BELOW": {
            name: "Below Short-term Ichimoku Cloud",
            tooltip: "25-day falls below Ichimoku cloud.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_MID_ICLOUD_BELOW": {
            name: "Below Mid-term Ichimoku Cloud",
            tooltip: "75-day moving average falls below Ichimoku cloud.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_3LINE_BREAK_BUY": {
            name: "3-line Break (Buy Signal)",
            tooltip: "3-line Break of high in candlesticks (Buy signal)",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_3LINE_BREAK_SELL": {
            name: "3-line Break (Sell Signal)",
            tooltip: "3-line Break of low in candlesticks (Sell signal)",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_BOLL_BULL": {
            name: "Bollinger Breakout (Bullish Market)",
            tooltip: "Bollinger breakout occurs when stock price breaks outside of the upper Bollinger band. This is considered as a bullish trend signal.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_BOLL_BEAR": {
            name: "Bollinger Breakout (Bearish Market)",
            tooltip: "Bollinger breakout occurs when stock price breaks outside of the lower Bollinger band. This is considered as a bearish trend signal.",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_DOJI": {
            name: "Cross-hairs (or Doji)",
            tooltip: "Cross-hairs or Doji",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_HAMMER": {
            name: "Hammer",
            tooltip: "Hammer",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_INV_HAMMER": {
            name: "Gravestone Doji",
            tooltip: "Gravestone Doji",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_MARUBOZU": {
            name: "Marubozu",
            tooltip: "Marubozu",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_MORNING_STAR": {
            name: "Morning Star",
            tooltip: "Morning Star",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_EVENING_STAR": {
            name: "Evening Star",
            tooltip: "Evening Star",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_SHOOTING_STAR": {
            name: "Shooting Star",
            tooltip: "Shooting Star",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_SPIN_TOP": {
            name: "Spinning Top",
            tooltip: "Spinning Top",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_3W_SOLDIER": {
            name: "Three White Soldiers",
            tooltip: "Three White Soldiers",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_3B_CROW": {
            name: "Three Black Crows",
            tooltip: "Three Black Crows",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "C_GAP": {
            name: "Windows(Gaps)",
            tooltip: "Windows(Gaps)",
            type: null,
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_N225_ABOVE": {
            name: "Nikkei 225 Above Net Change",
            tooltip: "[Hourly] The shares above Nikkei 225 net change (Prv. Day, 5 Days Ago, 20 Days Ago, 3 Mths Ago, 6 Mths Ago, 1 Yr Ago, 3 Yrs Ago, 5 Yrs Ago)",
            type: [
                {id: "", name: "Prv. Day"},
                {id: "5", name: "5 Biz Days Ago"},
                {id: "20", name: "20 Biz Days Ago"},
                {id: "3m", name: "3 Mths Ago"},
                {id: "6m", name: "6 Mths Ago"},
                {id: "1y", name: "1 Yr Ago"},
                {id: "3y", name: "3 Yrs Ago"},
                {id: "5y", name: "5 Yrs Ago"}
            ],
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_N225_BELOW": {
            name: "Nikkei 225 Below Net Change",
            tooltip: "[Hourly] The shares below Nikkei 225 net change (Prv. Day, 5 Days Ago, 20 Days Ago, 3 Mths Ago, 6 Mths Ago, 1 Yr Ago, 3 Yrs Ago, 5 Yrs Ago)",
            type: [
                {id: "", name: "Prv. Day"},
                {id: "5", name: "5 Biz Days Ago"},
                {id: "20", name: "20 Biz Days Ago"},
                {id: "3m", name: "3 Mths Ago"},
                {id: "6m", name: "6 Mths Ago"},
                {id: "1y", name: "1 Yr Ago"},
                {id: "3y", name: "3 Yrs Ago"},
                {id: "5y", name: "5 Yrs Ago"}
            ],
            isbool: true,
            unit: null,
            dp: 0
        },
        "M_N225": {
            name: "Nikkei 225",
            tooltip: "Beta value of individual stocks to Nikkei 225 by calculating individual stock prices(EOD) and daily Nikkei 225(EOD) in the past 2 years.",
            type: null,
            unit: null,
            dp: 3
        },
        "M_LIBOR3M": {
            name: "Correlation - LIBOR",
            tooltip: "Correlation coefficient of individual stocks to USD 3-month LIBOR by calculating individual stock prices(EOD) and USD 3-month LIBOR(EOD).",
            type: null,
            unit: null,
            dp: 3
        },
        "M_TIBOR3M": {
            name: "JPY 3-Mth TIBOR",
            tooltip: "Correlation coefficient of individual stocks to JPY 3-month TIBOR by calculating individual stock prices(EOD) and JPY 3-month TIBOR(EOD).",
            type: null,
            unit: null,
            dp: 3
        },
        "M_XAU": {
            name: "Correlation - Gold",
            tooltip: "Correlation coefficient of individual stocks to gold NY spot rate by calculating individual stock prices(EOD) and gold NY spot rates(EOD) in the past 2 years.",
            type: null,
            unit: null,
            dp: 3
        },
        "M_JPYBOEEER": {
            name: "JPY Effective Exchange Rate",
            tooltip: "Correlation coefficient of individual stocks to effective exchange rate(JPY) by calculating individual stock prices(EOD) and JPY daily effective exchange rates issued by Bank of England in the past 2 years.",
            type: null,
            unit: null,
            dp: 3
        },
        "S_OVERALL": {
            name: "Overall Company Score",
            tooltip: "Company score-overall is an average score of 5 benchmarks (fundamentals, valuation, earnings, risk, and price momentum) marking every score from 1(lowest) to 10(highest).",
            type: null,
            unit: null,
            dp: 3
        },
        "S_FUNDAMENTAL": {
            name: "Fundamentals",
            tooltip: "Fundamentals is a weighted average of 4 benchmarks (profitability, liabilities, sales, and dividends) marking every score from 1(lowest) to 10(highest). ",
            type: null,
            unit: null,
            dp: 3
        },
        "S_RELATIVE_VALUATION": {
            name: "Valuation",
            tooltip: "Valuation is a weighted average in 50%, 25%, 25% of 3 benchmarks(stock price vs. sales, actual PE, estimated PE) considering for the whole market, index benchmarks, and company actual performances in the past 5 years.",
            type: null,
            unit: null,
            dp: 3
        },
        "S_EARNINGS": {
            name: "Earnings",
            tooltip: "Earnings is a weighted average of a weighted average of 3 benchmarks (earning surprise, brokers score and company estimates).",
            type: null,
            unit: null,
            dp: 3
        },
        "S_PRICE_MOMENTUM": {
            name: "Stock Price Momentum",
            tooltip: "Momentum is a weighted average in 70% and 30% of 2 technical performance benchmarks (relative strength in the market and seasonal strength) from 1(lowest) to 10(highest).",
            type: null,
            unit: null,
            dp: 3
        },
        "S_RISK": {
            name: "Risk",
            tooltip: "Risk is a weighted average in 40%, 30%, 20% and 10% of 4 benchmarks (volatility, return change, market beta, and index relativity) considering for the performances in long-term(5 years) and short-term(90 days) from 1(lowest) to 10(highest).",
            type: null,
            unit: null,
            dp: 3
        },
        "M_JPY": {
            name: "USD / JPY Spot Rate",
            tooltip: "USD / JPY Spot Rate",
            type: null,
            unit: null,
            dp: 3
        },
        "M_USDBOEEER": {
            name: "Correlation - USD",
            tooltip: "A relative coefficient of individual stocks to USD effective exchange rate based on daily USD effective exchange rate.",
            type: null,
            unit: null,
            dp: 3
        },
        "M_VIX": {
            name: "Correlation - VIX",
            tooltip: "VIX(Volatility Index). A relative coefficient of individual stocks to VIX based on end of the day stock prices and VIX in the past 2 years.",
            type: null,
            unit: null,
            dp: 3
        },
        "M_CRB": {
            name: "Correlation - CRB Index",
            tooltip: "A relative coefficient of individual stocks to CRB index based on end of the day stock prices and CRB in the past 2 years.",
            type: null,
            unit: null,
            dp: 3
        },
        "M_NKC1": {
            name: "Nikkei 225 on USD Basis",
            tooltip: "A relative coefficient of individual stocks to Nikkei 225 on US Dollar basis based on end of the day stock prices and Nikkei 225 on US Dollar basis in the past 2 years.",
            type: null,
            unit: null,
            dp: 3
        },
        "M_CLC1": {
            name: "Correlation - WTI Crude Oil",
            tooltip: "A relative coefficient of individual stocks to WTI Crude Oil price based on end of the day stock prices and NWTI Crude Oil price in the past 2 years.",
            type: null,
            unit: null,
            dp: 3
        },
        "M_TOPX": {
            name: "TOPIX",
            tooltip: "A stock index beta value of individual stocks to TOPIX based on end of day stock prices and TOPIX in the past 2 years.",
            type: null,
            unit: null,
            dp: 3
        },
        "M_TSE33": {
            name: "Beta(vs. TSE33 sector index)",
            tooltip: "[EOD] It presents response of the stock prices to the market movements in the past 2 years vs. TSE33 sector index.",
            type: null,
            unit: null,
            dp: 3
        },
        "T_DMI": {
            name: "Directional Movement Indicator (DMI)",
            tooltip: "DMI (Directional Movement Indicator) is an indicator which tells whether an instrument is trending or not ranged from 0 to 100.&#10;Term: 14 Biz Days",
            type: null,
            unit: null,
            dp: 0
        },
        "T_RCI": {
            name: "Rank Correlation Index (RCI)",
            tooltip: "Rank Correlation Index is used for evaluation of trend strength and turing point detection. It is calculated based on the prices during the specified period in their chronological order and the same prices sorted ascendingly. The indicator oscillates between +100 and -100. A range of 80 to 100 indicates an uptrend; -100 to -80 indicates a downtrend.&#10;Term: 9 Biz Days / 26 Biz Days / 13 Wks / 26 Wks",
            type: [
                {id: "9", name: "9BizDaysAgo"},
                {id: "26", name: "26BizDaysAgo"},
                {id: "13w", name: "13WksAgo"},
                {id: "26w", name: "26WksAgo"}
            ],
            unit: null,
            dp: 0
        },
        "S_OVERALL_CHG": {
            name: "Rating Score Change",
            tooltip: "Rating Score Change",
            type: [
                {id: "2w", name: "2 Wks Ago"},
                {id: "1m", name: "1 Mth Ago"},
                {id: "3m", name: "3 Mths Ago"},
                {id: "6m", name: "6 Mths Ago"},
                {id: "1y", name: "1 Yr Ago"}
            ],
            unit: null,
            dp: 0
        },
        "T_MACD_": {
            name: "MACD",
            tooltip: "[Hourly] MACD rises above signal line(Golden Cross) that may be a good time to buy. &#10;&#10;[Hourly] MACD falls below signal line(Dead Cross) that may be a good time to sell.",
            type: [
                {id: "BULLS", name: "Buy Signal"},
                {id: "BEARX", name: "Sell Signal"}
            ],
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_FAST_STO_": {
            name: "Normal Stochastic",
            tooltip: "[Hourly] Buy Signal: Normal Stochastic < 20. Sell signal: Normal Stochastic > 80.",
            type: [
                {id: "BULL", name: "Buy Signal"},
                {id: "BEAR", name: "Sell Signal"}
            ],
            isbool: true,
            unit: null,
            dp: 0
        },
        "T_SLOW_STO_": {
            name: "Slow Stochastic",
            tooltip: "[Hourly] Buy Signal: Slow Stochastic < 20. Sell signal: Slow Stochastic > 80.",
            type: [
                {id: "BULL", name: "Buy Signal"},
                {id: "BEAR", name: "Sell Signal"}
            ],
            isbool: true,
            unit: null,
            dp: 0
        },
        "APENORM": {
            name: "P/E Normalized",
            tooltip: "This is the Current Price divided by the latest annual Normalized Earnings Per Share value.",
            type: null,
            unit: null,
            dp: 3
        },
        "NEW_V2": {
            name: "P/E excluding extraordinary item",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "P2BEpsIEx_CurA": {
            name: "P/E including extraordinary item",
            tooltip: "This ratio is calculated by dividing the Latest Price Close by the Basic EPS Including Extraordinary Items for the latest fiscal year.",
            type: null,
            unit: null,
            dp: 3
        },
        "NEW_V4": {
            name: "Price To Book",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "APR2TANCE": {
            name: "Price To Tangible Book",
            tooltip: "This is the Current Price mutlipled by Total Shares Outstanding divided by Tangible Common Equity.  Tangible Common Equity is defined as common equity less goodwill and intangibles.",
            type: null,
            unit: null,
            dp: 3
        },
        "NEW_V6": {
            name: "Price To Cash Flow per Share",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "APRCFPS": {
            name: "Price To Free Cash Flow per Share",
            tooltip: "This is the current Price divided by Cash Flow Per Share for the most recent fiscal year. Cash Flow is defined as Income After Taxes minus Preferred Dividends and General Partner Distributions plus Depreciation, Depletion and Amortization.",
            type: null,
            unit: null,
            dp: 3
        },
        "NEW_V8": {
            name: "Price To Sales",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "APRICE2TOTEQ": {
            name: "Price To Equity",
            tooltip: "This is the current Market Cap divided by Total Sharesholders Equity as of the latest annual period.",
            type: null,
            unit: null,
            dp: 3
        },
        "NEW_D1": {
            name: "Dividend per Share",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_D2": {
            name: "Dividend - next quarterly declared",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_D3": {
            name: "Dividend - next quarterly pay-date",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "FLOAT": {
            name: "Float",
            tooltip: "This is the number of freely traded shares in the hands of the public. Float is calculated as Shares Outstanding minus Shares Owned by Insiders, 5% Owners, and Rule 144 Shares. NOTE: For the first year after an initial public offering (IPO) the float will be the number of shares issued in the IPO.",
            type: null,
            unit: null,
            dp: 0
        },
        "FLOATPRC_CUR": {
            name: "Float as a % of Total Shares O/S",
            tooltip: "This is the number of freely traded shares in the hands of the public as a percentage of Total Shares Outstanding. Float Percent is calculated as Float divided by Total Shares Outstanding where Float is Shares Outstanding minus Shares Owned by Insiders, 5% Owners, and Rule 144 Shares. NOTE: For the first year after an initial public offering (IPO) the float will be the number of shares issued in the IPO.",
            type: null,
            unit: "%",
            dp: 3
        },
        "SHSBOUTAVG": {
            name: "Shares outstanding Basic, average (x1M)",
            tooltip: "These are the Basic Average Shares Outstanding for the most recent fiscal year as reflected in the Income Statement.",
            type: null,
            unit: null,
            dp: 0
        },
        "SHSOUT": {
            name: "Shares outstanding, current (x1M)",
            tooltip: "This is the number of shares of common stock currently outstanding. This number is defined as the number of shares issued minus the shares held in treasury.",
            type: null,
            unit: null,
            dp: 0
        },
        "SHSOUTAVG": {
            name: "Shares outstanding, average (x1M)",
            tooltip: "These are the Diluted Average Shares Outstanding for the most recent fiscal year as reflected in the Income Statement.",
            type: null,
            unit: null,
            dp: 0
        },
        "BETA": {
            name: "Beta",
            tooltip: "Beta is a measure of a company's common stock price volatility relative to the market. Reuters Beta is the slope of the 60 month regression line of the percentage price change of the stock relative to the percentage price change of the local index. Beta values are not calculated if less than 40 months of pricing is available.",
            type: null,
            unit: null,
            dp: 3
        },
        "NEW_PAV2": {
            name: "Beta, Down",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_PAV3": {
            name: "Beta, Up",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_PAV4": {
            name: "3-Year Weekly Beta",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_PAV5": {
            name: "3-Year Weekly Beta, Down",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_PAV6": {
            name: "3-Year Weekly Beta, Up",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_PAV7": {
            name: "Price % Change Month To Date",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_PAV8": {
            name: "Price % Change Quarter To Date",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_PAV9": {
            name: "Price % Change Week To Date",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "DVOLSHSOUT": {
            name: "Volume (daily) as a % of Shares O/S",
            tooltip: "This is the Average Daily Volume divided by the most recent Shares Outstanding, multiplied by 100.",
            type: null,
            unit: "%",
            dp: 3
        },
        "MVOLSHSOUT": {
            name: "Volume (monthly) as a % of Shares O/S",
            tooltip: "This is the Average Monthly Volume divided by the most recent Shares Outstanding, multiplied by 100. ",
            type: null,
            unit: "%",
            dp: 3
        },
        "NHIG": {
            name: "Price - 12 month high",
            tooltip: "This price is the highest Price the stock traded at in the last 12 months. This could be an intra-day high.",
            type: null,
            unit: null,
            dp: 3
        },
        "NLOW": {
            name: "Price - 12 month low",
            tooltip: "This price is the lowest Price the stock traded at in the last 12 months. This could be an intra-day low.",
            type: null,
            unit: null,
            dp: 3
        },
        "NEW_PAV14": {
            name: "12 Month High price date",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NPRICE": {
            name: "Price - closing or last bid",
            tooltip: "This is the close price for the issue from the day it last traded. It is also referred to as the Current Price.  Note that some issues may not trade every day, and therefore it is possible for this price to come from a date prior to the last business day.  The date of the closing price is given in the field PDATE",
            type: null,
            unit: null,
            dp: 3
        },
        "NEW_PAV16": {
            name: "Pricing date",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "PR1DAYPRC": {
            name: "Price - 1 Day % Change",
            tooltip: "The 1 Day Price Percent Change is the percentage change in the company's previous day's stock price and  the current stock price.",
            type: null,
            unit: "%",
            dp: 3
        },
        "PR5DAYPRC": {
            name: "Price - 5 Day % Change",
            tooltip: "The 5 Day Price Percent Change is the percentage change in the company's stock price over the last 5 tradable (business) days.  If the issue did not trade at the beginning of this period, the the latest price prior to 5 days ago will be used.",
            type: null,
            unit: "%",
            dp: 3
        },
        "PR04WKPCT": {
            name: "Price - 04 week price % change",
            tooltip: "This is the percentage change in the company's stock price over the last four weeks.",
            type: null,
            unit: "%",
            dp: 3
        },
        "PR13WKPCT": {
            name: "Price - 13 week price % change",
            tooltip: "This is the percentage change in the company's stock price over the last thirteen weeks.",
            type: null,
            unit: "%",
            dp: 3
        },
        "PR26WKPCT": {
            name: "Price - 26 week price % change",
            tooltip: "This is the percentage change in the company's stock price over the last twenty six weeks.",
            type: null,
            unit: "%",
            dp: 3
        },
        "PR52WKPCT": {
            name: "Price - 52 week price % change",
            tooltip: "This is the percentage change in price over the last fifty two weeks as compared to the change in price of the S&P 500 during that same period.",
            type: null,
            unit: "%",
            dp: 3
        },
        "PriceAvg50Day": {
            name: "50 Day Average - Price",
            tooltip: "This is the Average price over the last 50 tradable days.",
            type: null,
            unit: null,
            dp: 3
        },
        "PriceAvg150Day": {
            name: "150 Day Average - Price",
            tooltip: "This is the Average price over the last 150 tradable days.",
            type: null,
            unit: null,
            dp: 3
        },
        "PriceAvg200Day": {
            name: "200 Day Average - Price",
            tooltip: "This is the Average price over the last 200 tradable days.",
            type: null,
            unit: null,
            dp: 3
        },
        "PRYTDPCT": {
            name: "Price - YTD price % change",
            tooltip: "This is the percentage change in the company's stock price since the close of the last trading day of the previous year.",
            type: null,
            unit: "%",
            dp: 3
        },
        "VOL10DAVG": {
            name: "Volume - avg. trading vol. last 10 days (x1M)",
            tooltip: "This is the daily average of the cumulative trading volume for the last 10 days.",
            type: null,
            unit: null,
            dp: 3
        },
        "VOL3MAVG": {
            name: "Volume - avg. trading vol. last 3 months (x1M)",
            tooltip: "This is the monthly average of the cumulative trading volume during the last three months. It is calculated by dividing the cumulative trading volume of the last 91 days by 3.",
            type: null,
            unit: null,
            dp: 3
        },
        "VOL1DAVG": {
            name: "Volume - 1 Day Average (x1M)",
            tooltip: "This is the daily volume average calculated by dividing the cumulative trading volume of the last 91 days by the number of trading days during this period.",
            type: null,
            unit: null,
            dp: 3
        },
        "ChPctPriceWTD": {
            name: "Price - WTD % Change",
            tooltip: "This is the percentage change between the most recent market closing price and the closing price at the week start. Week start price is the closing price of the previous week.",
            type: null,
            unit: "%",
            dp: 3
        },
        "ChPctPriceMTD": {
            name: "Price - MTD % Change",
            tooltip: "This is the percentage change between the most recent market closing price and the closing price at the month start. Month start price is the closing price of the previous month.",
            type: null,
            unit: "%",
            dp: 3
        },
        "ChPctPriceQTD": {
            name: "Price - QTD % change",
            tooltip: "This is the percentage change between the most recent market closing price and the closing price at the quarter start. Quarter start price is the closing price of the previous calendar quarter.",
            type: null,
            unit: "%",
            dp: 3
        },
        "AROIPCT": {
            name: "Return On Investment (ROI) (%)",
            tooltip: "This value is the annual Income After Taxes divided by the average Total Long Term Debt, Other Long Term Liabilities, and Shareholders Equity, expressed as a percentage.",
            type: null,
            unit: "%",
            dp: 3
        },
        "ATOTD2AST": {
            name: "Total Debt/Total Capital (%)",
            tooltip: "This ratio is the Total Debt for the most recent fiscal year divided by Total Assets for the same period. Total Debt is the sum of Short Term Debt, the Current Portion of Long Term Debt and Capitalized Lease Obligations, Long Term Debt and Capitalized Lease Obligations for the most recent fiscal year.",
            type: null,
            unit: "%",
            dp: 3
        },
        "ATOTD2EQ": {
            name: "Total Debt/Total Equity (%)",
            tooltip: "This ratio is Total Debt for the most recent fiscal year divided by Total Shareholder Equity for the same period. NOTE: This is Not Meaningful (NM) for banks.",
            type: null,
            unit: "%",
            dp: 3
        },
        "ALTD2AST": {
            name: "Long Term Debt/Assets (%)",
            tooltip: "This ratio is the Total Long Term Debt for the most recent fiscal year divided by the Total Assets for same period.",
            type: null,
            unit: "%",
            dp: 3
        },
        "ALTD2EQ": {
            name: "Long Term Debt/Equity (%)",
            tooltip: "This ratio is the Total Long Term Debt for the most recent fiscal year divided by Total Shareholder Equity for the same period.",
            type: null,
            unit: "%",
            dp: 3
        },
        "ALTD2CAP": {
            name: "Long Term Debt/Total Capital (%)",
            tooltip: "This ratio is the Total Long Term Debt for the most recent interim period divided by Total Capital for the same period. Total Capital is the sum of Short Term Debt, the Current Portion of Long Term Debt, Long Term Debt, Capitalized Lease Obligations and Total Shareholder Equity.",
            type: null,
            unit: "%",
            dp: 3
        },
        "AWCAPPSPR": {
            name: "Working Capital per Share/Price",
            tooltip: "This is Working Capital Per Share divided by the current price. Working Capital Per Share is defined as the difference between Current Assets and Current Liabilities for the most recent fiscal year divided by the Balance Sheet Shares Outstanding at the end of that same period.",
            type: null,
            unit: null,
            dp: 3
        },
        "NEW_FS11": {
            name: "Interest Coverage",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "Reinvest_A": {
            name: "Reinvestment Rate (%)",
            tooltip: "This ratio is calculated by dividing Retained Earnings for the most recent fiscal year by average Common Shareholders Equity for the same period and is expressed as percent. Retained Earnings represents Income Available to Common Excluding Extraordinary Items minus Gross Dividends (Common Stock).",
            type: null,
            unit: "%",
            dp: 3
        },
        "AASTTURN": {
            name: "Asset Turnover",
            tooltip: "This value is calculated as the Total Revenues for the most recent year divided by the Average Total Assets. The Average Total Assets is the average of the Total Assets at the beginning and end of the year. NOTE: This ratio is Not Meaningful (NM) for Banks and Insurance companies.",
            type: null,
            unit: null,
            dp: 3
        },
        "TrdCycle_A": {
            name: "Average Net Trade Cycle (Days)",
            tooltip: "This value represents the sum of Average Inventory (Days) and Average Receivables Collection Period (Days) minus Average Payables Payment Period (Days) for the most recent fiscal year.",
            type: null,
            unit: null,
            dp: 3
        },
        "ANIPEREMP": {
            name: "Net Income/Employee",
            tooltip: "This value is the Income After Taxes for the most recent fiscal year divided by the number of employees at the end of the last reported fiscal year.",
            type: null,
            unit: null,
            dp: 3
        },
        "NEW_ER4": {
            name: "Inventory Turnover",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_ER5": {
            name: "Receivables Turnover",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "AREVPEREMP": {
            name: "Revenue/Employee",
            tooltip: "This value is the Total Sales for the most recent year divided by the average number of Employees for the most recent fiscal year.",
            type: null,
            unit: null,
            dp: 3
        },
        "AEBITDMG": {
            name: "EBITD Margin (%)",
            tooltip: "This value represents annual Earnings Before Interest, Taxes and Depreciation expressed as a percent of annual Total Revenue. NOTE: This value is only available for Industrial and Utility companies.",
            type: null,
            unit: "%",
            dp: 3
        },
        "AGROSMGN": {
            name: "Gross Margin (%)",
            tooltip: "This value measures the percent of revenue left after paying all direct production expenses. It is calculated as annual Total Revenue minus annual Cost of Goods Sold divided by annual Total Revenue and multiplied by 100. NOTE: This item is only available for Industrial and Utility companies.",
            type: null,
            unit: "%",
            dp: 3
        },
        "NEW_PR3": {
            name: "Net Profit Margin",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_PR4": {
            name: "Operating Margin",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "APTMGNPCT": {
            name: "Pretax Margin (%)",
            tooltip: "This value represents Income Before Taxes for the most recent fiscal year expressed as a percent of Total Revenue for the most recent fiscal year.",
            type: null,
            unit: "%",
            dp: 3
        },
        "ASGA2REV": {
            name: "SC&A Expenses/Net Sales (%)",
            tooltip: "This is the total Selling, General, and Administrative Expenses divided by Total Revenue and is expressed as a percentage for the most recent annual period.",
            type: null,
            unit: "%",
            dp: 3
        },
        "ABVPS": {
            name: "Book Value per Share",
            tooltip: "This is defined as Common Shareholder's Equity divided by the Shares Outstanding at the end of the most recent fiscal year.  Book Value is the Total Shareholder's Equity minus Preferred Stock and Redeemable Preferred Stock.",
            type: null,
            unit: null,
            dp: 3
        },
        "ATANBVPS": {
            name: "Tangible Book Value per Share",
            tooltip: "This is the annual Tangible Book Value divided by the Shares Outstanding at the end of the most recent fiscal year. Tangible Book Value is the  Book Value minus Goodwill and Intangible Assets for the same period.",
            type: null,
            unit: null,
            dp: 3
        },
        "ACAPSPPS": {
            name: "Capital Spending per Share",
            tooltip: "This is Capital Spending for the most recent fiscal year divided by the Average Shares Outstanding for the same period. Capital Spending is the sum of the Capital Expenditure items found on the Statement of Cash Flows.",
            type: null,
            unit: null,
            dp: 3
        },
        "ACFSHR": {
            name: "Cash Flow per Share",
            tooltip: "This is Cash Flow for the most recent fiscal year divided by the Average Shares Outstanding for the same period. Cash Flow is defined as the sum of Income After Taxes minus Preferred Dividends and General Partner Distributions plus Depreciation, Depletion and Amortization.",
            type: null,
            unit: null,
            dp: 3
        },
        "ACSHPS": {
            name: "Cash per Share",
            tooltip: "This is the Total Cash plus Short Term Investments divided by the Shares Outstanding at the end of the most recent fiscal year. NOTE: This does NOT include cash equivalents that may be reported under long term assets.",
            type: null,
            unit: null,
            dp: 3
        },
        "TTMEBITDPS": {
            name: "EBITD per Share",
            tooltip: "EBITD Per Share is the trailing twelve month EBITD divided by the Average Shares Outstanding for the same period. EBITD is EBIT plus Depreciation and Amortization expenses (from the Statement of Cash Flows). NOTE: This item is not available for Banks and Insurance companies.",
            type: null,
            unit: null,
            dp: 3
        },
        "AEPSNORM": {
            name: "EPS Normalised",
            tooltip: "This is the Normalized Income Available to Common Stockholders for the most recent anual period divided by the same period's Diluted Weighted Average Shares Outstanding.",
            type: null,
            unit: null,
            dp: 3
        },
        "ABEPSXCLXO": {
            name: "EPS Basic excl. extraordinary items",
            tooltip: "This is the Adjusted Income Available to Common Stockholders for the most recent fiscal year divided by the most recent fiscal year's Basic Weighted Average Shares Outstanding.",
            type: null,
            unit: null,
            dp: 3
        },
        "AEPSXCLXOR": {
            name: "EPS excluding extraordinary items",
            tooltip: "This is the Adjusted Income Available to Common Stockholders for the most recent fiscal year divided by the most recent fiscal year's Diluted Weighted Average Shares Outstanding.",
            type: null,
            unit: null,
            dp: 3
        },
        "AEPSINCLXO": {
            name: "EPS including extraordinary items",
            tooltip: "This is the Adjusted Income Available to Common Stockholders for the most recent fiscal year plus Discontinued Operations, Extraordinary Items, and Cumulative Effect of Accounting Changes for the same period divided by the most recent fiscal year's Diluted Weighted Average Shares Outstanding.",
            type: null,
            unit: null,
            dp: 3
        },
        "A1FCFSHR": {
            name: "Free Cash Flow per Share",
            tooltip: "This value is the Free Cash Flow from the most recent fiscal year divided by the Average Shares Outstanding found on the most recent fiscal year's Income Statement.",
            type: null,
            unit: null,
            dp: 3
        },
        "ALTDPS": {
            name: "Long Term Debt/Share",
            tooltip: "This is the Total Long Term Debt at the end of the fiscal year divided by the Shares Outstanding at the end of the same period.",
            type: null,
            unit: null,
            dp: 3
        },
        "AREVPS": {
            name: "Revenue/Share",
            tooltip: "This value is the Total Revenue for the most recent fiscal year divided by the Average Diluted Shares Outstanding for the same period.",
            type: null,
            unit: null,
            dp: 3
        },
        "ATACHG": {
            name: "Total Asset % Change",
            tooltip: "This is the percent change in most recent annual period total asset as compared to the same period one year ago.",
            type: null,
            unit: "%",
            dp: 3
        },
        "BVTRENDGR": {
            name: "Book Value Per Growth Rate (%)",
            tooltip: "This growth rate is the compound annual growth rate of Book Value Per Share over the last 5 years. If the ratio can not be calculated, a 'NA' (Not Available) code will be used.",
            type: null,
            unit: "%",
            dp: 3
        },
        "CSPTRENDGR": {
            name: "Capital Spending Growth Rate (%)",
            tooltip: "This is the compound annual growth rate of Capital Spending over the last 5 years. Capital Spending is the sum of the Capital Expenditure items found on the Statement of Cash Flows.",
            type: null,
            unit: "%",
            dp: 3
        },
        "CFTRENDGR": {
            name: "Cash Flow Growth Rate (%)",
            tooltip: "This is the compound annual growth rate of Cash Flow over the last 5 years. Cash Flow is the sum of Income After Taxes minus Preferred Dividends and General Partner Distributions plus Depreciation, Depletion and Amortization.  If the ratio can not be calculated, a 'NA' (Not Available) code will be used.",
            type: null,
            unit: "%",
            dp: 3
        },
        "NEW_GR5": {
            name: "Cash from Operating Activities - 3YR",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_GR6": {
            name: "Dividend change % - yoy",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_GR7": {
            name: "Dividend growth rate",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_GR8": {
            name: "EPS Change %",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "EPSTRENDGR": {
            name: "EPS Growth Rate (%)",
            tooltip: "This growth rate is the compound annual growth rate of Earnings Per Share Excluding Extraordinary Items and Discontinued Operations over the last 5 years. NOTE: If the value for either the most recent year or the oldest year is zero or negative, the growth rate cannot be calculated and a 'NA' (Not Available) code will be used.",
            type: null,
            unit: "%",
            dp: 3
        },
        "GMNTRENDGR": {
            name: "Gross Margin Growth Rate (%)",
            tooltip: "This is the compound annual growth rate of Gross Margin over the last 5 years. Gross Margin measures the percent of Revenue left after paying all direct production expenses. It is calculated as Revenue minus Cost of Goods Sold divided by Revenue and expressed as a percentage. NOTE: If the value for either the most recent year of the oldest year is zero or negative,the ratio cannot be calculated and a 'NA' (Not Available) code will be used.",
            type: null,
            unit: "%",
            dp: 3
        },
        "NEW_GR11": {
            name: "Dividend Growth rate % - 3YR",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_GR12": {
            name: "EPS Growth rate % - 3YR",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_GR13": {
            name: "Revenue Growth rate % - 3YR",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "ANLOANCHG": {
            name: "Net Loans % Change",
            tooltip: "This is the percent change in most recent annual period total Bank Loans as compared to the same period one year ago.",
            type: null,
            unit: "%",
            dp: 3
        },
        "NEW_GR15": {
            name: "Net Income Change %",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "ANICHG": {
            name: "Net Income Growth Rate (%)",
            tooltip: "This value is the most recent year Income After Taxes minus the Income After Taxes for the preceding year divided by the Income After Taxes for the preceding year, multiplied by 100.",
            type: null,
            unit: "%",
            dp: 3
        },
        "NPMTRENDGR": {
            name: "Net Profit Margin Growth Rate (%)",
            tooltip: "This is the compound annual growth rate in Profit Margin over the last 5 years. Profit Margin, also known as Return on Sales, is the Income After Taxes divided by Total Revenue and is expressed as a percentage. NOTE: If the value for either the most recent year of the oldest year is zero or negative, the ratio in not calculated and  a 'NA' (Not Available) code will be used.",
            type: null,
            unit: "%",
            dp: 3
        },
        "NEW_GR18": {
            name: "Revenue Change %, 1 YR ago - Q",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_GR19": {
            name: "Revenue growth rate",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        },
        "NEW_GR20": {
            name: "Revenue/Share - 3YR TTM growth",
            tooltip: "",
            type: null,
            unit: null,
            dp: 0
        }
    }
//################################################################################

// Create a new IndexPageObj ...
    LabCI.WP.createscreenerpageobj = function () {
        var pobj = LabCI.AbstractPageObj.extend("lsinopac-screener", LabCI.WP.ScreenerPageObj);
        return pobj;
    };

    LabCI.WP.ScreenerPageObj = {
        $mswiper: null,
        $sectorselection: null,
        $advancedselection: null,
        $advancedselectionBox: null,
        $screenerlist: null,
        $slidertimeout: null,
        $mobileresultlist: null,
        pageno: 1,
        recperpage: 25,
        subcat1: "m:23415,a:1|0|0,s:5130531055105110532053305620501054105550561055605230521052205530512054205540502053405430572057105810524050305910",
        subcat2: "ticker",
        subcat3: "asc",
        currentFocueAdvancedFilterNo: 0,
        savedStrategy: null,
        sectorlist: ["5130", "5310", "5510", "5110", "5320", "5330", "5620", "5010", "5410", "5550", "5610", "5560", "5230", "5210", "5220", "5530", "5120", "5420", "5540", "5020", "5340", "5430", "5720", "5710", "5810", "5240", "5030", "5910"],
        advancedCriteria: [
            {
                "valuation": ["APENORM", "F_PBR", "APRCFPS", "APRICE2TOTEQ", "F_PSR"],
                "dividend": ["F_DIV_YIELD", "F_DIV"],
                "share_related": ["F_MKTCAP_USD", "FLOATPRC_CUR", "SHSBOUTAVG", "SHSOUT", "SHSOUTAVG"],
                "profitability_ratio": ["F_MARGIN", "F_OP_MARGIN", "AEBITDMG", "AGROSMGN", "APTMGNPCT", "ASGA2REV"],
                "pershare_ratio": ["ABVPS", "ATANBVPS", "ACAPSPPS", "ACSHPS", "TTMEBITDPS", "AEPSNORM", "A1FCFSHR", "ALTDPS", "AREVPS"]
            },
            {
                "mgt_effectiveness": ["F_ROE", "F_ROA", "AROIPCT"],
                "financial_strength": ["ACURRATIO", "AQUICKRATI", "F_DIV_PAYOUT", "F_TOT_ASSET_EQTY_RATIO", "F_INT_COV_RATIO", "F_DEBT_ASSET_RATIO", "ATOTD2AST", "ATOTD2EQ", "AWCAPPSPR", "Reinvest_A"],
                "efficiency_ratio": ["F_INV_REV_RATIO", "F_REC_REV_RATIO", "AASTTURN", "TrdCycle_A", "ANIPEREMP", "AREVPEREMP"],
                "growth_rate": ["F_REV_GROWTH_RATE", "F_DIV_YIELD_GROWTH_RATE", "ATACHG", "BVTRENDGR", "CSPTRENDGR", "CFTRENDGR", "GMNTRENDGR", "ANLOANCHG", "ANICHG", "NPMTRENDGR"]
            },
            {
                "ta_trend": ["T_SHORT_GOLDX", "T_MID_GOLDX", "T_SHORT_DEADX", "T_MID_DEADX", "T_3LINE_BREAK_BUY", "T_3LINE_BREAK_SELL", "T_BOLL_BULL", "T_BOLL_BEAR"],
                "ta_oscillator": ["T_RSI", "T_FAST_STO", "T_SLOW_STO", "T_DMI", "T_RCI", "T_PSYCHO_LINE", "T_MACD_BULLX", "T_MACD_BEARX"],
                "price_volume": ["BETA", "DVOLSHSOUT", "MVOLSHSOUT", "PR26WKPCT", "PR52WKPCT", "PRYTDPCT", "VOL10DAVG", "VOL3MAVG", "VOL1DAVG"]
            }
        ],
        defaultValue: {
            subcat1: "m:23415,a:1|0|0,s:5130531055105110532053305620501054105550561055605230521052205530512054205540502053405430572057105810524050305910",
            subcat2: "ticker",
            subcat3: "asc",
        },

        statevalue: {},
        initImpl: function () {
            // Get ready
            var that = this;
            this.$sectorselection = this.$pageobj.find(".sector-selection");
            this.$advancedselection = this.$pageobj.find(".advanced-selection");
            this.$advancedselectionBox = this.$pageobj.find(".advanced-selection-box");
            this.$screenerlist = this.$pageobj.find(".screener-result-list");
            this.$mobileresultlist = this.$pageobj.find(".mobile-result-list");

            this._loadSavedStrategy();


            $.each(this.sectorlist, function (index, data) {
                if (index % 4 == 0) {
                    var element = '<div class="row">' +
                            '<div class="col-md-6 col-md-auto">' +
                            '<div class="row" style="padding-top:10px">' +
                            '<div class="col pr-0">' +
                            '<div class="sectorbox selected" sector="' + that.sectorlist[index] + '"><div class="sectorbox-header lbl' + that.sectorlist[index] + '">1</div><div class="sectorbox-body"><span class="sectorbox-count count' + that.sectorlist[index] + '">0</span><span class="lblsectorbox-count"> stock(s)</span></div></div>' +
                            '</div>' +
                            '<div class="col pr-md-0">';
                    if (index + 1 < that.sectorlist.length) {
                        element += '<div class="sectorbox selected" sector="' + that.sectorlist[index + 1] + '"><div class="sectorbox-header lbl' + that.sectorlist[index + 1] + '">2</div><div class="sectorbox-body"><span class="sectorbox-count count' + that.sectorlist[index + 1] + '">0</span><span class="lblsectorbox-count"> stock(s)</span></div></div>';
                    }

                    element += '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-md-6 col-md-auto">' +
                            '<div class="row pr-md-3" style="padding-top:10px">' +
                            '<div class="col pr-0">';
                    if (index + 2 < that.sectorlist.length) {
                        element += '<div class="sectorbox selected" sector="' + that.sectorlist[index + 2] + '"><div class="sectorbox-header lbl' + that.sectorlist[index + 2] + '">3</div><div class="sectorbox-body"><span class="sectorbox-count count' + that.sectorlist[index + 2] + '">0</span><span class="lblsectorbox-count"> stock(s)</span></div></div>';
                    }

                    element += '</div>' +
                            '<div class="col pr-md-0">';
                    if (index + 3 < that.sectorlist.length) {
                        element += '<div class="sectorbox selected" sector="' + that.sectorlist[index + 3] + '"><div class="sectorbox-header lbl' + that.sectorlist[index + 3] + '">4</div><div class="sectorbox-body"><span class="sectorbox-count count' + that.sectorlist[index + 3] + '">0</span><span class="lblsectorbox-count"> stock(s)</span></div></div>';
                    }

                    element += '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                    that.$sectorselection.append(element);
                }
            });


            $.each(this.advancedCriteria, function (index, data) {

                var col = that.$advancedselection.find(".advanced-col" + (index + 1));

                for (var key in data) {
                    var element = '<div class="advanced-selection-subtitle">' + that.pageobj_rb.lbl["criteriatype_" + key] + '</div>';

                    var criteriaArray = data[key];
                    for (var cKey in criteriaArray) {
                        element += '<div class="advanced-selection-item lbl' + criteriaArray[cKey] + '" item="' + criteriaArray[cKey] + '">' + that.pageobj_rb.lbl["criteria_" + criteriaArray[cKey]] + '</div>'
                    }
                    $(col).append(element);
                }
            });

            this.$pageobj.find(".marketbox").click(function () {
                if ($(this).hasClass("selected")) {
                    $(this).removeClass("selected");
                } else {
                    $(this).addClass("selected");
                }
                if (that.$pageobj.find(".marketbox.selected").length == 4) {
                    that.$pageobj.find(".cbmarket").prop('checked', true);
                } else {
                    that.$pageobj.find(".cbmarket").prop('checked', false);
                }
                that._criteriaChange();
            });

            this.$pageobj.find(".cbmarket").change(function () {
                if (this.checked) {
                    that.$pageobj.find(".marketbox").addClass("selected");
                } else {
                    that.$pageobj.find(".marketbox").removeClass("selected");
                }
                that._criteriaChange();
            });

            this.$pageobj.find(".cbsector").change(function () {
                if (this.checked) {
                    that.$pageobj.find(".sectorbox").addClass("selected");
                } else {
                    that.$pageobj.find(".sectorbox").removeClass("selected");
                }
                //    that._criteriaChange();
            });

            this.$sectorselection.find(".sectorbox").click(function () {
                if ($(this).hasClass("selected")) {
                    $(this).removeClass("selected");
                } else {
                    $(this).addClass("selected");
                }
                if (that.$pageobj.find(".sectorbox.selected").length == 28) {
                    that.$pageobj.find(".cbsector").prop('checked', true);
                } else {
                    that.$pageobj.find(".cbsector").prop('checked', false);
                }

            });

            this.$advancedselection.find(".advanced-selection-item").click(function () {
                var id = $(this).attr("item");

                var idCount = that.$pageobj.find(".advancedbox").find("#ca" + id).length;
                if (idCount > 0) {
                    //    $('#alertModel').find('.alertmessages').html(that.pageobj_rb.lbl["duplicate-criteria"]);
                    //    $('#alertModel').modal('show');
                    //    alert(that.pageobj_rb.lbl["duplicate-criteria"]);
                    $('.duplicate-criteria').show();
                } else {
                    var obj = that.$pageobj.find(".advancedbox.advanced" + that.currentFocueAdvancedFilterNo);
                    $(obj).html(that._prepareAdvancedCriteriaItemBoxHtml(id, that.currentFocueAdvancedFilterNo));
                    that._bindAdvancedCriteriaItemBoxObject(id, that.currentFocueAdvancedFilterNo, true, null);
                    $('#advancedModel').modal('hide');
                    //   that._criteriaChange();                    
                }
            });

            this.$pageobj.find(".sectorbox").change(function () {
                if (this.checked) {
                    that.$sectorselection.find(".sectorbox").addClass("selected");
                } else {
                    that.$sectorselection.find(".sectorbox").removeClass("selected");
                }
            });

            $('#sectorModel').on('show.bs.modal', function (e) {

                //        if (that.getStateData().subcat1.indexOf("s:") == -1) {
                //            //default...
                //            that.statevalue.subcat1 += ",s:5130531055105110532053305620501054105550561055605230521052205530512054205540502053405430572057105810524050305910";
                //        }

                var criteriaArray = that.getStateData().subcat1.split(",");
                for (var i = 0; i < criteriaArray.length; ++i) {
                    if (criteriaArray[i].indexOf("s:") >= 0) {
                        var sectors = criteriaArray[i].replace("s:", "");
                        if (sectors != "") {
                            var sectorsArray = sectors.match(/.{1,4}/g);
                            for (var j = 0; j < sectorsArray.length; ++j) {
                                that.$sectorselection.find(".sectorbox[sector='" + sectorsArray[j] + "']").addClass("selected");
                            }
                        }


                    }
                }
            });

            $('#advancedModel').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                that.currentFocueAdvancedFilterNo = button.data('advanced');
                $('.duplicate-criteria').hide();


            });


            $('#saveModel').on('show.bs.modal', function (event) {
                var currentNo = $("#saveModel .currentvalue").attr("strategy");

                $("#saveModel .currentvalue").html(that.savedStrategy[currentNo].name);
                $("#saveModel .save_name").val(that.savedStrategy[currentNo].name);
                for (var i = 0; i < that.savedStrategy.length; ++i) {
                    that.$pageobj.find(".strategy-save-dropdown button[value='" + i + "']").html(that.savedStrategy[i].name);
                }

            });

            $('#sectorModel').on('show.bs.modal', function (event) {
                $('.no-sector').hide();
            });

            this.$pageobj.find(".sector-btn-confirm").click(function () {

                var sectorNum = that.$sectorselection.find(".sectorbox.selected").length;
                if (sectorNum == 0) {
                    //    $('#alertModel').find('.alertmessages').html(that.pageobj_rb.lbl["no-sector"]);
                    //    $('#alertModel').modal('show');   
                    //alert(that.pageobj_rb.lbl["no-sector"]);
                    $('.no-sector').show();
                } else {
                    $('#sectorModel').modal('hide');
                    $('.no-sector').hide();
                    that._criteriaChange();
                }
            });

            this.$pageobj.find(".strategy-save-dropdown button").click(function () {
                var strategy = $(this).attr("value");
                $("#saveModel .save_name").val(that.savedStrategy[strategy].name);
                $("#saveModel .currentvalue").html(that.savedStrategy[strategy].name);
                $("#saveModel .currentvalue").attr("strategy", strategy);

            });
            this.$pageobj.find(".strategy-btn-confirm").click(function () {
                that._saveStrategy();
                $('#saveModel').modal('hide');
            });

            this.$pageobj.find(".strategy-btn-reset").click(function () {
                //    var s = that.$pageobj.find(".saved .currentvalue").attr("strategy");
                that._loadStrategy('');
            });


            this.$pageobj.find(".btn-result").click(function () {
                //        that.$pageobj.find(".screener-setting").hide("slide", { direction: "left" }, 200);                
                //        that.$pageobj.find(".mobile-result").delay(200).show("slide", { direction: "right" }, 200);
                that.$pageobj.find(".screener-setting").hide();
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                that.$pageobj.find(".mobile-result").show();
            });

            this.$pageobj.find(".mobile-back").click(function () {
                //        that.$pageobj.find(".screener-setting").hide("slide", { direction: "left" }, 200);                
                //        that.$pageobj.find(".mobile-result").delay(200).show("slide", { direction: "right" }, 200);
                that.$pageobj.find(".mobile-result").hide();
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                that.$pageobj.find(".screener-setting").show();
            });





            /*        this.$mswiper = new Swiper(".swiper-container", {
             direction: 'vertical',
             slidesPerView: 'auto',
             //    autoHeight: true,
             freeMode: true,
             mousewheel: true
             });
             */

            return this;
        },
        resizeImpl: function () {
            var that = this;

        },
        ////////////////////////////////////////////////////////////////////

        showImpl: function (statedata) {

            var that = this;
            var isStart = true;

            this._criteriaChange(true);

            /*    if (statedata) {
             if (!statedata.subcat1) {
             statedata.subcat1 = this.defaultValue.subcat1;
             }
             if (!statedata.subcat2) {
             statedata.subcat2 = this.defaultValue.subcat2;
             }
             if (!statedata.subcat3) {
             statedata.subcat3 = this.defaultValue.subcat3;
             }
             }
             */
            return this;
        },
        _loadSavedStrategy: function () {
            var that = this;
            if (localStorage["lsinopac_screener_strategy"]) {
                this.savedStrategy = JSON.parse(localStorage["lsinopac_screener_strategy"]);
            } else {
                //default...
                this.savedStrategy = [
                    {name: this.pageobj_rb.lbl["strategy0"], subcat1: this.subcat1, subcat2: this.subcat2, subcat3: this.subcat3, used: "0"},
                    {name: this.pageobj_rb.lbl["strategy1"], subcat1: this.subcat1, subcat2: this.subcat2, subcat3: this.subcat3, used: "0"},
                    {name: this.pageobj_rb.lbl["strategy2"], subcat1: this.subcat1, subcat2: this.subcat2, subcat3: this.subcat3, used: "0"},
                    {name: this.pageobj_rb.lbl["strategy3"], subcat1: this.subcat1, subcat2: this.subcat2, subcat3: this.subcat3, used: "0"}];
            }

            this.$pageobj.find(".saved-dropdown button").remove();
            this.$pageobj.find(".saved-dropdown").append('<button class="dropdown-item savedlabel" value="saved" type="button" strategy="">' + this.pageobj_rb.lbl["savedstrategy"] + '</button>');
            for (var i = 0; i < this.savedStrategy.length; ++i) {
                if (this.savedStrategy[i].used && this.savedStrategy[i].used == "1") {
                    this.$pageobj.find(".saved-dropdown").append('<button class="dropdown-item savedlabel" value="saved" type="button" strategy="' + i + '">' + this.savedStrategy[i].name + '</button>');
                }
            }

            this.$pageobj.find(".saved-dropdown button").click(function () {
                var strategy = $(this).attr("strategy");

                that._loadStrategy(strategy);

            });
        },
        _loadStrategy: function (strategy) {

            if (strategy != '') {
                this.$pageobj.find(".saved .currentvalue").html(this.savedStrategy[strategy].name);
                this.$pageobj.find(".saved .currentvalue").attr("strategy", strategy);
                //fill back UI...
                this.subcat1 = this.savedStrategy[strategy].subcat1;
                this.subcat2 = this.savedStrategy[strategy].subcat2;
                this.subcat3 = this.savedStrategy[strategy].subcat3;
                this.statevalue.subcat1 = this.subcat1;
                this.statevalue.subcat2 = this.subcat2;
                this.statevalue.subcat3 = this.subcat3;
                this._fillUISubcat1();
                this._loadscreenerresult();
            } else {
                this.$pageobj.find(".saved .currentvalue").html(this.$pageobj.find(".savedlabel[strategy='']").html());
                this.$pageobj.find(".saved .currentvalue").attr("strategy", "");
                //fill back UI...
                this.subcat1 = this.defaultValue.subcat1;
                this.subcat2 = this.defaultValue.subcat2;
                this.subcat3 = this.defaultValue.subcat3;
                this.statevalue.subcat1 = this.subcat1;
                this.statevalue.subcat2 = this.subcat2;
                this.statevalue.subcat3 = this.subcat3;
                this._fillUISubcat1();
                this._loadscreenerresult();
            }
        },
        _fillUISubcat1: function () {
            var subcat1 = this.subcat1.split(",");
            if (subcat1[0] != null) {
                //market
                this.$pageobj.find(".marketbox").removeClass("selected");
                $.each(this.$pageobj.find(".marketbox"), function (index, value) {
                    var c = $(this).attr("c");
                    if (subcat1[0].indexOf(c) != -1) {
                        $(this).addClass("selected");
                    }
                });
                if (this.$pageobj.find(".marketbox.selected").length == 4) {
                    this.$pageobj.find(".cbmarket").prop('checked', true);
                } else {
                    this.$pageobj.find(".cbmarket").prop('checked', false);
                }

                //sector
                if (subcat1[2] != null) {
                    this.$sectorselection.find(".sectorbox").removeClass("selected");
                    $.each(this.$sectorselection.find(".sectorbox"), function (index, value) {
                        var s = $(this).attr("sector");
                        if (subcat1[2].indexOf(s) != -1) {
                            $(this).addClass("selected");
                        }
                    });
                    if (this.$sectorselection.find(".sectorbox.selected").length == 28) {
                        this.$pageobj.find(".cbsector").prop('checked', true);
                    } else {
                        this.$pageobj.find(".cbsector").prop('checked', false);
                    }
                }

                //advanced...
                for (var i = 0; i < 5; ++i) {
                    this._removeAdvancedCriteria(i, false);
                }

                for (var i = 3; i < subcat1.length; ++i) {
                    if (subcat1[i] != null) {
                        var item = subcat1[i].split(":");
                        if (item != null) {
                            var values = item[1].split("|");
                            this._setAdvancedCriteria(item[0].replace("v", ""), values[0], values[1], values[2], values[3]);
                        }
                    }
                }

            }

        },
        _saveStrategy: function () {
            var num = $("#saveModel .currentvalue").attr("strategy");
            var name = $("#saveModel .save_name").val();
            this.savedStrategy[num].name = name;
            this.savedStrategy[num].subcat1 = this.statevalue.subcat1;
            this.savedStrategy[num].subcat2 = this.statevalue.subcat2;
            this.savedStrategy[num].subcat3 = this.statevalue.subcat3;
            this.savedStrategy[num].used = "1";
            localStorage["lsinopac_screener_strategy"] = JSON.stringify(this.savedStrategy);

            this._loadSavedStrategy();

        },
        _setAdvancedCriteria: function (index, name, period, min, max) {
            var that = this;
            //that.$screenercriteriaadvance.find("#adv"+index).html(name);
            //Create the preset object
            var preset = {
                type: period,
                from: min,
                to: max
            };
            this._addAdvancedCriteriaItemBox(index, name, false, preset);
        },
        _addAdvancedCriteriaItemBox: function (idx, acid, nodirtymark, preset) {
            // Check if the same acid was already in the list... hence specify the idx accodingly, with some testing logic...
            var that = this;

            // Prepare the HTML of the new item box accordingly
            var html = this._prepareAdvancedCriteriaItemBoxHtml(acid, idx);

            // Remove the empty item box at the tail and add the new one
            var robj = this.$advancedselectionBox.find(".advanced" + idx);
            if (robj.length > 0) {
                $(robj).find(":first-child").remove();
                $(robj).append(html);
            }

//        // Adding/removing advanced criteria item should reset the sorting
//        this._currentscreeningcall.sortid = "c";
//        this._currentscreeningcall.issortasc = true;

            //       this.currentPage=1;
//        this.currentSort="ticker";
//        this.currentOrder="desc";

            // Bind the slider control and the value display/input boxes and the histogram image
            this._bindAdvancedCriteriaItemBoxObject(acid, idx, false, preset);
        },
        // Prepare the HTML of the new item box accordingly
        _prepareAdvancedCriteriaItemBoxHtml: function (acid, idx) {
            var that = this;
            var ac = ADVANCED_CRITERIA_ITEMS[acid];

            // The leading part
            var html = "<div class=\"advancedcriteriaitembox ca" + acid + "\" idx=\"" + idx + "\" id=\"ca" + acid + "\">" +
                    "<div class='row criterianamerow p-0 m-0'>" +
                    "<div class=\"col-11 p-0 m-0 name hyperlink\" data-toggle='modal' data-target='#advancedModel' data-advanced='" + idx + "'>" +
                    this.pageobj_rb.lbl["criteria_" + acid] +
                    "</div><div class=\"col-1 p-0 m-0 delbutton\" onclick=\"window['lsinopac_screener']._removeAdvancedCriteria(" + idx + ", true)\"></div></div>";

            // Need to provide period type options?
            if (ac.type) {
                html += "<div class=\"typerow\"><select class=\"ca" + acid + "_type\" style='margin-top:10px'>";
                $.each(ac.type, function (index, value) {
                    html += "<option value='" + value.id + "' id=\"" + value.id + "\"" + ((value.isdef == true) ? " selected" : "") + ">" + that.pageobj_rb.lbl[value.name] + "</option>";
                });

                // Even has 2nd level options?
                if (ac.type2) {
                    html += "</select> <select class=\"ca" + acid + "_type2\" style='margin-top:10px'>";
                    $.each(ac.type2, function (index, value) {
                        html += "<option value='" + value.id + "' id=\"" + value.id + "\"" + ((value.isdef == true) ? " selected" : "") + ">" + that.pageobj_rb.lbl[value.name] + "</option>";
                    });
                }

                html += "</select></div>";
            }

            // Show fixed range selectors?
            if (ac.isfixedrange) {
                html += "<div class=\"typerow\"><select class=\"ca" + acid + "_range_from\">";
                $.each(ac.fixedrange.from, function (index, value) {
                    html += "<option value='" + value.id + "' id=\"" + value.id + "\"" + ((value.isdef == true) ? " selected" : "") + ">" + that.pageobj_rb.lbl[value.name] + "</option>";
                });

                html += "</select> 〜 <select class=\"ca" + acid + "_range_to\">";
                $.each(ac.fixedrange.to, function (index, value) {
                    html += "<option value='" + value.id + "' id=\"" + value.id + "\"" + ((value.isdef == true) ? " selected" : "") + ">" + that.pageobj_rb.lbl[value.name] + "</option>";
                });

                html += "</select></div>";
            }
            // If not, then, show the histogram slider, if this is no a boolean criteria?
            else if (!ac.isbool) {
                var rb = this.pageobj_rb["histogramslider"];
                html += "<div class=\"sliderrow\" style='padding-top:10px'><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style='width: 100%'><tr class=\"inputrow\"><td style=\"text-align:left !important;padding-left:10px;width:45%\"><input type=\"text\" maxlength=\"16\" value=\"\" class=\"ca" + acid + "_from\" style='width: 100%;'></td><td style=\"width:10%;\">〜</td><td style=\"text-align:right !important;padding-right:10px;width:45%\"><input type=\"text\" maxlength=\"16\" value=\"\" class=\"ca" + acid + "_to\" style='width: 100%;'></td></tr><tr class=\"labelrow\"><td class='label' style=\"text-align:left !important;padding-top:5px;padding-left:10px\">" + this.pageobj_rb.lbl["min"] + "</td><td></td><td class='label' style=\"text-align:right !important;padding-top:5px;padding-right:10px\">" + this.pageobj_rb.lbl["max"] + "</td></tr></table></div><div class=\"histogramslider\"><div id=\"ca" + acid + "-" + idx + "\" class=\"imagepane\"></div><div class=\"slidercontrol\"></div></div>";
            }

            html += "</div>";

            // Done~~
            return html;
        },
        // Bind the slider control and the value display/input boxes and the histogram image
        _bindAdvancedCriteriaItemBoxObject: function (acid, idx, loadResult, preset) {
            var that = this;
            var itemboxobj = this.$pageobj.find(".ca" + acid + "[idx=\"" + idx + "\"]");
            //var ac = eval("ADVANCED_CRITERIA_ITEMS."+acid);
            var ac = ADVANCED_CRITERIA_ITEMS[acid];

            // Setup tooltip now using jQuery plugin Tooltip
            //    itemboxobj.find("a").bindcustomtooltip();
            if (itemboxobj.length > 0) {
                // If need to preset, set the type(s) and/or the fixed range dropdown select boxes now...
                if (preset) {
                    // Use type(s)?
                    if (ac.type) {
                        var typeid = "";
                        if (preset.type) {
                            typeid = "#" + preset.type;
                        } else {
                            typeid = "option:first"
                        }
                        var _typeobj = itemboxobj.find(".ca" + acid + "_type " + typeid);
                        if (_typeobj.length > 0)
                            _typeobj[0].selected = true;

                        // ... also the 2nd level type, if any
                        if (ac.type2) {
                            typeid = "";
                            if (preset.type2) {
                                typeid = "#" + preset.type2;
                            } else {
                                typeid = "option:first"
                            }
                            _typeobj = itemboxobj.find(".ca" + acid + "_type2 " + typeid);
                            if (_typeobj.length > 0)
                                _typeobj[0].selected = true;
                        }
                    }

                    // Use fixed range?
                    if (ac.isfixedrange) {
                        // For fixed range, use the from/to values for setting the default selected option in those dropdown select boxes
                        var _fixedrangefromobj = itemboxobj.find(".ca" + acid + "_range_from #" + preset.from);
                        if (_fixedrangefromobj.length > 0)
                            _fixedrangefromobj[0].selected = true;

                        var _fixedrangetoobj = itemboxobj.find(".ca" + acid + "_range_to #" + preset.to);
                        if (_fixedrangetoobj.length > 0)
                            _fixedrangetoobj[0].selected = true;
                    }
                }

                // Bind the type select drop down...
                itemboxobj.find("select").change(function () {
                    that.currentPage = 1;
//                that.currentSort="ticker";
//                that.currentOrder="desc";
                    // For boolean criteria, or with fixed range selection, just make "dirty" will do...
                    if (ac.isfixedrange || ac.isbool) {
                        // Time to mark "dirty"
                        // ... just do it directly, since no chart to wait
                        //  that._markCriteriaSetDirty();
                        that._criteriaChange(false);
                    }
                    // With criteria histogram, firstly, refresh the chart when any type change event
                    else {
                        // Refresh the chart
                        that._loadCriteriaHistogramChart(acid, idx, loadResult);
                    }
                });

                // Bind the slider control and the value display/input boxes and the histogram image, if this is not a boolean criteria
                // For boolean criteria, or with fixed range selection, just make "dirty" will do...

                if (ac.isfixedrange || ac.isbool) {
                    // Time to mark "dirty"
                    // ... just do it directly, since no chart to wait
                    that.currentPage = 1;
//                that.currentSort="ticker";
//                that.currentOrder="desc";
                    // TODO... sinopac... if (!nodirtymark)
                    //      this._markCriteriaSetDirty();
                    that._criteriaChange(false);
                }
                // With criteria histogram, firstly, refresh the chart when any type change event
                else {
                    // Generate the slider control
                    var _scobj = this._generateAdvancedCriteriaSliderControl(itemboxobj, acid);

                    // Set the state of this histogram slider control to "preparing"
                    $.data(_scobj[0], "ready", false);
                    if (preset) {
                        $.data(_scobj[0], "preset.from", preset.from);
                        $.data(_scobj[0], "preset.to", preset.to);
                    }

                    // Finally, fetch the data for plotting the chart and setting the data range
                    this._loadCriteriaHistogramChart(acid, idx, loadResult);
                }
            }
        },
        _generateAdvancedCriteriaSliderControl: function (itemboxobj, acid) {
            var that = this;
            var _scobj = itemboxobj.find(".histogramslider .slidercontrol");
            var _fromvalobj = itemboxobj.find(".ca" + acid + "_from");
            var _tovalobj = itemboxobj.find(".ca" + acid + "_to");

            _scobj.slider({
                range: true,
                min: 0,
                max: 0,
                values: [0, 0],
                slide: function (event, ui) {

                    clearTimeout(that.$slidertimeout);
                    that.$slidertimeout = setTimeout(function () {

                        var result = $.data(_scobj[0], "result");
                        if (result) {
                            // Determine which was slided...
                            var isfromslided;
                            if (ui.value == ui.values[0])
                                isfromslided = true;
                            else
                                isfromslided = false;

                            // Set the display/input of the range values
                            var curmin;
                            var curmax;
                            if (isfromslided) {
                                // from value was slided...
                                curmin = ui.values[0];
                                curmax = _tovalobj.val(); // keep the other one with original value as set in the input box
                            } else {
                                // from value was slided...
                                curmin = _fromvalobj.val(); // keep the other one with the original value as set in the input box
                                curmax = ui.values[1];
                            }

                            if (!result.scale == 0) {
                                // For all LOG scales
                                // ... we need to specifically transform the log values back to true values, as the slider works with scale values only
                                // ... no need to do anything for LINEAR scale, since the scale values are also the true values
                                if (curmin == result.scalemin) {
                                    curmin = result.truemin; // at the extreme, use the provided true value directly
                                } else {
                                    curmin = that._logvalue2truevalue(curmin, result.truemid, result.scalestep); // otherwise, calculate the true value from the log value
                                }
                                if (curmax == result.scalemax) {
                                    curmax = result.truemax; // at the extreme, use the provided true value directly
                                } else {
                                    curmax = that._logvalue2truevalue(curmax, result.truemid, result.scalestep); // otherwise, calculate the true value from the log value
                                }
                            }

                            var dp = ADVANCED_CRITERIA_ITEMS[acid].dp;
                            if (isfromslided)
                                _fromvalobj.val(curmin.toFixed(dp));
                            else
                                _tovalobj.val(curmax.toFixed(dp));

                            that.currentPage = 1;

                            that._criteriaChange(false);
//                    that.currentSort="ticker";
//                    that.currentOrder="desc";

                            // Time to mark "dirty"
                            //TODO sinopac        that._markCriteriaSetDirty();
                        }



                    }, 500);



                }
            });

            _fromvalobj.val(_scobj.slider("values", 0));
            _tovalobj.val(_scobj.slider("values", 1));

            // Events upon the "from" input
            _fromvalobj.keypress(function (event) {
                that._validateGlobalDeciamlInput(event, $(this));
            });
            _fromvalobj.change(function () {
                var result = $.data(_scobj[0], "result");
                if (result) {
                    //Empty Input
                    if ($(this).val().length <= 0) {
                        $(this).val(result.truemin);
                    } else {
                        var fromval = Number($(this).val());
                        //var min = _scobj.slider("option", "min");

                        if (isNaN(fromval)) {
                            // Since the new "from" input is not valid, reset it to min
                            $(this).val(result.truemin);
                        }
                        /*
                         else if (fromval < result.truemin) {
                         // The "from" value smaller than the mim, reset it to min
                         $(this).val(result.truemin);
                         }
                         */
                        else if (fromval == -99999999) {
                            $(this).val(result.truemin); // for the secret contract, such means truemin~~
                        } else {
                            // Bigger than the "to" value?! ... reset it to the same as the "to" value
                            var toval = Number(_tovalobj.val());
                            if (fromval > toval) {
                                $(this).val(toval);
                            }
                        }
                    }
                    // Update the slider accordingly
                    var sv = $(this).val();
                    // ... when in LOG scale
                    if (result.scale != 0) {
                        if (sv == result.truemin) {
                            sv = result.scalemin;
                        } else {
                            sv = that._truevalue2logvalue(sv, result.truemid, result.scalestep);
                        }
                    }
                    _scobj.slider("values", 0, sv);
                }

                that.currentPage = 1;
//            that.currentSort="ticker";
//            that.currentOrder="desc";

                // Time to mark "dirty"
                // that._markCriteriaSetDirty();
                that._criteriaChange(false);
            });

            // Events upon the "to" input
            _tovalobj.keypress(function (event) {
                that._validateGlobalDeciamlInput(event, $(this));
            });

            _tovalobj.change(function () {
                var result = $.data(_scobj[0], "result");
                if (result) {
                    //Empty Input
                    if ($(this).val().length <= 0) {
                        $(this).val(result.truemax);
                    } else {
                        var toval = Number($(this).val());
                        //var max = _scobj.slider("option", "max");

                        if (isNaN(toval)) {
                            // Since the new "to" input is not valid, reset it to max
                            $(this).val(result.truemax);
                        }
                        /*
                         else if (toval > result.truemax) {
                         // The "to" value bigger than the max, reset it to max
                         $(this).val(result.truemax);
                         }
                         */
                        else if (toval == 99999999) {
                            $(this).val(result.truemax); // for the secret contract, such means truemax~~
                        } else {
                            // Smaller than the "from" value?! ... reset it to the same as the "from" value
                            var fromval = Number(_fromvalobj.val());
                            if (toval < fromval) {
                                $(this).val(fromval);
                            }
                        }
                    }
                    // Update the slider accordingly
                    var sv = $(this).val();
                    // ... when in LOG scale
                    if (result.scale != 0) {
                        if (sv == result.truemax) {
                            sv = result.scalemax;
                        } else {
                            sv = that._truevalue2logvalue(sv, result.truemid, result.scalestep);
                        }
                    }
                    _scobj.slider("values", 1, sv);
                }

                that.currentPage = 1;
//            that.currentSort="ticker";
//            that.currentOrder="desc";

                // Time to mark "dirty"
                //  that._markCriteriaSetDirty();
                that._criteriaChange(false);
            });

            // Done
            return _scobj;
        },
        _validateGlobalDeciamlInput: function (event, inputobj) {
            var ch = event.which;
            if ((ch >= 48) && (ch <= 57)) {
                // 0~9
                // ... ok, just accept
            } else if ((ch == 45) || (ch == 46)) {
                // "-" and "." ... check if the number is in a valid format
                // ... although may still be an invalid input, but let's just accept it for now
            } else if (ch == 13) {
                // Enter key, set change now
                inputobj.change();
            } else if ((ch == 0) || (ch == 8)) {
                // Various control keys? Just take them...
            } else {
                // Don't want non-number input
                //alert(ch);
                event.preventDefault();
            }
        },
        _loadCriteriaHistogramChart: function (acid, idx, loadResult) {
            var that = this;
            var itemboxobj = this.$pageobj.find(".ca" + acid + "[idx=\"" + idx + "\"]");
            var _scobj = itemboxobj.find(".histogramslider .slidercontrol");

            var typeid;
            var _selectobj = itemboxobj.find("select");
            if (_selectobj.length > 0)
                typeid = _selectobj[0][_selectobj[0].selectedIndex].id;

            // We don't know the true range yet, but since we have preset request, just set them first...
            var presetfrom = $.data(_scobj[0], "preset.from");
            var presetto = $.data(_scobj[0], "preset.to");
            if (presetfrom != null)
                itemboxobj.find(".ca" + acid + "_from").val(presetfrom);
            if (presetto != null)
                itemboxobj.find(".ca" + acid + "_to").val(presetto);

            // Fetch the data for plotting the chart and setting the data range
            //$.getJSON(this.DATA_PATH+"globalstockscreenercriteriaadvanced?id="+acid+"&type="+typeid, function(result) {
            this.$pageobj.loaddata("screener_advanced_criteria_" + acid, "/data/widget_screener_criteria_advanced",
                    {
                        id: acid,
                        type: typeid,
                        token: encodeURIComponent(LabCI.getToken())
                    },
                    function (data) {
                        //$.getJSON(DATA_PATH+"stockscreenercriteriaadvanced?id="+acid+"&type="+typeid, function(result) {
                        // Generate the histogram chart with the received data, pass if any existing chart object for the logic

                        var result = data.data.datalist[acid];
                        if (typeid) {
                            result = data.data.datalist[acid + "_" + typeid];
                        }
                        if (data.data.datalist && data) {
                            var _chartobj = that._generateAdvancedCriteriaHistorgramChart(itemboxobj, result.datalist, $.data(_scobj[0], "chartobj"), acid, typeid);
                            $.data(_scobj[0], "chartobj", _chartobj); // save it for future reference

                            // Save the result, which also contains the scaling details, into this slider object
                            //result.scalemin = Math.round(result.scalemin.toFixed(5) * 10000) / 10000; // ... calibrate to 5dp

                            result.scalemin = Math.round(result.scalemin * 10000) / 10000; // ... calibrate to 5dp

                            //result.scalemax = Math.round(result.scalemax.toFixed(5) * 10000) / 10000; // ... calibrate to 5dp
                            result.scalemax = Math.round(result.scalemax * 10000) / 10000; // ... calibrate to 5dp
                            $.data(_scobj[0], "result", result);

                            // Set the slider accordingly with the retrieved data
                            _scobj.slider("option", "min", result.scalemin);
                            _scobj.slider("option", "max", result.scalemax);
                            _scobj.slider("option", "step", result.scalestep);

                            // Check if any pending preset handle positions, then set the handles and the corresponding display/input values accordingly...
                            // ... assuming the boundaries first
                            var curmin = result.truemin;
                            var curmax = result.truemax;
                            // ... check if we have preset requested
                            var presetfrom = $.data(_scobj[0], "preset.from");
                            var presetto = $.data(_scobj[0], "preset.to");
                            // ... assign accordingly, if so
                            // ... unless from -9999999 and to 9999999, which are the secret contracts, meaning at boundary, i.e. simply use truemin or truemax
                            //if ((presetfrom != null) && (presetfrom != -9999999) && (presetfrom > curmin)) curmin = presetfrom;
                            if ((presetfrom != null) && (presetfrom != -99999999))
                                curmin = presetfrom; // just set, ignoring the boundary
                            //if ((presetto != null) && (presetto != 9999999) && (presetto < curmax)) curmax = presetto;
                            if ((presetto != null) && (presetto != 99999999))
                                curmax = presetto; // just set, ignoring the boundary

                            // Set the min/max to the input box first, with the true values...

                            //var dp = ADVANCED_CRITERIA_ITEMS[acid].dp;
                            itemboxobj.find(".ca" + acid + "_from").val(curmin);
                            itemboxobj.find(".ca" + acid + "_to").val(curmax);

                            // Assign the min/max to the slider accordingly...
                            if (presetfrom != null) {
                                // We have preset values...
                                if (result.scale != 0) {
                                    // For all LOG scales
                                    // ... we need to specifically transform the true values into log values, as the slider works with scale values only
                                    // ... no need to do anything for LINEAR scale, since the scale values are also the true values
                                    curmin = that._truevalue2logvalue(presetfrom, result.truemid, result.scalestep);
                                } else {
                                    curmin = presetfrom;
                                }
                            } else {
                                // Just take the boundaries
                                curmin = result.scalemin;
                            }
                            if (presetto != null) {
                                // We have preset values...
                                if (result.scale != 0) {
                                    // For all LOG scales
                                    // ... we need to specifically transform the true values into log values, as the slider works with scale values only
                                    // ... no need to do anything for LINEAR scale, since the scale values are also the true values
                                    curmax = that._truevalue2logvalue(presetto, result.truemid, result.scalestep);
                                } else {
                                    curmax = presetto;
                                }
                            } else {
                                // Just take the boundaries
                                curmax = result.scalemax;
                            }
                            // ... set into the slider now
                            _scobj.slider("values", 0, curmin);
                            _scobj.slider("values", 1, curmax);

                            if (loadResult) {
                                that._criteriaChange(false);
                            }


                        }
                        // Now ready for action :)
                        $.data(_scobj[0], "ready", true);

                        that.currentPage = 1;
//            that.currentSort="ticker";
//            that.currentOrder="desc";


                        // Only now to call, since we need to wait for the histogram chart data first
                        // Time to mark "dirty"
                        //if (!nodirtymark)
                        //TODO...sinopac    that._markCriteriaSetDirty();
                    },
                    0,
                    {
                        datatype: "jsonp"
                    }
            );
        },
        _generateAdvancedCriteriaHistorgramChart: function (itemboxobj, datalist, chartobj, acid, typeid) {
            // Call the helper in criteriapanel.jspf to generate the chart accordingly
            var imagepaneobj = itemboxobj.find(".histogramslider .imagepane");
//        // @TODO Pretty much ignoring the input chartobj, which is a workaround for FF somehow, since FF cannot get the flash object immediately after it is created (as the flash object may not yet be ready in the DOM structure :(
//        var chartobj = itemboxobj.find(".histogramslider object"); if (chartobj.length > 0) { chartobj = chartobj[0]; } else { chartobj = null; }

            // Create the better looking chart now~~
            var _chartobj = null;

            // If can't use the better looking chart, use the image version... :(
            if (!_chartobj) {

                imagepaneobj.html("<img class='histogramchartimg' style='width:100%' src='" + APP_CONFIG.DataAPIPath + "/data/widget_screener_criteria_advanced_chart?id=" + acid + "&type=" + typeid + "&token=" + encodeURIComponent(LabCI.getToken()) + "'>");
            }

            // Done
            return _chartobj;
        },
        _truevalue2logvalue: function (trueval, truemid, scalestep) {
            return (((trueval - truemid) > 0) ? 1 : -1) * Math.log(Math.abs(trueval - truemid) + 1);
        },
        _logvalue2truevalue: function (logval, truemid, scalestep) {
            return ((logval > 0) ? 1 : -1) * (Math.exp(Math.abs(logval)) - 1) + truemid;
        },
        _criteriaChange: function (firstTime) {
            //reset

            this.pageno = 1;
            //market...
            var subcat1 = "m:";
            var marketObj = this.$pageobj.find(".marketbox");
            $.each(marketObj, function (index, data) {
                if ($(this).hasClass("selected")) {
                    subcat1 += $(this).attr("c");
                }
            });

            subcat1 += ",a:1|0|0,s:";

            //sector...

            //    if (firstTime) {
            //        subcat1 += "5130531055105110532053305620501054105550561055605230521052205530512054205540502053405430572057105810524050305910";
            //    } else {
            $.each(this.$sectorselection.find(".sectorbox.selected"), function (index, data) {
                subcat1 += $(this).attr("sector");

            });
            //    }


            //advanced filter...
            var boxArray = this.$advancedselectionBox.find(".advancedcriteriaitembox");
            $.each(boxArray, function (index, data) {
                var id = $(this).attr("id").replace("ca", "");
                var idx = $(this).attr("idx");
                var from = $(this).find(".ca" + id + "_from").val();
                var to = $(this).find(".ca" + id + "_to").val();
                var type = $(this).find(".ca" + id + "_type").val();

                subcat1 += ",v" + idx + ":" + id + "|";
                if (type) {
                    subcat1 += type + "|";
                } else {
                    subcat1 += "0|";
                }

                if (from) {
                    subcat1 += from + "|";
                } else {
                    subcat1 += "undefined|"
                }
                if (to) {
                    subcat1 += to;
                } else {
                    subcat1 += "undefined"
                }

            });

            this.statevalue.subcat1 = subcat1;

            this.statevalue.subcat2 = this.subcat2;
            this.statevalue.subcat3 = this.subcat3;

            this._loadscreenerresult();
        },
        _removeAdvancedCriteria: function (idx, loadResult) {

            this.$advancedselectionBox.find(".advancedbox.advanced" + idx).html("<div class='no_criteria' data-toggle='modal' data-target='#advancedModel' data-advanced='" + idx + "'>+ Criteria</div>");
            if (loadResult) {
                this._criteriaChange(false);
            }

        },
        _loadPage: function (obj) {
            this.pageno = $(obj).attr("pn");
            this._loadscreenerresult();
        },
        _loadPageFromSelect: function (obj) {
            this.pageno = $(obj).val();
            this._loadscreenerresult();
        },        
        _sortResult: function (obj) {
            var sortItem = $(obj).attr("item");
            if (sortItem == this.subcat2) {
                //same criteria...just change order
                if (this.subcat3 == "asc") {
                    this.subcat3 = "desc";
                } else {
                    this.subcat3 = "asc";
                }
            } else {
                this.subcat2 = sortItem;
                this.subcat3 = "asc";
            }

            this.statevalue.subcat2 = this.subcat2;
            this.statevalue.subcat3 = this.subcat3;
            this._loadscreenerresult();
        },
        _loadscreenerresult: function () {
            // Get ready
            var that = this;
            var ric = that.currentquoteric;
            var statedata = this.getStateData();

            //desktop list
            this.$screenerlist.find(".sinopactable").addClass("loading-mask");

            //mobile
            this.$mobileresultlist.addClass("loading-mask");

            this.$pageobj.loaddata("screener_result", "/data/widget_screener_result",
                    {
                        subcat1: statedata.subcat1,
                        subcat2: statedata.subcat2,
                        subcat3: statedata.subcat3,
                        pn: this.pageno,
                        recperpage: this.recperpage,
                        lang: this.lang,
                        token: encodeURIComponent(LabCI.getToken())
                    },
                    function (result) {
                        if (result && result.data && result.data.responseCode !== "F") {
                            that.$pageobj.find(".hkcount").setValue(addCommaSeparators(result.data.datalist.HKG));
                            that.$pageobj.find(".uscount").setValue(addCommaSeparators(result.data.datalist.USA));
                            that.$pageobj.find(".twcount").setValue(addCommaSeparators(result.data.datalist.TAI));
                            var cncount = (result.data.datalist.SHH * 1.0) + (result.data.datalist.SHZ * 1.0);
                            that.$pageobj.find(".cncount").setValue(addCommaSeparators(cncount));

                            $.each(that.$sectorselection.find(".sectorbox"), function (index, data) {
                                var sectorCode = $(this).attr("sector");
                                $(this).find(".count" + sectorCode).setValue(addCommaSeparators(result.data.datalist["a" + sectorCode]));
                            });

                            if (that.$screenerlist.is(":visible")) {
                                //desktop (large screen)
                                that.$screenerlist.find(".datalist").remove();
                                that.$screenerlist.find("thead td.adv").remove();
                                that.$screenerlist.removeClass("changed");
                                that.$pageobj.find(".desktop-result-count").show();
                                that.$pageobj.find(".desktop-result-no-count").hide();
                                that.$pageobj.find(".desktop-pagination").show();
                                that.$pageobj.find(".stockfrom").html("-");
                                that.$pageobj.find(".stockto").html("-");
                                that.$pageobj.find(".stocktotal").html("-");

                                if (result.data.datalist.datalist && result.data.datalist.datalist.length > 0) {
                                    //format thead
                                    if (result.data.datalist.adv_nm) {
                                        for (var i in result.data.datalist.adv_nm) {
                                            var adv = result.data.datalist.adv_nm[i];
                                            that.$screenerlist.find("thead tr").append("<td class='adv text-right' style='cursor: pointer' item='adv" + i + "' onclick=\"window['lsinopac_screener']._sortResult(this)\"><span class='lbl" + adv + "'>" + that.pageobj_rb.lbl["criteria_" + adv] + "</span></td>");
                                        }
                                    }

                                    //format sorting UI...
                                    that.$screenerlist.find("arrow-placeholder").remove();
                                    var sort = result.data.datalist.sort;
                                    var order = result.data.datalist.order;
                                    if (order == "asc") {
                                        that.$screenerlist.find("td[item='" + sort + "']").append('<arrow-placeholder class="arrow-up"></arrow-placeholder>');
                                    } else {
                                        that.$screenerlist.find("td[item='" + sort + "']").append('<arrow-placeholder class="arrow-down"></arrow-placeholder>');
                                    }

                                    that.$pageobj.find(".stockfrom").html(result.data.datalist.from);
                                    that.$pageobj.find(".stockto").html(result.data.datalist.to);
                                    that.$pageobj.find(".stocktotal").html(result.data.datalist.totalrec);

                                    for (var key in result.data.datalist.datalist) {
                                        var updownclass = getUpDownClass(result.data.datalist.datalist[key].nc);



                                        var addedRow = "<tr class='datalist' style='cursor:pointer' ric='" + result.data.datalist.datalist[key].info.ric + "' symbol='"+result.data.datalist.datalist[key].info.symbol+"' exchange='"+LabCI.WP.AppUtils.INTEGRATION_EXCHANGE_MAPPING[result.data.datalist.datalist[key].info.exchsect]+"'><td>" + result.data.datalist.datalist[key].info.symbol + "</td>" +
                                                "<td>" + result.data.datalist.datalist[key].info.nm + "</td>" +
                                                "<td>" + that.pageobj_rb.lbl[result.data.datalist.datalist[key].info.exchsect] + "</td>" +
                                                "<td class='text-right'>" + result.data.datalist.datalist[key].ls + "</td>" +
                                                "<td class='" + updownclass + " text-right'>" + setValue(result.data.datalist.datalist[key].nc, null, false, result.data.datalist.datalist[key].ls) + "</td>" +
                                                "<td class='" + updownclass + " text-right'>" + setValue(result.data.datalist.datalist[key].pc, "%", false, result.data.datalist.datalist[key].ls) + "</td>";

                                        if (result.data.datalist.adv_nm) {
                                            for (var i in result.data.datalist.adv_nm) {
                                                var val = result.data.datalist.datalist[key]['adv' + i];
                                                var textStyle = "text-right";
                                                if (val == "true") {
                                                    val = "◯";
                                                    textStyle = "text-right";
                                                } else if (val == "false") {
                                                    val = "☓";
                                                    textStyle = "text-right";
                                                }
                                                addedRow += '<td class="' + textStyle + '">' + val + '</td>';
                                            }
                                        }

                                        addedRow += "</tr>";
                                        
                                        var addedRowObj = $(addedRow);
                                        
                                        that.$screenerlist.find("table").append(addedRowObj);

                                        $(addedRowObj).on(_CLICK_EVENT, function () {
                                                var that2 = this;
                                            //    $("html, body").animate({scrollTop: 0}, 400, function () {
                                            //        window["lsinopac_quote"].changeRic($(that2).attr('ric'));
                                            //    });
                                                LabCI.WP.AppUtils.openQuotePage($(that2).attr('symbol'), $(that2).attr('exchange'));
                                        });
                                    }


                                    //for pagination...
                                    var pagination = that.$pageobj.find(".desktop-pagination");
                                    var pageno = result.data.datalist.pageno * 1; //cast to int...
                                    var maxPage = Math.ceil(result.data.datalist.totalrec / that.recperpage);
                                    var paginationFrom = pageno - 3;
                                    var paginationTo = pageno + 2;

                                    if (paginationFrom <= 0) {
                                        paginationTo = Math.abs(paginationFrom) + paginationTo;
                                        paginationFrom = 1;
                                    } else {
                                        paginationFrom += 1;
                                    }

                                    if (paginationTo > maxPage) {
                                        var diff = paginationTo - maxPage;
                                        paginationFrom -= diff;
                                        paginationTo -= diff;
                                    }
                                    if (paginationFrom < 1) {
                                        paginationFrom = 1;
                                    }

                                    pagination.find(".page-no").remove();
                                    pagination.find("li").removeClass("disabled").removeClass("active");

                                    pagination.find(".page-dropdown > option").remove();

                                    if (pageno == 1) {
                                        pagination.find("li[item='prev']").addClass("disabled");
                                    } else {
                                        pagination.find("li[item='prev'] span").attr("pn", pageno - 1);
                                    }

                                    for (var i = paginationFrom; i <= paginationTo; ++i) {
                                        if (i == pageno) {
                                            pagination.find("li[item='next']").before('<li class="page-item page-no active" item="' + pageno + '"><span class="page-link">' + pageno + '</span></li>');
                                        } else {
                                            pagination.find("li[item='next']").before('<li class="page-item page-no" item="' + i + '"><span class="page-link" pn="' + i + '" onclick="window[\'lsinopac_screener\']._loadPage(this)">' + i + '</span></li>');
                                        }
                                    }

                                    if (pageno + 1 > maxPage) {
                                        pagination.find("li[item='next']").addClass("disabled");
                                    } else {
                                        pagination.find("li[item='next'] span").attr("pn", pageno + 1);
                                    }

                                    for(var i = 0 ; i < maxPage; ++i){
                                        //drop down...
                                        if(pageno == i+1){
                                            pagination.find(".page-dropdown").append('<option selected value="'+(i+1)+'">'+(i+1)+'</option>'); 
                                        }else{
                                            pagination.find(".page-dropdown").append('<option value="'+(i+1)+'">'+(i+1)+'</option>');                                             
                                        }                                       
                                    }

                                } else {
                                    that.$pageobj.find(".desktop-result-count").hide();
                                    that.$pageobj.find(".desktop-result-no-count").show();
                                    that.$pageobj.find(".desktop-pagination").hide();
                                }
                            } else {
                                //mobile...
                                that.$mobileresultlist.find("li").remove();

                                that.$pageobj.find(".mobile-result-count").show();
                                that.$pageobj.find(".mobile-result-no-count").hide();
                                that.$pageobj.find(".mobile-pagination").show();
                                that.$pageobj.find(".stockfrom").html("-");
                                that.$pageobj.find(".stockto").html("-");
                                that.$pageobj.find(".stocktotal").html("-");

                                if (result.data.datalist.datalist && result.data.datalist.datalist.length > 0) {
                                    that.$pageobj.find(".stockfrom").html(result.data.datalist.from);
                                    that.$pageobj.find(".stockto").html(result.data.datalist.to);
                                    that.$pageobj.find(".stocktotal").html(result.data.datalist.totalrec);

                                    for (var key in result.data.datalist.datalist) {
                                        var updownclass = getUpDownClass(result.data.datalist.datalist[key].nc);
                                        var additionalClass = "";
                                        if (key == 0) {
                                            additionalClass = "first";
                                        }
                                        if (key == result.data.datalist.datalist.length - 1) {
                                            additionalClass = "last";
                                        }
                                        var addedRow = '<li class="list-group-item p-0 ' + additionalClass + '" style="cursor:pointer" ric="' + result.data.datalist.datalist[key].info.ric  + '" symbol="'+result.data.datalist.datalist[key].info.symbol+'" exchange="'+LabCI.WP.AppUtils.INTEGRATION_EXCHANGE_MAPPING[result.data.datalist.datalist[key].info.exchsect]+'">' +
                                                '<div class="row"><div class="col name">' + result.data.datalist.datalist[key].info.nm + '</div><div class="col text-right code">' + result.data.datalist.datalist[key].info.symbol + '</div></div>' +
                                                '<div class="row"><div class="col lblexchange">' + that.pageobj_rb.lbl["exchange"] + '</div><div class="col text-right exch">' + that.pageobj_rb.lbl[result.data.datalist.datalist[key].info.exchsect] + '</div></div>' +
                                                '<div class="row"><div class="col lbllast">' + that.pageobj_rb.lbl["last"] + '</div><div class="col text-right last">' + result.data.datalist.datalist[key].ls + '</div></div>' +
                                                '<div class="row"><div class="col lblchange">' + that.pageobj_rb.lbl["change"] + '</div><div class="col ' + updownclass + ' text-right change">' + setValue(result.data.datalist.datalist[key].nc, null, true) + ' (' + setValue(result.data.datalist.datalist[key].pc, "%", true) + ')' + '</div></div>';
                                        if (result.data.datalist.adv_nm) {
                                            for (var i in result.data.datalist.adv_nm) {
                                                var adv = result.data.datalist.adv_nm[i];
                                                var val = result.data.datalist.datalist[key]['adv' + i];
                                                if (val == "true") {
                                                    val = "◯";
                                                } else if (val == "false") {
                                                    val = "☓";
                                                }
                                                addedRow += '<div class="row"><div class="col lbl' + adv + '">' + that.pageobj_rb.lbl["criteria_" + adv] + '</div><div class="col text-right adv' + adv + '">' + val + '</div></div>';
                                            }
                                        }

                                        addedRow += '</li>';

                                        var addedRowObj = $(addedRow);
                                        that.$mobileresultlist.append(addedRowObj);

                                        $(addedRowObj).on(_CLICK_EVENT, function () {
                                                var that2 = this;
                                            //    $("html, body").animate({scrollTop: 0}, 400, function () {
                                            //        window["lsinopac_quote"].changeRic($(that2).attr('ric'));
                                            //    });
                                                LabCI.WP.AppUtils.openQuotePage($(that2).attr('symbol'), $(that2).attr('exchange'));
                                        });

                                    }

                                    //for pagination...
                                    var pagination = that.$pageobj.find(".mobile-pagination");
                                    var pageno = result.data.datalist.pageno * 1; //cast to int...
                                    var maxPage = Math.ceil(result.data.datalist.totalrec / that.recperpage);
                                    var paginationFrom = pageno - 3;
                                    var paginationTo = pageno + 2;

                                    if (paginationFrom <= 0) {
                                        paginationTo = Math.abs(paginationFrom) + paginationTo;
                                        paginationFrom = 1;
                                    } else {
                                        paginationFrom += 1;
                                    }

                                    if (paginationTo > maxPage) {
                                        var diff = paginationTo - maxPage;
                                        paginationFrom -= diff;
                                        paginationTo -= diff;
                                    }
                                    if (paginationFrom < 1) {
                                        paginationFrom = 1;
                                    }

                                    pagination.find(".page-no").remove();
                                    pagination.find("li").removeClass("disabled").removeClass("active");
                                    pagination.find(".page-dropdown > option").remove();
                                    
                                    if (pageno == 1) {
                                        pagination.find("li[item='prev']").addClass("disabled");
                                    } else {
                                        pagination.find("li[item='prev'] span").attr("pn", pageno - 1);
                                    }

                                    for (var i = paginationFrom; i <= paginationTo; ++i) {
                                        if (i == pageno) {
                                            pagination.find("li[item='next']").before('<li class="page-item page-no active" item="' + pageno + '"><span class="page-link">' + pageno + '</span></li>');
                                        } else {
                                            pagination.find("li[item='next']").before('<li class="page-item page-no" item="' + i + '"><span class="page-link" pn="' + i + '" onclick="window[\'lsinopac_screener\']._loadPage(this)">' + i + '</span></li>');
                                        }
                                    }

                                    if (pageno + 1 > maxPage) {
                                        pagination.find("li[item='next']").addClass("disabled");
                                    } else {
                                        pagination.find("li[item='next'] span").attr("pn", pageno + 1);
                                    }
                                    for(var i = 0 ; i < maxPage; ++i){
                                        //drop down...
                                        if(pageno == i+1){
                                            pagination.find(".page-dropdown").append('<option selected value="'+(i+1)+'">'+(i+1)+'</option>'); 
                                        }else{
                                            pagination.find(".page-dropdown").append('<option value="'+(i+1)+'">'+(i+1)+'</option>');                                             
                                        }                                       
                                    }                                    
                                    
                                } else {
                                    that.$pageobj.find(".mobile-result-count").hide();
                                    that.$pageobj.find(".mobile-result-no-count").show();
                                    that.$pageobj.find(".mobile-pagination").hide();
                                }
                            }

                            that.$screenerlist.find(".sinopactable").removeClass("loading-mask");
                            that.$mobileresultlist.removeClass("loading-mask");

                        } else {
                            //Error handling...
                        }
                        //    if (result && result.data && result.data.responseCode!=="F") {
                        //        $imgdiv.append($("<img/>").attr("src", "data:image/png;base64," + result.data.compscoreimage));
                        //    }
                        //    else {
                        //        // Error handling...
//
                        //    }
                    },
                    0,
                    {
                        datatype: "jsonp"
                    });

        },

        hideImpl: function () {
            // Chain this...
            return this;
        },
        refreshImpl: function () {
            return this.show();
        },
        resetImpl: function () {
            return this; // chain this
        },
        ////////////////////////////////////////////////////////////////////

        getStateDataImpl: function () {
            var that = this;
            var statedata = {};
            statedata = this.statevalue;
            return statedata;
        },

        ////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////

        // Build up the UI on-the-fly for different languages
        _setUILabels: function () {
            var that = this;
            var rblbl = that.pageobj_rb.lbl;
            $.each(rblbl, function (id, value) {
                that.$pageobj.find(".lbl" + id).html(value);
            });
        },

        // A placeholder for resources, to be defined in separate resource files for specific languages
        PAGEOBJ_RESOURCEBUNDLE: {
            conf: {
            }
        }

    };



})(jQuery);