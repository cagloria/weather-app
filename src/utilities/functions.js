export function roundNumber(number, digits) {
    let result = number;
    result = Number(Math.round(result + `e${digits}`) + `e-${digits}`);
    return result;
}

export function convertTimeFromUnix(unixTimestamp) {
    const convertedDate = new Date(unixTimestamp * 1000);
    return convertedDate;
}

export function formatTimeToString(time) {
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

export function convertToCelsius(fahrenheit) {
    let celsius = ((fahrenheit - 32) * 5.0) / 9.0;
    celsius = roundNumber(celsius, 0);
    return celsius;
}

export function convertToFahrenheit(celsius) {
    let fahrenheit = (celsius * 9.0) / 5.0 + 32;
    fahrenheit = roundNumber(fahrenheit, 0);
    return fahrenheit;
}
