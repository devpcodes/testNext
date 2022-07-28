const Line = ({ style }) => {
    return (
        <div className="line" style={style}>
            <style jsx>{`
                .line {
                    height: 1px;
                    width: 100%;
                    background-color: #d7e0ef;
                }
            `}</style>
        </div>
    );
};

export default Line;
