import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/"); // Navigate back to the main page
  };

  return (
    <button
      onClick={handleBack}
     style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#3498db",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#2980b9"; // Darker blue on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#3498db"; // Reset color
      }}
    >
      Back to Main Page
    </button>
  );
};

export default BackButton;
