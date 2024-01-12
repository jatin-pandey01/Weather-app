import axios from 'axios';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdError } from "react-icons/md";
import Weather from './Weather';

const SearchWeather = () => {

  const [loading,setLoading] = useState(false);
  const [city,setCity] = useState('');
  const [data,setData] = useState(null);
  const [error,setError] = useState(false);
  const [search,setSearch] = useState(false);

  const submitHandler = async(e) => {
    setSearch(true);
    e.preventDefault();
    setCity('');
    setData(null);
    setError(false);
    try {
      setLoading(true);
      // console.log(city);
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_APIKEY}&units=metric`);
      // console.log(res?.data);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      // console.log(error);
    }
  }

  return (
    <div className='w-full'>
      <form className='flex items-center gap-2 justify-center py-7' onSubmit={submitHandler}>
        <input type='text' placeholder='Search for City....' className='w-9/12 px-4 py-2 rounded-lg bg-slate-300 bg-opacity-50 outline-none text-white placeholder:text-white' value={city} onChange={(e)=>setCity(e.target.value)} />
        <button onClick={submitHandler} className='bg-gray-200 p-2 rounded-full bg-opacity-65 text-xl' > <FaSearch/> </button>
      </form>
      <div>
        {
          search && error && <div className='flex flex-col justify-center items-center'> 
            <MdError size={100} />
            <p className='text-xl font-semibold'> City Not Found </p>
          </div> 
        }
        {
          search && loading && <div className='flex justify-center'>
            <div className="spinner"></div>
          </div>
        }
        {
          search && data && <Weather data={data} />
        }
      </div>
    </div>
  )
}

export default SearchWeather;