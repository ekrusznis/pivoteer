import { Link } from "react-router-dom";
import pivoteerLogo from "../../assets/piv_icon150.png";

const Header = ({ featuresRef, pricingRef, contactRef }) => {
  // ✅ Smooth scrolling function
  const scrollToSection = (ref) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // ✅ Adjust to avoid overlapping header
        behavior: "smooth",
      });
    }
  };

  return (
    <header style={styles.header}>
      {/* Logo and Title */}
      <div style={styles.logoContainer} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img src={pivoteerLogo} alt="Pivoteer Logo" style={styles.logo} />
        <h1 style={styles.title}>Pivoteer</h1>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <button onClick={() => scrollToSection(featuresRef)} className="nav-link" style={styles.navLink}>
          Features
        </button>
        <button onClick={() => scrollToSection(pricingRef)} className="nav-link" style={styles.navLink}>
          Pricing
        </button>
        <button onClick={() => scrollToSection(contactRef)} className="nav-link" style={styles.navLink}>
          Contact
        </button>

        {/* Auth Links */}
        <Link to="/auth?mode=login">
          <button className="nav-button" style={styles.navButton}>Login</button>
        </Link>
        <Link to="/auth?mode=register">
          <button className="nav-button register" style={styles.registerButton}>Register</button>
        </Link>
      </nav>
    </header>
  );
};

/* ✅ Styles */
const styles = {
  header: {
    width: "100%",
    background: "rgba(41, 41, 67, 0.8)",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    backdropFilter: "blur(10px)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  logo: {
    width: "40px",
    height: "40px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "white",
  },
  nav: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  navLink: {
    fontWeight: "600",
    fontSize: "1.1rem",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  navButton: {
    fontWeight: "600",
    padding: "8px 16px",
    background: "transparent",
    border: "2px solid white",
    color: "white",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "0.3s ease-in-out",
  },
  registerButton: {
    fontWeight: "600",
    padding: "8px 16px",
    background: "#9D76F9",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "0.3s ease-in-out",
  },
};

export default Header;
