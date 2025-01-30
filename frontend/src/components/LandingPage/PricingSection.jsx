import { useEffect, useState } from "react";

const PricingSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  const pricingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "50px",
    flexWrap: "wrap",
  };

  const pricingBoxStyle = {
    width: "280px",
    padding: "30px",
    borderRadius: "10px",
    background: "rgba(57, 49, 92, 0.8)",
    textAlign: "center",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease-in-out, opacity 0.5s ease-in-out",
    opacity: visible ? "1" : "0",
    transform: visible ? "translateY(0)" : "translateY(30px)",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#9D76F9",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    transition: "0.3s ease-in-out",
  };

  return (
    <section style={{ width: "100%", padding: "60px 20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Pricing Plans</h2>
      <div style={pricingContainerStyle}>
        {/* Free Plan */}
        <div style={{ ...pricingBoxStyle, transitionDelay: "0.1s" }}>
          <h3>Free Plan</h3>
          <h2>$0</h2>
          <ul style={{ textAlign: "left", paddingLeft: "20px", marginTop: "15px" }}>
            <li>✅ Basic features</li>
            <li>✅ 3 Pivot Tables</li>
            <li>✅ Limited storage</li>
          </ul>
          <button style={buttonStyle}>Get Started</button>
        </div>

        {/* Professional Plan */}
        <div style={{ ...pricingBoxStyle, transitionDelay: "0.2s" }}>
          <h3>Professional</h3>
          <h2>$19.99/mo</h2>
          <ul style={{ textAlign: "left", paddingLeft: "20px", marginTop: "15px" }}>
            <li>✅ Unlimited Pivot Tables</li>
            <li>✅ Custom Macros</li>
            <li>✅ 5GB Storage</li>
          </ul>
          <button style={buttonStyle}>Subscribe</button>
        </div>

        {/* Enterprise Plan */}
        <div style={{ ...pricingBoxStyle, transitionDelay: "0.3s" }}>
          <h3>Enterprise</h3>
          <h2>$49.99/mo</h2>
          <ul style={{ textAlign: "left", paddingLeft: "20px", marginTop: "15px" }}>
            <li>✅ All Features</li>
            <li>✅ Team Collaboration</li>
            <li>✅ Unlimited Storage</li>
          </ul>
          <button style={buttonStyle}>Subscribe</button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
