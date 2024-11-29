import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { Button } from "../ui/button"
import { useGeolocation } from "@/hooks/use-geoLocation"
import WeatherSkelton from "../loading-skelton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useForecastQuery, useReverseGeoLocation, useWeatherQuery } from "@/hooks/use-weather";
import { CurrentWeather } from "../current-weather";
import HourlyTemperature from "../hourly-temperature";
import WeatherDetails from "../weather-deatils";





export function WeatherDasboard () {

  const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();

  const locationQuery = useReverseGeoLocation(coordinates)
  const forecastQuery = useForecastQuery(coordinates)
  const weatherQuery = useWeatherQuery(coordinates)

   // Function to refresh all data
  function handleRefresh() {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }
  if (locationLoading) {
    return (
      <WeatherSkelton />
    )
  }
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  };

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p> Failed to fetch weather data</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
  if (!weatherQuery.data || !forecastQuery.data) {
    <WeatherSkelton />
  }
  return (
    <div className="space-y-4">
      {/* Favorite Cites */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tighter"> My location</h1>
        <Button
         variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        > 
        <RefreshCw
        className={`h-4 w-4 
        ${weatherQuery.isFetching ? "animate-spin" : ""}`} 
        />
        </Button>
      </div>
   <div className="grid gap-6">
    <div className="flex flex-col lg:flex-row gap-4">
     
       <CurrentWeather 
       data = {weatherQuery.data}
       locationName={locationName}
       />
       {forecastQuery.data && (
  <HourlyTemperature data={forecastQuery.data} />
)}
    </div>
    <div>
         {weatherQuery.data &&(
          <WeatherDetails data= {weatherQuery.data}/>
         )}
    </div>
   </div>
    </div>
  )
}
export default WeatherDasboard;
