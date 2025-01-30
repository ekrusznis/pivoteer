import { FaTable, FaCogs, FaCloud, FaChartBar } from "react-icons/fa";
import { useEffect, useState } from "react";

const FeatureSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200); // Delay to trigger fade-in
  }, []);

  const featureBoxStyle = {
    width: "280px", // ✅ Increased width
    padding: "25px", // ✅ More padding for better spacing
    borderRadius: "12px",
    background: "rgba(57, 49, 92, 0.9)", // ✅ Slightly more opaque
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.4)", // ✅ Stronger shadow
    textAlign: "center",
    transition: "transform 0.3s ease-in-out, opacity 0.5s ease-in-out",
    opacity: visible ? "1" : "0",
    transform: visible ? "translateY(0)" : "translateY(20px)",
  };

  const featureContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(280px, 1fr))", // ✅ Adjusted grid size
    gap: "20px", // ✅ Increased gap for better spacing
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "700px", // ✅ Wider for better fit
    margin: "50px auto", // ✅ Centered properly
  };

  return (
    <section style={{ width: "100%", padding: "50px 20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "30px" }}>Our Features</h2>
      <div style={featureContainerStyle}>
        <div style={{ ...featureBoxStyle, transitionDelay: "0.1s" }}>
          <FaTable size={60} color="#9D76F9" />  {/* ✅ Bigger icon */}
          <h3 style={{ fontSize: "1.5rem", margin: "10px 0" }}>Smart Pivot Tables</h3>  {/* ✅ Bigger text */}
          <p style={{ fontSize: "1.1rem" }}>Automatically generate pivot tables based on your data.</p>  {/* ✅ Larger text */}
        </div>
        <div style={{ ...featureBoxStyle, transitionDelay: "0.2s" }}>
          <FaCogs size={60} color="#6B46C1" />
          <h3 style={{ fontSize: "1.5rem", margin: "10px 0" }}>Custom Macros</h3>
          <p style={{ fontSize: "1.1rem" }}>Automate repetitive spreadsheet tasks with custom macros.</p>
        </div>
        <div style={{ ...featureBoxStyle, transitionDelay: "0.3s" }}>
          <FaCloud size={60} color="#9D76F9" />
          <h3 style={{ fontSize: "1.5rem", margin: "10px 0" }}>Cloud Storage</h3>
          <p style={{ fontSize: "1.1rem" }}>Store and manage your spreadsheets securely in the cloud.</p>
        </div>
        <div style={{ ...featureBoxStyle, transitionDelay: "0.4s" }}>
          <FaChartBar size={60} color="#6B46C1" />
          <h3 style={{ fontSize: "1.5rem", margin: "10px 0" }}>Data Insights</h3>
          <p style={{ fontSize: "1.1rem" }}>Gain valuable insights with interactive visualizations.</p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
