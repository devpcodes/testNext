import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from 'antd';
import { setPanelHeight } from '../../../../store/goOrder/action';

import arrow from '../../../../resources/images/components/goOrder/arrow-chevron-down.png';
import { setPanelHeightSB } from '../../../../store/goOrderSB/action';
const OrderDrawer = ({ children }) => {
    const dispatch = useDispatch();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [pHeight, setPHeight] = useState(0);
    const [openHeight, setOpenHeight] = useState(360);
    const panelHeightSB = useSelector(store => store.goOrderSB.panelHeight);
    const panelHeight = useSelector(store => store.goOrder.panelHeight);
    const type = useSelector(store => store.goOrder.type);
    const bs = useSelector(store => store.goOrder.bs);
    useEffect(() => {
        if (type === 'S') {
            setPHeight(panelHeight);
            setOpenHeight(360);
        } else {
            setPHeight(panelHeightSB);
            setOpenHeight(400);
        }
    }, [type, panelHeight, panelHeightSB]);
    useEffect(() => {
        if (bs !== '') {
            setTimeout(() => {
                setDrawerVisible(true);
            }, 0);
        }
    }, [bs]);

    const drawerHeightHandler = (h, type) => {
        if (type === 'S') {
            if (h === 80) {
                return 80;
            } else {
                return openHeight;
            }
        } else {
            if (h === 80) {
                return 80;
            } else {
                return openHeight;
            }
        }
    };
    return (
        <>
            <Drawer
                style={{ height: drawerHeightHandler(pHeight, type) }}
                closable={true}
                visible={drawerVisible}
                placement={'bottom'}
                mask={false}
                onClose={() => {
                    if (pHeight == 80) {
                        if (type === 'S') {
                            dispatch(setPanelHeight(openHeight));
                        } else {
                            dispatch(setPanelHeightSB(openHeight));
                        }
                    } else {
                        if (type === 'S') {
                            dispatch(setPanelHeight(80));
                        } else {
                            dispatch(setPanelHeightSB(80));
                        }
                    }
                }}
                height={pHeight}
                closeIcon={
                    <img
                        style={{
                            marginTop: '-4px',
                            transform: pHeight == openHeight ? 'rotate(180deg)' : 'rotate(0)',
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
