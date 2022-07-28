const VerticalTable = ({ data, style }) => {
    return (
        <div className="verticalTable__container" style={style}>
            {data?.map((item, index) => {
                return (
                    <div className="item" key={index}>
                        <div className="item__left" style={item.labelStyle}>
                            <span className="label__val">{item.label}</span>
                        </div>
                        <div className="item__right" style={item.valueStyle}>
                            {item.value}
                        </div>
                    </div>
                );
            })}

            <style jsx>{`
                .verticalTable__container {
                    padding: 0 2px 0 2px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                }
                .item {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: solid 1px #d7e0ef;
                }
                .item:last-child {
                    border-bottom: none;
                }
                .item__p {
                    margin-bottom: 0;
                }
                .item__left {
                    border-right: solid 1px #d7e0ef;
                    background-color: #f2f5fa;
                    padding-left: 15px;
                    text-align: left;
                    position: relative;
                }
                .item__right {
                    padding: 5px 0;
                    text-align: right;
                    padding-right: 15px;
                }
                .label__val {
                    position: absolute;
                    top: 50%;
                    transform: translate(0, -50%);
                }
                @media (max-width: 360px) {
                    .item__left {
                        padding-left: 5px;
                        font-size: 14px;
                    }
                    .item__right {
                        padding-left: 5px;
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
};

export default VerticalTable;
