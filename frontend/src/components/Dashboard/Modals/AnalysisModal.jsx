import React, { useEffect, useState } from "react";
import { getFileAnalysisOptions } from "../../../api";
import { FaTimes } from "react-icons/fa";

const AnalysisModal = ({ fileId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [analysisOptions, setAnalysisOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    pivotTables: false,
    pivotVisualizations: false,
    macros: false,
  });

  useEffect(() => {
    const fetchAnalysisOptions = async () => {
      try {
        const options = await getFileAnalysisOptions(fileId);
        setAnalysisOptions(options);
      } catch (error) {
        console.error("Error fetching analysis options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisOptions();
  }, [fileId]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleProcessSelection = () => {
    console.log("Selected Options:", selectedOptions);
    onClose(); // Close modal after submission
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Analyzing File...</h2>
        {loading ? (
          <div style={styles.loader}>Loading...</div>
        ) : (
          <>
            <p>Select what you want to process:</p>
            <div style={styles.checkboxContainer}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.pivotTables}
                  onChange={() => handleCheckboxChange("pivotTables")}
                />
                Pivot Tables
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.pivotVisualizations}
                  onChange={() => handleCheckboxChange("pivotVisualizations")}
                />
                Pivot Visualizations
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.macros}
                  onChange={() => handleCheckboxChange("macros")}
                />
                Macros
              </label>
            </div>

            {/* ✅ Tabs Section */}
            <div style={styles.tabs}>
              {/* ✅ Pivot Tables */}
              {selectedOptions.pivotTables && (
                <div>
                  <h3>Available Pivot Tables</h3>
                  <ul>
                    {analysisOptions.pivotTables.map((table) => (
                      <li key={table.name}>
                        <strong>{table.name}</strong> - {table.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ✅ Visualizations */}
              {selectedOptions.pivotVisualizations && (
                <div>
                  <h3>Available Visualizations</h3>
                  <ul>
                    {analysisOptions.visualizations.map((viz) => (
                      <li key={viz.type}>
                        <strong>{viz.type}</strong> - <img src={viz.exampleImageUrl} alt={viz.type} width="50" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ✅ Macros */}
              {selectedOptions.macros && (
                <div>
                  <h3>Available Macros</h3>
                  <ul>
                    {analysisOptions.macros.map((macro) => (
                      <li key={macro.name}>
                        <strong>{macro.name}</strong> - {macro.actionDescription}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button style={styles.processButton} onClick={handleProcessSelection}>
              Process Selection
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/* ✅ Modal Styles */
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#2A2245",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    color: "white",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  loader: {
    fontSize: "1.2rem",
    marginTop: "20px",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    margin: "20px 0",
  },
  processButton: {
    background: "#6B46C1",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default AnalysisModal;
