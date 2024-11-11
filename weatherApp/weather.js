async function fetchWeather() {
    const city = document.getElementById("city-input").value;
	
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=d2c360410fba46b2a2082056240107&q=${city}&days=3`;
	

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
        console.log(data);
		// Display current weather
		document.getElementById("current-weather").innerHTML = `
        <h2>${data.location.name}</h2>
        <p>${data.current.temp_c}°C</p>
        <img src="https:${data.current.condition.icon}" alt="Weather icon">
      `;

		// Display 3-day forecast
		const forecastHtml = data.forecast.forecastday
			.map(
				(day) => `
        <div class="forecast-item">
          <h4>${new Date(day.date).toLocaleDateString("en-US", {
				weekday: "short",
			})}</h4>
          <p>${day.day.avgtemp_c}°C</p>
          <img src="https:${day.day.condition.icon}" alt="Weather icon">
        </div>
      `
			)
			.join("");
		document.getElementById("forecast").innerHTML = forecastHtml;

        
	} catch (error) {
		alert("City not found or API error");
		console.error(error);
	}
}
