# 📊 Pivoteer - Automated Pivot & Data Analysis Platform

Pivoteer is a **powerful web application** that allows users to **upload spreadsheet files (XLS, XLSX, CSV)** and automatically **analyze, generate pivot tables, create visualizations, and apply macros** for efficient data processing.

---

## 🚀 **Features**
### 🔹 **User Authentication & Management**
- Secure **JWT-based authentication**.
- **User registration, login, logout**.
- **Password encryption** using `BCrypt`.

### 🔹 **File Upload & Storage**
- Users can **upload spreadsheet files (XLS, XLSX, CSV)**.
- Uploaded files are **securely stored in a PostgreSQL database**.
- File metadata is stored for quick retrieval.

### 🔹 **Automated Data Analysis**
- The system **automatically detects column headers and data types**.
- Suggests **dynamic pivot tables** based on numerical & categorical data.
- Recommends **visualizations** (Bar Chart, Pie Chart, Line Graph, Scatter Plot, etc.).
- Identifies **useful macros** (Remove Duplicates, Auto-Summarize, Generate Monthly Reports, etc.).

### 🔹 **Interactive UI with Data Selection**
- Users can select **which pivot tables, visualizations, and macros** to apply.
- **Tabbed selection modal** for reviewing available options.
- Data processing options are customizable before execution.

### 🔹 **File Management**
- Users can **download processed files** with applied selections.
- **Delete files** securely from their history.
- View **file details** (name, type, size, upload date).

---

## 🛠 **Technology Stack**
| Layer            | Technology |
|-----------------|------------|
| **Frontend**    | React, Axios, React Icons, CSS-in-JS |
| **Backend**     | Spring Boot (Kotlin), Spring Security, JWT |
| **Database**    | PostgreSQL (Lob Storage for Files) |
| **Testing**     | JUnit 5, MockK |
| **File Processing** | Apache POI (XLS/XLSX), OpenCSV (CSV) |

---

## 🔧 **Installation & Setup**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/pivoteer.git
cd pivoteer
