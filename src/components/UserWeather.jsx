import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import axios from 'axios';
import Weather from './Weather';

const UserWeather = () => {
    const [message,setMessage] = useState('');
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);

    function getfromSessionStorage(){
        // console.log("HELLo");
        const localCoordinates = sessionStorage.getItem('user-coordinates');
        // console.log(sessionStorage.getItem('user-coordinates'));
        if(localCoordinates){
            const coordinates = JSON.parse(localCoordinates); //Convert string to object
            fetchUserWeatherInfo(coordinates);
        }
    }

    useEffect(()=>{
        getfromSessionStorage();
    },[]);


    const LocationHandler = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition,showError);
        }
        else{

        }
    }

    const showPosition = async(position)=>{
        const coordinates = {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        };
        sessionStorage.setItem('user-coordinates',JSON.stringify(coordinates));
        fetchUserWeatherInfo(coordinates);
    }

    const showError = async(error)=>{
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setMessage("You denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setMessage("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setMessage("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                setMessage("An unknown error occurred.");
                break;
        }
    }

    const fetchUserWeatherInfo = async(coordinates)=>{
        const {latitude,longitude} = coordinates;
        try{
            setLoading(true);
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_APIKEY}&units=metric`)
            // console.log(res.data);
            setData(res.data);
            setLoading(false);
        }
        catch(e){
            console.log(e);
        }
    }
  return (
    <div>
        {
            loading ? 
            <div className="spinner"></div> : 
            <div>
                {
                    !data ? 
                    <div className='pt-14 flex flex-col items-center'>
                        <div className='relative'>
                            <FaCircle color='green' size={'100px'} />
                            <FaLocationDot className='absolute top-6 left-8 text-4xl'/>
                        </div>
                        <p className='text-3xl pt-5 font-medium'> Grant Location Access </p>
                        <p className='text-sm font-normal pt-2'> Allow Access To Get Weather Information </p>
                        <p> {message} </p>
                        <p className='uppercase mt-5 px-3 bg-blue-500 py-1 rounded-lg hover:bg-blue-700 cursor-pointer' onClick={LocationHandler}> grant access </p>
                    </div> :
                    <Weather data={data} />
                }
            </div>
        }
    </div>
  )
}

export default UserWeather;