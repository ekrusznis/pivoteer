import { useState } from "react";
import { downloadExcel } from "../../../api";

import "./UploadedFilesTable.css";
const UploadedFilesTable = ({ title, items, handleDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (itemId) => {
    setDropdownOpen(dropdownOpen === itemId ? null : itemId);
  };
  const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes >= 1e9) {
      return (sizeInBytes / 1e9).toFixed(2) + " GB";
    } else {
      return (sizeInBytes / 1e6).toFixed(2) + " MB";
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  // Truncate long IDs for better display
  const truncateString = (string) => {
    return string.length > 10 ? `${string.substring(0, 20)}...` : string;
  };

  const getFileTypeBadgeStyle = (fileType) => {
    if (fileType.includes("spreadsheet") || fileType.includes("excel")) {
      return {
        backgroundColor: "#d1fae5",
        color: "#065f46",
      };
    } else if (fileType.includes("pdf")) {
      return {
        backgroundColor: "#fee2e2",
        color: "#991b1b",
      };
    } else if (fileType.includes("image")) {
      return {
        backgroundColor: "#dbeafe",
        color: "#1e40af",
      };
    } else {
      return {
        backgroundColor: "#f3f4f6",
        color: "#1f2937",
      };
    }
  };

  // Get simplified file type name
  const getSimpleFileType = (fileType) => {
    if (fileType.includes("spreadsheetml.sheet")) {
      return "Excel";
    } else if (fileType.includes("pdf")) {
      return "PDF";
    } else if (fileType.includes("image")) {
      return "Image";
    } else {
      return fileType.split("/").pop() || fileType;
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setDropdownOpen(null);
  };

  return (
    <div>
      <div className="file-card">
        <div className="file-card-content">
          {items && items.length > 0 ? (
            <div className="table-container">
              <table className="file-table">
                <thead className="table-header">
                  <tr>
                    <th>ID</th>
                    <th>Uploaded By</th>
                    <th>Filename</th>
                    <th>File Type</th>
                    <th>File Size</th>
                    <th>Uploaded At</th>
                    {handleDelete && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="id-cell">{item.id}</td>
                      <td className="uploaded-by-cell">{item.uploadedBy}</td>
                      <td className="filename-cell" title={item.filename}>
                        {truncateString(item.filename)}
                      </td>
                      <td className="file-type-cell">
                        <span
                          className="badge"
                          style={getFileTypeBadgeStyle(item.fileType)}
                        >
                          {getSimpleFileType(item.fileType)}
                        </span>
                      </td>
                      <td className="file-size-cell">
                        {formatFileSize(item.fileSize)}
                      </td>
                      <td className="uploaded-at-cell">
                        {formatDate(item.uploadedAt)}
                      </td>
                      {handleDelete && (
                        <td className="a ctions-cell">
                          <button
                            onClick={() => toggleDropdown(item.id)}
                            className="action-button"
                            aria-label="Open menu"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                          {dropdownOpen === item.id && (
                            <>
                              <div
                                className="dropdown-overlay"
                                onClick={handleClickOutside}
                              ></div>
                              <div className="dropdown-menu">
                                {downloadExcel && (
                                  <button
                                    onClick={() => {
                                      downloadExcel(item.id);
                                      setDropdownOpen(null);
                                    }}
                                    className="dropdown-item"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                      />
                                    </svg>
                                    Download
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    handleDelete(item.id);
                                    setDropdownOpen(null);
                                  }}
                                  className="dropdown-item delete-item"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              No {title.toLowerCase()} available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadedFilesTable;
