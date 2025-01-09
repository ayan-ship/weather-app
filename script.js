
function getWeather(){
    const apiKey= '14e2b11455d1747abf63a8c72d8f4bab';
    const city= document.getElementById('city').value;

    if(!city){
        alert('Please enter a city')
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
    // function getWeather(){
        fetch(currentWeatherUrl)
            .then(response=> {
                return response.json()
            })
            .then(data=>{
                displayWeather(data);
            })
            .catch(error=>{
                console.error('error fetching current weather data' ,error);
                alert('Error fetching current weather data. Please try again')
            });
    
    fetch(forecastUrl)
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                displayHourlyForecast(data.list)
            })
            .catch(error=>{
                console.error('Error fetching hourly forecast data:' ,error)
                alert('Error fetching hourly forecast data. Please try again')
            })
}

function displayWeather(data){
    const tempDivInfo= document.getElementById('temp-div');
    const weatherInfoDiv= document.getElementById('weather-info');
    const weatherIcon= document.getElementById('weather-icon');
    const hourlyForecastDiv= document.getElementById('hourly-forecast');

    //Clear all the previous content

    weatherInfoDiv.innerHTML='';
    hourlyForecastDiv.innerHTML='';
    tempDivInfo.innerHTML='';

    //check error if any in the given data

    if(data.cod==='404'){
        weatherInfoDiv.innerHTML=`<p>${data.message}</p>`
    }
    else{
        const cityName= data.name;
        const temperature = Math.round(data.main.temp-273.15);
        const description = data.weather[0].icon;
        const iconCode = data.weather[0].icon;
        const iconUrl= `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML=`
        <p>${temperature}C</p>
        `

        const weatherHTML=`
        <p>${cityName}</p>
        <p>${description}</p>
        `
        tempDivInfo.innerHTML= temperatureHTML;
        weatherInfoDiv.innerHTML= weatherHTML;
        weatherIcon.src=iconUrl;
        weatherIcon.alt = description;

        showImage();
    }

}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv= document.getElementById('hourly-forecast');
    const next24Hours=hourlyData.slice(0,8);

    next24Hours.forEach(item =>{
        const dateTime = new Date(item.dt*1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp -273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl =`https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml= `
        
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt ="Hourly Weather Icon">
            <span> ${temperature}C </span>
        </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });

}
function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display ='block';
}