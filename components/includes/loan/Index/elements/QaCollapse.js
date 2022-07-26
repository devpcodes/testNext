import { useState, useEffect } from 'react';
import React from 'react';
import { Collapse } from 'antd';

const QaCollapse = ({ dataSource }) => {
    return <div>{dataSource.length}</div>;
};
export default QaCollapse;
