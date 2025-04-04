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

export const downloadExcel = async (fileId) => {

  const response = await axios.get(`${API_BASE_URL}/files/download/${fileId}`, {
    withCredentials: true,
  });

  // Create a link element
  const link = document.createElement('a');
  
  console.log("download data", response.data)

  // Set the download attribute with the file name
  link.download = response.data.fileName;
  
  // Convert the base64 string into a Blob (binary large object)
  const byteCharacters = atob(response.data.base64Data);
  const byteArrays = [];
  
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: response.fileType });

  // Create a URL for the Blob and set it as the href of the link
  const url = window.URL.createObjectURL(blob);
  link.href = url;

  // Append the link to the document body, trigger a click to download, and remove the link afterward
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Revoke the Blob URL after a short delay to free up memory
  setTimeout(() => window.URL.revokeObjectURL(url), 0);
}

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
