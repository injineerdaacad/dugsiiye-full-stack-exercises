import { useState } from "react"

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const Login = () => {
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    if (username.trim() === "honest" && password.trim() === "1234") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    Login();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div>
      {isLoggedIn ? (

        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>

      ) : (
          
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

          <div style={{ marginBottom: "0.5rem" }}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </label>
          </div>
            
            <div style={{ marginBottom: "0.5rem" }}>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  )
}

export default LoginForm