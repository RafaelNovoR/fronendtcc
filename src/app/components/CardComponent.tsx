import React from "react";

export const CardComponent: React.FC<{
  children: React.ReactNode;
  url: string;
  onClick: () => any;
}> = ({ children, url, onClick }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        width: "300px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundImage: `url(${url})`, // Set the background image
        backgroundSize: "cover", // Adjusts the background image to cover the entire div
        backgroundPosition: "center", // Centers the image
        textAlign: "left",
        color: "black", // Optional: to improve text visibility against the image
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transition for scaling and shadow
        cursor: "pointer", // Change cursor to pointer
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)"; // Scale up on hover
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"; // Darker shadow on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"; // Reset scale
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Reset shadow
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardComponent;
