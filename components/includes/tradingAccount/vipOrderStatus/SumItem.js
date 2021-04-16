const SumItem = ({ title, info, style, className }) => {
    const getClassName = () => {
        if (className == null) {
            return 'box__container';
        } else {
            return 'box__container ' + className;
        }
    };
    return (
        <>
            <div className={getClassName()}>
                <h3 className="title">{title}</h3>
                <p className="info">{info}</p>
            </div>
            <style jsx>{`
                .box__container {
                    display: inline-block;
                    border: 1px solid #d7e0ef;
                    border-radius: 2px;
                }
                .title {
                    background-color: #f2f5fa;
                    text-align: center;
                    display: block;
                    padding: 4px 10px;
                    font-size: 1.4rem;
                    color: #6c7b94;
                    margin: 0;
                    border-bottom: 1px solid #d7e0ef;
                }
                .info {
                    color: #0d1623;
                    font-weight: bold;
                    text-align: center;
                    font-size: 1.6rem;
                    margin: 0;
                    padding: 8px 10px;
                }
            `}</style>
        </>
    );
};

export default SumItem;
