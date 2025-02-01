import { useRef } from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import ContactSection from "./ContactSection";

const LandingPage = () => {
  // ✅ Section references for smooth scrolling
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      {/* ✅ Pass refs to Header for smooth scrolling */}
      <Header featuresRef={featuresRef} pricingRef={pricingRef} contactRef={contactRef} />

      {/* Hero Section */}
      <section style={styles.heroSection}>
        {/* Headline & CTA */}
        <h1 style={styles.heroTitle}>Analyze. Automate. Optimize.</h1>
        <p style={styles.heroSubtitle}>
          Effortless spreadsheet transformations with pivot tables & macros.
        </p>

        {/* ✅ Buttons */}
        <div style={styles.buttonContainer}>
          <button style={styles.primaryButton}>Get Started</button>
        </div>

        {/* ✅ Centered Images Below Button */}
        <div style={styles.imageContainer}>
          <img src="/images/neon_ex.png" alt="Example Graphic" style={styles.heroImage} />
          <img src="/images/neon_arrow.png" alt="Arrow Graphic" style={styles.heroImage} />
          <img src="/images/neon_pivots.png" alt="Pivot Graphic" style={styles.heroImage} />
        </div>

        {/* ✅ Semi-Transparent Background Images */}
        <img src="/images/shape2.png" alt="Pivot Table Graphic" style={styles.shapeLeft} />
        <img src="/images/shape1.png" alt="Data Analytics Graphic" style={styles.shapeRight} />
      </section>

      {/* Sections with Assigned Refs for Scrolling */}
      <section ref={featuresRef}><FeatureSection /></section>
      <section ref={pricingRef}><PricingSection /></section>
      <section ref={contactRef}><ContactSection /></section>

      <Footer />
    </div>
  );
};

/* ✅ Styles */
const styles = {
  heroSection: {
    position: "relative",
    width: "100%",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "linear-gradient(135deg, #2A2245, #1C1C2D)",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)"
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "bold",
    color: "#ffffff",
    textShadow: "0px 4px 10px rgba(157, 118, 249, 0.8)"
  },
  heroSubtitle: {
    fontSize: "1.3rem",
    maxWidth: "700px",
    margin: "20px auto",
    color: "#CFCFCF"
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    gap: "20px"
  },
  primaryButton: {
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0px 0px 12px rgba(157, 118, 249, 0.6)",
    backgroundColor: "#9D76F9",
    color: "white"
  },
  /* ✅ Image Container (For Centering Images Below Button) */
  imageContainer: {
    marginTop: "30px",
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center"
  },
  heroImage: {
    width: "120px", // Adjust image size
    height: "auto",
    opacity: "0.9",
    transition: "transform 0.3s ease-in-out",
  },
  shapeLeft: {
    position: "absolute",
    top: "5%",
    left: "0%",
    width: "250px",
    opacity: "0.2",
    zIndex: "-1"
  },
  shapeRight: {
    position: "absolute",
    bottom: "5%",
    right: "0%",
    width: "300px",
    opacity: "0.2",
    zIndex: "-1"
  }
};

export default LandingPage;
