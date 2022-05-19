const VerticalTable = () => {
    return (
        <div className="verticalTable__container">
            <div className="item">
                <div className="item__left">銀行帳戶</div>
                <div>
                    <p className="item__p">永豐銀807</p>
                    <p className="item__p">123456789123</p>
                </div>
            </div>
            <style jsx>{`
                .verticalTable__container {
                    padding: 0 2px 0 2px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                }
                .item {
                    display: flex;
                    justify-content: space-between;
                }
                .item__p {
                    margin-bottom: 0;
                }
                .item__left {
                    border-right: solid 1px #d7e0ef;
                    background-color: #f2f5fa;
                    padding-left: 15px;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default VerticalTable;
