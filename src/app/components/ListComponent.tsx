import { City } from "../dataTypes";
import { ItemComponent } from "./ItemComponent";

export const ListComponent: React.FC<{ populationData: City[] }> = ({
  populationData,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      {populationData.map((city) => (
        <ItemComponent key={city.id} city={city} />
      ))}
    </div>
  );
};
