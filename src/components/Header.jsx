import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  logout,
  selectIsAuthenticated,
  selectUser,
} from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="justify-content">
        {isAuth ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i> {user?.userName}
            </Link>
            <button onClick={handleLogout} className="main-nav-item">
              <i className="text-logout"></i> Logout
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
