/* Global Variables */
// Personal API Key for OpenWeatherMap API
// API call
const apiKey = "&appid=9db65937fc5c62124610f5dadcc01d8e&units=imperial";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
// Event listener to add function to existing HTML DOM element
// Create an event listener for the element with the id: generate
let generate = document.getElementById("generate");
/* Function called by event listener */
generate.addEventListener("click",()=>{
	const zipCode = document.getElementById("zip").value;
	const feelings = document.getElementById("feelings").value;

	getWeather(baseUrl, zipCode, apiKey)

    .then(function(data){
      // Add data
      console.log(data);
        postData('/add', { temp: data.main.temp, date: newDate, content: feelings }).then(
            function () { retrieveData(); }
        )
    })
});


//Inside that callback function call your async GET request with the parameters:base url - user entered zip code - personal API key
/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

/* Function to POST data */
//POST request to add the API data, as well as data entered by the use
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    //The data object include temperature - date - user response
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content
    })       
  });

  try {
      const newData = await response.json();
      return newData;
      console.log(newData);
    }
    catch(error) {
      console.log("error", error);
    }
  };

/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData);
  // Write updated data to DOM elements
  document.getElementById('date').innerHTML = allData.date;
  document.getElementById('temp').innerHTML = allData.temp+ ' degrees';
  document.getElementById('content').innerHTML = allData.content;
 }
 catch(error) {
   console.log("error", error);
 }
};

