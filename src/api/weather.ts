
import { API_CONFIG } from "./config"
import { coordinates, ForecastData, GeoCodeingResponce, WeatherData } from "./types"

 class WeatherAPI {
  private createUrl(endpoint : string , params : Record < string, string | number>
 ){
   const searchParams = new URLSearchParams({
    appid:API_CONFIG.API_KEY,
    ...params
   }) 
    return `${endpoint}?${searchParams.toString()}`
    
 }
 private async fetchData <T>(url : string):Promise<T>{
   const responce =  await fetch(url)
    if ( !responce.ok){
        throw new Error( `weather api error ${responce.statusText}`)
    }
   return responce.json();
 }
  async getCurrentWeather( {lat, lon} : coordinates) : Promise<WeatherData>{
    const url =  this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
         lat : lat.toString(),
         lon : lon.toString(),
         units :API_CONFIG.DEFAULT_PARAMS.units,
        });
        return this.fetchData <WeatherData>( url)

  }
   async getForecast( {lat,lon} : coordinates) : Promise<ForecastData>{
     const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast` , {
        lat : lat.toString(),
        lon:lon.toString(),
        units: API_CONFIG.DEFAULT_PARAMS.units,
     });
     return this.fetchData <ForecastData>(url)

   }
    async reverseGeoCode({lat,lon} : coordinates) : Promise< GeoCodeingResponce []>{
        const  url =  this.createUrl(`${API_CONFIG.GEO}/rerverse` ,  {
            lat:  lat.toString(),
            lon: lon.toString(),
            limit: 1,
        });
        return this.fetchData <GeoCodeingResponce []>(url)

    }
 }
 
 export const weatherApi = new WeatherAPI();