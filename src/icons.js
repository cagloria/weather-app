import iconThunderstorm from "./assets/icon-thunderstorm.svg";
import iconDrizzle from "./assets/icon-drizzle.svg";
import iconRainLight from "./assets/icon-rain-light.svg";
import iconRainHeavy from "./assets/icon-rain-heavy.svg";
import iconSleet from "./assets/icon-snow-sleet.svg";
import iconSnow from "./assets/icon-snow.svg";
import iconMist from "./assets/icon-mist-haze-fog.svg";
import iconSmoke from "./assets/icon-smoke.svg";
import iconDust from "./assets/icon-dust-sand.svg";
import iconAsh from "./assets/icon-ash.svg";
import iconWind from "./assets/icon-wind.svg";
import iconTornado from "./assets/icon-tornado.svg";
import iconClear from "./assets/icon-clear.svg";
import iconCloudsLight from "./assets/icon-cloud-light.svg";
import iconCloudsHeavy from "./assets/icon-cloud-heavy.svg";
import iconSunrise from "./assets/icon-sunrise.svg";
import iconSunset from "./assets/icon-sunset.svg";

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

export function findWeatherIcon(code) {
    try {
        if (code >= 200 && code <= 299) {
            return icons.thunderstorm;
        } else if (code <= 399) {
            return icons.drizzle;
        } else if (code <= 599) {
            if (code === 500 || code === 501) {
                return icons.rainLight;
            }
            return icons.rainHeavy;
        } else if (code <= 699) {
            if (code >= 611 && code <= 613) {
                return icons.sleet;
            }
            return icons.snow;
        } else if (code <= 799) {
            // Atmosphere
            if (code === 701 || code === 721 || code === 741) {
                return icons.mist;
            } else if (code === 711) {
                return icons.smoke;
            } else if (code === 731 || code === 751 || code === 761) {
                return icons.dust;
            } else if (code === 762) {
                return icons.ash;
            } else if (code === 771) {
                return icons.wind;
            } else if (code === 781) {
                return icons.tornado;
            }
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
