const chart = [
    {
        source: {
            id: 'mma',
            stock: '124',
            futuresOptions: 'k',
            recommisiioned: '124',
        },
        source: {
            id: 'cnYES',
            stock: '164',
            futuresOptions: '8',
            recommisiioned: '164',
        },
    },
    {
        source: {
            id: '128',
            stock: '128',
            futuresOptions: 'r',
            recommisiioned: '128',
        },
    },
    {
        source: {
            id: 'udn',
            stock: '158',
        },
    },
];
const defaultSource = {
    stock: '129',
    futuresOptions: 'h',
    recommisiioned: '11',
};

// source 在newnew改為 platform
export const getWebId = function (source, type) {
    const result = getWebIdFilter(source, type);
    let getWebId = result[1];
    source = result[0];
    if (!getWebId) {
        source = defaultSourceHandler(type);
    }
    return source;
};

const getWebIdFilter = function (source, type) {
    let getWebId = false;
    source = String(source).toLowerCase();
    chart.forEach(val => {
        if (source.toString() === val.source.id) {
            if (val.source[type] != null) {
                source = val.source[type];
                getWebId = true;
                return false;
            }
        }
    });
    return [source, getWebId];
};

const defaultSourceHandler = function (type) {
    if (defaultSource[type] != null) {
        return defaultSource[type];
    }
};
