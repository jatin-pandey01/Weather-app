import { useState } from "react";
import UserWeather from "./components/UserWeather";
import SearchWeather from "./components/SearchWeather";

function App() {
  const [isUserWeather,setIsUserWeather] = useState(true);
  return (
    <div className="flex flex-col mx-auto items-center max-w-2xl pt-12">
      <p className="font-bold text-4xl uppercase text-center">Weather App</p>
      <div className="flex justify-between w-11/12 items-center pt-10">
        <p className= {`${isUserWeather ? ' bg-slate-500 bg-opacity-70 rounded-md' : ''} px-3 text-center py-1 text-lg cursor-pointer`} onClick={()=>setIsUserWeather(true)} > Your Weather </p>
        <p className= {`${!isUserWeather ? 'bg-slate-500 bg-opacity-70 rounded-md' : ''} px-3 text-center py-1 text-lg cursor-pointer`} onClick={()=>setIsUserWeather(false)}> Search Weather </p>
      </div>
      {
        isUserWeather ? <UserWeather /> : <SearchWeather />
      }
    </div>
  );
}

export default App;
