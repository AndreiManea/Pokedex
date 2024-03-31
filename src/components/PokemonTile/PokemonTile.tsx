import { Pokemon } from "pokenode-ts";
import { Link } from "react-router-dom";
import TypeTag from "../TypeTag/TypeTag";

interface PokemonTileProps {
  pokemon: Pokemon;
}

const PokemonTile = ({ pokemon }: PokemonTileProps) => {
  return (
    <Link
      to={`/${pokemon.name}`}
      key={pokemon.id}
      className="block text-gray-800 hover:text-gray-600"
    >
      <div className="flex items-center bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden">
        <div className="w-24 h-24 flex justify-center items-center bg-gray-200 rounded-full">
          <img
            className="object-cover"
            src={pokemon.sprites.front_default as string}
            alt={pokemon.name}
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
        <div className="px-4 py-2">
          <h2 className="text-xl font-semibold capitalize text-left mb-1">
            {pokemon.name}
          </h2>
          <div className="flex">
            {pokemon.types.map((type, index) => (
              <TypeTag key={index} name={type.type.name} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonTile;
