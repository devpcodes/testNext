import { Button } from 'antd';

const BuyButton = ({ text, width, height, fontSize, color, ...props }) => {
    return (
        <Button
            style={{
                width: width || '44px',
                height: height || '24px',
                padding: 0,
                backgroundColor: color || '#f45a4c',
                color: 'white',
                fontSize: fontSize || '1.2rem',
                border: 'none',
                marginRight: '5px',
            }}
            {...props}
        >
            {text}
        </Button>
    );
};

export default BuyButton;
