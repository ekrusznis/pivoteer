import { useState, useEffect } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { registerUser, loginUser } from "../../api";

const AuthPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    subscription: "FREE",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsLogin(params.get("mode") !== "register");
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    try {
      let response;
      if (isLogin) {
        response = await loginUser({ email: formData.email, password: formData.password });
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
        response = await registerUser(formData);
      }

      console.log("Auth Successful:", response);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.authBox}>
        <h2>{isLogin ? "Login to Pivoteer" : "Create an Account"}</h2>

        {error && <p style={styles.errorText}>{error}</p>}

        <div style={styles.inputGroup}>
          {!isLogin && (
            <div style={styles.inputField}>
              <FaUser style={styles.icon} />
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} style={styles.input} />
            </div>
          )}

          <div style={styles.inputField}>
            <FaEnvelope style={styles.icon} />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={styles.input} />
          </div>

          {/* Password Field with Eye Icon */}
          <div style={styles.inputField}>
            <FaLock style={styles.icon} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Field with Eye Icon */}
          {!isLogin && (
            <div style={styles.inputField}>
              <FaLock style={styles.icon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
              />
              <span style={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}

          {!isLogin && (
            <div style={styles.inputField}>
              <FaUser style={styles.icon} />
              <select
                name="subscription"
                value={formData.subscription}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  color: "white",
                  background: "#292943",
                  border: "1px solid #9D76F9"
                }}
              >
                <option value="FREE">Free Plan</option>
                <option value="PRO">Pro Plan ($19.99/mo)</option>
                <option value="ENTERPRISE">Enterprise Plan ($49.99/mo)</option>
              </select>
            </div>
          )}
        </div>

        <button onClick={handleSubmit} style={styles.submitButton}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p style={styles.switchText}>
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <span style={styles.switchLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an account" : "Login"}
          </span>
        </p>

        <Link to="/" style={styles.backLink}>← Back to Home</Link>
      </div>
    </div>
  );
};

/* ✅ Styles */
const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #2A2245, #1C1C2D)",
  },
  authBox: {
    width: "400px",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    background: "rgba(57, 49, 92, 0.8)",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
  },
  inputField: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    position: "relative",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    fontSize: "1rem",
    paddingRight: "40px",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    color: "#CFCFCF",
  },
  backLink: {
    display: "block",
    marginTop: "10px",
    fontSize: "0.9rem",
    color: "#CFCFCF",
    textDecoration: "none",
  },
};

export default AuthPage;
