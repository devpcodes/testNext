import { useEffect, useState, useCallback } from 'react';
import { mappingShowChangeBtn, checkPriceUpdate } from '../../../../services/components/goOrder/dataMapping';
//{ ord_bs, status_code, price_flag, order_type1, delClickHandler, id }
const ControlBtns = ({ data, delClickHandler }) => {
    const [showControlBtn, setShowControlBtn] = useState(false);
    useEffect(() => {
        setShowControlBtn(mappingShowChangeBtn(data.status_code));
    }, [data.ord_bs, data.status_code, data.price_flag, data.order_type1]);
    const qtyUpdateHandler = useCallback(() => {});
    return (
        <div>
            {showControlBtn && (
                <>
                    <button className="btn" onClick={delClickHandler.bind(null, data.key)}>
                        <span>刪</span>
                    </button>
                    <button className="btn" onClick={qtyUpdateHandler}>
                        <span>改</span>
                    </button>
                    {checkPriceUpdate(data.price_flag, data.order_type1) && (
                        <button className="btn">
                            <span>價</span>
                        </button>
                    )}
                </>
            )}

            <style jsx>
                {`
                    .btn {
                        margin: 0;
                        padding: 0;
                        border: none;
                        outline: none;
                        background-color: ${data.ord_bs === 'B' ? '#feefed' : '#e7f7f1'};
                        color: ${data.ord_bs === 'B' ? '#f45a4c' : '#22a16f'};
                        padding-left: 4px;
                        padding-right: 4px;
                        margin-right: 4px;
                        font-weight: bold;
                        border-radius: 2px;
                        transition: all 0.3s;
                    }
                    .btn:last-child {
                        margin-right: 0;
                    }
                    .btn:hover {
                        background-color: ${data.ord_bs === 'B' ? '#ffded9' : '#d1f1e5'};
                    }
                `}
            </style>
        </div>
    );
};

export default ControlBtns;
