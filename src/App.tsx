import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/layout"
import { ThemeProvider } from "./components/context/theme-provider"
import Dasboard from "./components/pages/weather-dasboard"
import City from "./components/pages/city-page"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
    <Layout>
    <Routes>
      <Route path="/" element={<Dasboard/>}/>
      <Route path="/city/:cityname" element= {<City/>}/>
    </Routes>
    </Layout>
    </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App