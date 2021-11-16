import noDataImg from '../../../../resources/images/components/oauthCancel/img-no-data.svg';
const Empty = ({ style, text }) => {
    return (
        <div className={'empty__container'} style={style}>
            <img className="noData__img" src={noDataImg} style={{ width: '110px', height: '110px' }} />
            <span className="noData__text">{text}</span>
            <style jsx>{`
                .empty__container {
                    text-align: center;
                }
                .noData__img {
                    display: block;
                    margin: 0 auto;
                }
                .noData__text {
                    width: 60%;
                    display: inline-block;
                    color: #3f5372;
                    font-size: 1.6rem;
                    margin-top: 24px;
                }
            `}</style>
        </div>
    );
};

export default Empty;
