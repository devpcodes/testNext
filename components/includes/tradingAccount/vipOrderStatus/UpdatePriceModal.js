import { useEffect, useState, useRef, useCallback } from 'react';
import { formatPrice } from '../../../../services/numFormat';
import { getStockPriceRange, getStockType } from '../../../../services/stockTickType';
import ChangeNum from '../../goOrder/searchList/ChangeNum';

const UpdatePriceModal = ({ product, color, label, price, unit, value, getValue, stock_id, qty }) => {
    const [priceVal, setPriceVal] = useState('');
    useEffect(() => {
        setPriceVal(value);
    }, [value]);

    const plusPriceHandler = () => {
        if (isNaN(Number(priceVal))) {
            setPriceVal('');
            return;
        }
        const type = getStockType(stock_id || '').type;
        const unit = getStockPriceRange(type, priceVal, true);
        setPriceVal(formatPrice(parseFloat(priceVal) + unit));
    };

    const minusPriceHandler = () => {
        if (isNaN(Number(priceVal))) {
            setPriceVal('');
            return;
        }
        const type = getStockType(stock_id || '').type;
        const unit = getStockPriceRange(type, priceVal, true);
        if (parseFloat(priceVal) - unit <= unit) {
            setPriceVal(formatPrice(unit));
        } else {
            setPriceVal(formatPrice(parseFloat(priceVal) - unit));
        }
    };

    const priceChangeHandler = val => {
        setPriceVal(val);
    };

    const priceValHandler = useCallback(() => {
        if (getValue != null) {
            getValue(priceVal);
        }
    }, [priceVal]);

    return (
        <div>
            <p className="title">
                <span className="label">{label}</span>
                {product}
            </p>
            <p className="item-modal item-modalFirst">
                <span>委託價格</span>
                {formatPrice(price)}
            </p>
            <p className="item-modal">
                <span>委託數量</span>
                {qty + unit}
            </p>
            <ChangeNum
                title="新價格"
                inputWidth="calc(100% - 46px - 46px - 62px - 8px)"
                color="#f45a4c"
                fontSize="1.8rem"
                plusClickHandler={plusPriceHandler}
                minusClickHandler={minusPriceHandler}
                changeHandler={priceChangeHandler}
                val={priceVal}
            />
            {priceValHandler()}
            <style jsx>
                {`
                    .title {
                        font-size: 2.4rem;
                        font-weight: bold;
                        color: black;
                        margin-bottom: 5px;
                    }
                    .label {
                        color: ${color};
                    }
                    .item-modal {
                        display: inline-block;
                        color: #0d1623;
                        font-size: 1.6rem;
                        margin-bottom: 5px;
                    }
                    .item-modalFirst {
                        margin-right: 10%;
                    }
                    .item-modal span {
                        margin-right: 8px;
                    }
                    .control {
                        width: 100%;
                    }
                `}
            </style>
        </div>
    );
};

export default UpdatePriceModal;
