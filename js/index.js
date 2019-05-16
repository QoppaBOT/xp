const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let lat = 0.0;
let long = 0.0;

function getWeather() {

    $.ajax({
        url: "https://api.apixu.com/v1/forecast.json?key=bdd44a31ff21404aace162914191104&q=" + lat + "," + long + "&days=7",
        dataType: "json",

        success: function (data) {
            console.log(data);
            let { name: city, country, localtime: time } = data.location;
            let { feelslike_c, humidity, precip_mm, pressure_in, temp_c, vis_km, wind_kph } = data.current;
            let { icon, text } = data.current.condition;

            let { forecastday: forecast } = data.forecast;

            let date = (new Date(time));
            let time1 = (new Date(time)).toLocaleTimeString();

            // Weather card values
            $("#city").append(`${city}`);
            $("#day-and-time").append(`${weekDays[date.getDay()]}, ${time1}`);
            $(".current-temperature").append(`${temp_c}&deg;`);
            $("#weather-condition-text").append(`${text}`);
            $("#weather-icon").append(`<img src="https:${icon}"/>`);

            let { mintemp_c: todayMinTemp, maxtemp_c: todayMaxTemp } = (forecast[0].day);
            $("#max-temperature").append(`${todayMaxTemp}&deg;C`);
            $("#min-temperature").append(`${todayMinTemp}&deg;C`);

            //Forecast values
            let forecastData = forecast.map(day => {
                let { date } = day;
                let date1 = (new Date(date));
                let { mintemp_c, maxtemp_c, avghumidity } = day.day;
                let icon = day.day.condition.icon;

                $(".seven-day-forecast").append(
                    `<div>
                        <ul>
                            <li>${weekDays[date1.getDay()]}</li>
                            <li>${avghumidity}%</li>
                            <li><img src="https:${icon}" class="forecast-icon"/></li>
                            <li>${maxtemp_c}&deg;</li>
                            <hr class="forecast-min-max-line">
                            <li>${mintemp_c}&deg;</li>
                        </ul>
                    </div>`
                );
            });

        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    getWeather();
}
getLocation();