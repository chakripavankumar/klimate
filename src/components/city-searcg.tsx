import { useState } from "react"
import { Button } from "./ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useHistory } from "@/hooks/use-history";
import { format } from "date-fns";


const CitySearch = () => {
    const [open,setOpen] = useState(false);
    const [ query, setQuery] = useState("");
    const navigate = useNavigate();

    const {data :locations , isLoading}=useLocationSearch(query);
    const {history,clearHistory,addToHistory}=useHistory()


    const handleSelect = ( cityDta :string)=>{
      const [lat, lon, name , country]= cityDta.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon:parseFloat(lon),
      country,
    })
      setOpen(false)
      navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
      
    }
  return (
    <>
    <Button  variant="outline"
    className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40  lg:w-64"
    onClick={()=> setOpen(true)}>
        <Search  className="mr-2 h-4 w-4"/>
        Search Cities..</Button>
       <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
      placeholder=" Search Cities.."
      value={query}
      onValueChange={setQuery}
       />
      <CommandList>
      { query.length >2 && !isLoading && (
         <CommandEmpty>No results found.</CommandEmpty>
        )}
        <CommandGroup heading="Favourties">
          <CommandItem>Calendar</CommandItem>
        </CommandGroup>
    
       { history.length > 0 &&(
        <>
    <CommandSeparator/>
        <CommandGroup>
          <div>
            <p>Recent Searches</p>
            <Button variant="ghost" size="sm" onClick={()=>{
              clearHistory.mutate()
            }}>
              <XCircle className="h-4 w-4"/>
              clear
            </Button>
          </div>
          {history.map((location)=>{
             return  (
              <CommandItem
              key={`${location.lat}-${location.lon}`}
              value={`${location.lat}| ${location.lon} | ${location.name}| ${location.country}`}
              onSelect={handleSelect}
              >
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                   {location.name}
                </span>
                {location.state && (
                  <span className="text-sm text-muted-foreground">
                    ,{location.state}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">
                    ,{location.country}
                  </span>
                  <span className=" ml-auto text-sm text-muted-foreground">
                    {format(location.searchedAt, "MM d , h :mm a")}
                  </span>
               </CommandItem>
             )
          })}
      
        </CommandGroup>
        </>
       ) }
        <CommandSeparator/>
       { locations && locations.length > 0 && (
        <CommandGroup heading="Suggestions">
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-4 w-4 animate-spin"/>
            </div>
          )}
          {locations.map((location)=>{
            return (
              <CommandItem
              key={`${location.lat}-${location.lon}`}
              value={`${location.lat}| ${location.lon} | ${location.name}| ${location.country}`}
              onSelect={handleSelect}
              >
                <Search className="mr-2 h-4 w-4" />
                <span>
                   {location.name}
                </span>
                {location.state && (
                  <span className="text-sm text-muted-foreground">
                    ,{location.state}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">
                    ,{location.country}
                  </span>
               </CommandItem>
            )
          })}
        </CommandGroup>
      )}
      </CommandList>
    </CommandDialog>
    </>
  )
}

export default CitySearch
