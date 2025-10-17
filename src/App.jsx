import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Interface/Profile";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchMe,
  selectIsAuthenticated,
  selectUser,
} from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (isAuth && !user) {
      dispatch(fetchMe());
    }
  }, [isAuth, user, dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Page 404 */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
