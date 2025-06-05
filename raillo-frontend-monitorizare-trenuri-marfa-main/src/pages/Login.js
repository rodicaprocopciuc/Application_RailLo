// src/pages/Login.js
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [eroare, setEroare] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password: parola }),
    });

    if (response.ok) {
      const data = await response.json(); // contains { token: "..." }
      localStorage.setItem("tokenRailLo", data.token); // save the JWT token

      alert("Login successful!");
      navigate("/profil");
    } else {
      const error = await response.text();
      alert(`Login failed: ${error}`);
    }
  };

  return (
    <div className="login-page">
      <main className="login-container">
        <div className="login-box">
          <h1>Autentificare</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Adresă de e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Parolă"
              value={parola}
              onChange={(e) => setParola(e.target.value)}
              required
            />
            <button type="submit">Autentificare</button>
          </form>
          {eroare && <p className="eroare-text">{eroare}</p>}
          <div className="forgot-password">
            <Link to="/resetare-parola">Ai uitat parola?</Link>
          </div>
          <p className="signup-text">
            Nu aveți cont? <Link to="/inregistrare">Înregistrare</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
