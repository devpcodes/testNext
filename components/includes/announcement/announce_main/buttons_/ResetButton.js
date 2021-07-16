import { Button } from 'antd';

const ResetButton = ({ text, width, height, fontSize, ...props }) => {
    return (
        <Button
            style={{
                display: 'inline-block',
                width: width || '52px',
                height: height || '32px',
                padding: 0,
                marginLeft: '12px',
                fontSize: fontSize || '1.4rem',
                color: '#a9b6cb',
                border: 'solid 1px #d7e0ef',
            }}
            {...props}
        >
            {text}
        </Button>
    );
};

export default ResetButton;
