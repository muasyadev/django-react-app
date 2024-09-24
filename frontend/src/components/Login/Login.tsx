// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Axios import
// import { useUser } from "../../pages/user/UserContext";
// import "./login.css";

// interface LoginProps {
//   setIsAuthenticated: (isAuthenticated: boolean) => void;
// }

// const Login = ({ setIsAuthenticated }: LoginProps) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [newUsername, setNewUsername] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const { setUser } = useUser(); // Get setUser from context
//   const navigate = useNavigate();

//   // Login API call using Axios
//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/token/", {
//         username,
//         password,
//       });

//       // Store the tokens  in local storage or state
//       const { access, refresh } = response.data;
//       localStorage.setItem("access_token", access);
//       localStorage.setItem("refresh_token", refresh);

//       // Set authenticated state
//       setIsAuthenticated(true);
//       console.log("Login successful");

//       // Optionally, store user info (e.g., username)
//       setUser({ name: username, password, email: "" }); // Email can be fetched separately if needed

//       // Redirect to home
//       navigate("/home");
//     } catch (error) {
//       console.error("Login failed:", error);
//       setErrorMessage("Invalid username or password");
//     }
//   };

//   // Signup API call using Axios
//   const handleSignupSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/register/", {
//         username: newUsername,
//         email,
//         password: newPassword,
//       });

//       // Handle response, store user data if needed
//       console.log("Signup successful", response.data);

//       // Optionally, store user info in context
//       setUser({ name: newUsername, password, email });

//       // After signup, switch to login
//       setIsLogin(true);
//     } catch (error) {
//       console.error("Signup failed:", error);
//       setErrorMessage("Error occurred during signup. Please try again.");
//     }
//   };

//   return (
//     <>
//       {isLogin ? (
//         <div className="wrapper">
//           <form onSubmit={handleLoginSubmit}>
//             <h1>Login</h1>
//             <div className="input-box">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <i className="bx bxs-user"></i>
//             </div>
//             <div className="input-box">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <i className="bx bxs-lock"></i>
//             </div>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <div className="remember-forgot">
//               <label>
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#">Forgot password?</a>
//             </div>
//             <button type="submit" className="btn">
//               Login
//             </button>
//             <div className="register-link">
//               <p>
//                 Don't have an account?{" "}
//                 <a href="#" onClick={() => setIsLogin(false)}>
//                   Sign up
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div className="wrapper signup-form">
//           <form onSubmit={handleSignupSubmit}>
//             <h1>Sign up</h1>
//             <div className="input-box">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={newUsername}
//                 onChange={(e) => setNewUsername(e.target.value)}
//               />
//               <i className="bx bxs-user"></i>
//             </div>
//             <div className="input-box">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <i className="bx bxs-lock"></i>
//             </div>
//             <div className="input-box">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <i className="bx bxs-user"></i>
//             </div>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <div className="remember-forgot">
//               <label>
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#">Forgot password?</a>
//             </div>
//             <button type="submit" className="btn">
//               Sign up
//             </button>
//             <div className="register-link">
//               <p>
//                 Already have an account?{" "}
//                 <a href="#" onClick={() => setIsLogin(true)}>
//                   Login
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../pages/user/UserContext";
import "./login.css";

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login = ({ setIsAuthenticated }: LoginProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const { setUser } = useUser();
  const navigate = useNavigate();

  // Login API call using Axios
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      setIsAuthenticated(true);
      console.log("Login successful");

      // Set user information if needed
      setUser({ name: username, password, email });

      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid username or password");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Signup API call using Axios
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/store/api/register/",
        {
          username: newUsername,
          email,
          password: newPassword,
        }
      );

      console.log("Signup successful", response.data);
      setUser({ name: newUsername, password: newPassword, email });

      setIsLogin(true);
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message ||
          "Error occurred during signup. Please try again."
      );
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <>
      {isLogin ? (
        <div className="wrapper">
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bxs-lock"></i>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={() => setIsLogin(false)}>
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="wrapper signup-form">
          <form onSubmit={handleSignupSubmit}>
            <h1>Sign up</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <i className="bx bxs-lock"></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="bx bxs-envelope"></i>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
            <div className="register-link">
              <p>
                Already have an account?{" "}
                <a href="#" onClick={() => setIsLogin(true)}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
