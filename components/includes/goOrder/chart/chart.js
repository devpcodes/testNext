import { useLayoutEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const Chart2 = function () {
    return (
        <div id="chartdiv" style={{ width: '100%', height: '500px' }}>
            123
        </div>
    );
};

export default Chart2;
