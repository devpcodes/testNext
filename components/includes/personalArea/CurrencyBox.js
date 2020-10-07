import PropTypes from 'prop-types';

const CurrencyBox = ({currencyData}) => {
    return (
        <>
            <div className="currency__box">
                {currencyData.length > 0 ? currencyData.map((item, index) => (
                    <div className="currency__item" key={index}>
                        <span className="currency">{item.currency}</span>
                        <p className="amount">{item.amount}</p>
                    </div>
                )) : <p>--</p>}
            </div>
            <style jsx>{`
                .currency {
                    border: 1px solid #a9b6cb;
                    border-radius: 3px;
                    font-size: 10px;
                    color: #a9b6cb;
                    padding: 0 1px;
                }
                @media (max-width:768px){
                    .currency{
                        border: 1px solid white;
                        color: white;
                    }
                }
                .amount {
                    font-size: 2.6rem;
                    font-weight: bold;
                }
                .currency__item {
                    width: 50%;
                    display: inline-block;
                }
                @media (max-width:768px){
                    .currency__item{
                        float: left;
                    }
                }
                @media (max-width:768px){
                    .currency__box{
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}
CurrencyBox.propTypes = {
    currencyData: function(props){
        const err = [];
        if(props.currencyData == null){
            return new Error('需要currencyData');
        }
        if(!Array.isArray(props.currencyData)){
            return new Error('需要陣列');
        }
        if(props.currencyData.length !== 0){
            props.currencyData.forEach((obj) => {
                if(obj.currency == null){
                    err.push('error')
                }
                if(obj.amount == null){
                    err.push('error')
                }
            })
        }
        return err.length !== 0 && new Error('沒有必要的key: currency, amount');
    }
}
export default CurrencyBox;