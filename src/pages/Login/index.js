import { useState } from "react";
import { useLogIn } from "../../hooks/LogInHook";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, error, isLoading } = useLogIn();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await logIn(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button disabled={isLoading}>Log In</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
