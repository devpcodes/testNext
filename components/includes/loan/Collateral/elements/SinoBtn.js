import { Button } from 'antd';
const SinoBtn = ({ text, parentClass, ...props }) => {
    return (
        <>
            <Button className="sinoBtn" {...props}>
                {text}
            </Button>
            <style jsx global>{`
                .${parentClass || 'sino'} .sinoBtn.ant-btn[disabled],
                .ant-btn[disabled]:active,
                .ant-btn[disabled]:focus,
                .ant-btn[disabled]:hover {
                    color: #a9b6cb !important;
                    background: #e6ebf5 !important;
                }

                // .sinoBtn.ant-btn[disabled], .ant-btn[disabled]:active, .ant-btn[disabled]:focus, .ant-btn[disabled]:hover {
                //     background: #e6ebf5 !important;
                // }
            `}</style>
        </>
    );
};

export default SinoBtn;
