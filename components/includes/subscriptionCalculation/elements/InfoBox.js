const InfoBox = ({ title, style, data }) => {
    return (
        <div className="info__container" style={style}>
            <div className="head">
                <h3 className="title">{title}</h3>
            </div>
            <div className="content">
                {data.map(item => {
                    return (
                        <div className="item">
                            <span className="item__label">{item.label}</span>
                            <span className="item__val" style={item?.valStyle || {}}>
                                {item.val}
                            </span>
                        </div>
                    );
                })}
            </div>
            <style jsx>{`
                .info__container {
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                }
                .title {
                    font-size: 16px;
                    color: #3f5372;
                    text-align: center;
                    line-height: 37px;
                }
                .head {
                    height: 37px;
                    border-bottom: solid 1px #d7e0ef;
                    background-color: #f2f5fa;
                }
                .content {
                    padding: 8px 20px 15px 20px;
                }
                .item {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 7px;
                }
                .item__label {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                }
                .item__val {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    text-align: right;
                    color: #0d1623;
                }
            `}</style>
        </div>
    );
};

export default InfoBox;
