import { useEffect, useMemo, useState } from 'react';
import { Modal, Select, Button, Input   } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import { postInventoryWithSwr, postInventoryBalance, postBankBalance} from '../../../../../../services/components/goOrder/sb/postInventory';
import { getToken } from '../../../../../../services/user/accessToken';
import AccountTable from '../../../vipInventory/AccountTable';
import IconBtn from '../../../vipInventory/IconBtn';
const AccBalance = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [accountType, setAccountType] = useState('');
    const [inputData, setInputData] = useState(null);
    const [settleType, setSettleType] = useState('');
    const [currency, setCurrency] = useState('');
    const [dataSource, setDataSource] = useState({
        amount:'',
        balance:'',
        buyingPower:'',
        currency:'',
        t_1:'',
        t_2:'',
    });
    const [dataCurrent, setDataCurrent] = useState('2');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCashModalVisible, setIsCashModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [modalText, setModalText] = useState({title:'',content:''});
    const [backact, setBackact] = useState('');
    const [bankData, setBankData] = useState('');
    const [topLoading, setTopLoading] = useState(true);
    const [bottomLoading, setBottomLoading] = useState(true);
    const columns = [
        {
            title: '幣別',
            dataIndex: 'currency',
            key: 'currency',
            align: 'center',
            width:'10%',
        },{
            title: '下單可用餘額',
            dataIndex: 'buyingPower',
            key: 'buyingPower',
            align: 'center',
            width:'20%',
        },{
            title: '銀行可用餘額-交割',
            dataIndex: 'balance',
            key: 'balance',
            align: 'center',
            width:'20%',
        },{
            title: 'T-1日在途',
            dataIndex: 't_1',
            key: 't_1',
            align: 'center',
            width:'15%',
        },{
            title: 'T-2日在途',
            dataIndex: 't_2',
            key: 't_2',
            align: 'center',
            width:'15%',
        },{
            title: 'T日賣出成交',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            width:'20%',
        }      
    ];
    const columnsAcc = [{
            title: '幣別',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width:'30%',
        },{
            title: '幣別代號',
            dataIndex: 'currency',
            key: 'currency',
            align: 'center',
            width:'35%',
        },{
            title: '帳戶餘額',
            dataIndex: 'amt',
            key: 'amt',
            align: 'center',
            width:'35%',
        }      
    ];
    useEffect(() => {
        setTopLoading(true)
        let AID = currentAccount.broker_id + currentAccount.account
        postInventoryBalance(AID,getToken(),dataCurrent)
        .then(res => {
            if(res){
            let r = res
            !res.buyingPower? r.buyingPower='-':''
            !res.balance? r.balance='-':''
            !res.t_1? r.t_1='-':''
            !res.t_2? r.t_2='-':''
            !res.amount? r.amount='-':''
            setDataSource(res)
            setCurrency(res.currency)
            }
            //setBackact({act:res.act_backact,ntd:res.ntd_backact})
            if(settleType==""&&res.settle_type){
            setSettleType(res.settle_type)   
            // console.log('SettleType',settleType) 
            }
            setTopLoading(false)
        })
    },[dataCurrent,refresh])

    useEffect(() => {
        setBottomLoading(true)
        if(settleType=="2"||settleType=="4"){
            let AID = currentAccount.broker_id + currentAccount.account
            let UID = currentAccount.idno
            postBankBalance(AID,getToken(),UID)
            .then(res =>{
                if(settleType=="2"){
                    setBackact(res.act_backact)
                }else if(settleType=="4"){
                    setBackact(res.ntd_backact)
                }
                console.log(res.detail)
                setBankData(res.detail)
                setBottomLoading(false)
            })   
        }
    },[settleType,refresh])

    const { Option } = Select;

    const handleChange = (value) => {
    setDataCurrent(value)    
    console.log(`selected ${value}`);
    }

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
      const onRefresh = () =>{
        let r = refresh
        setRefresh(r+1)
    }
    return (
        <div className="brokerage">
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
                <IconBtn type={'refresh'} onClick={onRefresh} className="action_btn"> </IconBtn>    
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
                                <td>{dataSource.currency?dataSource.currency:'-'}</td>
                            </tr>
                            <tr>
                                <td>預估可出金金額:</td>
                                <td>{dataSource.balance?dataSource.balance:'-'}</td>
                            </tr>
                            <tr>
                                <td>出金金額:</td>
                                <td><Input placeholder="請輸入金額" value={inputData} onChange={InputChange} type="number"/></td>
                            </tr>
                        </table>
                    </div>
                </Modal>
            </div>
            {/* <table className="balance_table">
                <tbody>
                    <tr>
                        <td>幣別</td>
                        <td>{dataSource.currency?dataSource.currency:'-'}</td>
                    </tr>
                    <tr>
                        <td>下單可用餘額</td>
                        <td>{dataSource.buyingPower?dataSource.buyingPower:'-'}</td>
                    </tr>
                    <tr>
                        <td>銀行可用餘額-交割</td>
                        <td>{dataSource.balance?dataSource.balance:'-'}</td>
                    </tr>
                    <tr>
                        <td>T-1日在途</td>
                        <td>{dataSource.t_1?dataSource.t_1:'-'}</td>
                    </tr>
                    <tr>
                        <td>T-2日在途</td>
                        <td>{dataSource.t_2?dataSource.t_2:'-'}</td>
                    </tr>
                    <tr>
                        <td>T日賣出成交</td>
                        <td>{dataSource.amount?dataSource.amount:'-'}</td>
                    </tr>
                </tbody>
            </table> */}
            <AccountTable 
            dataSource={[dataSource]} 
            pagination={false} 
            columns={columns}
            loading={topLoading}
            />
           {(settleType=='2'||settleType=='4')?(
            <div className="bank_table">
            <p>{settleType=='2'?('外幣'):('台幣')}自有帳戶:<span>{backact}</span></p>
            <AccountTable 
            dataSource={bankData} 
            pagination={false} 
            columns={columnsAcc}
            loading={bottomLoading}
            />
            {/* <table className="balance_table_bank">
            <thead>
                <tr>
                    <th>幣別</th>
                    <th>幣別代號</th>
                    <th>帳戶餘額</th>
                </tr>                
            </thead>
                <tbody>
                {
                    bankData.map(x=>{
                    return(
                    <tr>
                        <td>{x.name}</td>
                        <td>{x.currency}</td>
                        <td>{x.amt}</td>
                    </tr>                            
                    )
                    })
                }

            </tbody>
        </table>  */}
        </div>              
           ):null}        
            <style jsx>
                {`
                .action_box{display:flex;justify-content: space-between;align-items: center;margin-bottom:10px; }
                
                .balance_table {width:100%;font-size:16px; line-height:2; margin-top:20px;}
                .balance_table tr td{width:50%;text-align:center;border:1px solid grey;}
                .balance_table tr td:first-child{background-color:#f2f5fa;color:#6c7b94;}

                .balance_table_bank {width:100%;font-size:16px; line-height:2; margin-top:20px;}
                .balance_table_bank tr td,
                .balance_table_bank tr th{text-align:center;border:1px solid grey;}
                .balance_table_bank tr td:not(:first-child){width:35%}
                .balance_table_bank tr th{background-color:#f2f5fa;color:#6c7b94;}
                .bank_table {margin:45px auto;}
                .bank_table p{font-size:16px;}
                .bank_table p span{color:#1890ff;font-weight:700;margin-left:0.5em;}
        
                `}
            </style>
            <style global jsx>
                {`
                .brokerage .action_box .action_btn,
                .brokerage .action_box .ant-btn{margin-left:10px;}
                
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
