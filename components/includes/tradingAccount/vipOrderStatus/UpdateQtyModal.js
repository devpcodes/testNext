import { useEffect, useState, useRef, useCallback } from 'react';
import ChangeNum from '../../goOrder/searchList/ChangeNum';

const qtyUnit = 1;
const UpdateQtyModal = ({ product, color, label, price, qty, value, getValue }) => {
    const [qtyVal, setQtyVal] = useState('');
    const initValue = useRef('');
    const [disabledPlus, setDisabledPlus] = useState(true);
    useEffect(() => {
        // if(!initValue.current){
        //     initValue.current = value;
        // }
        setQtyVal(value);
    }, [value]);

    const plusPriceHandler = () => {
        setQtyVal(Number(qtyVal) + qtyUnit);
        plusDisabledHandler(Number(qtyVal) + qtyUnit);
    };

    const minusPriceHandler = () => {
        if (Number(qtyVal) - qtyUnit === 0) {
            setQtyVal(Number(qtyVal));
            plusDisabledHandler(Number(qtyVal));
        } else {
            setQtyVal(Number(qtyVal) - qtyUnit);
            plusDisabledHandler(Number(qtyVal) - qtyUnit);
        }
    };

    const qtyChangeHandler = val => {
        if (isNaN(Number(val))) {
            return;
        } else {
            if (Number(val) >= value) {
                plusDisabledHandler(val);
                setQtyVal(value);
                return;
            }
        }
        plusDisabledHandler(val);
        setQtyVal(val);
    };

    const plusDisabledHandler = val => {
        if (Number(val) >= Number(value)) {
            setDisabledPlus(true);
        } else {
            setDisabledPlus(false);
        }
    };

    const qtyValHandler = useCallback(() => {
        if (getValue != null) {
            getValue(qtyVal);
        }
    }, [qtyVal]);

    return (
        <div>
            <p className="title">
                <span className="label">{label}</span>
                {product}
            </p>
            <p className="item-modal item-modalFirst">
                <span>委託價格</span>
                {price}
            </p>
            <p className="item-modal">
                <span>委託數量</span>
                {value}
            </p>
            <ChangeNum
                title="欲減量"
                inputWidth="calc(100% - 46px - 46px - 62px - 8px)"
                color="#f45a4c"
                fontSize="1.8rem"
                plusClickHandler={plusPriceHandler}
                minusClickHandler={minusPriceHandler}
                changeHandler={qtyChangeHandler}
                val={qtyVal}
                disabledPlus={disabledPlus}
            />
            {qtyValHandler()}
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

export default UpdateQtyModal;
