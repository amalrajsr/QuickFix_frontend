import { Route, Routes } from "react-router-dom";
import ExpertLogin from "../components/Expert/ExpertLogin";
import ExpertLayout from "../layouts/ExpertLayout";
import Dashboard from "../components/Expert/Dashboard";
import Profile from "../components/Expert/ExpertProfile";
import Works from "../components/Expert/Works";
function ExpertRoute() {
  return (
    <Routes>
      <Route path='/' element={<ExpertLayout/>}>
        <Route path="/login" element={<ExpertLogin/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/works" element={<Works/>} />
        </Route>
    </Routes>

  )
}

export default ExpertRoute

