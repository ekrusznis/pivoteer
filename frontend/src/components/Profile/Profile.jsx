import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfileInfo, logoutUser } from "../../api";
import { FaSignOutAlt } from "react-icons/fa";
import Logo from "../../assets/piv_icon150.png";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserProfileInfo(userId);
        setUser(response.data); // ✅ Fix: Directly set the `data` field from API response
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth?mode=login");
  };

  return (
    <div style={styles.container}>
      {/* ✅ Header (Similar to Dashboard) */}
      <header style={styles.header}>
        <h1 style={styles.logo}>
          <img src={Logo} alt="Pivoteer Logo" style={styles.logoImage} />
          Pivoteer
        </h1>
        <nav style={styles.nav}>
          <button
            style={styles.navButton}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button style={styles.navButton} onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </header>

      {/* ✅ Profile Section */}
      <section style={styles.profileSection}>
        <h2 style={styles.sectionTitle}>Profile</h2>
        {user ? (
          <div style={styles.profileBox}>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Subscription Plan:</strong>{" "}
              {user.subscriptionPlanId || "Free"}
            </p>
            <p>
              <strong>Account Created:</strong> {user.createdAt}
            </p>{" "}
            {/* ✅ Fix: Use string from API */}
            <p>
              <strong>Last File Upload:</strong>{" "}
              {user.lastFileUploadDate || "No uploads yet"}
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </section>
    </div>
  );
};

/* ✅ Styles */
const styles = {
  container: {
    // width: "100vw",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1C1C2D, #2A2245)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    paddingTop: "80px",
  },
  header: {
    width: "100%",
    background: "rgba(41, 41, 67, 0.8)",
    padding: "15px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    backdropFilter: "blur(10px)",
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoImage: {
    height: "40px", // Adjust as needed
    width: "auto",
  },
  nav: { display: "flex", gap: "20px" },
  navButton: {
    background: "transparent",
    color: "white",
    border: "2px solid white",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  profileSection: {
    width: "100%",
    padding: "60px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #1C1C2D, #2A2245)",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    marginBottom: "30px",
  },
  profileBox: {
    background: "rgba(57, 49, 92, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    maxWidth: "400px",
    margin: "auto",
  },
};

export default Profile;
