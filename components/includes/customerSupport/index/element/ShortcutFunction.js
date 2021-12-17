import { Layout, Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';

const ShortcutFunction = ({ linkData }) => {
    return (
        <Layout>
            <Row gutter={[16, 16]} className="fastLinkButtons">
                {linkData.map((item, index) => (
                    <Col key={index} className="gutter-row" xs={8} sm={4} md={6} lg={4}>
                        <Card className="customerSupportCard" hoverable>
                            <div className="shortcutFunctionIcon" style={{ backgroundImage: `url(${item.image})` }} />
                            <p className="shortcutFunctionIconText">{item.title}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
            <style jsx global>{`
                .fastLinkButtons {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    margin-top: 16px;
                }

                .customerSupportCard {
                    bottom: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-heigh: 140px;
                    border: 1px solid #d7e0ef;
                    transition: bottom 0.5s;
                }

                .customerSupportCard:hover {
                    position: relative;
                    bottom: 1rem;
                }

                .shortcutFunctionIcon {
                    width: 60px;
                    height: 60px;
                    margin: auto;
                    background-size: cover;
                    background-position: center;
                }

                .shortcutFunctionIconText {
                    white-space: nowrap;
                    margin-bottom: 0;
                }
            `}</style>
        </Layout>
    );
};

export default ShortcutFunction;

ShortcutFunction.propTypes = {
    linkData: PropTypes.array,
};
