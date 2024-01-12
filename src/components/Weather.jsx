import React from 'react';
import { LuWind } from "react-icons/lu";
import { WiHumidity } from "react-icons/wi";
import { FaCloudSun } from "react-icons/fa6";

const Weather = ({data}) => {

  const weather = [
    {
      id:1,
      name:"Windspeed",
      img : <LuWind size={80} color='blue'  />,
      val : `${data?.wind?.speed} m/s`,
    },
    {
      id:2,
      name:"Humidity",
      img : <WiHumidity size={80}/>,
      val : `${data?.main?.humidity} %`,
    },
    {
      id:3,
      name:"Cloud",
      img:<FaCloudSun size={80}/>,
      val : `${data?.clouds?.all} %`
    }
  ]

  return (
    <div className='py-14'>
        <div className='flex justify-center gap-5'>
            <p className='text-3xl'> {data.name} </p>
            {
                data?.sys?.country ? <img src={`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`} className='w-12 aspect-auto' /> : <></>
            }
        </div>
        <p className='text-center text-xl py-2'> {data?.weather?.[0]?.main} </p>
        {
            data?.weather?.[0]?.icon ? <img src={`https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`} className='text-center w-20 mx-auto' /> : <></>
        }
        <p className='text-4xl font-medium text-center'> {data?.main?.temp} &deg;C </p>
        <div className='flex justify-center gap-10 pt-10 flex-wrap'>
          {
            weather.map((data,i)=>{
              return <div key={i} className='bg-slate-500 w-32 pb-2 flex flex-col items-center bg-opacity-90 rounded-md'> 
                  <p> {data.img} </p> 
                  <p> {data.name} </p>
                  <p> {data.val} </p>
                </div>
            })
          }
        </div>
    </div>
  )
}

export default Weather;