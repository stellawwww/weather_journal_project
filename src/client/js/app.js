/* Global Variables */

const zip = document.querySelector("#zip");
const feelings= document.querySelector("#feelings");
const feeling = document.querySelector(".feelings");
const temp = document.querySelector("#temp");

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const newDate = d.toDateString();


// Make GET request from weather info API
// from the API website, we can see the url should end up like the example below
const example = "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";
const baseURI= "https://api.openweathermap.org/data/2.5/weather?zip=";
const apikey = "&appid=3d6cff9f405bc05bcdb51016ef450408&units=imperial";

// Event Listener 
const generate_var = document.getElementById(("generate"));
generate_var.addEventListener('click', performAction); 

// Callback function for the Event Listener
function performAction(e){
    e.preventDefault();

    // user input info 
    const newzip= document.getElementById('zip').value; 
    const content = document.getElementById('feelings').value;
    if (newzip !== ''){
        generate_var.classList.remove('invalid');
        getWeather(baseURI, newzip, apikey)
        .then(function(data){
            console.log(data);
            // TBD
            // if the zip code doesn't exist, we will get message from the API 
            if (data.message){
                const info=data.message;
                return info;
            }
            // add data to POST request 
            postData('/all', {temp: data.main.temp, 
                date:newDate,
                content : content});
            })
        .then(
            updateUI()
            )
        .catch(function(error){
            console.log(error);
            alert('The zip code is invalid.')
        })
} else{
    generate_var.classList.add('invalid');
}

    }

  ;


// call back functions 

// Async Post
const postData = async(url = '', data = {}) =>{
    const response = await fetch (url,
        {
            method : 'POST',
            credentials : 'same-origin',
            headers: {'Content-Type':'application/json',},
            body: JSON.stringify({
                temp: data.temp,
                content: data.content,
                date: data.date
            }),
        });

        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
        }

        catch(error){
            console.log("error", error);
        }
}

// Web API Fetch --make a GET request to weather API  (Async GET)
const getWeather = async(baseURI, newzip, apikey)=>{
    const res = await fetch (baseURI+newzip+apikey)
    try{

        const data = await res.json();
        // if the zip code doesn't exists 
        if (data.cod == 404){
            console.log(data.message);
        };
        console.log(data)
        return data;
    } catch(error){
        console.log("error", error);
    }
}



// Update UI

const updateUI = async() => {
    const request = await fetch ('/all');

    try{
        // transform into JSON
        const allData = await request.json()
        console.log(allData) 
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
        document.getElementById('content').innerHTML = allData.content;
        document.getElementById('date').innerHTML =allData.date;
    }
    catch(error){
        console.log("error", error)
    }
}

