if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Lat: ${latitude}, Long: ${longitude}`);
        
        // Fetch weather and location data
        getWeather(latitude, longitude);
        getLocation(latitude, longitude);
    }, error => {
        console.error("Error getting location:", error);
        document.querySelector('.location').textContent = 
            "Unable to get your location. Please enable location services.";
    });
} else {
    alert("Geolocation is not supported by your browser.");
}

// Fetch weather data
function getWeather(lat, lon) {
    const apiKey = "8f2f63d6d41312e61076f48f85ec17cc"; // Your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0].description;
            const temperature = data.main.temp;
            document.querySelector('.weather').innerHTML =
                `Current Weather: ${weather}, ${temperature}°C`;
        })
        .catch(error => console.error("Error fetching weather:", error));
}

// Fetch location data
function getLocation(lat, lon) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.state || data.address.country;
            document.querySelector('.location').textContent =
                `You are currently in: ${city}`;
        })
        .catch(error => console.error("Error fetching location:", error));
}