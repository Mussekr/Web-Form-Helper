import moment from 'moment';

export function generateSsn(min, max) {
    const date = momentRandom(max, min);
    const uuid = randomIntFromInterval(100, 999);
    const ssnWOChecksum = date.format('DDMMYY')+'-'+uuid;
    return ssnWOChecksum + calculateChecksum(ssnWOChecksum);
}

function calculateChecksum(ssn) {
    ssn = ssn.toUpperCase();
    // Matches years 1850-2029
    const matchRegexp = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d-|[012]\dA)\d{3}$/i;
    if (ssn.search(matchRegexp) === -1) {
        return false;
    }
    const checks = "0123456789ABCDEFHJKLMNPRSTUVWXY";
    return checks.charAt(parseInt(ssn.substr(0, 6) + ssn.substr(7, 3), 10) % 31);
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function momentRandom(end = moment(), start) {
    const endMoment = moment(end);
    const randomNumber = (to, from = 0) =>
        Math.floor(Math.random() * (to - from) + from);

    if(start) {
        const startMoment = moment(start);
        if(startMoment.unix() > endMoment.unix()) {
            throw new Error('End date is before start date!');
        }
        return moment.unix(randomNumber(endMoment.unix(), startMoment.unix()));
    } else {
        return moment.unix(randomNumber(endMoment.unix()));
    }
}
