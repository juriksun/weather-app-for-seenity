export const getDayShortName = (dateString) => {
    let shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let d = new Date(dateString);
    return shortDays[d.getDay()];
}

export const getDayName = (dateString) => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(dateString);
    return days[d.getDay()];
}
