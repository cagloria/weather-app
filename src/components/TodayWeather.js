import Clock from "./Clock";

export default function TodayWeather() {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const url =
        "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=" +
        API_KEY;

    async function getWeather() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    getWeather();

    return (
        <div>
            <Clock />
            <p>City</p>
            <p>90&deg;</p>
            <p>109&deg;&uarr; 83&deg;&darr;</p>
            <p>Cloudy</p>
            <div>
                <p>Sunrise</p>
                <p>6:00 AM</p>
                <p>Sunset</p>
                <p>6:00 PM</p>
            </div>
        </div>
    );
}
