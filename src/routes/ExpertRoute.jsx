import { Route, Routes } from "react-router-dom";
import ExpertLogin from "../components/Expert/ExpertLogin";
import ExpertLayout from "../layouts/ExpertLayout";
import Profile from "../components/Expert/ExpertProfile";
import WorksPage from "../pages/Expert/WorksPage";
import ProtectedRoute from "../utils/ProtectedRoute";
import ForgotPasswordOtpPage from "../pages/Expert/ForgotPasswordOtpPage";
import ResetPasswordPage from "../pages/Expert/ResetPasswordPage";
import PageNotfound from "../components/UI/PageNotfound";

function ExpertRoute() {
  return (
    <Routes>
      <Route path='/' element={<ExpertLayout/>}>
        <Route path="/login" element={<ExpertLogin/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordOtpPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
        <Route element={<ProtectedRoute type={'expert'} redirect={'/expert/login'}/>} >
        <Route path="/profile" element={<Profile/>} />
        <Route path="/works" element={<WorksPage/>} />
        </Route>
        <Route path={"*"} element={<PageNotfound redirect={'/'}/>} />
        </Route>
    </Routes>

  )
}

export default ExpertRoute

