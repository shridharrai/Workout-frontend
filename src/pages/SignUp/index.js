import { useState } from "react";
import { useSignUp } from "../../hooks/SignUpHook";
import "./index.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, error, isLoading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
      />

      <button disabled={isLoading}>Sign Up</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
