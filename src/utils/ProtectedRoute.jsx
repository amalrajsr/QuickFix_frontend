import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "../config/axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import { removeExpert } from "../store/slices/expertSlice";
import fireToast from "./fireToast";
function ProtectedRoute({ type, redirect }) {
  const [auth, setAuth] = useState(null);
  const token = localStorage.getItem(type);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      axios
        .get(`/${type}/jwt`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { role: type },
        })
        .then((res) => {
          setAuth(true);
        })
        .catch((error) => {
          fireToast("error", error.response?.data?.error?.message);
          localStorage.removeItem(type);
          if (type === "user") {
            dispatch(removeUser());
          } else if (type === "expert") {
            dispatch(removeExpert());
          }
          error.response?.data?.error?.tokenExpired
            ? navigate(redirect, { state: { tokenExpired: true } })
            : navigate(redirect);

          setAuth(false);
        });
    } else {
      setAuth(false);
    }
  }, []);


  if (auth === null) return;

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={redirect} />
  );
}

export default ProtectedRoute;
