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

const cityBairrosMap: Record<string, any> = {
Biguaçu: [
{ name: "Fundos", population: 8000, area: 11.2, increase: 2.1 },
{ name: "Saveiro", population: 6500, area: 8.5, increase: -1.3 },
{ name: "Jardim Janaina", population: 9000, area: 7.3, increase: 3.2 },
{ name: "Tijuquinhas", population: 5500, area: 6.1, increase: 0.7 },
{ name: "Centro", population: 7200, area: 5.9, increase: -0.5 },
],
"São José": [
{ name: "Forquilhinha", population: 15000, area: 12.5, increase: -3.2 },
{ name: "Sertão do Maruim", population: 8500, area: 10.2, increase: 2.5 },
{ name: "Potecas", population: 20000, area: 8.3, increase: 4.1 },
{ name: "Areias", population: 12500, area: 9.0, increase: -3.7 },
{ name: "Kobrasol", population: 18000, area: 6.7, increase: 5.3 },
],
"Antônio Carlos": [
{ name: "Centro", population: 3000, area: 15.0, increase: 1.2 },
{ name: "Rio Farias", population: 1800, area: 10.5, increase: -0.3 },
{ name: "Santa Maria", population: 2200, area: 11.3, increase: 0.6 },
{ name: "Santa Luzia", population: 2700, area: 12.1, increase: 2.4 },
{ name: "Rachadel", population: 3200, area: 9.8, increase: 3.1 },
],
Palhoça: [
{ name: "Ponte do Imaruim", population: 11000, area: 9.5, increase: 1.8 },
{ name: "Pagani", population: 9000, area: 6.4, increase: 2.9 },
{ name: "Bela Vista", population: 8700, area: 7.8, increase: 0.2 },
{ name: "Pedra Branca", population: 9500, area: 8.6, increase: 4.5 },
{ name: "Pachecos", population: 7200, area: 6.7, increase: -1.1 },
],
"Governador Celso Ramos": [
{ name: "Ganchos", population: 3000, area: 4.5, increase: 1.0 },
{ name: "Cordeiros", population: 2700, area: 5.2, increase: -0.8 },
{ name: "Calheiros", population: 3200, area: 6.1, increase: 1.9 },
{ name: "Areias de Baixo", population: 2900, area: 4.9, increase: 2.3 },
{ name: "Armação", population: 3100, area: 5.4, increase: 0.5 },
],
"Águas de Chapecó": [
{ name: "Centro", population: 2000, area: 3.2, increase: 0.5 },
{ name: "Linha São Roque", population: 1700, area: 2.8, increase: -0.1 },
{ name: "Linha Cambucica", population: 1900, area: 3.5, increase: 1.0 },
{
name: "Linha Santa Terezinha",
population: 1600,
area: 2.4,
increase: 0.7,
},
{ name: "Linha Barrinha", population: 1800, area: 3.0, increase: 1.3 },
],
"São Pedro de Alcântara": [
{ name: "Centro", population: 1400, area: 10.0, increase: -0.2 },
{ name: "Santa Teresa", population: 1100, area: 9.5, increase: 0.9 },
{ name: "São Miguel", population: 1300, area: 8.8, increase: 1.1 },
{ name: "Alto São Pedro", population: 900, area: 7.3, increase: 0.2 },
{ name: "Pedra Branca", population: 1000, area: 6.9, increase: -1.0 },
],
"São Carlos": [
{ name: "Centro", population: 5000, area: 6.1, increase: 2.0 },
{ name: "Linha Alto Bonito", population: 4600, area: 7.2, increase: 1.6 },
{
name: "Linha São Sebastião",
population: 4300,
area: 6.3,
increase: -0.4,
},
{ name: "Linha Bela Vista", population: 4100, area: 5.5, increase: 1.9 },
{ name: "Linha São Pedro", population: 4000, area: 6.0, increase: 0.3 },
],
Florianópolis: [
{ name: "Centro", population: 25000, area: 15.6, increase: 2.7 },
{ name: "Trindade", population: 20000, area: 12.3, increase: 1.8 },
{ name: "Ingleses", population: 18000, area: 10.7, increase: 3.4 },
{ name: "Campeche", population: 15000, area: 11.1, increase: -0.6 },
{ name: "Coqueiros", population: 13000, area: 9.4, increase: 0.9 },
],
};

const cityMapLinks: any = {
"Florianópolis": "https://www.openstreetmap.org/relation/296561",
"São José": "https://www.openstreetmap.org/relation/296626",
"Palhoça": "https://www.openstreetmap.org/relation/296582",
"Biguaçu": "https://www.openstreetmap.org/relation/296705",
"Santo Amaro da Imperatriz": "https://www.openstreetmap.org/relation/296642",
"Governador Celso Ramos": "https://www.openstreetmap.org/relation/296600",
"Antônio Carlos": "https://www.openstreetmap.org/relation/296793",
"Águas Mornas": "https://www.openstreetmap.org/relation/296576",
"São Pedro de Alcântara": "https://www.openstreetmap.org/relation/296766",
};

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
marginBottom: 10, // Smooth transition
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
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "20px",
}}
>
<h2 style={{ fontSize: "28px", margin: 0 }}>{cityName}</h2>
{cityMapLinks[cityName] && (
<a
href={cityMapLinks[cityName]}
target="_blank"
rel="noopener noreferrer"
style={{
padding: "10px 16px",
backgroundColor: "#2980b9",
color: "white",
borderRadius: "6px",
textDecoration: "none",
fontSize: "16px",
fontWeight: "bold",
transition: "background-color 0.3s ease",
}}
onMouseOver={(e) =>
(e.currentTarget.style.backgroundColor = "#1c6690")
}
onMouseOut={(e) =>
(e.currentTarget.style.backgroundColor = "#2980b9")
}
>
VER MAPA
</a>
)}
</div>
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
{(cityBairrosMap[cityName] || []).map((bairro: any) => {
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
