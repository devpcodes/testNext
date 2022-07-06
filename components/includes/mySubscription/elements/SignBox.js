import icon from '../../../../resources/images/components/mySubscription/basic-help-circle (3).svg';
import goIcon from '../../../../resources/images/components/mySubscription/arrow-chevron-down-copy (3).svg';
const SignBox = ({ title, content, style }) => {
    return (
        <div className="money__container" style={style}>
            <div className="money__header">
                {title.map((element, i) => {
                    return (
                        <React.Fragment key={i}>
                            <span style={element.style}>
                                {!!element.icon && <img className="title__icon" src={icon} />}
                                {element.val}
                            </span>
                            {element.linkText && <a className="money__Alink">{element.linkText}</a>}
                            {i !== title.length - 1 && <div className="money__line--head"></div>}
                        </React.Fragment>
                    );
                })}
            </div>
            <div className="money__content">
                <React.Fragment>
                    <div className="money__item">
                        {/* <p className="money__label">{element.label}</p> */}
                        <p className="money__val">{content}</p>
                        <img
                            src={goIcon}
                            className="go__icon"
                            style={{
                                marginLeft: '5px',
                                // marginTop: '-9px',
                            }}
                        />
                    </div>
                </React.Fragment>
            </div>
            <style jsx>{`
                .go__icon {
                    margin-top: -9px;
                }
                .title__icon {
                    margin-top: -2px;
                    margin-right: 2px;
                }
                .money__container {
                    height: 130px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                }
                .money__header {
                    position: relative;
                    height: 39px;
                    background-color: #f2f5fa;
                    border-bottom: 1px solid #d7e0ef;
                    text-align: center;
                    color: #3f5372;
                    font-size: 16px;
                    line-height: 39px;
                    display: flex;
                    justify-content: space-around;
                }
                .money__Alink {
                    position: absolute;
                    right: 12px;
                    font-size: 14px;
                    color: #0d1623;
                }
                .money__content {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 22px;
                }
                .money__label {
                    text-align: center;
                    color: #3f5372;
                    font-size: 14px;
                    margin-bottom: 0;
                    /* margin-top: 18px; */
                }
                .money__val {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    color: #c97b1d;
                    margin-bottom: 0;
                    margin-top: 0px;
                    display: inline-block;
                }
                .money__line {
                    width: 1px;
                    height: 44px;
                    background-color: #d7e0ef;
                }
                .money__item {
                    flex: 1 0 0;
                    text-align: center;
                    cursor: pointer;
                }
                @media (max-width: 900px) {
                    .money__Alink {
                        right: 0;
                        font-size: 12px;
                    }
                }
                @media (max-width: 768px) {
                    .money__header {
                        height: 28px;
                        line-height: 28px;
                    }
                    .money__line--head {
                        height: 13px;
                        background-color: #d7e0ef;
                        width: 1px;
                        margin-top: 5px;
                    }
                    .money__container {
                        border-left: none;
                        border-right: none;
                        height: 93px;
                    }
                    .money__label {
                        font-size: 12px;
                        color: #3f5372;
                    }
                    .money__val {
                        font-size: 16px;
                    }
                    .money__content {
                        margin-top: 16px;
                    }
                    .go__icon {
                        margin-top: -6px;
                    }
                }
            `}</style>
        </div>
    );
};

export default SignBox;
