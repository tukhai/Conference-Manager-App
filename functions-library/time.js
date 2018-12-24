let time = {};

// Convert string time types into structured time types for later operations
let str2Obj = str => {
    let tmp = str.split(':');
    let obj = {};

    obj.hr = Number(tmp[0]);
    obj.min = Number(tmp[1]);

    if (obj.hr > 23 || obj.min > 59 || obj.hr < 0 || obj.min < 0) {
        throw new Error('Error[Illegal time]' + ` Hour[${obj.hr}]` + ` Minute[${obj.min}]`);
    }

    return obj;
}

// Calculate the number of minutes between two time points, such as 15 minutes between 18:00 and 18:15
time.duration = (begin, end) => {
    let oBegin = str2Obj(begin);
    let oEnd = str2Obj(end);
    let beginMinOffset;
    let endMinOffset;

    if ((oBegin.hr > oEnd.hr) || (oBegin.hr === oEnd.hr && oBegin.min > oEnd.min)) {
        throw new Error('Error[Illegal time]' + ` Start[${begin}]` + ` End[${end}]`);
    }

    if (oBegin.min === 0) {
        beginMinOffset = 0;
    } else {
        oBegin.hr += 1;
        beginMinOffset = 60 - oBegin.min;
    }
    if (oEnd.min === 0) {
        endMinOffset = 0;
    } else {
        oEnd.hr += 1;
        endMinOffset = 60 - oEnd.min;
    }

    return ((oEnd.hr - oBegin.hr) * 60) + beginMinOffset - endMinOffset;
}

// Given a point in time, calculate the time point after a given number of minutes, such as 19:00 and 15 minutes to 19:15
time.elapse = (time, min) => {
    let oTime = str2Obj(time);

    oTime.min += min;

    while (oTime.min > 59 || oTime.min < 0) {
        if (oTime.min > 59) {
            oTime.min -= 60;
            oTime.hr += 1;
        } else if (oTime.min < 0) {
            oTime.min += 60;
            oTime.hr -= 1;
        }
    }

    if (oTime.min === 0) oTime.min = '00';
    if (oTime.hr > 23) console.log('Warning[More than one day]');

    return `${oTime.hr}:${oTime.min}`;
}

module.exports = time;
