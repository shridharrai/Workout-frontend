import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/AuthHook";
import { useLogOut } from "../../hooks/LogOutHook";
import "./index.css";

const Navbar = () => {
  const { logOut } = useLogOut();
  const { user } = useAuthContext();

  const handleClick = () => logOut();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="signup">SignUp</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
