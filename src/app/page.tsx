"use client";

import { useEffect, useState } from "react";
import HeaderComponent from "./components/HeaderComponent";
import { ListComponent } from "./components/ListComponent";
import { LoadingComponent } from "./components/LoadingComponent";

export default function Home() {
  // State to store population data
  const [populationData, setPopulationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch population data when the component is mounted

  //hook
  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/population`)
        if (!response.ok) {
          throw new Error("Failed to fetch population data");
        }
        const data = await response.json();
        setPopulationData(data); // Store the fetched data
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false when the request completes
      }
    };

    fetchPopulationData(); // Call the function to fetch data
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  // Error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <HeaderComponent /> {/* Use the HeaderComponent */}
      <main>
        <ListComponent populationData={populationData} />
      </main>
    </div>
  );
}
