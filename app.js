const express = require('express')
const app = new express()
const axios = require('axios')
const config = require('./config')
const mongoose = require('mongoose')
mongoose.connect(config.db_path) // Connects to the DB URL from config.js

var logger = require('mongo-morgan-ext'); // For Logging into Mongo Collection
var collection = 'Logs'
var skipfunction = function(req, res) {
    return res.statusCode > 399; // Skip record from saving if status code is greater than 399 i.e User Errors
}
app.use(logger(config.db_path,collection,skipfunction));

app.get('/', (_request, response) => {
  weather_data = axios.get(`https://api.darksky.net/forecast/${config.api_key}/21.0620538,74.9910112`) // Darsky API last part is lattitude and longitude. 
  weather_data.then((res) => {
    function isPrime(num) 
    {   
        let prime = true
        for(let i = 2; i < num; i++)
        {
          if(num % i === 0) 
          {
            prime = false
            break
          }
        }
        return prime
    }

    try {
        console.log(new Date(res.data.currently.time*1000))
        current_data = new Date(res.data.currently.time*1000).getDate() // Time is in UNIX string therefore converting it into Human redable date
        isPrime(current_data)? response.json(res.data): response.json({'Status': 'Date is not prime so no response'})
    }
    catch(err){
        throw err
    }
  }).catch((err) => {
      console.log(`Unable to fetch data from the API Due to ${err}`); // Error object Catched
  })
})

app.listen(config.port, () =>{
    console.log(`App started on ${config.port}`);
})