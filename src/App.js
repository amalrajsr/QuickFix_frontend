import {Navigate,BrowserRouter,Route,Routes} from 'react-router-dom'
import User from "./routes/UserRoute";
function App() {
  return (
  < div className="flex flex-col min-h-screen">
  <BrowserRouter>
  <Routes>
    <Route path={'/*'} element={<User/>} />
    <Route path={'/admin/*'} element={<User/>} />

  </Routes>
  </BrowserRouter>


  </div>
  );
}

export default App;
