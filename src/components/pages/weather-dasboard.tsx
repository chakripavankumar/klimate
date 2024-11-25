import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react"
import { Button } from "../ui/button"
import { useGeolocation } from "@/hooks/use-geoLocation"
import WeatherSkelton from "../loading-skelton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


const Dasboard = () => {
  
  const {coordinates, error : locationError, getLocation,isLoading  : locationLoading}= useGeolocation();

  function handleRefresh(){
    getLocation();
    if ( coordinates){
      //reload weather data
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

   if (!coordinates){
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
};
  return (
    <div className=" space-y-4">
      {/* Favorite Cites */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tighter"> My location</h1>
        <Button
             variant={"outline"}
             size={"icon"}
            onClick={handleRefresh}
           // disabled={}
        > <RefreshCcw className="h-4 w-4"/> 
        </Button>
      </div>
      {/* current and hour weather  */}
    </div>
  )
  }
export default Dasboard
