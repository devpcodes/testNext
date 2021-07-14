import noDataIcon from '../../../../resources/images/components/goOrder/sb/img-default.svg';
const NoData = ({ text }) => {
    return (
        <div className="noData__container">
            <div className="box">
                <img src={noDataIcon} />
                <p>{text}</p>
            </div>

            <style jsx>{`
                .noData__container {
                    position: relative;
                    margin-top: 10px;
                }
                .noData__container .box {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: center;
                    color: #6c7b94;
                    font-size: 1.6rem;
                }
            `}</style>
        </div>
    );
};

export default NoData;
