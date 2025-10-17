import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, fetchMe } from "../../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const remember = event.target.elements.remember.checked;

    try {
      const token = await dispatch(login({ email, password })).unwrap();
      if (remember) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
      await dispatch(fetchMe()).unwrap();
      navigate("/profile");
    } catch (err) {}
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" name="remember" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </section>
    </main>
  );
}
