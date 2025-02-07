import React, { useState } from 'react'
import './Weather.css'
import axios from 'axios'

const API_KEY="QWD1zMPvCbbjq4Hpbl8IGgzP6Mu9LiLa"

function Weather() {

    const [city,setCity]=useState('')
    const [weatherdata, setWeatherdata]=useState(null)
    const [error,setError]= useState(false)

    let handleLocation= async ()=>{
        try{
               let response= await axios.get(`https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${API_KEY}`) 
               console.log(response)
               setWeatherdata(response)
        }
        catch(error){
           setError(true)
        }
    }

  return (
    <div>
      <div className='container'>
        <h1 className='title'>Search Weather Condition</h1>
        <div className='inputcontainer'>
            <input type='text' placeholder='Enter City Name' className='input' value={city} onChange={(e)=>setCity(e.target.value)}></input>
            <button className='button' onClick={handleLocation}>Search</button>
        </div>
        {error&&<p className='error'>Failed to fetch Data!</p>}
        {weatherdata&&(
            <div className='weathercontainer'>
                <h2 className='subtitle'>{weatherdata.data.location.name}</h2>
                <p className='temp'>Temparature: {weatherdata.data.data.values.temperature}</p>
                <p className='Humidity'>Humidity: {weatherdata.data.data.values.humidity}</p>
                <p className='windspeed'>Wind Speed: {weatherdata.data.data.values.windSpeed}</p>
            </div>
        )}

      </div>
    </div>
  )
}

export default Weather
