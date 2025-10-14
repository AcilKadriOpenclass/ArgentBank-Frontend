import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectIsAuthenticated } from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

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
      <div>
        {isAuth ? (
          <button onClick={handleLogout} className="main-nav-item">
            <i className="text-logout"></i> Logout
          </button>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
