export function roundNumber(number, digits) {
    let result = number;
    result = Number(Math.round(result + `e${digits}`) + `e-${digits}`);
    return result;
}

export function convertTimeFromUnix(unixTimestamp) {
    const convertedDate = new Date(unixTimestamp * 1000);
    return convertedDate;
}
