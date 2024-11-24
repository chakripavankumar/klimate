import { RefreshCcw } from "lucide-react"
import { Button } from "../ui/button"


const Dasboard = () => {
  return (
    <div className=" space-y-4">
      {/* Favorite Cites */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tighter"> My location</h1>
        <Button
             variant={"outline"}
             size={"icon"}
            // onClick={handleRefresh}
           // disabled={}
        > <RefreshCcw className="h-4 w-4"/> 
        </Button>
      </div>
      {/* current and hour weather  */}
    </div>
  )
}

export default Dasboard
