import { useState, useEffect } from "react";
import {
  FaFileUpload,
  FaTable,
  FaChartBar,
  FaCogs,
  FaFileAlt,
  FaSignOutAlt,
  FaUser,
  FaDownload,
  FaTrash,
  FaEllipsisV
} from "react-icons/fa";
import { uploadFile, getUserFiles, logoutUser, downloadFile, deleteFile } from "../../api";
import { useNavigate } from "react-router-dom";
import AnalysisModal from "./Modals/AnalysisModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [analyzingFileId, setAnalyzingFileId] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (!userId) {
          console.warn("No userId found. Redirecting...");
          navigate("/auth?mode=login");
          return;
        }
        const files = await getUserFiles(userId);
        setUploadedFiles(files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [userId, navigate]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDownload = async (fileId) => {
    await downloadFile(fileId);
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await deleteFile(fileId);
      setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please upload a file first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Sending file for analysis...");

      const response = await uploadFile(formData);
      console.log("File uploaded successfully:", response);

      if (response.data && response.data.id) {
        setUploadedFiles((prevFiles) => [...prevFiles, response.data]); // ✅ Keep previous files
        setAnalyzingFileId(response.data.id);
        setShowAnalysisModal(true);
      } else {
        console.error("Invalid response data:", response);
        alert("Something went wrong! Could not analyze file.");
      }

      setSelectedFile(null); // ✅ Reset input
    } catch (error) {
      console.error("Error analyzing file:", error);
      alert("Failed to analyze file. Please try again.");
    }

    setLoading(false);
  };


  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth?mode=login");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Pivoteer</h1>
        <nav style={styles.nav}>
          <button style={styles.navButton}><FaUser /> Profile</button>
          <button style={styles.navButton} onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </nav>
      </header>

      <section style={styles.uploadSection}>
        <div style={styles.uploadBox}>
          <p style={styles.uploadText}>Upload your spreadsheets (xls, xlsx, csv) for analysis.</p>
          <div style={styles.uploadActions}>
            <label style={styles.uploadLabel}>
              <FaFileUpload size={24} /> Upload File
              <input type="file" onChange={handleFileUpload} style={{ display: "none" }} />
            </label>
            <button style={styles.analyzeButton} onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
          {/* ✅ Show selected file name under the upload field */}
          {selectedFile && (
            <p style={styles.selectedFileText}>
              <FaFileAlt /> {selectedFile.name} ({selectedFile.size} bytes)
            </p>
          )}
        </div>
      </section>

      <section style={styles.contentSection}>
        <h2 style={styles.sectionTitle}>Your Data</h2>
        <div style={styles.content}>
          <FileHistoryBox icon={<FaFileAlt size={30} />} title="Uploaded Files" items={uploadedFiles} />
          <CategoryBox icon={<FaTable size={30} />} title="Pivot Tables" items={[]} />
          <CategoryBox icon={<FaChartBar size={30} />} title="Visualizations" items={[]} />
          <CategoryBox icon={<FaCogs size={30} />} title="Macros" items={[]} />
        </div>
      </section>

          {showAnalysisModal && <AnalysisModal fileId={analyzingFileId} onClose={() => setShowAnalysisModal(false)} />}
    </div>
  );
};
/* ✅ File History Box with Dropdown Actions */
const FileHistoryBox = ({ icon, title, items }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track open dropdown for each file

  const toggleDropdown = (fileId) => {
    setDropdownOpen(dropdownOpen === fileId ? null : fileId);
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{icon} {title}</h3>
      {items.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Uploaded</th>
              <th>Size</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((file) => (
              <tr key={file.id}>
                <td>{file.filename}</td>
                <td>{new Date(file.uploadedAt).toLocaleDateString()}</td>
                <td>{(file.fileSize / 1024 / 1024).toFixed(2)} MB</td>
                <td>{file.fileType}</td>
                <td style={styles.actionButtons}>
                  <div style={styles.dropdownContainer}>
                    <button
                      style={styles.dropdownButton}
                      onClick={() => toggleDropdown(file.id)}
                    >
                      <FaEllipsisV />
                    </button>
                    {dropdownOpen === file.id && (
                      <div style={styles.dropdownMenu}>
                        <button
                          style={styles.dropdownItem}
                          onClick={() => downloadFile(file.id)}
                        >
                          📥 Download
                        </button>
                        <button
                          style={styles.dropdownItemDelete}
                          onClick={() => deleteFile(file.id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.emptyText}>No uploaded files available.</p>
      )}
    </div>
  );
};

const CategoryBox = ({ icon, title, items }) => (
  <div style={styles.card}>
    <h3 style={styles.cardTitle}>{icon} {title}</h3>
    <ul style={styles.list}>
      {items.length > 0 ? items.map((item, index) => (
        <li key={index} style={styles.listItem}>{item.filename}</li>
      )) : <p style={styles.emptyText}>No {title.toLowerCase()} available.</p>}
    </ul>
  </div>
);

/* ✅ Inline Styles */
const styles = {
  container: {
    width: "100vw",
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
  dropdownContainer: { position: "relative", display: "inline-block" },
    dropdownButton: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
    },
    dropdownMenu: {
      position: "absolute",
      top: "100%",
      right: 0,
      background: "#2A2245",
      borderRadius: "5px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      width: "120px",
    },
    dropdownItem: {
      padding: "8px",
      cursor: "pointer",
      background: "none",
      border: "none",
      color: "#ffffff",
      textAlign: "left",
    },
    dropdownItemDelete: {
      padding: "8px",
      cursor: "pointer",
      background: "#E53E3E",
      color: "white",
      border: "none",
      textAlign: "left",
    },
  logo: { fontSize: "1.8rem", fontWeight: "bold" },
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
  /* ✅ File Table */
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  actionButtons: { position: "relative" },
  downloadButton: {
    background: "#6B46C1",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#E53E3E",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  uploadSection: {
    position: "relative",
    width: "100vw",
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "linear-gradient(135deg, #2A2245, #1C1C2D)",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)",
  },
  uploadBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    background: "rgba(57, 49, 92, 0.8)",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
  },
  uploadText: {
    fontSize: "1.1rem",
    color: "#CFCFCF",
    marginBottom: "10px",
  },
  uploadActions: {
    display: "flex",
    gap: "20px",
  },
  uploadLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 20px",
    background: "#9D76F9",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  analyzeButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#6B46C1",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
  },

  /* ✅ Full-width Content Section */
  contentSection: {
    width: "100%",
    padding: "60px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #1C1C2D, #2A2245)",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    marginBottom: "30px",
  },
  /* 🔹 Changed grid to 2x2 layout */
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(250px, 1fr))",
    gap: "20px",
    width: "80%",
    margin: "auto",
  },
  card: {
    background: "rgba(57, 49, 92, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease-in-out",
  },
  cardTitle: { fontSize: "1.3rem", marginBottom: "10px" },
  list: { listStyle: "none", padding: 0 },
  listItem: { padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.2)" },
  emptyText: { color: "#CFCFCF", fontSize: "0.9rem" },
};

export default Dashboard;

