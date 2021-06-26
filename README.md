# Weather React App

<p align="center">
    <img src="./src/assets/readme-devices.png" alt="The weather app on a laptop, tablet, and phone">
</p>

<p align="center">
    <img alt="Build status" src="https://img.shields.io/github/workflow/status/cagloria/weather-app/Test?style=for-the-badge" />
    <a href="https://www.behance.net/gallery/119018551/Weather-App">
        <img alt="Link to the weather app on Behance" src="https://shields.io/badge/Behance-1769FF?logo=Behance&logoColor=white&style=for-the-badge" />
    </a>

</p>

Displays the current weather and 3-day forecast of any city entered, in addition to the city's sunrise and sunset, displayed in local time.

The data is fetched from [OpenWeather](https://openweathermap.org/), using the [Current Weather Data API](https://openweathermap.org/current) and [5 Day / 3 Hour Forecast API](https://openweathermap.org/forecast5).

## Features

-   Ability to enter any city
-   Displays current temperature
-   A toggle to switch between Fahrenheit and Celsius
-   Displays current weather
-   Displays sunrise and sunset in the user's local time
-   Displays a 3-day forecast
-   Theme changes if it's daytime or nighttime in the current city

<p align="center">
    <img src="./src/assets/readme-theme.png" alt="Mobile screenshots showing how the app theme changes between light and dark based on the current time">
</p>

## Technologies Used

-   [React](https://reactjs.org/)
-   [styled-components](https://styled-components.com/)

## Installation

You will need [Node and npm](https://nodejs.org/en/) installed to run this project. You will also need your own API key from OpenWeather.

Clone the project and run `npm install` in the root directory.

To learn React, check out the [React documentation](https://reactjs.org/).

## Running in Development Mode

`npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

`npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Building

`npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
