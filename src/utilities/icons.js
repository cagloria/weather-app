import iconThunderstorm from "../assets/icon-thunderstorm.svg";
import iconDrizzle from "../assets/icon-drizzle.svg";
import iconRainLight from "../assets/icon-rain-light.svg";
import iconRainHeavy from "../assets/icon-rain-heavy.svg";
import iconSleet from "../assets/icon-snow-sleet.svg";
import iconSnow from "../assets/icon-snow.svg";
import iconMist from "../assets/icon-mist-haze-fog.svg";
import iconSmoke from "../assets/icon-smoke.svg";
import iconDust from "../assets/icon-dust-sand.svg";
import iconAsh from "../assets/icon-ash.svg";
import iconWind from "../assets/icon-wind.svg";
import iconTornado from "../assets/icon-tornado.svg";
import iconClear from "../assets/icon-clear.svg";
import iconCloudsLight from "../assets/icon-cloud-light.svg";
import iconCloudsHeavy from "../assets/icon-cloud-heavy.svg";
import iconSunrise from "../assets/icon-sunrise.svg";
import iconSunset from "../assets/icon-sunset.svg";

export const icons = {
    thunderstorm: iconThunderstorm,
    drizzle: iconDrizzle,
    rainLight: iconRainLight,
    rainHeavy: iconRainHeavy,
    sleet: iconSleet,
    snow: iconSnow,
    smoke: iconSmoke,
    mist: iconMist,
    dust: iconDust,
    ash: iconAsh,
    wind: iconWind,
    tornado: iconTornado,
    clear: iconClear,
    cloudsLight: iconCloudsLight,
    cloudsHeavy: iconCloudsHeavy,
    sunrise: iconSunrise,
    sunset: iconSunset,
};

const rainGroup = {
    500: icons.rainLight,
    501: icons.rainLight,
};

const snowGroup = {
    611: icons.sleet,
    612: icons.sleet,
    613: icons.sleet,
};

const atmosphereGroup = {
    701: icons.mist,
    721: icons.mist,
    741: icons.mist,
    711: icons.smoke,
    731: icons.dust,
    751: icons.dust,
    761: icons.dust,
    762: icons.ash,
    771: icons.wind,
    781: icons.tornado,
};

function findIconInGroup(group, code, defaultIcon) {
    if (group.hasOwnProperty(code)) {
        return group[code];
    }
    return defaultIcon;
}

export function findWeatherIcon(code) {
    try {
        if (code >= 200 && code <= 299) {
            return icons.thunderstorm;
        } else if (code <= 399) {
            return icons.drizzle;
        } else if (code <= 599) {
            return findIconInGroup(rainGroup, code, icons.rainHeavy);
        } else if (code <= 699) {
            return findIconInGroup(snowGroup, code, icons.snow);
        } else if (code <= 799) {
            return findIconInGroup(atmosphereGroup, code, icons.mist);
        } else if (code === 800) {
            return icons.clear;
        } else if (code === 801) {
            return icons.cloudsLight;
        } else if (code <= 899) {
            return icons.cloudsHeavy;
        } else {
            throw Error(
                `Icon is missing for Code ${code} or this is not a valid ` +
                    `weather code.`
            );
        }
    } catch (error) {
        console.error(error);
    }
}
