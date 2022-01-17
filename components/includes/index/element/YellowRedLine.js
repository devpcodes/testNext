import React from 'react';

const YellowRedLine = () => {
    return (
        <div className="yellow-red-line-container">
            <div className="hr-yellow" />
            <div className="hr-red" />
            <style jsx>
                {`
                    .yellow-red-line-container {
                        display: block;
                    }

                    .hr-yellow,
                    .hr-red {
                        width: 28px;
                        height: 4px;
                    }

                    .hr-yellow {
                        display: inline-block;
                        background-color: #daa360;
                    }

                    .hr-red {
                        display: inline-block;
                        background-color: #c43826;
                    }
                `}
            </style>
        </div>
    );
};

export default YellowRedLine;
