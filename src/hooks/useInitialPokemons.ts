import { useQuery } from "react-query";
import { pokemonClient } from "../api/pokemonClient";
import { NamedAPIResourceList } from "pokenode-ts";

export const useInitialPokemons = () => {
  return useQuery<NamedAPIResourceList, Error>(
    "initialPokemons",
    () => pokemonClient.listPokemons(0, 1302) // Limit at the time of making was 1302
  );
};
