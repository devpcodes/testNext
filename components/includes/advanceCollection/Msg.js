import PropTypes from 'prop-types';

const Msg = ({ list, style }) => {
    return (
        <div style={style}>
            {list.map(item => (
                <div key={Math.random().toString(36).substring(7)}>
                    {item.html != null ? (
                        <div className="item" dangerouslySetInnerHTML={{ __html: item.html }}></div>
                    ) : (
                        <p className="item" style={{ lineHeight: '20px', color: item.color }}>
                            {item.txt}
                        </p>
                    )}
                </div>
            ))}
            <style jsx>{`
                .itme {
                    color: '#404040';
                }
            `}</style>
        </div>
    );
};

Msg.propTypes = {
    list: PropTypes.array.isRequired,
    style: PropTypes.object,
    customPropType: function (props, propName, componentName) {
        let err = '';
        props.list.forEach(item => {
            if (item.txt == null && item.html == null) {
                err = 'list.txt 或 list.html 其一，為必要。list可接收的key為txt、html、color';
            }
        });
        if (err !== '') {
            return new Error(err);
        }
    },
};

export default Msg;
