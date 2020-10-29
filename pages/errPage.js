import errImg from '../resources/images/components/errPage/img-loading-m.png';

function ErrPage({ errMsg }) {
    return (
        <>
            <div className="errPage__container">
                <div className="errPage__box">
                    <div className="err__img"></div>
                    <p>{errMsg}</p>
                </div>
            </div>

            <style jsx>{`
                .errPage__container {
                    width: 100%;
                    text-align: center;
                    height: 500px;
                    /* position: relative; */
                }
                .errPage__box {
                    padding-top: 150px;
                    /* position: absolute; */
                    /* top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%); */
                }
                .err__img {
                    width: 132px;
                    height: 120px;
                    margin: 0 auto;
                    background-image: url(${errImg});
                }
                .errPage__box p {
                    margin-top: 20px;
                    font-size: 1.6rem;
                }
            `}</style>
        </>
    );
}

export default ErrPage;
