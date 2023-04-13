import { Route, Routes } from "react-router-dom";
import ExpertLogin from "../components/Expert/ExpertLogin";
import ExpertLayout from "../layouts/ExpertLayout";
import Dashboard from "../components/Expert/Dashboard";
import Profile from "../components/Expert/ExpertProfile";
import WorksPage from "../pages/Expert/WorksPage";
import ProtectedRoute from "../utils/ProtectedRoute";

function ExpertRoute() {
  return (
    <Routes>
      <Route path='/' element={<ExpertLayout/>}>
        <Route path="/login" element={<ExpertLogin/>}/>
        <Route element={<ProtectedRoute type={'expert'} redirect={'/expert/login'}/>} >
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/works" element={<WorksPage/>} />
        </Route>
        </Route>
    </Routes>

  )
}

export default ExpertRoute

