import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { useParams, useSearchParams } from "react-router-dom"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle } from "lucide-react";
import WeatherSkeleton from "../loading-skelton";
import { CurrentWeather } from "../current-weather";
import WeatherDetails from "../weather-deatils";
import HourlyTemperature from "../hourly-temperature";
import WeatherForecast from "../WeatherForecast";


const City = () => {
  const [serachParams]= useSearchParams();
  const params= useParams();
  const lat =parseFloat(serachParams.get("lat") || "0");
  const lon = parseFloat(serachParams.get("lon") || "0");

  const coordinates = {lat,lon};

  const forecastQuery = useForecastQuery(coordinates)
  const weatherQuery = useWeatherQuery(coordinates)

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p> Failed to fetch weather data</p>
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
      return <WeatherSkeleton/>
  }
  return (
    <div className="space-y-4">
    {/* Favorite Cites */}
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tighter"> {params.cityName} , {weatherQuery.data.sys.country}</h1>
    </div>
 <div className="grid gap-6">
  <div className="flex flex-col  gap-4">
   
     <CurrentWeather
     data = {weatherQuery.data}
     />
     {forecastQuery.data && (
<HourlyTemperature data={forecastQuery.data} />
)}
  </div>
  <div className=" grid gap-6 md:grid-cols-2 items-start">
       {weatherQuery.data &&(
        <WeatherDetails data= {weatherQuery.data}/>
       )}
      
      {
        forecastQuery.data && (
          <WeatherForecast data= {forecastQuery.data}/>   
        )
      }
    
  </div>
 </div>
  </div>
  )
}

export default City
