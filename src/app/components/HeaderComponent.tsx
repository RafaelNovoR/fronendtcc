import { useState } from "react";

const HeaderComponent = () => {
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(""); // State for last update time

  const handleReload = async () => {
    setLoading(true);
    // Simulate a data reload with a timeout
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace this with your actual reload logic
    setLoading(false);
    // Update last update time
    setLastUpdate(new Date().toLocaleString()); // Set the current date and time
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center", // Center items vertically
        justifyContent: "space-between", // Space between title and button
        padding: "20px",
        backgroundColor: "#f8f9fa", // Light background color
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        borderRadius: "10px", // Rounded corners
        margin: "20px", // Margin around header
      }}
    >
      <div style={{ flexGrow: 1, textAlign: "left" }}>
        <h1
          style={{
            color: "#2c3e50", // Dark color for the text
            fontSize: "2.5rem", // Larger font size
            margin: 0, // Remove default margin
          }}
        >
          Florianópolis Population Dashboard: Real-Time Data Insights
        </h1>
        {/* Display the last update time */}
        <p style={{ color: "#6c757d", margin: "5px 0 0", fontSize: "1rem" }}>
          Last Updated: {lastUpdate || "Never"}
        </p>
      </div>

      <button
        onClick={handleReload}
        style={{
          padding: "10px 20px", // Button padding
          fontSize: "1rem", // Button font size
          color: "#fff", // White text color
          backgroundColor: "#007bff", // Bootstrap primary color
          border: "none", // No border
          borderRadius: "5px", // Rounded corners
          cursor: "pointer", // Pointer cursor on hover
          transition: "background-color 0.3s", // Transition effect
          position: "relative", // Position relative for spinner
          width: "120px", // Fixed width to maintain size
          height: "40px", // Fixed height to maintain size
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#0056b3")
        } // Darker on hover
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#007bff")
        } // Reset color
      >
        {loading ? (
          <>
            <span
              style={{
                border: "3px solid rgba(255, 255, 255, 0.3)", // Spinner border color
                borderTop: "3px solid #fff", // Spinner top color
                borderRadius: "50%", // Make it circular
                width: "20px", // Spinner width
                height: "20px", // Spinner height
                animation: "spin 1s linear infinite", // Spin animation
                position: "absolute", // Position absolute for spinner
                left: "50%", // Center horizontally
                top: "50%", // Center vertically
                marginLeft: "-10px", // Offset to center
                marginTop: "-10px", // Offset to center
              }}
            />
            <span style={{ visibility: "hidden" }}>Loading...</span>
          </>
        ) : (
          "Reload"
        )}
      </button>

      {/* Add keyframes for the spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </header>
  );
};

export default HeaderComponent;
