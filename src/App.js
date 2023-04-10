import {BrowserRouter,Route,Routes} from 'react-router-dom'
import User from "./routes/UserRoute";
import Admin from './routes/AdminRoute'
import Expert from './routes/ExpertRoute'
import { ToastContainer } from "react-toastify";

function App() {
  return (
  < div className="flex flex-col min-h-screen">
  <BrowserRouter>
  <Routes>
    <Route path={'/*'} element={<User/>} />
    <Route path={'/admin/*'} element={<Admin/>} />
    <Route path='/expert/*' element={<Expert/>}/>
  </Routes>
  </BrowserRouter>
<ToastContainer/>
  </div>
  );
}

export default App;
