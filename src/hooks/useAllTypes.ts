import { useQuery } from "react-query";
import { pokemonClient } from "../api/pokemonClient";
import { NamedAPIResourceList } from "pokenode-ts";

export const useAllTypes = () => {
  return useQuery<NamedAPIResourceList, Error>(
    "allTypes",
    () => pokemonClient.listTypes(0, 20) // Limit at the time of making was 20
  );
};
