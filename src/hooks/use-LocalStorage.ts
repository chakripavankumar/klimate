import { useEffect, useState } from "react";

 export function useLocalStotage<T>(key:string,intialvalue:T){

    const [ storedvalue , setStoredValue]= useState(()=>{
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) :intialvalue;
        } catch (error) {
             console.log(error);
             return intialvalue;
        }
    })

     useEffect(()=>{
        try {
            window.localStorage.setItem(key, JSON.stringify(storedvalue))
        } catch (error) {
            console.log(error)
        }
     },[key,storedvalue]);
     return [storedvalue,setStoredValue] as const
 }