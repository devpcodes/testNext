import { useEffect, useState } from 'react';
import AUD from '../../../../../../resources/images/components/tradingAccount/flag/AUD.png';
import TWD from '../../../../../../resources/images/components/tradingAccount/flag/TWD.png';
import USD from '../../../../../../resources/images/components/tradingAccount/flag/USD.png';
import JPY from '../../../../../../resources/images/components/tradingAccount/flag/JPY.png';
import CNY from '../../../../../../resources/images/components/tradingAccount/flag/CNY.png';
import EUR from '../../../../../../resources/images/components/tradingAccount/flag/EUR.png';
import GBP from '../../../../../../resources/images/components/tradingAccount/flag/GBP.png';
import ZAR from '../../../../../../resources/images/components/tradingAccount/flag/ZAR.png';
import NZD from '../../../../../../resources/images/components/tradingAccount/flag/NZD.png';
import HKD from '../../../../../../resources/images/components/tradingAccount/flag/HKD.png';
const ItemCard = ({ dataSource, lineNum }) => {
    const [Number, setNumber] = useState(1);
    useEffect(() => {
        if (lineNum) {
            setNumber(lineNum);
        }
    }, []);
    // const onChangeHandler = useCallback(val => {
    //     console.log(val);
    // });
    const iconSetting = id => {
        switch (id) {
            case 'USD':
                return <img className="title_icon" src={USD} />;
            case 'TWD':
                return <img className="title_icon" src={TWD} />;
            case 'HKD':
                return <img className="title_icon" src={HKD} />;
            case 'CNY':
                return <img className="title_icon" src={CNY} />;
            case 'JPY':
                return <img className="title_icon" src={JPY} />;
            case 'EUR':
                return <img className="title_icon" src={EUR} />;
            case 'GBP':
                return <img className="title_icon" src={GBP} />;
            case 'AUD':
                return <img className="title_icon" src={AUD} />;
            case 'ZAR':
                return <img className="title_icon" src={ZAR} />;
            case 'NZD':
                return <img className="title_icon" src={NZD} />;
            default:
                return null;
        }
    };
    return (
        <div className="total_box">
            {dataSource
                ? dataSource.map(x => {
                      return (
                          <div className="total_box_item">
                              <div className="total_box_title">
                                  {x.icon ? iconSetting(x.icon) : ''}
                                  {x.title}
                              </div>
                              <div className="total_box_content">{x.content}</div>
                          </div>
                      );
                  })
                : ''}
            <style jsx>
                {`
                    .total_box {
                        width: 100%;
                        display: flex;
                        justify-content: left;
                        flex-wrap: wrap;
                    }
                    .total_box .total_box_item {
                        width: calc(${100 / Number}% - 9px);

                        border: 1px solid #d7e0ef;
                        text-align: center;
                        margin-bottom: 10px;
                        margin-right: 10px;
                    }
                    .total_box .total_box_item:nth-child(${Number}n+${Number}) {
                        margin-right: 0;
                    }
                    .total_box .total_box_item .total_box_title {
                        border-bottom: 1px solid #d7e0ef;
                        background: #f2f5fa;
                        font-size: 14px;
                        line-height: 2;
                    }
                    .total_box .total_box_item .total_box_content {
                        background: #fff;
                        font-size: 16px;
                        line-height: 2.8;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .total_box .title_icon {
                        width: 18px;
                        margin-right: 5px;
                    }
                `}
            </style>
        </div>
    );
};

export default ItemCard;
