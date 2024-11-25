import { coordinates } from "@/api/types";
import { weatherApi } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS={
    weather :( coords : coordinates)=>["weather " , coords] as const,
    forecast : ( coords : coordinates) => ["forecast" , coords] as const,
    reverse :( coords : coordinates) => [ "reverse" , coords] as const,
} as const

 export function useWeatherQuery (coordinates : coordinates | null) {
    useQuery({
        queryKey:WEATHER_KEYS.weather( coordinates ?? {lat :0 , lon:0}),
        queryFn:()=> coordinates ? weatherApi.getCurrentWeather(coordinates) :null,
        enabled : !! coordinates,
    })
 }
     export function useForecastQuery ( coordinates : coordinates | null) {
        useQuery({
             queryKey:WEATHER_KEYS.forecast(coordinates ?? {lat :0 , lon : 0}),
             queryFn: ()=> coordinates ? weatherApi.getForecast(coordinates) :null,
             enabled : !! coordinates
        })

     }
 export function useReverseGeoLocation (  coordinates : coordinates | null ){
    useQuery ({
         queryKey : WEATHER_KEYS.reverse( coordinates ?? {lat:0, lon :0}),
         queryFn : ()=> coordinates ? weatherApi.reverseGeoCode( coordinates) : null,
    })
 }
    



