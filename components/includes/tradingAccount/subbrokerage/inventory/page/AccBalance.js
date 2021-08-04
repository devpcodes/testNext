import { useEffect, useMemo, useState } from 'react';
import { Modal, Select, Button, Input   } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import { postInventoryWithSwr, postInventoryBalance, postBankAccount} from '../../../../../../services/components/goOrder/sb/postInventory';
import { getToken } from '../../../../../../services/user/accessToken';
import AccountTable from '../../../vipInventory/AccountTable';
const AccBalance = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [accountType, setAccountType] = useState('');
    const [inputData, setInputData] = useState(null);
    const [dataSource, setDataSource] = useState({
        amount:null,
        balance:null,
        buyingPower:null,
        currency:null,
        t_1:null,
        t_2:null,
    });
    const [dataFilter, setDataFilter] = useState({});
    const [dataCurrent, setDataCurrent] = useState('2');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCashModalVisible, setIsCashModalVisible] = useState(false);
    const [modalText, setModalText] = useState({title:'',content:''});
    useEffect(() => {
        setDataCurrent('2')
    },[])
    
    useEffect(() => {
        let AID = currentAccount.broker_id + currentAccount.account
        //postBankAccount(AID,getToken())
        postInventoryBalance(AID,getToken(),dataCurrent)
        .then(res => {
            console.log(res.bank_balance_detail)
            if(res.bank_balance_detail){
             var ds_ = {currency:res.bank_balance_detail[0].currency}
             res.bank_balance_detail.map(x=>{
                if(x.balance_type=="1"){
                    ds_.Balance = x.Balance
                }else if(x.balance_type=="2"){
                    ds_.t1 = x.t_1
                    ds_.t2 = x.t_2
                    ds_.t = x.amount
                }else{
                    ds_.buyingPower = x.buying_power
                }
            })   
            }
            setDataSource(ds_)
            setAccountType(res.settle_type)
        })
    },[dataCurrent])
    

    const { Option } = Select;
    const handleChange = (value) => {
    setDataCurrent(value)    
    console.log(`selected ${value}`);
    }

    // const postData = useMemo(() => {
    //     if (currentAccount.account != null) {
    //         const postData = {
    //             AID: currentAccount.broker_id + currentAccount.account,
    //             token: getToken(),
    //         };
    //         return postData;
    //     } else {
    //         return {};
    //     }
    // }, [currentAccount]);

    // const { data: fetchData } = useSWR([JSON.stringify(postData)], postInventoryWithSwr, {
    //     onError: (error, key) => {
    //         Modal.error({
    //             title: error,
    //         });
    //     },
    //     errorRetryCount: 3,
    //     focusThrottleInterval: 10000,
    //     errorRetryInterval: 10000,
    // });

    // useEffect(() => {
    //     if (Array.isArray(fetchData)) {
    //         const newData = fetchData.map((item, index) => {
    //             item.key = index;
    //             return item;
    //         });
    //         console.log(newData)
    //         setData(newData);
    //     }
        
    // }, [fetchData]);

    const showCashModal = (e) => {
        e.preventDefault();
        setIsCashModalVisible(true);
        }
    const showModal = (e,n) => {
        e.preventDefault();
        let title = ''
        let content = ''
        if(n==0){
            title = '出金說明'
            content = `
            <p>1.當日出金時間為9:00~12:00,下午14:30後入帳。</p>
            <p>2.超過中午12:00申請出金者, 於下一營業日下午14:30後入帳。</p>
            `
        }else{
            title = '帳戶餘額說明'
            content = `
            <p>1.下單可用金額=銀行餘額＋T＋1/T＋2/T＋3在途款＋當日賣出成交-當日買進委託。</p>
            <p>2.可出金金額 = 銀行昨日餘額 - 出金金額台 / 外幣自有專戶。</p>
            <p>3.已圈存金額 = T ＋ 1 + T ＋ 2在途款 ＋ 當日賣出成交 - 當日買進委託。</p>
            <p>4.台/外幣自有專戶無需申請出金美股若無成交客戶, 購買力於隔天晚上21:00才會再更新。</p>
            `
        }
        setModalText({title:title,content:content})
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
      const handleCancel = () => {
        setIsCashModalVisible(false);
      };
      const CashOut = () => {
        setIsCashModalVisible(false);
      };
      const CashOutAll = () => {
        setIsCashModalVisible(false);
      };
      const InputChange = (e) => {
        setInputData(e.target.value)
        console.log(e.target.value)
      };

    return (
        <div className="brokerage">
            {/* <AccountTable 
            dataSource={data} 
            pagination={false} 
            columns={columns}
            /> */}
            <div className="action_box">
                <div>
                <Select defaultValue={dataCurrent} style={{ width: 120 }} onChange={handleChange}>
                    <Option value="2">美國</Option>
                    <Option value="0">香港</Option>
                    <Option value="1">日本</Option>
                    <Option value="8">滬股通</Option>
                    <Option value="9">深股通</Option>
                </Select>
                <Button type="primary" onClick={showCashModal}>出金</Button>
                <Button onClick={e=>showModal(e,0)}>出金說明</Button>
                </div>
                <div>
                <Button onClick={e=>showModal(e,1)}>說明</Button>    
                <Button type="primary">更新</Button>    
                </div>
                <Modal 
                title={modalText.title} 
                visible={isModalVisible} 
                closable={false}//{ , className: "modal-footer-hiden-button" }
                footer={[
                    <Button onClick={handleOk}>關閉</Button>
                ]} >
                    <div dangerouslySetInnerHTML={{__html:modalText.content}}></div>
                </Modal>
                <Modal 
                className="CashModal"
                title='出金'
                visible={isCashModalVisible} 
                onCancel={handleCancel} 
                footer={[
                    <Button onClick={CashOut}>確認出金</Button>,
                    <Button onClick={CashOutAll}>全部出金</Button>
                ]} >
                    <div>
                        <table>
                            <tr>
                                <td>幣別:</td>
                                <td>{dataSource.currency==null?'-':dataSource.currency}</td>
                            </tr>
                            <tr>
                                <td>預估可出金金額:</td>
                                <td>{dataSource.balance==null?'-':dataSource.balance}</td>
                            </tr>
                            <tr>
                                <td>出金金額:</td>
                                <td><Input placeholder="請輸入金額" value={inputData} onChange={InputChange} type="number"/></td>
                            </tr>
                        </table>
                    </div>
                </Modal>
            </div>
            <table className="balance_table">
                <tbody>
                    <tr>
                        <td>幣別</td>
                        <td>{dataSource.currency==null?'-':dataSource.currency}</td>
                    </tr>
                    <tr>
                        <td>下單可用餘額</td>
                        <td>{dataSource.buyingPower==null?'-':dataSource.buyingPower}</td>
                    </tr>
                    <tr>
                        <td>銀行可用餘額-交割</td>
                        <td>{dataSource.balance==null?'-':dataSource.balance}</td>
                    </tr>
                    <tr>
                        <td>T-1日在途</td>
                        <td>{dataSource.t_1==null?'-':dataSource.t_1}</td>
                    </tr>
                    <tr>
                        <td>T-2日在途</td>
                        <td>{dataSource.t_2==null?'-':dataSource.t_2}</td>
                    </tr>
                    <tr>
                        <td>T日賣出成交</td>
                        <td>{dataSource.amount==null?'-':dataSource.amount}</td>
                    </tr>
                </tbody>
            </table>
            
            <style jsx>
                {`
                .action_box{display:flex;justify-content: space-between; }
                .action_box > div > Button{margin-left:10px; }
                .balance_table {width:100%;font-size:16px; line-height:2; margin-top:20px;}
                .balance_table tr td{width:50%;text-align:center;border:1px solid grey;}
                .balance_table tr td:first-child{background-color:#f2f5fa;color:#6c7b94;}

                `}
            </style>
            <style global jsx>
                {`
                .brokerage .action_box .ant-btn{margin-left:10px; }
                .brokerage .action_box .ant-btn:hover:not(.ant-btn-primary){border-color:rgb(196, 56, 38); color:rgb(196, 56, 38); }
                .brokerage .action_box .ant-btn-primary{margin-left:10px; background: rgb(196, 56, 38); border-color: rgb(196, 56, 38)}
                .brokerage .action_box .ant-btn-primary:hover{filter: brightness(1.1);}
                .CashModal table tr td{width:50%;font-size:14px; line-height:2;padding:0 10px;}
                .CashModal table tr td:first-child{text-align:right; }
                .CashModal table tr td:last-child{text-align:center; }
                .CashModal table tr td input{text-align:center; }
                `}
            </style>
        </div>
    );
};

export default AccBalance;
