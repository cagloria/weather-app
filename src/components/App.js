import TodayWeather from "./TodayWeather";
import TodayDetails from "./TodayDetails";
import Forecast from "./Forecast";

export default function App() {
    return (
        <div className="App">
            <TodayWeather />
            <TodayDetails />
            <Forecast />

            <div>
                <p>Data provided by OpenWeather.</p>
            </div>
        </div>
    );
}
