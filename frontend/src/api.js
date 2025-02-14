import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
axios.defaults.withCredentials = true;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("Retrieved token for request:", token);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * 🔹 Register User API Call
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    localStorage.setItem("userId", response.data.data.userId); // ✅ Store userId instead of email
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};
/**
 * 🔹 Login User API Call
 */
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData, {
      withCredentials: true, // ✅ Enables cookies
    });

    localStorage.setItem("userId", response.data.data.userId); // ✅ Store userId instead of email
    console.log("Login successful, userId stored.");
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 🔹 Logout User
 */
export const logoutUser = async () => {
  try {
    await axios.post(`${API_BASE_URL}/auth/logout`);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    console.log("User logged out.");
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
  }
};

/**
 * 🔹 Upload File API Call
 */
export const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/files/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // ✅ Sends the stored JWT cookie automatically
    });

    return response.data;
  } catch (error) {
    console.error("File upload failed:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 🔹 Get User Files (Uses `userId` Instead of `email`)
 */
export const getUserFiles = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files/user?userId=${userId}`, {
      withCredentials: true,
    });

    return response.data.data; // ✅ Only metadata, no file data!
  } catch (error) {
    console.error("Failed to fetch user files:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 🔹 Download File API Call
 */
export const downloadFile = async (fileId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files/download/${fileId}`, {
      responseType: "blob", // ✅ Ensure it downloads as a file
      withCredentials: true,
    });

    // Create a Blob URL for the file
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Extract filename from Content-Disposition or provide a default
    let filename = "downloaded_file";
    const contentDisposition = response.headers["content-disposition"];
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+?)"?(;|$)/);
      if (match) {
        filename = match[1];
      }
    }

    // Create an anchor element and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("File download failed:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 🔹 Delete File API Call
 */
export const deleteFile = async (fileId) => {
  try {
    await axios.delete(`${API_BASE_URL}/files/delete/${fileId}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("File deletion failed:", error.response?.data || error.message);
    throw error;
  }
};
/**
 * 🔹 Get options for file
 */
export const getFileAnalysisOptions = async (fileId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files/analysis-options?fileId=${fileId}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch file analysis options:", error.response?.data || error.message);
    throw error;
  }
};
export const processFileSelections = async (fileId, selectedOptions) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/files/process-selection`, {
      fileId,
      pivotTables: selectedOptions.pivotTables || [],
      visualizations: selectedOptions.visualizations || [],
      macros: selectedOptions.macros || [],
    }, {
      withCredentials: true,
    });

    return response.data.data; // ✅ Returns processed file download links
  } catch (error) {
    console.error("File processing failed:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 🔹 Get user profile data
 */

export const getUserProfileInfo = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.response?.data || error.message);
    throw error;
  }
};
