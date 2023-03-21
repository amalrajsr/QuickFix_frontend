import {BrowserRouter,Route,Routes} from 'react-router-dom'
import User from "./routes/UserRoute";
import Admin from './routes/AdminRoute'
function App() {
  return (
  < div className="flex flex-col min-h-screen">
  <BrowserRouter>
  <Routes>
    <Route path={'/*'} element={<User/>} />
    <Route path={'/admin/*'} element={<Admin/>} />
  </Routes>
  </BrowserRouter>


  </div>
  );
}

export default App;
