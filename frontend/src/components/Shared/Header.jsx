import { Link } from "react-router-dom";

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
    <header style={{
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
      backdropFilter: "blur(10px)"
    }}>
      {/* Logo */}
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "white", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Pivoteer
      </h1>

      {/* Navigation */}
      <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <button onClick={() => scrollToSection(featuresRef)} className="nav-link" style={{ fontWeight: "600", fontSize: "1.1rem", background: "none", border: "none", color: "white", cursor: "pointer" }}>
          Features
        </button>
        <button onClick={() => scrollToSection(pricingRef)} className="nav-link" style={{ fontWeight: "600", fontSize: "1.1rem", background: "none", border: "none", color: "white", cursor: "pointer" }}>
          Pricing
        </button>
        <button onClick={() => scrollToSection(contactRef)} className="nav-link" style={{ fontWeight: "600", fontSize: "1.1rem", background: "none", border: "none", color: "white", cursor: "pointer" }}>
          Contact
        </button>

        {/* Updated Links to Open Correct Mode */}
        <Link to="/auth?mode=login">
          <button className="nav-button" style={{ fontWeight: "600" }}>Login</button>
        </Link>
        <Link to="/auth?mode=register">
          <button className="nav-button register" style={{ fontWeight: "600" }}>Register</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
