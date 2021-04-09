window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');
    let tempSection=document.querySelector('.temperature');
    const tempSpan=document.querySelector('.temperature span');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos=> {
           // console.log(pos);
           long=pos.coords.longitude;
           lat=pos.coords.latitude;

           const proxy = `http://cors-anywhere.herokuapp.com/`;
           const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b86fd8f7708187a762619d1377a88ec7`;
           
           //const api0=`${proxy}http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={54b0999bdd387e5f23ecd2b99a3846ae}`;
           fetch(api) //get the info , then ..
           .then(data=> {
               return data.json();
           })
           .then(data =>{
               console.log(data);
               const {temp}=data.main;
               const {description}=data.weather[0];
               const {country}=data.sys;
               const {
                icon
                } = data.weather[0];
                console.log(icon);
               console.log(temp);
               console.log(description);
               //set dom elements from the api
               temperatureDegree.textContent = temp;
               temperatureDescription.textContent= description;
               locationTimezone.textContent=data.name+"/"+country;
               //set icon
               const icn = `http://openweathermap.org/img/wn/${icon}@2x.png`;
               locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
               //setIcons(icon, document.querySelector('.weather-icon'));
               //change °C to F
               let f= 9/5*(temp)+32;
                tempSection.addEventListener('click', ()=> {
                    if(tempSpan.textContent === "°C") {
                                            
                        tempSpan.textContent="F";
                        temperatureDegree.textContent=Math.floor(f);
                    } else {
                        tempSpan.textContent="°C";
                        temperatureDegree.textContent=temp;
                    }
                });
               
           });
        });
        
    }
    else {
        h1.textContent="not working...";
    }
    
});