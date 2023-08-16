export const getMinTemp = list => {
    return Math.round(Math.min(...list.map(el => el.main.temp)));
};

export const getMaxTemp = list => {
    return Math.round(Math.max(...list.map(el => el.main.temp)));
};