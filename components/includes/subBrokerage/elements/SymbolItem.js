import hamburgerIcon from '../../../../resources/images/components/tradingAccount/menu-hamburger.svg';
import closeIcon from '../../../../resources/images/components/tradingAccount/menu-close-small.svg';
const SymbolItem = ({ title, description, delHandler, id }) => {
    return (
        <div className="container">
            <img className="drag" src={hamburgerIcon} />
            <div className="info">
                <span className="title">{title}</span>
                <span className="description">{description}</span>
            </div>
            <img onClick={delHandler.bind(null, id)} className="close" src={closeIcon} />
            <style jsx>{`
                .close {
                    cursor: pointer;
                }
                .container {
                    height: 56px;
                    line-height: 56px;
                    padding-left: 20px;
                    padding-right: 20px;
                    border-bottom: 1px solid #e6ebf5;
                    list-style: none;
                }
                .title {
                    display: inline-block;
                    font-size: 16px;
                    font-weight: bold;
                    width: 70px;
                    vertical-align: top;
                    color: #0d1623;
                }
                .drag {
                    margin-right: 17px;
                    cursor: move;
                }
                .info {
                    display: inline-block;
                    vertical-align: top;
                    height: 56px;
                    padding-top: 2px;
                    color: #0d1623;
                }
                .description {
                    display: inline-block;
                    width: 199px;
                    font-size: 16px;

                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            `}</style>
        </div>
    );
};

export default SymbolItem;
