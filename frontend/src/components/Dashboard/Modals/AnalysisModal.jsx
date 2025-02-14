import React, { useEffect, useState } from "react";
import { getFileAnalysisOptions, processFileSelections } from "../../../api";
import { FaTimes, FaDownload } from "react-icons/fa";

const AnalysisModal = ({ fileId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [analysisOptions, setAnalysisOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    pivotTables: [],
    visualizations: [],
    macros: [],
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

  const handleCheckboxChange = (category, item) => {
    setSelectedOptions((prev) => {
      const updatedCategory = prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item];

      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleProcessSelection = async () => {
    try {
      setLoading(true);

      const processedFiles = await processFileSelections(fileId, selectedOptions);
      console.log("Processed Files:", processedFiles);

      // ✅ Automatically download the generated files
      processedFiles.forEach(file => {
        const link = document.createElement("a");
        link.href = file.downloadUrl;
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

      onClose(); // ✅ Close modal after processing
    } catch (error) {
      console.error("Error processing file selection:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2>File Analysis</h2>
        {loading ? (
          <div style={styles.loader}>Loading...</div>
        ) : (
          <>
            <p>Select which items to generate:</p>

            <div style={styles.tabs}>
              {/* ✅ Pivot Tables */}
              <div>
                <h3>Pivot Tables</h3>
                {analysisOptions.pivotTables.map((table) => (
                  <label key={table.name}>
                    <input
                      type="checkbox"
                      checked={selectedOptions.pivotTables.includes(table.name)}
                      onChange={() => handleCheckboxChange("pivotTables", table.name)}
                    />
                    {table.name} - {table.description}
                  </label>
                ))}
              </div>

              {/* ✅ Visualizations */}
              <div>
                <h3>Visualizations</h3>
                {analysisOptions.visualizations.map((viz) => (
                  <label key={viz.type}>
                    <input
                      type="checkbox"
                      checked={selectedOptions.visualizations.includes(viz.type)}
                      onChange={() => handleCheckboxChange("visualizations", viz.type)}
                    />
                    {viz.type} - <img src={viz.previewUrl} alt={viz.type} width="50" />
                  </label>
                ))}
              </div>

              {/* ✅ Macros */}
              <div>
                <h3>Macros</h3>
                {analysisOptions.macros.map((macro) => (
                  <label key={macro.name}>
                    <input
                      type="checkbox"
                      checked={selectedOptions.macros.includes(macro.name)}
                      onChange={() => handleCheckboxChange("macros", macro.name)}
                    />
                    {macro.name} - {macro.actionDescription}
                  </label>
                ))}
              </div>
            </div>

            <button style={styles.processButton} onClick={handleProcessSelection}>
              <FaDownload /> Process & Download
            </button>
          </>
        )}
      </div>
    </div>
  );
};
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
    position: "relative",
    width: "400px",
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
