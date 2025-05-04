
export const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column", // Stack circle and text vertically
      }}
    >
      {/* Spinning circle */}
      <div
        style={{
          border: "8px solid #f3f3f3", // Light grey border
          borderTop: "8px solid #3498db", // Blue top border for the spinning effect
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          animation: "spin 1s linear infinite", // Spin animation
        }}
      ></div>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "20px" }}>
        Loading...
      </p>

      {/* Inline keyframe animation for the spinning effect */}
      <style>
        {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
      </style>
    </div>
  );
};
