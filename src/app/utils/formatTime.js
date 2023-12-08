import { endOfDay, format, formatDistanceToNow, formatISO } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, formatStr = 'dd MMMM yyyy') {
    return format(new Date(date), formatStr);
}

export function fDateTime(date) {
    return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateISO(date, formatStr = 'dd MMMM yyyy') {
    const __date = new Date(date);
    return formatISO(__date, formatStr);
}
export function fTime(date) {
    return format(new Date(date), 'HH:mm:ss');
}

export function fDateTimeSuffix(date) {
    return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true
    });
}

export const get2DigitNumber = (num) =>
    num.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });

export const format12HrTime = ({ value = '00:00:00' }) => {
    const tmp = value.split(':').map(Number);
    let hr = tmp[0];
    let min = tmp[1];

    if (tmp[2] > 59) {
        min += +1;
    }
    if (min > 59) {
        hr += +1;
    }

    return `${get2DigitNumber(hr)}:${get2DigitNumber(min)} ${hr >= 12 ? 'PM' : 'AM'}`;
};

export const convertHrsToMin = (n) => {
    return n * 60;
};
export const convertDaysToMin = (n) => {
    return n * 24 * 60;
};

export const Dateformat = {
    YYYY_MM_DD: 'yyyy-mm-dd',
    YYYY_MM_DD_HH_MM_SS: 'yyyy-mm-dd hh:mm:ss',
    YYYY_MM_DD_HH_MM_SS_L: 'yyyy-mm-ddTHH:MM:ss.l'
};
