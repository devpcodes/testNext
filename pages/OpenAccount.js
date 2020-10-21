import { Statistic, Row, Col, Button } from 'antd';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const OpenAccount = () => {
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Active Users" value={112893} />
                </Col>
                <Col span={12}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                    <Button style={{ marginTop: 16 }} type="primary">
                        Recharge
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default OpenAccount;
