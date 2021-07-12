import { useEffect, useState, useCallback, useMemo } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import AccountTable from './AccountTable';
import DropfilterCheckBox from './DropfilterCheckBox';
import DropFilterSearch from './DropFilterSearch';
import { fetchInventory, fetchInventoryWithSWR } from '../../../../services/components/announcement/fetchPageInfo';
import useSWR from 'swr';
import TopTagBar  from './TopTagBar';
const AnnounceTable = ({ listData,getList,topBarTag, getType, getColumns, getData, getPageInfoText, reload }) => {
    const [columns, setColumns] = useState([]);
    const [State, setState] = useState('');
    const [list, setList] = useState(listData);
    const [list_main, setListMain] = useState([]);
    const [list_sub, setListSub] = useState([]);
    const [list_tag, setListTag] = useState();
    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [dataType, setDataType] = useState('');
    const [searchColumn, setSearchColumn] = useState([]);
    const [searchColumn2, setSearchColumn2] = useState([]);
    const [searchWords, setSearchWords] = useState(''); 
    const [pageInfo, setPageInfo] = useState([]);
    const [current, setCurrent] = useState(''); 
useEffect(() => {  //選單初始值
    getList().then(res=>{ 
        setList(res) 
        setListMain(res.category1List)
        setListSub(res.category2List)
        newColumsUpdate(res.category1List,res.category2List)
    })
},[State])

useEffect(() => { 
    console.log(dataType)
 },[dataType])
 
useEffect(() => { //子選單變更
    if(searchColumn.length>0){
    let arr = []
    let list_ = []
    searchColumn.map(x=>{
        arr = arr.concat(list.List_lib[x])
    })
    let arr_ = arr.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    })
    arr_.map((x,i)=>{
        list_.push({text:x,value:x,key:'C2'+i})
    })
    setListSub(list_)
    } else {
    setListSub(list.category2List)
    }
},[searchColumn])

useEffect(() => {
    newColumsUpdate(list_main,list_sub)
},[list_sub])

useEffect(() => {  
        const GetNewData = async()=>{
            try {
                // getType()
                // .then(res=>{
                //     setDataType(res)
                // })
                getData(currentPage, pageSize, dataType , searchColumn, searchColumn2)
                .then(res=>{
                    console.log('[RES]',res)
                    setRows(res.rows)  
                    setTotal(res.dataCount) 
                    setCurrentPage(res.pageIdx) 
                    setPageSize(res.pageSize) 
                })
                } catch(error) {
                console.log('[error]',error)
                }
            }  
        GetNewData()  
    },[currentPage,searchColumn,searchColumn2,dataType]) 
    const t_filterColumns = [];
    const newColumsUpdate = (d1, d2)=>{
        const newColumns = [
            {
                title: '項目',
                dataIndex: 'seq',
                key: 'seq',
            },
            {
                title: '商品類別',
                dataIndex: 'category1',
                key: 'category1',
                ...getColumnSearchProps(d1,1)
            },
            {
                title: '子類別',
                dataIndex: 'category2',
                key: 'category2',
                ...getColumnSearchProps(d2,2)
            },
            {
                title: '標題',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '公告類別',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '發布日期',
                dataIndex: 'postTime',
                key: 'postTime',
            },
            ];  
        setColumns(newColumns); 
    }

    const onFdSubmit = useCallback((confirm, val) => { //主類別過濾
        confirm();
        setSearchColumn(val)
        onFdReset2(confirm)
    });

    const onFdSubmit2 = useCallback((confirm, val) => { //子類別過濾
        confirm();
        setSearchColumn2(val)
        setCurrentPage(1);
    });

    const onFdReset = useCallback(confirm => {
        confirm();
            setSearchColumn([])
            setCurrentPage(1);
    });

    const onFdReset2 = useCallback(confirm => {
        confirm();
            setSearchColumn2([])
            setCurrentPage(1);
    });

    const searchResetHandler = useCallback(confirm => {
        confirm();
    });
    const pageChangeHandler = (page, pageSize) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };
    const TopBarChange = (value) =>{
        setDataType(value)
    }

const getColumnSearchProps = (data,idx) => {
        if(idx===1){
        return {
        filterDropdown: ({ confirm }) => (
            <DropfilterCheckBox
                type={''}
                onSubmit={onFdSubmit.bind(null, confirm)}
                onReset={onFdReset.bind(null, confirm)}
                value = ''
                data={data}
            />
        ),
            }
        }else{
        return {
            filterDropdown: ({ confirm }) => (
                <DropfilterCheckBox
                    type={''}
                    onSubmit={onFdSubmit2.bind(null, confirm)}
                    onReset={onFdReset2.bind(null, confirm)}
                    value = ''
                    data={data}
                />
            ),
                }           
        }

    };
    return (
        <>
            <TopTagBar
                 current = { current }
                 onClick = {TopBarChange}
              />
            <AccountTable
            dataSource = {rows}
            columns = {columns}
            filterColumns = {t_filterColumns}
            pagination={{
                total: total,
                showTotal: (total, range) => {
                    if (getPageInfoText != null) {
                        getPageInfoText(`${range[0]}-${range[1]} 檔個股 (共${total}檔個股)`);
                    }
                    return `${range[0]}-${range[1]} 檔個股 (共${total}檔個股)`;
                },
                defaultPageSize: pageSize,
                defaultCurrent: 1,
                showSizeChanger: false,
                onChange: pageChangeHandler,
                responsive: true,
                current: currentPage,
                pageSize: pageSize,
            }}
            />
            <style global jsx>{`
            .ant-table-filter-trigger{margin:0}
                .page__container {
                    background-color: #f9fbff;
                }
                .ant-input {
                    border: 1px solid #e6ebf5;
                }
                .vipInventoryStock {
                    font-weight: bold;
                }
                @media (max-width: 768px) {
                    .vipInventoryStock {
                        white-space: normal !important;
                    }
                }
                /* .ant-table-filter-dropdown {
                    width: 148px;
                    height: 217px;
                    padding-top: 15px;
                } */
            `}</style>
        </>
    );
   
};

export default AnnounceTable;
