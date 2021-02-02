import TodayWeather from "./Weather";
import Forecast from "./Forecast";

export default function App() {
    return (
        <div className="App">
            <TodayWeather />
            <Forecast />

            <div>
                <p>Data provided by OpenWeather.</p>
            </div>
        </div>
    );
}
