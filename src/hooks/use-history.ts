import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStotage } from "./use-LocalStorage";

interface SearchHistoryItem{
    id:string;
    query:string;
    lat:number;
    lon:number;
    name:string;
    country:string;
    state?:string;
    searchedAt:number;
}
export function useHistory () {
    const [history,setHistory]= useLocalStotage <SearchHistoryItem []> ("search-history" ,[]);

    const queryClient= useQueryClient()

    const historyquery= useQuery({
        queryKey:["search-history"],
        queryFn: ()=> history,
        initialData:history,
    });

    
    const addToHistory = useMutation({
        mutationFn: async (
          search: Omit<SearchHistoryItem, "id" | "searchedAt">
        ) => {
          const newSearch: SearchHistoryItem = {
            ...search,
            id: `${search.lat}-${search.lon}-${Date.now()}`,
            searchedAt: Date.now(),
          };
    
          // Remove duplicates and keep only last 10 searches
          const filteredHistory = history.filter(
            (item) => !(item.lat === search.lat && item.lon === search.lon)
          );
          const newHistory = [newSearch, ...filteredHistory].slice(0, 10);
    
          setHistory(newHistory);
          return newHistory;
        },
        onSuccess: (newHistory) => {
          queryClient.setQueryData(["search-history"], newHistory);
        },
      });

      const clearHistory = useMutation({
        mutationFn: async ()=>{
            setHistory([]);
            return [];
        },
        onSuccess : () =>{
            queryClient.setQueryData(["search-history"] ,[])
        }
      })
      return {
        history:historyquery.data??[],
        addToHistory,
        clearHistory
      }

}