const Bar = ({ style, min, max }) => {
    const wid = (Number(min) * 100) / max || 0;
    return (
        <>
            <div className="bar__background" style={style}>
                <div className="bar"></div>
            </div>
            <style jsx>{`
                .bar__background {
                    border-radius: 5.5px;
                    background-color: #e6ebf5;
                    height: 12px;
                    position: relative;
                }
                .bar {
                    border-radius: 5.5px;
                    position: absolute;
                    background-color: #254a91;
                    width: ${wid}%;
                    height: 12px;
                    top: 0;
                    left: 0;
                }
            `}</style>
        </>
    );
};

export default Bar;
