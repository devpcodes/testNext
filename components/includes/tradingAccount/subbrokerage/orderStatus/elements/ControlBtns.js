const ControlBtns = ({ BS, CanCancel, CanModify }) => {
    return (
        <>
            {CanCancel === 'Y' && (
                <button className="btn">
                    <span>刪</span>
                </button>
            )}
            {CanModify === 'Y' && (
                <button className="btn">
                    <span>改</span>
                </button>
            )}
            <style jsx>
                {`
                    .btn {
                        margin: 0;
                        padding: 0;
                        border: none;
                        outline: none;
                        background-color: ${BS === 'B' ? '#feefed' : '#e7f7f1'};
                        color: ${BS === 'B' ? '#f45a4c' : '#22a16f'};
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
                        background-color: ${BS === 'B' ? '#ffded9' : '#d1f1e5'};
                    }
                `}
            </style>
        </>
    );
};
export default ControlBtns;
