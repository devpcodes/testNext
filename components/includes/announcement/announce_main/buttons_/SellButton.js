import { Button } from 'antd';

const SellButton = ({ text, width, height, fontSize, ...props }) => {
    return (
        <Button
            style={{
                width: width || '44px',
                height: height || '24px',
                padding: 0,
                backgroundColor: '#22a16f',
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

export default SellButton;
