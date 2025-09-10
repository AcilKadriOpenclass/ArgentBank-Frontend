import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      className="main bg-dark"
      style={{ textAlign: "center", padding: "50px", color: "white" }}
    >
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="sign-in-button"
        style={{
          display: "inline-block",
          width: "200px",
          textAlign: "center",
        }}
      >
        Back to Home
      </Link>
    </main>
  );
}
