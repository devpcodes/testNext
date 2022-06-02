import { useCallback, useState, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Modal, Table } from 'antd';
import AccountTable from '../tradingAccount/vipInventory/AccountTable';
import noData from '../../../resources/images/pages/Self_select/img-default.svg';
import AssetDetailModal from './assetDetailModal';
import { formatNum } from '../../../services/formatNum';
const { TabPane } = Tabs;

const AssetDetailTable = memo(({ type, reload }) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const realTimePrtLosSum = useSelector(store => store.asset.realTimePrtLosSum.data);
    const [isAssetDetailModalVisitable, setAssetDetailModalVisitable] = useState(false);
    const closeModal = useCallback(() => {
        setAssetDetailModalVisitable(false);
    }, []);

    const openModal = useCallback(() => {
        setAssetDetailModalVisitable(true);
    }, []);

    const [modalData, setModalData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [columnData, setColumnData] = useState([]);

    const [modalAllData, setModalAllData] = useState([]);
    const [modalTitleData, setModalTitleData] = useState([]);

    useEffect(() => {
        let webTableData = {};
        let tableTitle = {};
        switch (type) {
            case 'S':
                let stockWebTableData = [];
                let unrealTableData = [];
                let creditdnTableData = [];
                let lenddnTableData = [];

                tableTitle = {
                    stock: [
                        { title: '股票代碼', dataIndex: 'stock' },
                        {
                            title: '股票名稱',
                            dataIndex: 'stocknm',
                            sorter: (a, b) => a.stocknm.length - b.stocknm.length,
                        },
                        {
                            title: '類別',
                            dataIndex: 'ttypename',
                            filters: [
                                { text: '現股', value: '現股' },
                                { text: '融資', value: '融資' },
                                { text: '融券', value: '融券' },
                            ],
                            onFilter: (value, record) => record.ttypename.startsWith(value),
                            filterSearch: true,
                        },
                        { title: '即時庫存', dataIndex: 'qty', render: qty => formatNum(qty), align: 'right' },
                        { title: '現價', dataIndex: 'mprice', align: 'right' },
                        {
                            title: '參考市值',
                            dataIndex: 'amt',
                            render: amt => formatNum(amt),
                            sorter: (a, b) => a.amt - b.amt,
                            align: 'right',
                        },
                        {
                            title: '成本均價',
                            dataIndex: 'avgprice',
                            render: avgprice => formatNum(avgprice),
                            align: 'right',
                        },
                        {
                            title: '付出成本',
                            dataIndex: 'cost',
                            render: cost => formatNum(cost),
                            sorter: (a, b) => a.cost - b.cost,
                            align: 'right',
                        },
                        {
                            title: '損益試算',
                            dataIndex: 'unreal',
                            align: 'right',
                            render: unreal => (
                                <div class={unreal > 0 ? 'win' : unreal < 0 ? 'loss' : ''}>{formatNum(unreal)}</div>
                            ),
                            sorter: (a, b) => a.unreal - b.unreal,
                            align: 'right',
                        },
                        {
                            title: '報酬率',
                            dataIndex: 'ur_ratio',
                            align: 'right',
                            render: ur_ratio => (
                                <div
                                    class={
                                        parseFloat(ur_ratio.slice(0, -1)) > 0
                                            ? 'win'
                                            : parseFloat(ur_ratio.slice(0, -1)) < 0
                                            ? 'loss'
                                            : ''
                                    }
                                >
                                    {ur_ratio}
                                </div>
                            ),
                            sorter: (a, b) => parseFloat(a.ur_ratio.slice(0, -1)) - parseFloat(b.ur_ratio.slice(0, -1)),
                        },
                    ],
                    unreal: [
                        { title: '股票代碼', dataIndex: 'stock' },
                        {
                            title: '股票名稱',
                            dataIndex: 'stocknm',
                            sorter: (a, b) => a.stocknm.length - b.stocknm.length,
                        },
                        { title: '出借股數', dataIndex: 'qty', render: qty => formatNum(qty), align: 'right' },
                        { title: '現價', dataIndex: 'lastprice', align: 'right' },
                        {
                            title: '參考市值',
                            dataIndex: 'namt',
                            render: namt => formatNum(namt),
                            sorter: (a, b) => a.namt - b.namt,
                            align: 'right',
                        },
                        {
                            title: '成本均價',
                            dataIndex: 'avgprice',
                            render: avgprice => formatNum(avgprice),
                            align: 'right',
                        },
                        {
                            title: '付出成本',
                            dataIndex: 'cost',
                            render: cost => formatNum(cost),
                            sorter: (a, b) => a.cost - b.cost,
                            align: 'right',
                        },
                        {
                            title: '損益試算',
                            dataIndex: 'unreal',
                            align: 'right',
                            render: unreal => (
                                <div class={unreal > 0 ? 'win' : unreal < 0 ? 'loss' : ''}>{formatNum(unreal)}</div>
                            ),
                            sorter: (a, b) => a.unreal - b.unreal,
                            align: 'right',
                        },
                        {
                            title: '報酬率',
                            dataIndex: 'ur_ratio',
                            align: 'right',
                            render: ur_ratio => (
                                <div
                                    class={
                                        parseFloat(ur_ratio.slice(0, -1)) > 0
                                            ? 'win'
                                            : parseFloat(ur_ratio.slice(0, -1)) < 0
                                            ? 'loss'
                                            : ''
                                    }
                                >
                                    {ur_ratio}
                                </div>
                            ),
                            sorter: (a, b) => parseFloat(a.ur_ratio.slice(0, -1)) - parseFloat(b.ur_ratio.slice(0, -1)),
                        },
                    ],
                    creditdn: [
                        { title: '股票代碼', dataIndex: 'stock' },
                        {
                            title: '股票名稱',
                            dataIndex: 'stocknm',
                            sorter: (a, b) => a.stocknm.length - b.stocknm.length,
                        },
                        { title: '股數', dataIndex: 'qty', render: qty => formatNum(qty), align: 'right' },
                        { title: '現價', dataIndex: 'lastprice', align: 'right' },
                        {
                            title: '市值',
                            dataIndex: 'namt',
                            render: namt => formatNum(namt),
                            sorter: (a, b) => a.namt - b.namt,
                            align: 'right',
                        },
                    ],
                    lenddn: [
                        { title: '股票代碼', dataIndex: 'stock' },
                        {
                            title: '股票名稱',
                            dataIndex: 'stocknm',
                            sorter: (a, b) => a.stocknm.length - b.stocknm.length,
                        },
                        { title: '股數', dataIndex: 'qty', render: qty => formatNum(qty), align: 'right' },
                        { title: '現價', dataIndex: 'lastprice', align: 'right' },
                        {
                            title: '市值',
                            dataIndex: 'namt',
                            render: namt => formatNum(namt),
                            sorter: (a, b) => a.namt - b.namt,
                            align: 'right',
                        },
                    ],
                };

                realTimePrtLosSum?.S.data.map((data, index) => {
                    stockWebTableData.push({
                        stock: data.stock,
                        stocknm: data.stocknm,
                        ttypename: data.ttypename,
                        qty: data.qty,
                        mprice: data.mprice,
                        amt: data.amt,
                        avgprice: parseFloat(data.cost / data.qty).toFixed(2),
                        cost: data.cost,
                        unreal: data.unreal,
                        ur_ratio: data.ur_ratio,
                        modalTitle: data.stocknm,
                    });
                });

                realTimePrtLosSum?.L.unreal_sums.data.map((data, index) => {
                    unrealTableData.push({
                        stock: data.stock,
                        stocknm: data.stocknm,
                        qty: data.qty,
                        lastprice: data.lastprice,
                        namt: data.namt,
                        avgprice: data.avgprice,
                        cost: data.cost,
                        unreal: data.unreal,
                        ur_ratio: data.ur_ratio,
                    });
                });

                realTimePrtLosSum?.L.creditdn_sums.data.map((data, index) => {
                    creditdnTableData.push({
                        stock: data.stock,
                        stocknm: data.stocknm,
                        qty: data.qty,
                        lastprice: data.lastprice,
                        namt: data.namt,
                    });
                });

                realTimePrtLosSum?.L.lenddn_sums.data.map((data, index) => {
                    creditdnTableData.push({
                        stock: data.stock,
                        stocknm: data.stocknm,
                        qty: data.qty,
                        lastprice: data.lastprice,
                        namt: data.namt,
                    });
                });

                webTableData.stock = stockWebTableData;
                webTableData.unreal = unrealTableData;
                webTableData.creditdn = creditdnTableData;
                webTableData.lenddn = lenddnTableData;

                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        stock: [
                            { title: '類別', dataIndex: 'ttypename', align: 'center', width: 100 },
                            { title: '商品/現價', dataIndex: 'stocknm__mprice', align: 'right' },
                            { title: '庫存/市值', dataIndex: 'qty__amt', align: 'right' },
                            { title: '損益/報酬率', dataIndex: 'unreal__ur_ratio', align: 'right' },
                        ],
                        unreal: [
                            // { title : '類別' , dataIndex : 'ttypename'},
                            { title: '商品/現價', dataIndex: 'stocknm__mprice' },
                            { title: '庫存/市值', dataIndex: 'qty__amt' },
                            { title: '損益/報酬率', dataIndex: 'unreal__ur_ratio' },
                        ],
                        creditdn: [
                            { title: '商品/現價', dataIndex: 'stocknm__mprice' },
                            { title: '庫存/市值', dataIndex: 'qty__amt' },
                        ],
                        lenddn: [
                            { title: '商品/現價', dataIndex: 'stocknm__mprice' },
                            { title: '庫存/市值', dataIndex: 'qty__amt' },
                        ],
                    });

                    let mobileTableData = {};
                    let stockMobileTableData = [];
                    let unrealMobileTableData = [];
                    let creditdnMobileTableData = [];
                    let lenddnMobileTableData = [];

                    realTimePrtLosSum?.S.data.map((data, index) => {
                        stockMobileTableData.push({
                            ttypename: data.ttypename,
                            stocknm__mprice: (
                                <div>
                                    {data.stocknm}
                                    <br />
                                    {data.mprice}
                                </div>
                            ),
                            qty__amt: (
                                <div>
                                    {formatNum(data.qty)}
                                    <br />
                                    {formatNum(data.amt)}
                                </div>
                            ),
                            unreal__ur_ratio: (
                                <div class={data.unreal > 0 ? 'win' : data.unreal < 0 ? 'loss' : ''}>
                                    {formatNum(data.unreal)}
                                    <br />
                                    {data.ur_ratio}
                                </div>
                            ),
                        });
                    });

                    realTimePrtLosSum?.L.unreal_sums.data.map((data, index) => {
                        unrealMobileTableData.push({
                            stocknm__mprice: (
                                <div>
                                    {data.stocknm}
                                    <br />
                                    {data.mprice}
                                </div>
                            ),
                            qty__amt: (
                                <div>
                                    {formatNum(data.qty)}
                                    <br />
                                    {formatNum(data.amt)}
                                </div>
                            ),
                            unreal__ur_ratio: (
                                <div class={data.unreal > 0 ? 'win' : data.unreal < 0 ? 'loss' : ''}>
                                    {formatNum(data.unreal)}
                                    <br />
                                    {data.ur_ratio}
                                </div>
                            ),
                        });
                    });

                    realTimePrtLosSum?.L.creditdn_sums.data.map((data, index) => {
                        creditdnMobileTableData.push({
                            stocknm__mprice: (
                                <div>
                                    {data.stocknm}
                                    <br />
                                    {data.mprice}
                                </div>
                            ),
                            qty__amt: (
                                <div>
                                    {formatNum(data.qty)}
                                    <br />
                                    {formatNum(data.amt)}
                                </div>
                            ),
                            unreal__ur_ratio: (
                                <div class={data.unreal > 0 ? 'win' : data.unreal < 0 ? 'loss' : ''}>
                                    {formatNum(data.unreal)}
                                    <br />
                                    {data.ur_ratio}
                                </div>
                            ),
                        });
                    });

                    realTimePrtLosSum?.L.lenddn_sums.data.map((data, index) => {
                        lenddnMobileTableData.push({
                            stocknm__mprice: (
                                <div>
                                    {data.stocknm}
                                    <br />
                                    {data.mprice}
                                </div>
                            ),
                            qty__amt: (
                                <div>
                                    {formatNum(data.qty)}
                                    <br />
                                    {formatNum(data.amt)}
                                </div>
                            ),
                            unreal__ur_ratio: (
                                <div class={data.unreal > 0 ? 'win' : data.unreal < 0 ? 'loss' : ''}>
                                    {formatNum(data.unreal)}
                                    <br />
                                    {data.ur_ratio}
                                </div>
                            ),
                        });
                    });

                    mobileTableData.stock = stockMobileTableData;
                    mobileTableData.unreal = unrealMobileTableData;
                    mobileTableData.creditdn = creditdnMobileTableData;
                    mobileTableData.lenddn = lenddnMobileTableData;

                    setTableData(mobileTableData);
                }
                break;
            case 'F':
                tableTitle = {
                    future: [
                        {
                            title: '商品名稱',
                            dataIndex: 'stockName',
                            sorter: (a, b) => a.stockName.length - b.stockName.length,
                        },
                        {
                            title: '買賣別',
                            dataIndex: 'bs',
                            filters: [
                                { text: '買', value: '買' },
                                { text: '賣', value: '賣' },
                            ],
                            onFilter: (value, record) => record.bs.startsWith(value),
                            filterSearch: true,
                        },
                        {
                            title: '幣別',
                            dataIndex: 'currency',
                            filters: [
                                { text: 'NTD', value: 'NTD' },
                                { text: 'USD', value: 'USD' },
                                { text: 'RMB', value: 'RMB' },
                                { text: 'HKD', value: 'HKD' },
                                { text: 'JPY', value: 'JPY' },
                            ],
                            onFilter: (value, record) => record.currency.startsWith(value),
                            filterSearch: true,
                        },
                        { title: '口數', dataIndex: 'openq', align: 'right' },
                        { title: '現價', dataIndex: 'mprice', align: 'right' },
                        { title: '成交均價', dataIndex: 'tprice', align: 'right' },
                        {
                            title: '未平倉損益',
                            dataIndex: 'futeamt',
                            align: 'right',
                            render: futeamt => (
                                <div class={futeamt > 0 ? 'win' : futeamt < 0 ? 'loss' : ''}>{formatNum(futeamt)}</div>
                            ),
                            sorter: (a, b) => parseFloat(a.futeamt.slice(0, -1)) - parseFloat(b.futeamt.slice(0, -1)),
                        },
                        { title: '原始保證金', dataIndex: 'otamt', align: 'right' },
                        { title: '報酬率', dataIndex: 'roi', align: 'right' },
                    ],
                };
                let futureWebTableData = [];

                realTimePrtLosSum?.F.data.map((data, index) => {
                    futureWebTableData.push({
                        stockName: data.stockName,
                        bs: data.bs === 'B' ? '買' : '賣',
                        currency: data.currency,
                        openq: data.openq,
                        mprice: data.mprice,
                        tprice: data.tprice,
                        futeamt: data.futeamt,
                        otamt: formatNum(data.otamt),
                        roi: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{data.roi}%</div>,
                    });
                });

                webTableData.future = futureWebTableData;

                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        future: [
                            { title: '買賣別/幣別', dataIndex: 'bs__currency' },
                            { title: '商品/現價', dataIndex: 'stockName__mprice' },
                            { title: '口數/成本', dataIndex: 'openq__tprice' },
                            { title: '損益/報酬率', dataIndex: 'futeamt__roi' },
                        ],
                    });

                    let mobileTableData = {};
                    let futureMobileTableData = [];

                    realTimePrtLosSum?.F.data.map((data, index) => {
                        futureMobileTableData.push({
                            bs__currency: (
                                <div>
                                    {data.bs === 'B' ? '買' : '賣'}
                                    <br />
                                    {data.currency}
                                </div>
                            ),
                            stockName__mprice: (
                                <div>
                                    {data.stockName}
                                    <br />
                                    {data.mprice}
                                </div>
                            ),
                            openq__tprice: (
                                <div>
                                    {data.openq}
                                    <br />
                                    {data.tprice}
                                </div>
                            ),
                            futeamt__roi: (
                                <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>
                                    {formatNum(data.futeamt)}
                                    <br />
                                    {data.roi}%
                                </div>
                            ),
                        });
                    });

                    mobileTableData.future = futureMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'FF':
                tableTitle = {
                    foreignFuture: [
                        // { title : '商品名稱', dataIndex: 'stockName'},
                        // { title : '買賣別', dataIndex: 'bs'},
                        {
                            title: '幣別',
                            dataIndex: 'currency',
                            filters: [
                                { text: 'NTD', value: 'NTD' },
                                { text: 'USD', value: 'USD' },
                                { text: 'RMB', value: 'RMB' },
                                { text: 'HKD', value: 'HKD' },
                                { text: 'JPY', value: 'JPY' },
                            ],
                            onFilter: (value, record) => record.currency.startsWith(value),
                            filterSearch: true,
                        },
                        // { title : '口數', dataIndex: 'openq'},
                        // { title : '現價', dataIndex: 'mprice'},
                        // { title : '成交均價', dataIndex: 'tprice'},
                        // { title : '未平倉損益', dataIndex: 'futeamt'},
                        // { title : '原始保證金', dataIndex: 'otamt'},
                        // { title : '報酬率', dataIndex: 'roi'},
                        { title: '前日餘額', dataIndex: 'dbaln' },
                        { title: '參考權益數', dataIndex: 'dlbaln' },
                        { title: '維持保證金', dataIndex: 'dtmmmrg' },
                    ],
                };

                let foreignFutureWebTableData = [];

                realTimePrtLosSum?.FF.data.map((data, index) => {
                    foreignFutureWebTableData.push({
                        currency: data.currency,
                        dbaln: formatNum(data.dbaln),
                        dlbaln: formatNum(data.dlbaln),
                        dtmmmrg: formatNum(data.dtmmmrg),
                    });
                });

                webTableData.foreignFuture = foreignFutureWebTableData;

                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        foreignFuture: [
                            // { title : '商品名稱', dataIndex: 'stockName'},
                            // { title : '買賣別', dataIndex: 'bs'},
                            { title: '幣別', dataIndex: 'currency' },
                            // { title : '口數', dataIndex: 'openq'},
                            // { title : '現價', dataIndex: 'mprice'},
                            // { title : '成交均價', dataIndex: 'tprice'},
                            // { title : '未平倉損益', dataIndex: 'futeamt'},
                            // { title : '原始保證金', dataIndex: 'otamt'},
                            // { title : '報酬率', dataIndex: 'roi'},
                            { title: '前日餘額', dataIndex: 'dbaln' },
                            { title: '參考權益數', dataIndex: 'dlbaln' },
                            { title: '維持保證金', dataIndex: 'dtmmmrg' },
                        ],
                    });

                    let mobileTableData = {};
                    let foreignFutureMobileTableData = [];

                    realTimePrtLosSum?.FF.data.map((data, index) => {
                        foreignFutureMobileTableData.push({
                            currency: data.currency,
                            dbaln: formatNum(data.dbaln),
                            dlbaln: formatNum(data.dlbaln),
                            dtmmmrg: formatNum(data.dtmmmrg),
                        });
                    });

                    mobileTableData.foreignFuture = foreignFutureMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'H':
                tableTitle = {
                    subBrokerage: [
                        { title: '股票名稱', dataIndex: 'name' },
                        { title: '市場', dataIndex: 'market' },
                        { title: '幣別', dataIndex: 'curr' },
                        { title: '庫存', dataIndex: 'last_inv' },
                        { title: '現價', dataIndex: 'ref_price' },
                        { title: '參考市值', dataIndex: 'amount' },
                        { title: '參考台幣市值', dataIndex: 'amount_twd' },
                        { title: '成本均價', dataIndex: 'cost_twd' },
                        { title: '付出成本', dataIndex: 'cost' },
                        { title: '損益試算', dataIndex: 'pl' },
                        { title: '報酬率', dataIndex: 'roi' },
                    ],
                };

                let subBrokerageWebTableData = [];

                realTimePrtLosSum?.H.data.map((data, index) => {
                    subBrokerageWebTableData.push({
                        name: data.name,
                        market: data.market,
                        curr: data.curr,
                        last_inv: formatNum(data.last_inv),
                        ref_price: data.ref_price,
                        amount: formatNum(data.amount),
                        amount_twd: formatNum(data.amount_twd),
                        cost_twd: formatNum(data.cost_twd),
                        cost: formatNum(data.cost),
                        pl: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{formatNum(data.pl)}</div>,
                        roi: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{data.roi}%</div>,
                    });
                });

                webTableData.subBrokerage = subBrokerageWebTableData;

                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        subBrokerage: [
                            { title: '市場/幣別', dataIndex: 'market__curr' },
                            { title: '商品/現價', dataIndex: 'name__ref_price' },
                            { title: '庫存/市值', dataIndex: 'last_inv__amount' },
                            { title: '損益/報酬率', dataIndex: 'pl__roi' },
                        ],
                    });

                    let mobileTableData = {};
                    let subBrokerageMobileTableData = [];

                    realTimePrtLosSum?.H.data.map((data, index) => {
                        subBrokerageMobileTableData.push({
                            market__curr: (
                                <div>
                                    {data.market}
                                    <br />
                                    {data.curr}
                                </div>
                            ),
                            name__ref_price: (
                                <div>
                                    {data.name}
                                    <br />
                                    {data.ref_price}
                                </div>
                            ),
                            last_inv__amount: (
                                <div>
                                    {formatNum(data.last_inv)}
                                    <br />
                                    {formatNum(data.amount)}
                                </div>
                            ),
                            pl__roi: (
                                <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>
                                    {formatNum(data.pl)}
                                    <br />
                                    {data.roi}%
                                </div>
                            ),
                        });
                    });

                    mobileTableData.subBrokerage = subBrokerageMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'FIP':
                tableTitle = {
                    FIP: [
                        { title: '股票代碼', dataIndex: 'symbol' },
                        { title: '股票名稱', dataIndex: 'pro_name' },
                        { title: '幣別', dataIndex: 'curr' },
                        { title: '庫存', dataIndex: 'last_inv' },
                        { title: '現價', dataIndex: 'ave_cost' },
                        { title: '市值', dataIndex: 'amount' },
                        { title: '參考台幣市值', dataIndex: 'amount_twd' },
                        { title: '成本均價', dataIndex: 'cost_twd' },
                        { title: '付出成本', dataIndex: 'cost' },
                        { title: '損益試算', dataIndex: 'pl' },
                        { title: '報酬率', dataIndex: 'roi' },
                    ],
                };

                let FIPWebTableData = [];

                realTimePrtLosSum?.FIP.data.map((data, index) => {
                    FIPWebTableData.push({
                        symbol: data.symbol,
                        pro_name: data.pro_name,
                        curr: data.curr,
                        last_inv: data.last_inv,
                        ave_cost: data.ave_cost,
                        amount: formatNum(data.amount),
                        amount_twd: formatNum(data.amount_twd),
                        cost_twd: data.cost_twd,
                        cost: formatNum(data.cost),
                        pl: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{formatNum(data.pl)}</div>,
                        roi: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{data.roi}%</div>,
                    });
                });

                webTableData.FIP = FIPWebTableData;

                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        FIP: [
                            { title: '市場/幣別', dataIndex: 'market__curr' },
                            { title: '商品/現價', dataIndex: 'name__ref_price' },
                            { title: '庫存/市值', dataIndex: 'last_inv__amount' },
                            { title: '損益/報酬率', dataIndex: 'pl__roi' },
                        ],
                    });

                    let mobileTableData = {};
                    let FIPMobileTableData = [];

                    realTimePrtLosSum?.FIP.data.map((data, index) => {
                        FIPMobileTableData.push({
                            market__curr: (
                                <div>
                                    {data.market}
                                    <br />
                                    {data.curr}
                                </div>
                            ),
                            name__ref_price: (
                                <div>
                                    {data.name}
                                    <br />
                                    {data.ref_price}
                                </div>
                            ),
                            last_inv__amount: (
                                <div>
                                    {formatNum(data.last_inv)}
                                    <br />
                                    {formatNum(data.amount)}
                                </div>
                            ),
                            pl__roi: (
                                <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>
                                    {formatNum(data.pl)}
                                    <br />
                                    {data.roi}%
                                </div>
                            ),
                        });
                    });

                    mobileTableData.FIP = FIPMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'MIP':
                tableTitle = {
                    MIP: [
                        { title: '股票代碼', dataIndex: 'symbol' },
                        { title: '股票名稱', dataIndex: 'pro_name' },
                        { title: '幣別', dataIndex: 'curr' },
                        { title: '庫存', dataIndex: 'last_inv' },
                        { title: '現價', dataIndex: 'ave_cost' },
                        { title: '市值', dataIndex: 'amount' },
                        { title: '參考台幣市值', dataIndex: 'amount_twd' },
                        { title: '成本均價', dataIndex: 'cost_twd' },
                        { title: '付出成本', dataIndex: 'cost' },
                        { title: '損益試算', dataIndex: 'pl' },
                        { title: '報酬率', dataIndex: 'roi' },
                    ],
                };

                let MIPWebTableData = [];

                realTimePrtLosSum?.MIP.data.map((data, index) => {
                    MIPWebTableData.push({
                        symbol: data.symbol,
                        pro_name: data.pro_name,
                        curr: data.curr,
                        last_inv: data.last_inv,
                        ave_cost: data.ave_cost,
                        amount: formatNum(data.amount),
                        amount_twd: formatNum(data.amount_twd),
                        cost_twd: data.cost_twd,
                        cost: formatNum(data.cost),
                        pl: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{formatNum(data.pl)}</div>,
                        roi: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{data.roi}%</div>,
                    });
                });

                webTableData.MIP = MIPWebTableData;

                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        MIP: [
                            { title: '市場/幣別', dataIndex: 'market__curr' },
                            { title: '商品/現價', dataIndex: 'name__ref_price' },
                            { title: '庫存/市值', dataIndex: 'last_inv__amount' },
                            { title: '損益/報酬率', dataIndex: 'pl__roi' },
                        ],
                    });

                    let mobileTableData = {};
                    let MIPMobileTableData = [];

                    realTimePrtLosSum?.MIP.data.map((data, index) => {
                        MIPMobileTableData.push({
                            market__curr: (
                                <div>
                                    {data.market}
                                    <br />
                                    {data.curr}
                                </div>
                            ),
                            name__ref_price: (
                                <div>
                                    {data.name}
                                    <br />
                                    {data.ref_price}
                                </div>
                            ),
                            last_inv__amount: (
                                <div>
                                    {formatNum(data.last_inv)}
                                    <br />
                                    {formatNum(data.amount)}
                                </div>
                            ),
                            pl__roi: (
                                <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>
                                    {formatNum(data.pl)}
                                    <br />
                                    {data.roi}%
                                </div>
                            ),
                        });
                    });

                    mobileTableData.MIP = MIPMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'WM_FUND':
                tableTitle = {
                    WM_FUND: [
                        { title: '商品代碼', dataIndex: 'fund_code' },
                        { title: '商品名', dataIndex: 'fund_name' },
                        { title: '幣別', dataIndex: 'purchase_cur' },
                        { title: '參考淨值', dataIndex: 'nav' },
                        { title: '參考市值', dataIndex: 'ave_cost' },
                        { title: '台幣市值', dataIndex: 'namt' },
                        { title: '持有成本', dataIndex: 'invest_cost' },
                        { title: '損益試算', dataIndex: 'prtlos' },
                        { title: '報酬率', dataIndex: 'roi' },
                        { title: '累計配息', dataIndex: 'acc_dividend' },
                        { title: '含息報酬率', dataIndex: 'roi_dividend' },
                    ],
                };

                let WM_FUNDWebTableData = [];

                realTimePrtLosSum?.WM_FUND.data.map((data, index) => {
                    WM_FUNDWebTableData.push({
                        fund_code: data.fund_code,
                        fund_name: data.fund_name,
                        purchase_cur: data.purchase_cur,
                        nav: formatNum(data.nav),
                        ave_cost: formatNum(data.ave_cost),
                        namt: formatNum(data.namt),
                        invest_cost: formatNum(data.invest_cost),
                        prtlos: (
                            <div class={data.prtlos > 0 ? 'win' : data.prtlos < 0 ? 'loss' : ''}>
                                {formatNum(data.prtlos)}
                            </div>
                        ),
                        roi: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{data.roi}%</div>,
                        acc_dividend: formatNum(data.acc_dividend),
                        roi_dividend: (
                            <div class={data.roi_dividend > 0 ? 'win' : data.roi_dividend < 0 ? 'loss' : ''}>
                                {roi_dividend}%
                            </div>
                        ),
                    });
                });

                webTableData.WM_FUND = WM_FUNDWebTableData;

                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        WM_FUND: [
                            { title: '商品/幣別', dataIndex: 'fund_name__purchase_cur' },
                            { title: '淨值/市值', dataIndex: 'nav__nav_cost' },
                            { title: '損益/台幣市值', dataIndex: 'prtlos__namt' },
                            { title: '累計配息/含息報酬率', dataIndex: 'acc_dividend__roi_dividend' },
                        ],
                    });

                    let mobileTableData = {};
                    let WM_FUNDMobileTableData = [];

                    realTimePrtLosSum?.WM_FUND.data.map((data, index) => {
                        WM_FUNDMobileTableData.push({
                            fund_name__purchase_cur: (
                                <div>
                                    {data.fund_name}
                                    <br />
                                    {data.purchase_cur}
                                </div>
                            ),
                            nav__nav_cost: (
                                <div>
                                    {formatNum(data.nav)}
                                    <br />
                                    {formatNum(data.nav_cost)}
                                </div>
                            ),
                            prtlos__namt: (
                                <div>
                                    <span class={data.prtlos > 0 ? 'win' : data.prtlos < 0 ? 'loss' : ''}>
                                        {formatNum(data.prtlos)}
                                    </span>
                                    <br />
                                    {formatNum(data.namt)}
                                </div>
                            ),
                            acc_dividend__roi_dividend: (
                                <div>
                                    {formatNum(data.acc_dividend)}
                                    <br />
                                    <span class={data.roi_dividend > 0 ? 'win' : data.roi_dividend < 0 ? 'loss' : ''}>
                                        {data.roi_dividend}%
                                    </span>
                                </div>
                            ),
                        });
                    });

                    mobileTableData.WM_FUND = WM_FUNDMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'OF':
                tableTitle = {
                    OF: [
                        { title: '商品名稱', dataIndex: 'fund_cn' },
                        { title: '參考損益', dataIndex: 'trade_nonachieve' },
                        { title: '參考報酬率(%)', dataIndex: 'trade_profit_rate' },
                        { title: '參考市值', dataIndex: 'trade_value' },
                    ],
                };

                let OFWebTableData = [];

                realTimePrtLosSum?.OF.data.map((data, index) => {
                    OFWebTableData.push({
                        fund_cn: data.fund_cn,
                        trade_nonachieve: (
                            <span class={data.trade_nonachieve > 0 ? 'win' : data.trade_nonachieve < 0 ? 'loss' : ''}>
                                {formatNum(data.trade_nonachieve)}
                            </span>
                        ),
                        trade_profit_rate: (
                            <span class={data.trade_profit_rate > 0 ? 'win' : data.trade_profit_rate < 0 ? 'loss' : ''}>
                                {data.trade_profit_rate}%
                            </span>
                        ),
                        trade_value: formatNum(data.trade_value),
                    });
                });

                webTableData.OF = OFWebTableData;

                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        OF: [
                            { title: '商品名稱', dataIndex: 'fund_cn' },
                            { title: '參考損益', dataIndex: 'trade_nonachieve' },
                            { title: '參考報酬率(%)', dataIndex: 'trade_profit_rate' },
                            { title: '參考市值', dataIndex: 'trade_value' },
                        ],
                    });

                    let mobileTableData = {};
                    let OFMobileTableData = [];

                    realTimePrtLosSum?.OF.data.map((data, index) => {
                        OFMobileTableData.push({
                            fund_cn: data.fund_cn,
                            trade_nonachieve: (
                                <span
                                    class={data.trade_nonachieve > 0 ? 'win' : data.trade_nonachieve < 0 ? 'loss' : ''}
                                >
                                    {formatNum(data.trade_nonachieve)}
                                </span>
                            ),
                            trade_profit_rate: (
                                <span
                                    class={
                                        data.trade_profit_rate > 0 ? 'win' : data.trade_profit_rate < 0 ? 'loss' : ''
                                    }
                                >
                                    {data.trade_profit_rate}%
                                </span>
                            ),
                            trade_value: formatNum(data.trade_value),
                        });
                    });

                    mobileTableData.OF = OFMobileTableData;
                    setTableData(mobileTableData);
                } else {
                }
                break;
            case 'WM_SN':
                tableTitle = {
                    WM_SN: [
                        { title: '商品代碼', dataIndex: 'fund_code' },
                        { title: '商品名', dataIndex: 'fund_name' },
                        { title: '幣別', dataIndex: 'purchase_cur' },
                        { title: '參考價', dataIndex: 'nav' },
                        { title: '參考市值', dataIndex: 'namt' },
                        { title: '申購價格', dataIndex: 'purchase_nav' },
                        { title: '付出成本', dataIndex: 'invest_cost' },
                        { title: '損益試算', dataIndex: 'prtlos' },
                        { title: '累計配息', dataIndex: 'acc_dividend' },
                        { title: '參考含息報酬率(%)', dataIndex: 'roi_dividend' },
                    ],
                };

                let WM_SNWebTableData = [];

                realTimePrtLosSum?.WM_SN.data.map((data, index) => {
                    WM_SNWebTableData.push({
                        fund_code: data.fund_code,
                        fund_name: data.fund_name,
                        purchase_cur: data.purchase_cur,
                        nav: data.nav,
                        namt: formatNum(data.namt),
                        purchase_nav: formatNum(data.purchase_nav),
                        invest_cost: formatNum(data.invest_cost),
                        prtlos: (
                            <span class={data.prtlos > 0 ? 'win' : data.prtlos < 0 ? 'loss' : ''}>
                                {formatNum(data.prtlos)}
                            </span>
                        ),
                        acc_dividend: formatNum(data.acc_dividend),
                        roi_dividend: (
                            <span class={data.roi_dividend > 0 ? 'win' : data.roi_dividend < 0 ? 'loss' : ''}>
                                {data.roi_dividend}%
                            </span>
                        ),
                    });
                });

                webTableData.WM_SN = WM_SNWebTableData;
                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        WM_SN: [
                            { title: '商品/幣別', dataIndex: 'fund_name__purchase_cur' },
                            { title: '參考價/成本', dataIndex: 'nav__invest_cost' },
                            { title: '損益/市值', dataIndex: 'prtlos__namt' },
                            { title: '累計配息/含息報酬率', dataIndex: 'acc_dividend__roi_dividend' },
                        ],
                    });

                    let mobileTableData = {};
                    let WM_SNMobileTableData = [];

                    realTimePrtLosSum?.WM_SN.data.map((data, index) => {
                        WM_SNMobileTableData.push({
                            fund_name__purchase_cur: (
                                <div>
                                    {data.fund_name}
                                    <br />
                                    {data.purchase_cur}
                                </div>
                            ),
                            nav__invest_cost: (
                                <div>
                                    {data.nav}
                                    <br />
                                    {formatNum(data.invest_cost)}
                                </div>
                            ),
                            prtlos__namt: (
                                <div>
                                    <span class={data.prtlos > 0 ? 'win' : data.prtlos < 0 ? 'loss' : ''}>
                                        {formatNum(data.prtlos)}
                                    </span>
                                    <br />
                                    {formatNum(data.namt)}
                                </div>
                            ),
                            acc_dividend__roi_dividend: (
                                <div>
                                    {formatNum(data.acc_dividend)}
                                    <br />
                                    <span class={data.acc_dividend > 0 ? 'win' : data.acc_dividend < 0 ? 'loss' : ''}>
                                        {formatNum(data.roi_dividend)}%
                                    </span>
                                </div>
                            ),
                        });
                    });

                    mobileTableData.WM_SN = WM_SNMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'SN':
                tableTitle = {
                    SN: [
                        { title: '商品代碼', dataIndex: 'prod_no' },
                        { title: '商品名', dataIndex: 'prod_name' },
                        { title: '幣別', dataIndex: 'currency' },
                        { title: '參考價', dataIndex: 'price' },
                        { title: '參考市值', dataIndex: 'market_amt' },
                        { title: '付出成本', dataIndex: 'total_amt' },
                        { title: '損益試算', dataIndex: 'ref_value_amt' },
                        { title: '報酬率(%)', dataIndex: 'ref_value_prc' },
                    ],
                };

                let SNWebTableData = [];

                realTimePrtLosSum?.SN.data.map((data, index) => {
                    SNWebTableData.push({
                        prod_no: data.prod_no,
                        prod_name: data.cc,
                        currency: data.currency,
                        price: data.price,
                        market_amt: formatNum(data.market_amt),
                        total_amt: formatNum(data.total_amt),
                        ref_value_amt: (
                            <div class={data.ref_value_amt > 0 ? 'win' : data.ref_value_amt < 0 ? 'loss' : ''}>
                                {formatNum(data.ref_value_amt)}
                            </div>
                        ),
                        ref_value_prc: (
                            <div class={data.ref_value_prc > 0 ? 'win' : data.ref_value_prc < 0 ? 'loss' : ''}>
                                {data.ref_value_prc}
                            </div>
                        ),
                    });
                });

                webTableData.SN = SNWebTableData;
                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        SN: [
                            { title: '商品/幣別', dataIndex: 'prod_name__currency' },
                            { title: '參考價/成本', dataIndex: 'price__total_amt' },
                            { title: '損益/市值', dataIndex: 'ref_value_amt__market_amt' },
                            { title: '報酬率', dataIndex: 'ref_value_prc' },
                        ],
                    });

                    let mobileTableData = {};
                    let SNMobileTableData = [];

                    realTimePrtLosSum?.SN.data.map((data, index) => {
                        SNMobileTableData.push({
                            prod_name__currency: (
                                <div>
                                    {data.prod_name}
                                    <br />
                                    {data.currency}
                                </div>
                            ),
                            price__total_amt: (
                                <div>
                                    {data.price}
                                    <br />
                                    {formatNum(data.total_amt)}
                                </div>
                            ),
                            ref_value_amt__market_amt: (
                                <div>
                                    <span class={data.ref_value_amt > 0 ? 'win' : data.ref_value_amt < 0 ? 'loss' : ''}>
                                        {formatNum(data.ref_value_amt)}
                                    </span>
                                    <br />
                                    {formatNum(data.market_amt)}
                                </div>
                            ),
                            ref_value_prc: (
                                <div>
                                    <span class={data.ref_value_prc > 0 ? 'win' : data.ref_value_prc < 0 ? 'loss' : ''}>
                                        {formatNum(data.ref_value_prc)}%
                                    </span>
                                </div>
                            ),
                        });
                    });

                    mobileTableData.SN = SNMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'BOND':
                tableTitle = {
                    BOND: [
                        { title: '商品代號', dataIndex: 'name' },
                        { title: '商品名稱', dataIndex: 'symbol' },
                        { title: '幣別', dataIndex: 'total_pv' },
                        { title: '持有面額', dataIndex: 'total_value' },
                        { title: '參考市值', dataIndex: 'total_value_twd' },
                        { title: '參考市值(台幣)', dataIndex: 'trade_cur' },
                    ],
                };

                let BONDWebTableData = [];

                realTimePrtLosSum?.BOND.data.map((data, index) => {
                    BONDWebTableData.push({
                        name: data.name,
                        symbol: data.symbol,
                        total_pv: data.total_pv,
                        total_value: formatNum(data.total_value),
                        total_value_twd: formatNum(data.total_value_twd),
                        trade_cur: formatNum(data.trade_cur),
                    });
                });

                webTableData.BOND = BONDWebTableData;
                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        BOND: [
                            { title: '商品名稱', dataIndex: 'symbol' },
                            { title: '幣別', dataIndex: 'total_pv' },
                            { title: '持有面額', dataIndex: 'total_value' },
                            { title: '參考市值', dataIndex: 'total_value_twd' },
                            { title: '參考市值(台幣)', dataIndex: 'trade_cur' },
                        ],
                    });

                    let BONDMobileTableData = [];
                    let mobileTableData = {};

                    realTimePrtLosSum?.BOND.data.map((data, index) => {
                        BONDMobileTableData.push({
                            symbol: data.symbol,
                            total_pv: data.total_pv,
                            total_value: formatNum(data.total_value),
                            total_value_twd: formatNum(data.total_value_twd),
                            trade_cur: formatNum(data.trade_cur),
                        });
                    });

                    mobileTableData.BOND = BONDMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'WM_FUND_INTRANSIT':
                tableTitle = {
                    WM_FUND_INTRANSIT: [
                        { title: '商品代碼', dataIndex: 'fund_code' },
                        { title: '產品名稱', dataIndex: 'fund_name' },
                        { title: '交易日期', dataIndex: 'trade_dt' },
                        { title: '交易類別', dataIndex: 'fund_type' },
                        { title: '幣別', dataIndex: 'cur' },
                        { title: '單位數', dataIndex: 'unit' },
                        { title: '手續費', dataIndex: 'management_fee' },
                        // { title : '參考現值', dataIndex: 'amount_twd'},
                        { title: '約當台幣', dataIndex: 'amount_twd' },
                    ],
                };

                let WM_FUND_INTRANSITWebTableData = [];

                realTimePrtLosSum?.WM_FUND_INTRANSIT.data.map((data, index) => {
                    WM_FUND_INTRANSITWebTableData.push({
                        fund_code: data.fund_code,
                        fund_name: data.fund_name,
                        trade_dt: data.trade_dt,
                        fund_type: data.fund_type,
                        cur: data.cur,
                        unit: data.unit,
                        management_fee: data.management_fee,
                        amount_twd: formatNum(data.amount_twd),
                    });
                });

                webTableData.WM_FUND_INTRANSIT = WM_FUND_INTRANSITWebTableData;
                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        WM_FUND_INTRANSIT: [
                            { title: '商品/幣別', dataIndex: 'fund_name__cur' },
                            { title: '交易日期/交易類別', dataIndex: 'trade_dt__fund_type' },
                            { title: '單位數/手續費', dataIndex: 'unit__management_fee' },
                            { title: '約當台幣', dataIndex: 'amount_twd' },
                        ],
                    });

                    let mobileTableData = {};
                    let WM_FUND_INTRANSITMobileTableData = [];

                    realTimePrtLosSum?.WM_FUND_INTRANSIT.data.map((data, index) => {
                        WM_FUND_INTRANSITMobileTableData.push({
                            fund_name__cur: (
                                <div>
                                    {data.fund_name}
                                    <br />
                                    {data.cur}
                                </div>
                            ),
                            trade_dt__fund_type: (
                                <div>
                                    {data.trade_dt}
                                    <br />
                                    {data.fund_type}
                                </div>
                            ),
                            unit__management_fee: (
                                <div>
                                    {data.unit}
                                    <br />
                                    {data.management_fee}
                                </div>
                            ),
                            amount_twd: data.amount_twd,
                        });
                    });

                    mobileTableData.WM_FUND_INTRANSIT = WM_FUND_INTRANSITMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'WM_SN_INTRANSIT':
                tableTitle = {
                    WM_SN_INTRANSIT: [
                        { title: '商品代碼', dataIndex: 'fund_code' },
                        { title: '產品名稱', dataIndex: 'fund_name' },
                        { title: '交易日期', dataIndex: 'trade_dt' },
                        { title: '交易類別', dataIndex: 'fund_type' },
                        { title: '幣別', dataIndex: 'cur' },
                        { title: '單位數', dataIndex: 'unit' },
                        { title: '手續費', dataIndex: 'management_fee' },
                        // { title : '參考現值', dataIndex: 'amount_twd'},
                        { title: '約當台幣', dataIndex: 'amount_twd' },
                    ],
                };

                let WM_SN_INTRANSITWebTableData = [];

                realTimePrtLosSum?.WM_SN_INTRANSIT.data.map((data, index) => {
                    WM_SN_INTRANSITWebTableData.push({
                        fund_code: data.fund_code,
                        fund_name: data.fund_name,
                        trade_dt: data.trade_dt,
                        fund_type: data.fund_type,
                        cur: data.cur,
                        unit: data.unit,
                        management_fee: data.management_fee,
                        amount_twd: formatNum(data.amount_twd),
                    });
                });

                webTableData.WM_SN_INTRANSIT = WM_SN_INTRANSITWebTableData;
                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        WM_SN_INTRANSIT: [
                            { title: '買賣別/幣別', dataIndex: 'stockName' },
                            { title: '商品/現價', dataIndex: 'bs' },
                            { title: '口數/成本', dataIndex: 'currency' },
                            { title: '損益/報酬率', dataIndex: 'openq' },
                        ],
                    });

                    let mobileTableData = {};
                    let WM_SN_INTRANSITMobileTableData = [];

                    realTimePrtLosSum?.WM_SN_INTRANSIT.data.map((data, index) => {
                        WM_SN_INTRANSITMobileTableData.push({
                            fund_name__cur: (
                                <div>
                                    {data.fund_name}
                                    <br />
                                    {data.cur}
                                </div>
                            ),
                            trade_dt__fund_type: (
                                <div>
                                    {data.trade_dt}
                                    <br />
                                    {data.fund_type}
                                </div>
                            ),
                            unit__management_fee: (
                                <div>
                                    {data.unit}
                                    <br />
                                    {data.management_fee}
                                </div>
                            ),
                            amount_twd: data.amount_twd,
                        });
                    });

                    mobileTableData.WM_SN_INTRANSIT = WM_SN_INTRANSITMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'WM_TRUST_DEPOSIT':
                tableTitle = {
                    WM_TRUST_DEPOSIT: [
                        { title: '信託專戶幣別', dataIndex: 'trust_cur' },
                        { title: '可用餘額', dataIndex: 'available_balance' },
                        { title: '參考匯率', dataIndex: 'exrate' },
                        { title: '參考匯率日期', dataIndex: 'exrate_dt' },
                        { title: '參考市值(台幣)', dataIndex: 'amount_twd' },
                    ],
                };

                let WM_TRUST_DEPOSITWebTableData = [];

                realTimePrtLosSum?.WM_TRUST_DEPOSIT.data.map((data, index) => {
                    WM_TRUST_DEPOSITWebTableData.push({
                        trust_cur: data.trust_cur,
                        available_balance: formatNum(data.available_balance),
                        exrate: data.exrate,
                        exrate_dt: data.exrate_dt,
                        amount_twd: formatNum(data.amount_twd),
                    });
                });

                webTableData.WM_TRUST_DEPOSIT = WM_TRUST_DEPOSITWebTableData;
                setModalAllData(webTableData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        WM_TRUST_DEPOSIT: [
                            { title: '信託專戶幣別', dataIndex: 'trust_cur' },
                            { title: '可用餘額', dataIndex: 'available_balance' },
                            { title: '參考匯率', dataIndex: 'exrate' },
                            { title: '參考匯率日期', dataIndex: 'exrate_dt' },
                            { title: '參考市值(台幣)', dataIndex: 'amount_twd' },
                        ],
                    });

                    let mobileTableData = {};
                    let WM_TRUST_DEPOSITMobileTableData = [];

                    realTimePrtLosSum?.WM_TRUST_DEPOSIT.data.map((data, index) => {
                        WM_TRUST_DEPOSITMobileTableData.push({
                            trust_cur: data.trust_cur,
                            available_balance: formatNum(data.available_balance),
                            exrate: data.exrate,
                            exrate_dt: data.exrate_dt,
                            amount_twd: formatNum(data.amount_twd),
                        });
                    });

                    mobileTableData.WM_TRUST_DEPOSIT = WM_TRUST_DEPOSITMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
        }
    }, [type, isMobile, reload, realTimePrtLosSum]);

    const locale = {
        emptyText: (
            <span>
                <img src={noData} />
                <p className="noData__desc">查無資料</p>
            </span>
        ),
    };

    const pageData = {
        S: [
            { title: '現股/信用明細', detailType: 'stock' },
            { title: '出借股票', detailType: 'unreal' },
            { title: '信用擔保品', detailType: 'creditdn' },
            { title: '借貸款項擔保品', detailType: 'lenddn' },
        ],
        F: [{ title: '國內期貨', detailType: 'future' }],
        FF: [{ title: '國外期貨', detailType: 'foreignFuture' }],
        H: [{ title: '海外股票', detailType: 'subBrokerage' }],
        FIP: [{ title: '豐存美股 - 定期定股', detailType: 'FIP' }],
        MIP: [{ title: '豐存美股 - 定期定額', detailType: 'MIP' }],
        WM_FUND: [{ title: '信託基金', detailType: 'WM_FUND' }],
        OF: [{ title: '集保基金', detailType: 'OF' }],
        WM_SN: [{ title: '基金結構型商品庫存', detailType: 'WM_SN' }],
        SN: [{ title: '結構型商品庫存', detailType: 'SN' }],
        BOND: [{ title: '海外債', detailType: 'BOND' }],
        WM_FUND_INTRANSIT: [{ title: '基金在途', detailType: 'WM_FUND_INTRANSIT' }],
        WM_SN_INTRANSIT: [{ title: '基金結構型在途', detailType: 'WM_SN_INTRANSIT' }],
        WM_TRUST_DEPOSIT: [{ title: '信託存款', detailType: 'WM_TRUST_DEPOSIT' }],
    };

    return (
        <>
            <div className="asset__detail__overview__tab">
                <Tabs>
                    {/* <GetTabPane type={type} /> */}
                    {pageData[type] &&
                        pageData[type].map((item, key) => {
                            console.log(tableData);
                            console.log(item.detailType);
                            return (
                                <TabPane tab={<span>{item.title}</span>} key={key}>
                                    <AccountTable
                                        className="drag__Table"
                                        columns={columnData[item.detailType]}
                                        pagination={false}
                                        dataSource={tableData[item.detailType]}
                                        locale={locale}
                                        scroll={{ x: isMobile ? 360 : 1300, y: 500 }}
                                        onRow={(record, rowIndex) => {
                                            return {
                                                onClick: event => {
                                                    if (isMobile) {
                                                        const mdData = {};
                                                        mdData.content = modalAllData[item.detailType][rowIndex];
                                                        mdData.title = modalTitleData[item.detailType];
                                                        setModalData(mdData);
                                                        openModal();
                                                    }
                                                },
                                            };
                                        }}
                                    />
                                </TabPane>
                            );
                        })}
                </Tabs>

                <AssetDetailModal
                    isVisible={isMobile ? isAssetDetailModalVisitable : false}
                    data={modalData}
                    closeHandler={closeModal}
                />
            </div>

            <style jsx>{`
                .asset__detail__overview__tab {
                    position: relative;
                    border: solid 1px #e6ebf5;
                    background: #fff;
                    margin-top: 30px;
                    margin-bottom: 30px;
                }
                @media (max-width: 768px) {
                    .asset__detail__overview__tab {
                        margin-bottom: 0;
                    }
                }
            `}</style>
            <style jsx global>{`
                .win {
                    color: #f45a4c;
                }
                .loss {
                    color: #22a16f;
                }
                .ant-tabs-tab-btn > span {
                    font-size: 1.6rem;
                    font-weight: bold;
                }
                .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn > span {
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #daa360;
                }
                .ant-tabs > .ant-tabs-nav {
                    margin: 0;
                }
                .ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap,
                .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap {
                    padding: 0 30px;
                }
                .ant-tabs-tabpane {
                    padding: 0;
                }

                .ant-tabs-tab-btn:hover,
                .ant-tabs-tab:hover {
                    color: #daa360;
                }
                .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #daa360;
                }
                .ant-tabs-bottom > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-bottom > div > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-top > div > .ant-tabs-nav .ant-tabs-ink-bar {
                    background: #daa360;
                    height: 3px;
                }
                .ant-tabs-content {
                    padding: 0 0;
                }
            `}</style>
        </>
    );
});

export default AssetDetailTable;
