import { Button } from 'antd';

const ConfirmButton = ({ text, width, height, fontSize, ...props }) => {
    return (
        <Button
            type="primary"
            style={{
                display: 'inline-block',
                width: width || '52px',
                height: height || '32px',
                padding: 0,
                marginLeft: '12px',
                fontSize: fontSize || '1.4rem',
            }}
            {...props}
        >
            {text}
        </Button>
    );
};

export default ConfirmButton;
