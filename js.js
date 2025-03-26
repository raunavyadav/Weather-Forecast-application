const weatherForm = document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey = "9026b7a09f1099120670c3ddd5d98a3f";
weatherForm.addEventListener("submit",async event =>{
    event.preventDefault();

    const city= cityInput.value;

    if(city){
        try{
            const weatherData= await getData(city);
            displayWeather(weatherData);
        }
        catch(error){
            console.error(error);
            errorDisplayer(error);
        }
    }
    else{
        errorDisplayer("couldnt do shit");
    }
})
async function getData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("couldnt fetch my nigga");
    }
    return await response.json();
}
function errorDisplayer(text){
    const errorDisplay= document.createElement("p");
    errorDisplay.textContent=text;
    errorDisplay.classList.add("errorDisplay")
    card.textContent = "";
    card.appendChild(errorDisplay);
}

function displayWeather(data){
    card.innerHTML="";

    const cityName=document.createElement("h1");
    const desc=document.createElement("p");
    const temp=document.createElement("p");
    const humid=document.createElement("p");
    cityName.textContent=data.name;
    desc.textContent=data.weather[0].description;
    temp.textContent=(data.main.temp-273.15)+ "°C";
    humid.textContent="humidity:- "+data.main.humidity;
    card.appendChild(cityName);
    card.appendChild(desc);
    card.appendChild(temp);
    card.appendChild(humid);
}

