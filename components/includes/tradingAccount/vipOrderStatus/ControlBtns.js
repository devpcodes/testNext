import { useEffect, useState } from 'react';
import { mappingShowChangeBtn, checkPriceUpdate } from '../../../../services/components/goOrder/dataMapping';
const ControlBtns = ({ ord_bs, status_code, price_flag, order_type1 }) => {
    const [showControlBtn, setShowControlBtn] = useState(false);
    useEffect(() => {
        setShowControlBtn(mappingShowChangeBtn(status_code));
    }, [status]);
    return (
        <div>
            {showControlBtn && (
                <>
                    <button className="btn">
                        <span>刪</span>
                    </button>
                    <button className="btn">
                        <span>改</span>
                    </button>
                    {checkPriceUpdate(price_flag, order_type1) && (
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
                        background-color: ${ord_bs === 'B' ? '#feefed' : '#e7f7f1'};
                        color: ${ord_bs === 'B' ? '#f45a4c' : '#22a16f'};
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
                        background-color: ${ord_bs === 'B' ? '#ffded9' : '#d1f1e5'};
                    }
                `}
            </style>
        </div>
    );
};

export default ControlBtns;
