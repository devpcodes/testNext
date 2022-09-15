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
        let modalMobileData = {};
        switch (type) {
            case 'S':
                let stockWebTableData = [];
                let unrealTableData = [];
                let creditdnTableData = [];
                let lenddnTableData = [];
                let stockModalData = [];
                let unrealModalData = [];

                tableTitle = {
                    stock: [
                        {
                            title: '股票代碼',
                            dataIndex: 'stock',
                            fixed: 'left',
                        },
                        {
                            title: '股票名稱',
                            dataIndex: 'stocknm',
                            sorter: (a, b) => a.stocknm.length - b.stocknm.length,
                            fixed: 'left',
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
                    unreal: [
                        { title: '股票代碼', dataIndex: 'stock', fixed: 'left' },
                        {
                            title: '股票名稱',
                            dataIndex: 'stocknm',
                            sorter: (a, b) => a.stocknm.length - b.stocknm.length,
                            fixed: 'left',
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
                            dataIndex: 'urratio',
                            align: 'right',
                            render: urratio => (
                                <div class={parseFloat(urratio) > 0 ? 'win' : parseFloat(urratio) < 0 ? 'loss' : ''}>
                                    {urratio}
                                </div>
                            ),
                            sorter: (a, b) => parseFloat(a.ur_ratio.slice(0, -1)) - parseFloat(b.ur_ratio.slice(0, -1)),
                        },
                    ],
                    creditdn: [
                        { title: '股票代碼', dataIndex: 'stock', fixed: 'left' },
                        {
                            title: '股票名稱',
                            dataIndex: 'stocknm',
                            sorter: (a, b) => a.stocknm.length - b.stocknm.length,
                            fixed: 'left',
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
                        { title: '股票代碼', dataIndex: 'stock', fixed: 'left' },
                        {
                            title: '股票名稱',
                            dataIndex: 'stocknm',
                            sorter: (a, b) => a.stocknm.length - b.stocknm.length,
                            fixed: 'left',
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

                realTimePrtLosSum?.S?.data.map((data, index) => {
                    stockWebTableData.push({
                        stock: data.stock,
                        stocknm: data.stocknm,
                        ttypename: data.ttypename,
                        qty: data.qty,
                        mprice: data.mprice,
                        namt: data.namt,
                        avgprice: parseFloat(data.cost / data.qty).toFixed(2),
                        cost: data.cost,
                        unreal: data.unreal,
                        ur_ratio: data.ur_ratio,
                        modalTitle: data.stocknm,
                    });

                    stockModalData.push({
                        stock: data.stock,
                        stocknm: data.stocknm,
                        ttypename: data.ttypename,
                        qty: formatNum(data.qty),
                        mprice: data.mprice,
                        namt: formatNum(data.namt),
                        avgprice: parseFloat(data.cost / data.qty).toFixed(2),
                        cost: formatNum(data.cost),
                        unreal: (
                            <div class={data.unreal > 0 ? 'win' : data.unreal < 0 ? 'loss' : ''}>
                                {formatNum(data.unreal)}
                            </div>
                        ),
                        ur_ratio: (
                            <div class={data.unreal > 0 ? 'win' : data.unreal < 0 ? 'loss' : ''}>{data.ur_ratio}</div>
                        ),
                        modalTitle: data.stocknm,
                    });
                });

                realTimePrtLosSum?.L?.unreal_sums.data.map((data, index) => {
                    unrealTableData.push({
                        stock: data.stock,
                        stocknm: data.stocknm,
                        qty: data.qty,
                        lastprice: data.lastprice,
                        namt: data.namt,
                        avgprice: data.avgprice,
                        cost: data.cost,
                        unreal: data.unreal,
                        urratio: data.urratio,
                        modalTitle: data.stocknm,
                    });

                    unrealModalData.push({
                        stock: data.stock,
                        stocknm: data.stocknm,
                        qty: formatNum(data.qty),
                        lastprice: data.lastprice,
                        namt: formatNum(data.namt),
                        avgprice: formatNum(data.avgprice),
                        cost: formatNum(data.cost),
                        unreal: (
                            <div class={data.unreal > 0 ? 'win' : data.unreal < 0 ? 'loss' : ''}>
                                {formatNum(data.unreal)}
                            </div>
                        ),
                        urratio: (
                            <div class={data.unreal > 0 ? 'win' : data.unreal < 0 ? 'loss' : ''}>{data.urratio}</div>
                        ),
                        modalTitle: data.stocknm,
                    });
                });

                realTimePrtLosSum?.L?.creditdn_sums.data.map((data, index) => {
                    creditdnTableData.push({
                        stock: data.stock,
                        stocknm: data.stocknm,
                        qty: data.qty,
                        lastprice: data.lastprice,
                        namt: data.namt,
                        modalTitle: data.stocknm,
                    });
                });

                realTimePrtLosSum?.L?.lenddn_sums.data.map((data, index) => {
                    lenddnTableData.push({
                        stock: data.stock,
                        stocknm: data.stocknm,
                        qty: data.qty,
                        lastprice: data.lastprice,
                        namt: data.namt,
                        modalTitle: data.stocknm,
                    });
                });

                webTableData.stock = stockWebTableData;
                webTableData.unreal = unrealTableData;
                webTableData.creditdn = creditdnTableData;
                webTableData.lenddn = lenddnTableData;

                modalMobileData.stock = stockModalData;
                modalMobileData.unreal = unrealModalData;
                modalMobileData.creditdn = creditdnTableData;
                modalMobileData.lenddn = lenddnTableData;

                setModalAllData(modalMobileData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        stock: [
                            { title: '類別', dataIndex: 'ttypename', align: 'center', width: 100 },
                            { title: '商品/現價', dataIndex: 'stocknm__mprice', align: 'right' },
                            { title: '庫存/市值', dataIndex: 'qty__namt', align: 'right' },
                            { title: '損益/報酬率', dataIndex: 'unreal__ur_ratio', align: 'right' },
                        ],
                        unreal: [
                            // { title : '類別' , dataIndex : 'ttypename'},
                            { title: '商品/現價', dataIndex: 'stocknm__mprice' },
                            { title: '庫存/市值', dataIndex: 'qty__namt' },
                            { title: '損益/報酬率', dataIndex: 'unreal__urratio' },
                        ],
                        creditdn: [
                            { title: '商品/現價', dataIndex: 'stocknm__mprice' },
                            { title: '庫存/市值', dataIndex: 'qty__namt' },
                        ],
                        lenddn: [
                            { title: '商品/現價', dataIndex: 'stocknm__mprice' },
                            { title: '庫存/市值', dataIndex: 'qty__namt' },
                        ],
                    });

                    let mobileTableData = {};
                    let stockMobileTableData = [];
                    let unrealMobileTableData = [];
                    let creditdnMobileTableData = [];
                    let lenddnMobileTableData = [];

                    realTimePrtLosSum?.S?.data.map((data, index) => {
                        stockMobileTableData.push({
                            ttypename: data.ttypename,
                            stocknm__mprice: (
                                <div>
                                    {data.stocknm}
                                    <br />
                                    {data.mprice}
                                </div>
                            ),
                            qty__namt: (
                                <div>
                                    {formatNum(data.qty)}
                                    <br />
                                    {formatNum(data.namt)}
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

                    realTimePrtLosSum?.L?.unreal_sums.data.map((data, index) => {
                        unrealMobileTableData.push({
                            stocknm__mprice: (
                                <div>
                                    {data.stocknm}
                                    <br />
                                    {data.mprice}
                                </div>
                            ),
                            qty__namt: (
                                <div>
                                    {formatNum(data.qty)}
                                    <br />
                                    {formatNum(data.namt)}
                                </div>
                            ),
                            unreal__urratio: (
                                <div class={data.unreal > 0 ? 'win' : data.unreal < 0 ? 'loss' : ''}>
                                    {formatNum(data.unreal)}
                                    <br />
                                    {data.urratio}
                                </div>
                            ),
                        });
                    });

                    realTimePrtLosSum?.L?.creditdn_sums.data.map((data, index) => {
                        creditdnMobileTableData.push({
                            stocknm__mprice: (
                                <div>
                                    {data.stocknm}
                                    <br />
                                    {data.mprice}
                                </div>
                            ),
                            qty__namt: (
                                <div>
                                    {formatNum(data.qty)}
                                    <br />
                                    {formatNum(data.namt)}
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

                    realTimePrtLosSum?.L?.lenddn_sums.data.map((data, index) => {
                        lenddnMobileTableData.push({
                            stocknm__mprice: (
                                <div>
                                    {data.stocknm}
                                    <br />
                                    {data.mprice}
                                </div>
                            ),
                            qty__namt: (
                                <div>
                                    {formatNum(data.qty)}
                                    <br />
                                    {formatNum(data.namt)}
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
                            fixed: 'left',
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
                            align: 'right',
                        },
                        { title: '原始保證金', dataIndex: 'otamt', align: 'right' },
                        { title: '報酬率', dataIndex: 'roi', align: 'right' },
                    ],
                };
                let futureWebTableData = [];
                let futureModaleData = [];

                realTimePrtLosSum?.F?.data.map((data, index) => {
                    futureWebTableData.push({
                        stockName: `${data.stockName} ${data.sprice} ${data.poc} ${data.smonth}`,
                        bs: data.bs === 'B' ? '買' : '賣',
                        currency: data.currency,
                        openq: data.openq,
                        mprice: data.mprice,
                        tprice: data.tprice,
                        futeamt: data.futeamt,
                        otamt: formatNum(data.otamt),
                        roi: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{data.roi}%</div>,
                        modalTitle: `${data.stockName} ${data.sprice} ${data.poc} ${data.smonth}`,
                    });

                    futureModaleData.push({
                        stockName: `${data.stockName} ${data.sprice} ${data.poc} ${data.smonth}`,
                        bs: data.bs === 'B' ? '買' : '賣',
                        currency: data.currency,
                        openq: data.openq,
                        mprice: data.mprice,
                        tprice: data.tprice,
                        futeamt: (
                            <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>
                                {formatNum(data.futeamt)}
                            </div>
                        ),
                        otamt: formatNum(data.otamt),
                        roi: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{data.roi}%</div>,
                        modalTitle: `${data.stockName} ${data.sprice} ${data.poc} ${data.smonth}`,
                    });
                });

                webTableData.future = futureWebTableData;
                modalMobileData.future = futureModaleData;

                setModalAllData(modalMobileData);
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

                    realTimePrtLosSum?.F?.data.map((data, index) => {
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
                                    {`${data.stockName} ${data.sprice} ${data.poc} ${data.smonth}`}
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
                        { title: '前日餘額', dataIndex: 'dbaln', align: 'right' },
                        { title: '參考權益數', dataIndex: 'dlbaln', align: 'right' },
                        { title: '維持保證金', dataIndex: 'dtmmmrg', align: 'right' },
                    ],
                };

                let foreignFutureWebTableData = [];

                realTimePrtLosSum?.FF?.data.map((data, index) => {
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

                    realTimePrtLosSum?.FF?.data.map((data, index) => {
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
                        {
                            title: '股票名稱',
                            dataIndex: 'name',
                            sorter: (a, b) => a.name.length - b.name.length,
                            fixed: 'left',
                        },
                        {
                            title: '市場',
                            dataIndex: 'market',
                            filters: [
                                { text: 'US', value: 'US' },
                                { text: 'SEHK', value: 'SEHK' },
                                { text: 'SHSE', value: 'SHSE' },
                                { text: 'SZSE', value: 'SZSE' },
                                { text: 'JP', value: 'JP' },
                            ],
                            onFilter: (value, record) => record.market.startsWith(value),
                            filterSearch: true,
                        },
                        {
                            title: '幣別',
                            dataIndex: 'curr',
                            filters: [
                                { text: 'USD', value: 'USD' },
                                { text: 'HKD', value: 'HKD' },
                                { text: 'JPY', value: 'JPY' },
                                { text: 'RMB', value: 'RMB' },
                            ],
                            onFilter: (value, record) => record.curr.startsWith(value),
                            filterSearch: true,
                        },
                        {
                            title: '庫存',
                            dataIndex: 'last_inv',
                            render: last_inv => formatNum(last_inv),
                            align: 'right',
                        },
                        { title: '現價', dataIndex: 'ref_price' },
                        {
                            title: '參考市值',
                            dataIndex: 'amount',
                            render: amount => formatNum(amount),
                            align: 'right',
                        },
                        {
                            title: '參考台幣市值',
                            dataIndex: 'amount_twd',
                            render: amount_twd => formatNum(amount_twd),
                            sorter: (a, b) => a.amount_twd - b.amount_twd,
                            align: 'right',
                        },
                        {
                            title: '成本均價',
                            dataIndex: 'cost_twd',
                            render: cost_twd => formatNum(cost_twd),
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
                            dataIndex: 'pl',
                            render: pl => <div class={pl > 0 ? 'win' : pl < 0 ? 'loss' : ''}>{formatNum(pl)}</div>,
                            sorter: (a, b) => a.pl - b.pl,
                            align: 'right',
                        },
                        {
                            title: '報酬率',
                            dataIndex: 'roi',
                            render: roi => <div class={roi > 0 ? 'win' : roi < 0 ? 'loss' : ''}>{roi}%</div>,
                            sorter: (a, b) => a.pl - b.pl,
                            align: 'right',
                        },
                    ],
                };

                let subBrokerageWebTableData = [];
                let subBrokerageModalData = [];
                realTimePrtLosSum?.H?.data.map((data, index) => {
                    subBrokerageWebTableData.push({
                        name: data.name,
                        market: data.market,
                        curr: data.curr,
                        last_inv: data.last_inv,
                        ref_price: data.ref_price,
                        amount: data.amount,
                        amount_twd: data.amount_twd,
                        cost_twd: data.cost_twd,
                        cost: data.cost,
                        pl: data.pl,
                        roi: data.roi,
                        modalTitle: data.name,
                    });

                    subBrokerageModalData.push({
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
                        modalTitle: data.name,
                    });
                });

                webTableData.subBrokerage = subBrokerageWebTableData;
                modalMobileData.subBrokerage = subBrokerageModalData;
                setModalAllData(modalMobileData);
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

                    realTimePrtLosSum?.H?.data.map((data, index) => {
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
                        { title: '股票代碼', dataIndex: 'symbol', fixed: 'left' },
                        {
                            title: '股票名稱',
                            dataIndex: 'pro_name',
                            sorter: (a, b) => a.pro_name.length - b.pro_name.length,
                            fixed: 'left',
                        },
                        { title: '幣別', dataIndex: 'curr' },
                        { title: '庫存', dataIndex: 'last_inv', align: 'right' },
                        {
                            title: '市值',
                            dataIndex: 'amount',
                            render: amount => formatNum(amount),
                            align: 'right',
                        },
                        {
                            title: '參考台幣市值',
                            dataIndex: 'amount_twd',
                            render: amount_twd => formatNum(amount_twd),
                            sorter: (a, b) => a.amount_twd - b.amount_twd,
                            align: 'right',
                        },
                        {
                            title: '成本均價',
                            dataIndex: 'cost_twd',
                            render: cost_twd => formatNum(cost_twd),
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
                            dataIndex: 'pl',
                            render: pl => <div class={pl > 0 ? 'win' : pl < 0 ? 'loss' : ''}>{formatNum(pl)}</div>,
                            sorter: (a, b) => a.pl - b.pl,
                            align: 'right',
                        },
                        {
                            title: '報酬率',
                            dataIndex: 'roi',
                            render: roi => <div class={roi > 0 ? 'win' : roi < 0 ? 'loss' : ''}>{roi}%</div>,
                            sorter: (a, b) => a.pl - b.pl,
                            align: 'right',
                        },
                    ],
                };

                let FIPWebTableData = [];
                let FIPModalData = [];

                realTimePrtLosSum?.FIP?.data.map((data, index) => {
                    FIPWebTableData.push({
                        symbol: data.symbol,
                        pro_name: data.pro_name,
                        curr: data.curr,
                        last_inv: data.last_inv,
                        amount: data.amount,
                        amount_twd: data.amount_twd,
                        cost_twd: data.cost_twd,
                        cost: data.cost,
                        pl: data.pl,
                        roi: data.roi,
                        modalTitle: data.pro_name,
                    });

                    FIPModalData.push({
                        symbol: data.symbol,
                        pro_name: data.pro_name,
                        curr: data.curr,
                        last_inv: data.last_inv,
                        amount: formatNum(data.amount),
                        amount_twd: formatNum(data.amount_twd),
                        cost_twd: data.cost_twd,
                        cost: formatNum(data.cost),
                        pl: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{formatNum(data.pl)}</div>,
                        roi: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{data.roi}%</div>,
                        modalTitle: data.pro_name,
                    });
                });

                webTableData.FIP = FIPWebTableData;
                modalMobileData.FIP = FIPModalData;

                setModalAllData(modalMobileData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        FIP: [
                            { title: '市場/幣別', dataIndex: 'market__curr' },
                            { title: '商品', dataIndex: 'pro_name' },
                            { title: '庫存/市值', dataIndex: 'last_inv__amount' },
                            { title: '損益/報酬率', dataIndex: 'pl__roi' },
                        ],
                    });

                    let mobileTableData = {};
                    let FIPMobileTableData = [];

                    realTimePrtLosSum?.FIP?.data.map((data, index) => {
                        FIPMobileTableData.push({
                            market__curr: (
                                <div>
                                    {data.market}
                                    <br />
                                    {data.curr}
                                </div>
                            ),
                            pro_name: <div>{data.pro_name}</div>,
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
                        { title: '股票代碼', dataIndex: 'symbol', fixed: 'left' },
                        {
                            title: '股票名稱',
                            dataIndex: 'pro_name',
                            sorter: (a, b) => a.pro_name.length - b.pro_name.length,
                            fixed: 'left',
                        },
                        { title: '幣別', dataIndex: 'curr' },
                        { title: '庫存', dataIndex: 'last_inv', align: 'right' },
                        {
                            title: '市值',
                            dataIndex: 'amount',
                            render: amount => formatNum(amount),
                            align: 'right',
                        },
                        {
                            title: '參考台幣市值',
                            dataIndex: 'amount_twd',
                            render: amount_twd => formatNum(amount_twd),
                            sorter: (a, b) => a.amount_twd - b.amount_twd,
                            align: 'right',
                        },
                        {
                            title: '成本均價',
                            dataIndex: 'cost_twd',
                            render: cost_twd => formatNum(cost_twd),
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
                            dataIndex: 'pl',
                            render: pl => <div class={pl > 0 ? 'win' : pl < 0 ? 'loss' : ''}>{formatNum(pl)}</div>,
                            sorter: (a, b) => a.pl - b.pl,
                            align: 'right',
                        },
                        {
                            title: '報酬率',
                            dataIndex: 'roi',
                            render: roi => <div class={roi > 0 ? 'win' : roi < 0 ? 'loss' : ''}>{roi}%</div>,
                            sorter: (a, b) => a.pl - b.pl,
                            align: 'right',
                        },
                    ],
                };

                let MIPWebTableData = [];
                let MIPModalData = [];

                realTimePrtLosSum?.MIP?.data.map((data, index) => {
                    MIPWebTableData.push({
                        symbol: data.symbol,
                        pro_name: data.pro_name,
                        curr: data.curr,
                        last_inv: data.last_inv,
                        amount: data.amount,
                        amount_twd: data.amount_twd,
                        cost_twd: data.cost_twd,
                        cost: data.cost,
                        pl: data.pl,
                        roi: data.roi,
                        modalTitle: data.pro_name,
                    });

                    MIPModalData.push({
                        symbol: data.symbol,
                        pro_name: data.pro_name,
                        curr: data.curr,
                        last_inv: data.last_inv,
                        amount: formatNum(data.amount),
                        amount_twd: formatNum(data.amount_twd),
                        cost_twd: data.cost_twd,
                        cost: formatNum(data.cost),
                        pl: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{formatNum(data.pl)}</div>,
                        roi: <div class={data.roi > 0 ? 'win' : data.roi < 0 ? 'loss' : ''}>{data.roi}%</div>,
                        modalTitle: data.pro_name,
                    });
                });

                webTableData.MIP = MIPWebTableData;
                modalMobileData.MIP = MIPModalData;

                setModalAllData(modalMobileData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        MIP: [
                            { title: '市場/幣別', dataIndex: 'market__curr' },
                            { title: '商品', dataIndex: 'pro_name' },
                            { title: '庫存/市值', dataIndex: 'last_inv__amount' },
                            { title: '損益/報酬率', dataIndex: 'pl__roi' },
                        ],
                    });

                    let mobileTableData = {};
                    let MIPMobileTableData = [];

                    realTimePrtLosSum?.MIP?.data.map((data, index) => {
                        MIPMobileTableData.push({
                            market__curr: (
                                <div>
                                    {data.market}
                                    <br />
                                    {data.curr}
                                </div>
                            ),
                            pro_name: <div>{data.pro_name}</div>,
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
                        {
                            title: '商品代碼',
                            dataIndex: 'fund_code',
                            sorter: (a, b) => a.fund_code.length - b.fund_code.length,
                            fixed: 'left',
                        },
                        {
                            title: '商品名',
                            dataIndex: 'fund_name',
                            sorter: (a, b) => a.fund_name.length - b.fund_name.length,
                            fixed: 'left',
                        },
                        {
                            title: '幣別',
                            dataIndex: 'purchase_cur',
                            filters: [
                                { text: 'NTD', value: 'NTD' },
                                { text: 'USD', value: 'USD' },
                                { text: 'RMB', value: 'RMB' },
                                { text: 'HKD', value: 'HKD' },
                                { text: 'JPY', value: 'JPY' },
                            ],
                            onFilter: (value, record) => record.purchase_cur.startsWith(value),
                            filterSearch: true,
                        },
                        {
                            title: '參考淨值',
                            dataIndex: 'nav',
                            render: nav => formatNum(nav),
                            align: 'right',
                        },
                        {
                            title: '參考市值',
                            dataIndex: 'namt',
                            render: namt => formatNum(namt),
                            align: 'right',
                        },
                        {
                            title: '台幣市值',
                            dataIndex: 'amount_twd',
                            render: amount_twd => formatNum(amount_twd),
                            sorter: (a, b) => a.amount_twd - b.amount_twd,
                            align: 'right',
                        },
                        {
                            title: '持有成本',
                            dataIndex: 'invest_cost',
                            sorter: (a, b) => a.invest_cost - b.invest_cost,
                            render: invest_cost => formatNum(invest_cost),
                            align: 'right',
                        },
                        {
                            title: '損益試算',
                            dataIndex: 'prtlos',
                            sorter: (a, b) => a.prtlos - b.prtlos,
                            render: prtlos => (
                                <div class={prtlos > 0 ? 'win' : prtlos < 0 ? 'loss' : ''}>{formatNum(prtlos)}</div>
                            ),
                            align: 'right',
                        },
                        {
                            title: '報酬率',
                            dataIndex: 'roi',
                            sorter: (a, b) => a.roi - b.roi,
                            render: roi => <div class={roi > 0 ? 'win' : roi < 0 ? 'loss' : ''}>{formatNum(roi)}%</div>,
                            align: 'right',
                        },
                        {
                            title: '累計配息',
                            dataIndex: 'acc_dividend',
                            sorter: (a, b) => a.acc_dividend - b.acc_dividend,
                            render: acc_dividend => formatNum(acc_dividend),
                            align: 'right',
                        },
                        {
                            title: '含息報酬率',
                            dataIndex: 'roi_dividend',
                            sorter: (a, b) => a.roi_dividend - b.roi_dividend,
                            render: roi_dividend => (
                                <div class={roi_dividend > 0 ? 'win' : roi_dividend < 0 ? 'loss' : ''}>
                                    {formatNum(roi_dividend)}%
                                </div>
                            ),
                            align: 'right',
                        },
                    ],
                };

                let WM_FUNDWebTableData = [];
                let WM_FUNDModalData = [];

                realTimePrtLosSum?.WM_FUND?.data.map((data, index) => {
                    WM_FUNDWebTableData.push({
                        fund_code: data.fund_code,
                        fund_name: data.fund_name,
                        purchase_cur: data.purchase_cur,
                        nav: data.nav,
                        namt: data.namt,
                        amount_twd: data.amount_twd,
                        invest_cost: data.invest_cost,
                        prtlos: data.prtlos,
                        roi: data.roi,
                        acc_dividend: data.acc_dividend,
                        roi_dividend: data.roi_dividend,
                        modalTitle: data.fund_name,
                    });

                    WM_FUNDModalData.push({
                        fund_code: data.fund_code,
                        fund_name: data.fund_name,
                        purchase_cur: data.purchase_cur,
                        nav: formatNum(data.nav),
                        namt: formatNum(data.namt),
                        amount_twd: formatNum(data.amount_twd),
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
                                {data.roi_dividend}%
                            </div>
                        ),
                        modalTitle: data.fund_name,
                    });
                });

                webTableData.WM_FUND = WM_FUNDWebTableData;
                modalMobileData.WM_FUND = WM_FUNDModalData;
                setModalAllData(modalMobileData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        WM_FUND: [
                            { title: '商品/幣別', dataIndex: 'fund_name__purchase_cur' },
                            { title: '淨值/市值', dataIndex: 'nav__namt' },
                            { title: '損益/台幣市值', dataIndex: 'prtlos__amount_twd' },
                            { title: '累計配息/含息報酬率', dataIndex: 'acc_dividend__roi_dividend' },
                        ],
                    });

                    let mobileTableData = {};
                    let WM_FUNDMobileTableData = [];

                    realTimePrtLosSum?.WM_FUND?.data.map((data, index) => {
                        WM_FUNDMobileTableData.push({
                            fund_name__purchase_cur: (
                                <div>
                                    {data.fund_name}
                                    <br />
                                    {data.purchase_cur}
                                </div>
                            ),
                            nav__namt: (
                                <div>
                                    {formatNum(data.nav)}
                                    <br />
                                    {formatNum(data.namt)}
                                </div>
                            ),
                            prtlos__amount_twd: (
                                <div>
                                    <span class={data.prtlos > 0 ? 'win' : data.prtlos < 0 ? 'loss' : ''}>
                                        {formatNum(data.prtlos)}
                                    </span>
                                    <br />
                                    {formatNum(data.amount_twd)}
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
                        {
                            title: '商品名稱',
                            dataIndex: 'fund_cn',
                            sorter: (a, b) => a.fund_cn.length - b.fund_cn.length,
                            fixed: 'left',
                        },
                        {
                            title: '參考損益',
                            dataIndex: 'trade_nonachieve',
                            sorter: (a, b) => a.trade_nonachieve.length - b.trade_nonachieve.length,
                            render: trade_nonachieve => (
                                <span class={trade_nonachieve > 0 ? 'win' : trade_nonachieve < 0 ? 'loss' : ''}>
                                    {formatNum(trade_nonachieve)}
                                </span>
                            ),
                            align: 'right',
                        },
                        {
                            title: '參考報酬率(%)',
                            dataIndex: 'trade_profit_rate',
                            sorter: (a, b) => a.trade_profit_rate.length - b.trade_profit_rate.length,
                            render: trade_profit_rate => (
                                <span class={trade_profit_rate > 0 ? 'win' : trade_profit_rate < 0 ? 'loss' : ''}>
                                    {formatNum(trade_profit_rate)}%
                                </span>
                            ),
                            align: 'right',
                        },
                        {
                            title: '參考市值',
                            dataIndex: 'trade_value',
                            sorter: (a, b) => a.trade_value.length - b.trade_value.length,
                            render: trade_value => formatNum(trade_value),
                            align: 'right',
                        },
                    ],
                };

                let OFWebTableData = [];
                let OFModalData = [];
                realTimePrtLosSum?.OF?.data.map((data, index) => {
                    OFWebTableData.push({
                        fund_cn: data.fund_cn,
                        trade_nonachieve: data.trade_nonachieve,
                        trade_profit_rate: data.trade_profit_rate,
                        trade_value: data.trade_value,
                        modalTitle: data.fund_cn,
                    });

                    OFModalData.push({
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
                        modalTitle: data.fund_cn,
                    });
                });

                webTableData.OF = OFWebTableData;
                modalMobileData.OF = OFModalData;

                setModalAllData(modalMobileData);
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

                    realTimePrtLosSum?.OF?.data.map((data, index) => {
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
                        {
                            title: '商品代碼',
                            dataIndex: 'fund_code',
                            sorter: (a, b) => a.fund_code.length - b.fund_code.length,
                            fixed: 'left',
                        },
                        {
                            title: '商品名',
                            dataIndex: 'fund_name',
                            sorter: (a, b) => a.fund_name.length - b.fund_name.length,
                            fixed: 'left',
                        },
                        {
                            title: '幣別',
                            dataIndex: 'purchase_cur',
                            filters: [
                                { text: 'NTD', value: 'NTD' },
                                { text: 'USD', value: 'USD' },
                                { text: 'RMB', value: 'RMB' },
                                { text: 'HKD', value: 'HKD' },
                                { text: 'JPY', value: 'JPY' },
                            ],
                            onFilter: (value, record) => record.purchase_cur.startsWith(value),
                            filterSearch: true,
                        },
                        {
                            title: '參考價',
                            dataIndex: 'nav',
                            align: 'right',
                        },
                        {
                            title: '參考市值',
                            dataIndex: 'namt',
                            render: namt => formatNum(namt),
                            align: 'right',
                        },
                        {
                            title: '申購價格',
                            dataIndex: 'purchase_nav',
                            render: purchase_nav => formatNum(purchase_nav),
                            align: 'right',
                        },
                        {
                            title: '付出成本',
                            dataIndex: 'invest_cost',
                            render: invest_cost => formatNum(invest_cost),
                            sorter: (a, b) => a.invest_cost.length - b.invest_cost.length,
                            align: 'right',
                        },
                        {
                            title: '損益試算',
                            dataIndex: 'prtlos',
                            render: prtlos => (
                                <span class={prtlos > 0 ? 'win' : prtlos < 0 ? 'loss' : ''}>{formatNum(prtlos)}</span>
                            ),
                            sorter: (a, b) => a.prtlos.length - b.prtlos.length,
                            align: 'right',
                        },
                        {
                            title: '累計配息',
                            dataIndex: 'acc_dividend',
                            render: acc_dividend => formatNum(acc_dividend),
                            sorter: (a, b) => a.acc_dividend.length - b.acc_dividend.length,
                            align: 'right',
                        },
                        {
                            title: '參考含息報酬率(%)',
                            dataIndex: 'roi_dividend',
                            render: roi_dividend => (
                                <span class={roi_dividend > 0 ? 'win' : roi_dividend < 0 ? 'loss' : ''}>
                                    {formatNum(roi_dividend)}%
                                </span>
                            ),
                            sorter: (a, b) => a.roi_dividend.length - b.roi_dividend.length,
                            align: 'right',
                        },
                    ],
                };

                let WM_SNWebTableData = [];
                let WM_SNModalData = [];
                realTimePrtLosSum?.WM_SN?.data.map((data, index) => {
                    WM_SNWebTableData.push({
                        fund_code: data.fund_code,
                        fund_name: data.fund_name,
                        purchase_cur: data.purchase_cur,
                        nav: parseFloat(data.nav),
                        namt: parseFloat(data.namt),
                        purchase_nav: parseFloat(data.purchase_nav),
                        invest_cost: parseFloat(data.invest_cost),
                        prtlos: parseFloat(data.prtlos),
                        acc_dividend: parseFloat(data.acc_dividend),
                        roi_dividend: parseFloat(data.roi_dividend),
                        modalTitle: data.fund_name,
                    });

                    WM_SNModalData.push({
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
                        modalTitle: data.fund_name,
                    });
                });

                webTableData.WM_SN = WM_SNWebTableData;
                modalMobileData.WM_SN = WM_SNModalData;

                setModalAllData(modalMobileData);
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

                    realTimePrtLosSum?.WM_SN?.data.map((data, index) => {
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
                        {
                            title: '商品代碼',
                            dataIndex: 'prod_no',
                            sorter: (a, b) => a.prod_no.length - b.prod_no.length,
                            fixed: 'left',
                        },
                        {
                            title: '商品名',
                            dataIndex: 'prod_name',
                            sorter: (a, b) => a.prod_name.length - b.prod_name.length,
                            fixed: 'left',
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
                        {
                            title: '參考價',
                            dataIndex: 'price',
                            align: 'right',
                        },
                        {
                            title: '參考市值',
                            dataIndex: 'market_amt',
                            render: market_amt => formatNum(market_amt),
                            align: 'right',
                        },
                        {
                            title: '付出成本',
                            dataIndex: 'total_amt',
                            render: total_amt => formatNum(total_amt),
                            align: 'right',
                        },
                        {
                            title: '損益試算',
                            dataIndex: 'ref_value_amt',
                            render: ref_value_amt => (
                                <div class={ref_value_amt > 0 ? 'win' : ref_value_amt < 0 ? 'loss' : ''}>
                                    {formatNum(ref_value_amt)}
                                </div>
                            ),
                            sorter: (a, b) => a.ref_value_amt.length - b.ref_value_amt.length,
                            align: 'right',
                        },
                        {
                            title: '報酬率(%)',
                            dataIndex: 'ref_value_prc',
                            render: ref_value_prc => (
                                <div class={ref_value_prc > 0 ? 'win' : ref_value_prc < 0 ? 'loss' : ''}>
                                    {formatNum(ref_value_prc)}%
                                </div>
                            ),
                            sorter: (a, b) => a.ref_value_prc.length - b.ref_value_prc.length,
                            align: 'right',
                        },
                    ],
                };

                let SNWebTableData = [];
                let SNModalData = [];

                realTimePrtLosSum?.SN?.data.map((data, index) => {
                    SNWebTableData.push({
                        prod_no: data.prod_no,
                        prod_name: data.prod_name,
                        currency: data.currency,
                        price: data.price,
                        market_amt: data.market_amt,
                        total_amt: data.total_amt,
                        ref_value_amt: data.ref_value_amt,
                        ref_value_prc: data.ref_value_prc,
                        modalTitle: data.prod_name,
                    });

                    SNModalData.push({
                        prod_no: data.prod_no,
                        prod_name: data.prod_name,
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
                        modalTitle: data.prod_name,
                    });
                });

                webTableData.SN = SNWebTableData;
                modalMobileData.SN = SNModalData;

                setModalAllData(modalMobileData);
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

                    realTimePrtLosSum?.SN?.data.map((data, index) => {
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
                        {
                            title: '商品代號',
                            dataIndex: 'symbol',
                            sorter: (a, b) => a.name.length - b.name.length,
                            fixed: 'left',
                        },
                        {
                            title: '商品名稱',
                            dataIndex: 'name',
                            sorter: (a, b) => a.symbol.length - b.symbol.length,
                            fixed: 'left',
                        },
                        {
                            title: '幣別',
                            dataIndex: 'trade_cur',
                            filters: [
                                { text: 'NTD', value: 'NTD' },
                                { text: 'USD', value: 'USD' },
                                { text: 'RMB', value: 'RMB' },
                                { text: 'HKD', value: 'HKD' },
                                { text: 'JPY', value: 'JPY' },
                            ],
                            onFilter: (value, record) => record.total_pv.startsWith(value),
                            filterSearch: true,
                        },
                        {
                            title: '持有面額',
                            dataIndex: 'total_pv',
                            render: total_pv => formatNum(total_pv),
                            align: 'right',
                        },
                        {
                            title: '參考市值',
                            dataIndex: 'total_value',
                            render: total_value => formatNum(total_value),
                            align: 'right',
                        },
                        {
                            title: '參考市值(台幣)',
                            dataIndex: 'total_value_twd',
                            render: total_value_twd => formatNum(total_value_twd),
                            sorter: (a, b) => parseInt(a.total_value_twd) - parseInt(b.total_value_twd),
                            align: 'right',
                        },
                    ],
                };

                let BONDWebTableData = [];
                let BONDModalData = [];

                realTimePrtLosSum?.BOND?.data.map((data, index) => {
                    BONDWebTableData.push({
                        name: data.name,
                        symbol: data.symbol,
                        total_pv: data.total_pv,
                        total_value: data.total_value,
                        total_value_twd: data.total_value_twd,
                        trade_cur: data.trade_cur,
                        modalTitle: data.name,
                    });

                    BONDModalData.push({
                        name: data.name,
                        symbol: data.symbol,
                        total_pv: data.total_pv,
                        total_value: formatNum(data.total_value),
                        total_value_twd: formatNum(data.total_value_twd),
                        trade_cur: data.trade_cur,
                        modalTitle: data.name,
                    });
                });

                webTableData.BOND = BONDWebTableData;
                modalMobileData.BOND = BONDModalData;

                console.log(webTableData);

                setModalAllData(modalMobileData);
                setTableData(webTableData);
                setColumnData(tableTitle);
                setModalTitleData(tableTitle);

                if (isMobile) {
                    setColumnData({
                        BOND: [
                            { title: '商品名稱', dataIndex: 'symbol' },
                            { title: '幣別', dataIndex: 'trade_cur' },
                            { title: '持有面額', dataIndex: 'total_pv' },
                            { title: '參考市值', dataIndex: 'total_value' },
                            { title: '參考市值(台幣)', dataIndex: 'total_value_twd' },
                        ],
                    });

                    let BONDMobileTableData = [];
                    let mobileTableData = {};

                    realTimePrtLosSum?.BOND?.data.map((data, index) => {
                        BONDMobileTableData.push({
                            symbol: data.symbol,
                            trade_cur: data.trade_cur,
                            total_pv: formatNum(data.total_pv),
                            total_value: formatNum(data.total_value),
                            total_value_twd: formatNum(data.total_value_twd),
                        });
                    });

                    mobileTableData.BOND = BONDMobileTableData;
                    setTableData(mobileTableData);
                }
                break;
            case 'WM_FUND_INTRANSIT':
                tableTitle = {
                    WM_FUND_INTRANSIT: [
                        {
                            title: '商品代碼',
                            dataIndex: 'fund_code',
                            sorter: (a, b) => a.fund_code.length - b.fund_code.length,
                            fixed: 'left',
                        },
                        {
                            title: '產品名稱',
                            dataIndex: 'fund_name',
                            sorter: (a, b) => a.fund_name.length - b.fund_name.length,
                            fixed: 'left',
                        },
                        { title: '交易日期', dataIndex: 'trade_dt' },
                        { title: '交易類別', dataIndex: 'fund_type' },
                        {
                            title: '幣別',
                            dataIndex: 'cur',
                            filters: [
                                { text: 'NTD', value: 'NTD' },
                                { text: 'USD', value: 'USD' },
                                { text: 'RMB', value: 'RMB' },
                                { text: 'HKD', value: 'HKD' },
                                { text: 'JPY', value: 'JPY' },
                            ],
                            onFilter: (value, record) => record.cur.startsWith(value),
                            filterSearch: true,
                        },
                        { title: '單位數', dataIndex: 'unit', align: 'right' },
                        { title: '手續費', dataIndex: 'management_fee', align: 'right' },
                        // { title : '參考現值', dataIndex: 'amount_twd'},
                        { title: '約當台幣', dataIndex: 'amount_twd', align: 'right' },
                    ],
                };

                let WM_FUND_INTRANSITWebTableData = [];

                realTimePrtLosSum?.WM_FUND_INTRANSIT?.data.map((data, index) => {
                    WM_FUND_INTRANSITWebTableData.push({
                        fund_code: data.fund_code,
                        fund_name: data.fund_name,
                        trade_dt: data.trade_dt,
                        fund_type: data.fund_type,
                        cur: data.cur,
                        unit: data.unit,
                        management_fee: data.management_fee,
                        amount_twd: data.amount_twd,
                        modalTitle: data.fund_name,
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

                    realTimePrtLosSum?.WM_FUND_INTRANSIT?.data.map((data, index) => {
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
                        {
                            title: '商品代碼',
                            dataIndex: 'fund_code',
                            sorter: (a, b) => a.fund_code.length - b.fund_code.length,
                            fixed: 'left',
                        },
                        {
                            title: '產品名稱',
                            dataIndex: 'fund_name',
                            sorter: (a, b) => a.fund_name.length - b.fund_name.length,
                            fixed: 'left',
                        },
                        { title: '交易日期', dataIndex: 'trade_dt' },
                        { title: '交易類別', dataIndex: 'fund_type' },
                        {
                            title: '幣別',
                            dataIndex: 'cur',
                            filters: [
                                { text: 'NTD', value: 'NTD' },
                                { text: 'USD', value: 'USD' },
                                { text: 'RMB', value: 'RMB' },
                                { text: 'HKD', value: 'HKD' },
                                { text: 'JPY', value: 'JPY' },
                            ],
                            onFilter: (value, record) => record.cur.startsWith(value),
                            filterSearch: true,
                        },
                        { title: '名目本金', dataIndex: 'invest_cost', align: 'right' },
                        // { title: '手續費', dataIndex: 'management_fee', align: 'right' },
                        // { title : '參考現值', dataIndex: 'amount_twd'},
                        // { title: '約當台幣', dataIndex: 'amount_twd', align: 'right' },
                    ],
                };

                let WM_SN_INTRANSITWebTableData = [];

                realTimePrtLosSum?.WM_SN_INTRANSIT?.data.map((data, index) => {
                    WM_SN_INTRANSITWebTableData.push({
                        fund_code: data.fund_code,
                        fund_name: data.fund_name,
                        trade_dt: data.trade_dt,
                        fund_type: data.fund_type,
                        cur: data.cur,
                        invest_cost: formatNum(invest_cost),
                        modalTitle: data.fund_name,
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
                            { title: '商品/幣別', dataIndex: 'fund_name__cur' },
                            { title: '交易日期/交易類別', dataIndex: 'trade_dt__fund_type' },
                            { title: '名目本金', dataIndex: 'invest_cost' },
                        ],
                    });

                    let mobileTableData = {};
                    let WM_SN_INTRANSITMobileTableData = [];

                    realTimePrtLosSum?.WM_SN_INTRANSIT?.data.map((data, index) => {
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
                            invest_cost: data.invest_cost,
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

                realTimePrtLosSum?.WM_TRUST_DEPOSIT?.data.map((data, index) => {
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

                    realTimePrtLosSum?.WM_TRUST_DEPOSIT?.data.map((data, index) => {
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
        WM_SN: [{ title: '結構型商品庫存', detailType: 'WM_SN' }],
        SN: [{ title: '結構型商品庫存', detailType: 'SN' }],
        BOND: [{ title: '海外債/境外結構型', detailType: 'BOND' }],
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
                body .sino__table .ant-table-tbody > tr > td {
                    white-space: break-spaces;
                }
            `}</style>
        </>
    );
});

export default AssetDetailTable;
