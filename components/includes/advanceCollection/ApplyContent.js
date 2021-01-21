import ApplyTable from './ApplyTable';

const ApplyContent = ({ contenterTitle, ...props }) => {
    return (
        <div className="content">
            <div className="title">{contenterTitle}</div>
            <ApplyTable {...props} />
            <style jsx>{`
                .content {
                    margin-top: 50px;
                }
                .title {
                    height: 52px;
                    background: #587ea8;
                    border-radius: 3px 3px 0 0;
                    margin-bottom: 1px;
                    color: #ffffff;
                    text-align: center;
                    line-height: 52px;
                    font-size: 20px;
                    font-weight: bold;
                }
                @media (max-width: 580px) {
                    .title {
                        color: black;
                        background: #fff;
                        border-bottom: 1px solid #dadada;
                    }
                    .content {
                        margin-top: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default ApplyContent;
