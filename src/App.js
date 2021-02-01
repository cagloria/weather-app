function App() {
    return (
        <div className="App">
            <p>Tuesday, July 14, 2020</p>
            <p>11:55 AM</p>
            <p>90&deg;</p>
            <p>109&deg;&uarr; 83&deg;&darr;</p>
            <p>Cloudy</p>
            <div>
                <p>Sunrise</p>
                <p>6:00 AM</p>
                <p>Sunset</p>
                <p>6:00 PM</p>
            </div>

            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Wind</td>
                            <td>10 mph</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>18%</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td>1010 mb</td>
                        </tr>
                        <tr>
                            <td>Visibility</td>
                            <td>14.8 miles</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <div>
                    <p>Tomorrow</p>
                    <p>109&deg;&uarr; 83&deg;&darr;</p>
                </div>
                <div>
                    <p>Wednesday</p>
                    <p>109&deg;&uarr; 83&deg;&darr;</p>
                </div>
                <div>
                    <p>Thursday</p>
                    <p>109&deg;&uarr; 83&deg;&darr;</p>
                </div>
            </div>

            <div>
                <p>Data provided by OpenWeather.</p>
            </div>
        </div>
    );
}

export default App;
