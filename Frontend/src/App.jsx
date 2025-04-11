import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import AppRoutes from "./Routing.jsx"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/global.css"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  )
}

export default App
