import { useState, useEffect } from 'react';
import React from 'react';
import { Collapse } from 'antd';

const QaCollapse = ({ dataSource }) => {
    useEffect(() => {}, [dataSource]);

    const { Panel } = Collapse;

    const onChange = key => {
        console.log(key);
    };

    return (
        <div className="qaBox">
            <Collapse
                onChange={onChange}
                bordered={false}
                ghost={true}
                defaultActiveKey={[0]}
                expandIcon={({ isActive }) => (
                    <a className={'plusIcon ' + (isActive ? 'active' : '')}>
                        <i>+</i>
                    </a>
                )}
                className="site-collapse-custom-collapse"
            >
                {dataSource.map((x, i) => {
                    return (
                        <Panel header={x.title} key={i}>
                            {Array.isArray(x.content)
                                ? x.content.map((y, j) => {
                                      return <p key={'p' + i}>{y}</p>;
                                  })
                                : x.content}
                        </Panel>
                    );
                })}
            </Collapse>

            <style jsx>
                {`
            .forPC{display:inherite;}
            .forMB{display:none;}
        @media screen and (max-width: 768px) {


        }
        @media screen and (max-width: 425px) {
            .qaBox{padding: 0 4%;}
            .forPC{display:none;}
            .forMB{display:inherite;}
        }

            }`}
            </style>
            <style jsx global>
                {`
                .qaBox .ant-collapse-item {border:1px solid #d7e0ef;padding:10px 30px 10px;border-radius:2px;margin-bottom:15px;}
                .qaBox .ant-collapse-item-active {border-color:#daa360;}
                .qaBox [data-theme='compact'] .site-collapse-custom-collapse .site-collapse-custom-panel,
                .qaBox .site-collapse-custom-collapse .site-collapse-custom-panel {
                  margin-bottom: 24px;
                  overflow: hidden;
                  background: #fff;
                  border: 0px;
                  border-radius: 2px;
                }
                .qaBox .ant-collapse-header{ font-size: 20px;
                    font-weight: 800; color:#0d1623;padding-left: 0px;padding-left: 0!important;}
                .qaBox .ant-collapse-content-box{background:#f7ecde; font-size:16px; font-weight:500;margin-bottom:7px;}
                .qaBox .ant-collapse-content-box p{margin:0;}
                .plusIcon{ border-radius:2px; right: 0; left:auto!important;
                    background:#a9b6cb; text-align:center;
                    width: 26px;
                    height: 26px;
                    display: inline-block;}
                .plusIcon i{display: block;
                    color:#FFF;transform:rotate(0deg);font-size:24px;font-style: inherit;
                    font-weight: 300;line-height:26px!important;
                }
                .plusIcon.active{background: #daa360;!important;}
                .plusIcon.active i{transform:rotate(45deg);}
                @media screen and (max-width: 425px) {
                    .qaBox .ant-collapse-item{padding:4%;}
                    .qaBox .ant-collapse-header{ font-size: 16px;padding-right: 30px!important; line-height: 1.3!important;}
                    .ant-collapse>.ant-collapse-item>.ant-collapse-header .ant-collapse-arrow {top: 16%; transform: translateY(0%);}
                }
                    }
                `}
            </style>
        </div>
    );
};
export default QaCollapse;
