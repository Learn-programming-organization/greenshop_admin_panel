import { useContext } from "react"
import { Context } from "./context/Context"
import DashboardRoutes from "./routes/DashboardRoutes"
import LoginRoutes from "./routes/LoginRoutes"

function App() {
  const { token } = useContext(Context)

  if(token){
    return <DashboardRoutes />
  }else {
    return <LoginRoutes />
  }
}

export default App
