import { useRouter } from "next/navigation";
import { City } from "../dataTypes";
import { CardComponent } from "./CardComponent";

export const ItemComponent: React.FC<{ city: City }> = ({ city }) => {
  const router = useRouter();

  const handleClick = () => {
    const query = new URLSearchParams({
      nome: city.nome,
      microregiao: city.microrregiao.nome,
      mesorregiao: city.microrregiao.mesorregiao.nome,
      regiaoImediata: city["regiao-imediata"].nome,
    }).toString(); // Converts the object into a query string

    router.push(`/city/${city.id}?${query}`); // Appends the query string to the URL
  };

  return (
    <CardComponent
      url={`url('https://upload.wikimedia.org/wikipedia/commons/5/51/%C3%81guas%2Bde%2BChapec%C3%B3%2BFlag.PNG')`}
      onClick={handleClick} // Call the handleClick function on click
    >
      <h2 style={{ marginBottom: "10px", color: "#2c3e50" }}>{city.nome}</h2>
      <p>
        <strong>Microregion:</strong> {city.microrregiao.nome}
      </p>
      <p>
        <strong>Mesoregion:</strong> {city.microrregiao.mesorregiao.nome}
      </p>
      <p>
        <strong>State:</strong> {city.microrregiao.mesorregiao.UF.nome} (
        {city.microrregiao.mesorregiao.UF.sigla})
      </p>
      <p>
        <strong>Immediate Region:</strong> {city["regiao-imediata"].nome}
      </p>
    </CardComponent>
  );
};
