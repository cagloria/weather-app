import Clock from "./Clock";

export default function TodayWeather() {
    return (
        <div>
            <Clock />
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
