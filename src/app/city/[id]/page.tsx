"use client";
import BackButton from "@/app/components/BackButton";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const bairros = [
  {
    name: "Forquilhinha",
    population: 15000,
    area: 12.5, // in square kilometers
    increase: -3.2, // population growth percentage
  },
  {
    name: "Sertão do Maruim",
    population: 8500,
    area: 10.2,
    increase: 2.5,
  },
  {
    name: "Potecas",
    population: 20000,
    area: 8.3,
    increase: 4.1,
  },
  {
    name: "Areias",
    population: 12500,
    area: 9.0,
    increase: -3.7,
  },
  {
    name: "Kobrasol",
    population: 18000,
    area: 6.7,
    increase: 5.3,
  },
];

export default function Page({ params }: { params: { id: string } }) {
  const [populationData, setPopulationData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cityId = params.id;
  const useSearchParamss: any = useSearchParams();
  const cityName = useSearchParamss.get("nome");
  const microrregiaoName = useSearchParamss.get("microregiao");
  const mesoRegiao = useSearchParamss.get("mesorregiao");
  const regiaoImediata = useSearchParamss.get("regiaoImediata");

  const [hoveredBairro, setHoveredBairro] = useState(null); // State to track the hovered bairro

  // CSS styles
  const bairroCardStyle = {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    position: "relative",
    cursor: "pointer", // Change cursor to pointer
    transition: "transform 0.3s, box-shadow 0.3s",
    marginBottom: 10// Smooth transition
  };

  const bairroCardHoverStyle = {
    transform: "scale(1.05)", // Slightly scale up on hover
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Increase shadow on hover
  };

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/population/${cityId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: any = await response.json();
        setPopulationData(data);
      } catch (err) {
        setError("Failed to fetch population data.");
        console.error(err);
      }
    };

    fetchPopulationData();
  }, [cityId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!populationData) {
    return <div>Loading...</div>;
  }

  // Prepare data for the chart
  const chartData = {
    labels: populationData.populationData.map((data: any) => data.year),
    datasets: [
      {
        label: "Population",
        data: populationData.populationData.map((data: any) => data.population),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Population Data for ${cityId}`,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f6f8",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "1000px",
        margin: "20px auto",
      }}
    >
      {/* Main City Card */}
      <div
        style={{
          flex: "3",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginRight: "20px",
          textAlign: "left",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>{cityName}</h2>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          <strong>Microregion:</strong> {microrregiaoName}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          <strong>Mesorregion:</strong> {mesoRegiao}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          <strong>Immediate Region:</strong> {regiaoImediata}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          <strong>Total Population (Latest Year):</strong>{" "}
          {
            populationData.populationData[
              populationData.populationData.length - 1
            ]?.population
          }
        </p>
        <p style={{ fontSize: "16px", color: "#7f8c8d" }}>
          <strong>Data Summary:</strong> This data represents the population of{" "}
          {cityName} over the years.
        </p>

        {/* City Population Chart */}
        <div style={{ width: "100%", margin: "20px auto" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>

        <BackButton />
      </div>

      {/* Bairro Cards with Population Increase Status */}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minWidth: "40vh",
        }}
      >
        <div>
          {bairros.map((bairro) => {
            const isHovered = hoveredBairro === bairro.name; // Check if this bairro is hovered

            return (
              <div
                key={bairro.name}
                style={
                  {
                    ...bairroCardStyle,
                    ...(isHovered ? bairroCardHoverStyle : {}), // Apply hover styles
                    border: `2px solid ${
                      bairro.increase >= 0 ? "#27ae60" : "#c0392b"
                    }`, // Border color based on growth
                  } as any
                }
                onMouseEnter={() => setHoveredBairro(bairro.name as any)} // Set the hovered bairro
                onMouseLeave={() => setHoveredBairro(null)} // Reset hover state
              >
                <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                  {bairro.name}
                </h3>
                <p style={{ fontSize: "16px", marginBottom: "8px" }}>
                  <strong>Population:</strong> {bairro.population}
                </p>
                <p style={{ fontSize: "16px", marginBottom: "8px" }}>
                  <strong>Area:</strong> {bairro.area} km²
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    color: bairro.increase >= 0 ? "#27ae60" : "#c0392b", // Green for increase, red for decrease
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <strong>
                    {bairro.increase >= 0 ? "Increase" : "Decrease"}:
                  </strong>{" "}
                  {Math.abs(bairro.increase)}% over last year{" "}
                  <span
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      marginLeft: "8px",
                      backgroundColor:
                        bairro.increase >= 0 ? "#27ae60" : "#c0392b",
                      borderRadius: "50%",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {bairro.increase >= 0 ? "↑" : "↓"}{" "}
                      {/* Arrow indication */}
                    </span>
                  </span>
                </p>
                <p style={{ fontSize: "14px", color: "#7f8c8d" }}>
                  <strong>Note:</strong> This bairro has seen significant
                  growth.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
