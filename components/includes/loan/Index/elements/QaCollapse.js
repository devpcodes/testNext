import { useState, useEffect } from 'react';
import React from 'react';
import { Collapse } from 'antd';

const QaCollapse = ({ dataSource }) => {
    useEffect(() => {
        console.log('rowData', dataSource);
    }, [dataSource]);

    const { Panel } = Collapse;

    const onChange = key => {
        console.log(key);
    };

    return (
        <div className="qaBox" id="loanIndex">
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
                        <>
                            <Panel
                                header={(x.type ? x.type : '') + x.title}
                                key={i}
                                extra={x.tag ? <a id={x.tag} className="pageTag"></a> : ''}
                            >
                                {Array.isArray(x.content)
                                    ? x.content.map((y, j) => {
                                          return <p key={'p' + i}>{y}</p>;
                                      })
                                    : x.content}
                            </Panel>
                        </>
                    );
                })}
            </Collapse>

            <style jsx>
                {`
                    .forPC {
                        display: inherite;
                    }
                    .forMB {
                        display: none;
                    }
                    .pagTag {
                        position: absolute;
                        top: -5em;
                    }
                    @media screen and (max-width: 768px) {
                    }
                    @media screen and (max-width: 425px) {
                        .qaBox {
                            padding: 0 4%;
                        }
                        .forPC {
                            display: none;
                        }
                        .forMB {
                            display: inherite;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                #loanIndex__container .qaBox .pageTag{position: absolute;top: -5em;}
                #loanIndex__container .qaBox .ant-collapse-item {border:1px solid #d7e0ef;padding:10px 30px 10px;border-radius:2px;margin-bottom:15px;position: relative;}
                #loanIndex__container .qaBox .ant-collapse-item-active {border-color:#daa360;}
                #loanIndex__container .qaBox [data-theme='compact'] .site-collapse-custom-collapse .site-collapse-custom-panel,
                #loanIndex__container .qaBox .site-collapse-custom-collapse .site-collapse-custom-panel {
                    margin-bottom: 24px; overflow: hidden; background: #fff;border: 0px; border-radius: 2px;}
                #loanIndex__container .qaBox .ant-collapse-header{ font-size: 20px;
                    font-weight: 800; color:#0d1623;padding-left: 0px;padding-left: 0!important;}
                #loanIndex__container .qaBox .ant-collapse-content-box{background:#f7ecde; font-size:16px; font-weight:500;margin-bottom:7px;}
                #loanIndex__container .qaBox .ant-collapse-content-box p{margin:0;}
                #loanIndex__container .plusIcon{ border-radius:2px; right: 0; left:auto!important; background:#a9b6cb; text-align:center; width: 26px;
                    height: 26px; display: inline-block;}
                #loanIndex__container .plusIcon i{display: block; color:#FFF;transform:rotate(0deg);font-size:24px;font-style: inherit;
                    font-weight: 300;line-height:26px!important;}
                #loanIndex__container .plusIcon.active{background: #daa360;!important;}
                #loanIndex__container .plusIcon.active i{transform:rotate(45deg);}
                @media screen and (max-width: 425px) {
                    #loanIndex__container .qaBox .ant-collapse-item{padding:4%;}
                    #loanIndex__container .qaBox .ant-collapse-header{ font-size: 16px;padding-right: 30px!important; line-height: 1.3!important;}
                    #loanIndex__container .ant-collapse>.ant-collapse-item>.ant-collapse-header .ant-collapse-arrow {top: 16%; transform: translateY(0%);}
                }
                `}
            </style>
        </div>
    );
};
export default QaCollapse;
