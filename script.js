const apiKey = "6348dba35bc888a0cac381dfa599f72d";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); // 

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();

  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const temperature = data.main.temp;
      const condition = data.weather[0].description.toLowerCase(); // lowercase for easy matching


      //  Update text
      document.querySelector(".city").textContent = data.name;
      document.querySelector(".temp").textContent = `${Math.round(temperature)}°C`;
      document.querySelector(".condition").textContent = condition;

      
      //  Change image based on condition
      if (condition.includes("cloud")) {
        weatherIcon.src = "images/clouds.png";
      } else if (condition.includes("clear")) {
        weatherIcon.src = "images/clear-sky.png";
      } else if (condition.includes("rain")) {
        weatherIcon.src = "images/rainy.png";
      } else if (condition.includes("sky")) {
        weatherIcon.src = "images/clear-sky.png";
      } else if (condition.includes("mist")|| condition.includes("haze")) {
        weatherIcon.src = "images/mist.png";
      } else if (condition.includes("snow") || condition.includes("snowy")) {
        weatherIcon.src = "images/snow.png";
      } else if (condition.includes("smoke")) {
        weatherIcon.src = "images/smoke.png";
      } else if(condition.includes("fog")|| condition.includes("foggy")){
        weatherIcon.src="images/fog.png";
      } else {
        weatherIcon.src = "images/clear-sky.png"; // fallback image
      }
 
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("City not found or API error!");
    });
});

// Allow pressing Enter
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

    