export function roundNumber(number, digits) {
    let result = number;
    result = Number(Math.round(result + `e${digits}`) + `e-${digits}`);
    return result;
}

export function convertTimeFromUnix(unixTimestamp) {
    const convertedDate = new Date(unixTimestamp * 1000);
    return convertedDate;
}

export function formatTime(time) {
    return convertTimeFromUnix(time).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
    });
}

export function capitalize(str) {
    let first = str.slice(0, 1).toUpperCase();
    const remaining = str.slice(1);
    return first + remaining;
}

export function convertToCelsius(fahrenheight) {
    // (32°F − 32) × 5/9
    const celsius = ((fahrenheight - 32) * 5.0) / 9.0;
    return celsius;
}
