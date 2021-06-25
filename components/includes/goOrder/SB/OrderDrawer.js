import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from 'antd';
import { setPanelHeight } from '../../../../store/goOrder/action';

import arrow from '../../../../resources/images/components/goOrder/arrow-chevron-down.png';
const OrderDrawer = ({ children }) => {
    const dispatch = useDispatch();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const panelHeight = useSelector(store => store.goOrderSB.panelHeight);
    const bs = useSelector(store => store.goOrder.bs);
    useEffect(() => {
        if (bs !== '') {
            setTimeout(() => {
                setDrawerVisible(true);
            }, 0);
        }
    }, [bs]);
    return (
        <>
            <Drawer
                closable={true}
                visible={drawerVisible}
                placement={'bottom'}
                mask={false}
                onClose={() => {
                    if (panelHeight == 80) {
                        dispatch(setPanelHeight(400));
                    } else {
                        dispatch(setPanelHeight(80));
                    }
                }}
                height={panelHeight}
                closeIcon={
                    <img
                        style={{
                            marginTop: '-4px',
                            transform: panelHeight == 400 ? 'rotate(180deg)' : 'rotate(0)',
                            marginRight: '-3px',
                        }}
                        src={arrow}
                    />
                }
                className="OrderGO__drawer"
            >
                {children}
            </Drawer>
            <style global jsx>{`
                .ant-drawer-bottom.ant-drawer-open.no-mask {
                    transition: all 0.3s !important;
                }
                .ant-drawer-bottom.ant-drawer-open .ant-drawer-content-wrapper {
                    box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, 0.5), 0 -9px 28px 0 rgba(0, 0, 0, 0.1),
                        0 -12px 48px 16px rgba(0, 0, 0, 0.005);
                    /* border-radius: 8px; */
                    border-top-right-radius: 8px;
                    border-top-left-radius: 8px;
                }
                .ant-drawer-content {
                    border-top-right-radius: 8px;
                    border-top-left-radius: 8px;
                    overflow: hidden;
                }
                .ant-drawer-body {
                    overflow: hidden;
                    padding: 0;
                    padding-top: 14px;
                }
            `}</style>
        </>
    );
};
export default OrderDrawer;
